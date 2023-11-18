import type { APIRoute } from 'astro'
import { Routes } from '@utils/routing'
import { getLocale } from '@i18n/utils'
import { isAuthorized } from '@utils/client'

export const POST: APIRoute = async (context) => {
	const locale = getLocale(context)

	const authorized = await isAuthorized(context)
	if (!authorized) {
		return new Response(null, {
			status: 403,
			headers: { 'HX-Redirect': `/?${Routes.LOGOUT_KEY}` }
		})
	}

	// if (needToBeRedirected) {
	// 	return new Response(null, {
	// 		status: 400,
	// 		headers: { 'HX-Redirect': `/${locale}` }
	// 	})
	// }

	try {
		// await callSomething(context)
		return new Response(null, {
			status: 200,
			headers: { 'HX-Refresh': `true` }
		})
	} catch (err) {
		return new Response(null, {
			status: 504,
			headers: { 'HX-Redirect': `/${locale}` }
		})
	}
}
