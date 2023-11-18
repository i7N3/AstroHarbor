import { Routes } from '@utils/routing'
import { IS_PROD } from '@utils/config'
import { isAuthorized } from '@utils/client'
import { callLoginWithGoogle } from '@utils/mutations.server'
import { defineMiddleware, sequence } from 'astro/middleware'
import {
	getLocale,
	getLocaleFromUrl,
	getPreferredLocale,
	getLocaleFromCookie
} from '@i18n/utils'
import {
	CookieKeys,
	setCookies,
	clearCookies,
	setLocaleCookie
} from '@utils/cookies'

const securityHeaders = defineMiddleware(async (context, next) => {
	const response = await next()

	if (IS_PROD) {
		/**
		 *
		 * TODO:
		 *
		 * - Add report-uri to http security headers
		 * - Host all third-party scripts on our server
		 *
		 * References:
		 * - https://securityheaders.com/
		 * - https://observatory.mozilla.org/
		 * - https://csp-evaluator.withgoogle.com/
		 *
		 */

		// https://scotthelme.co.uk/hsts-the-missing-link-in-tls/
		response.headers.set(
			'Strict-Transport-Security',
			`max-age=31536000; includeSubDomains`
		)

		/**
		 *
		 * TODO: Content-Security-Policy
		 *
		 * Implement strict version of CSP!
		 *
		 * Current version is NOT strict, because of: unsafe-inline, unsafe-eval
		 * It's not cool, and can be fixed with solution provided by astro community member. Solution is not solid and leads to performance degradation but.. it's security!
		 *
		 * References:
		 * - https://web.dev/articles/strict-csp
		 * - https://scotthelme.co.uk/content-security-policy-an-introduction/
		 * - https://github.com/withastro/roadmap/discussions/377#discussioncomment-7048030
		 *
		 */
		response.headers.set(
			'Content-Security-Policy',
			`default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://unpkg.com/htmx.org@1.9.5 https://cdn.jsdelivr.net/npm/vanilla-lazyload@17.8.4/dist/lazyload.min.js https://unpkg.com/htmx.org/dist/ext/loading-states.js  https://www.google.com/ https://accounts.google.com/gsi/client https://www.gstatic.com/ https://accounts.google.com/; style-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/style; img-src 'self' blob: https://storage.googleapis.com/; font-src 'self' data:; connect-src 'self' https://accounts.google.com/gsi/; frame-src 'self' https://www.google.com/ https://accounts.google.com/gsi/;`
		)

		// https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options
		response.headers.set('X-Frame-Options', 'SAMEORIGIN')

		// https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options
		response.headers.set('X-Content-Type-Options', 'nosniff')

		// https://scotthelme.co.uk/a-new-security-header-referrer-policy/
		response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

		// https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy
		// https://scotthelme.co.uk/goodbye-feature-policy-and-hello-permissions-policy/
		response.headers.set(
			'Permissions-Policy',
			'accelerometer=(), ambient-light-sensor=(), autoplay=(self), battery=(), camera=(), display-capture=(self), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(self), gamepad=(), geolocation=(), gyroscope=(), hid=(), idle-detection=(), local-fonts=(self), magnetometer=(), midi=(), payment=(), picture-in-picture=(self), publickey-credentials-get=(), screen-wake-lock=(), serial=(), speaker-selection=(), usb=(), web-share=(self), microphone=()'
		)
	}

	return response
})

const staticRedirects = defineMiddleware(async (context, next) => {
	const pathname = context.url.pathname

	switch (pathname) {
		case '/instagram':
			return context.redirect(Routes.INSTAGRAM)

		default:
			return next()
	}
})

const logout = defineMiddleware(async (context, next) => {
	const locale = getLocale(context)

	const hasLogoutKey = context.url.searchParams.has(Routes.LOGOUT_KEY)
	if (!hasLogoutKey) {
		return next()
	}

	clearCookies(context, CookieKeys.ACC)
	clearCookies(context, CookieKeys.JID)

	return context.redirect(`/${locale}${Routes.HOME}`)
})

const googleLogin = defineMiddleware(async (context, next) => {
	const locale = getLocale(context)

	const code = context.url.searchParams.get(Routes.GOOGLE_CODE_KEY)
	if (!code) {
		return next()
	}

	try {
		await callLoginWithGoogle(context, code)
		return next()
	} catch (err) {
		return context.redirect(`/${locale}${Routes.LOGIN}`)
	}
})

const i18nDetectLocale = defineMiddleware(async (context, next) => {
	const pathname = context.url.pathname

	const isApiRoute = pathname.includes('/api/')
	if (isApiRoute) {
		return next()
	}

	let possibleLocale = getLocaleFromUrl(pathname)
	if (possibleLocale) {
		setLocaleCookie(context, possibleLocale)
		return next()
	}

	possibleLocale = getLocaleFromCookie(context)
	if (possibleLocale) {
		setLocaleCookie(context, possibleLocale)
		return context.redirect(
			`/${possibleLocale}${context.url.pathname}${context.url.search}`
		)
	}

	possibleLocale = getPreferredLocale(context)
	setLocaleCookie(context, possibleLocale)

	return context.redirect(
		`/${possibleLocale}${context.url.pathname}${context.url.search}`
	)
})

// https://docs.astro.build/en/guides/middleware/
// https://github.com/withastro/astro/tree/main/examples/middleware/src
export const onRequest = sequence(
	// The order is IMPORTANT!
	securityHeaders,
	staticRedirects,
	logout,
	googleLogin,
	i18nDetectLocale
)
