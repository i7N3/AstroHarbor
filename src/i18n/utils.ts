import type { Context } from 'src/types'
import type { Locales } from '@i18n/i18n-types'
import { detectLocale, isLocale } from '@i18n/i18n-util'
import {
	initRequestParametersDetector,
	initAcceptLanguageHeaderDetector
} from 'typesafe-i18n/detectors'

export const languages = {
	en: 'English',
	ru: 'Русский'
}

export const getLocaleFromUrl = (pathname: string): Locales | undefined => {
	const [, locale] = pathname.split('/')
	const _locale = locale.toLowerCase()
	if (isLocale(_locale)) return _locale.toLowerCase() as Locales
	return undefined
}

export const getLocaleFromCookie = (context: Context): Locales | undefined => {
	const _locale = context.cookies.get('locale')?.value
	if (!_locale) return undefined
	const locale = _locale.toLowerCase()
	if (isLocale(locale)) return locale.toLowerCase() as Locales
	return undefined
}

export const getLocale = (context: Context): Locales => {
	let locale = getLocaleFromUrl(context.url.pathname)
	if (locale) return locale

	locale = getLocaleFromCookie(context)
	if (locale) return locale

	return getPreferredLocale(context)
}

export const getPreferredLocale = (context: Context): Locales => {
	const resuest = context.request
	const params = context.params as Record<string, string>

	const requestParametersDetector = initRequestParametersDetector(
		{ ...resuest, params },
		'locale'
	)

	const headers = { get: (key: string) => resuest.headers.get(key) }
	const acceptLanguageDetector = initAcceptLanguageHeaderDetector({ headers })

	return detectLocale(requestParametersDetector, acceptLanguageDetector)
}
