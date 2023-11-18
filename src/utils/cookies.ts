import decode from 'jwt-decode'
import { get } from 'lodash-es'
import type { Context } from 'src/types'

export const setCookies = (
	context: Context,
	opt: { key: string; value: string; expires?: Date }
) => {
	const options = { path: '/' }

	if (opt.expires) {
		Object.assign(options, {
			expires: opt.expires
		})
	}

	if (context.url.protocol.includes('https')) {
		Object.assign(options, {
			secure: true,
			httpOnly: true
		})
	}

	context.cookies.set(opt.key, opt.value, options)
}

export const clearCookies = (context: Context, key: string) => {
	context.cookies.delete(key)
}

export const isValidToken = (token: string | undefined) => {
	if (!token) return false

	const exp = get(decode(token), 'exp') as number | undefined
	if (!exp) return false

	return new Date() < new Date(exp * 1000)
}

export const setLocaleCookie = (context: Context, value: string) => {
	setCookies(context, {
		value,
		key: CookieKeys.LOCALE,
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
	})
}

export const setAuthCookies = (
	context: Context,
	opt: { key: string; value: string }
) => {
	const exp = get(decode(opt.value), 'exp') as number | undefined
	const expires = exp ? new Date(exp * 1000) : undefined // to ms

	const options = { path: '/' }

	if (expires) {
		Object.assign(options, { expires })
	}

	if (context.url.protocol.includes('https')) {
		Object.assign(options, {
			secure: true,
			httpOnly: true
		})
	}

	context.cookies.set(opt.key, opt.value, options)
}

enum CookieKey {
	ACC = 'acc',
	JID = 'jid',
	LOCALE = 'locale'
}

export type CookieType = CookieKey

export const CookieKeys = {
	...CookieKey
}
