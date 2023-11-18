import { getLocale } from '@i18n/utils'
import type { Context } from 'src/types'
import { logError } from './common/common'
import { CookieKeys, setAuthCookies } from './cookies'
import { client, prepareOperationContext } from '@utils/client'
import {} from '@graphql/generated'
// import {
// 	LoginWithGoogle,
// 	RefreshAccessToken,
// 	type LoginWithGoogleMutation,
// 	type RefreshAccessTokenMutation,
// 	type LoginWithGoogleMutationVariables,
// 	type RefreshAccessTokenMutationVariables
// } from '@graphql/generated'

export const callRefreshAccessToken = async (
	context: Context,
	refreshToken: string
): Promise<boolean> => {
	return true

	// let success = false
	// const userAgent = context.request.headers.get('user-agent')

	// try {
	// 	const { data, error } = await client.mutation<RefreshAccessTokenMutation>(
	// 		RefreshAccessToken,
	// 		{ refreshToken } as RefreshAccessTokenMutationVariables,
	// 		prepareOperationContext('DEFAULT', null)
	// 	)

	// 	if (error) {
	// 		throw error
	// 	}

	// 	const acc = data?.refreshAccessToken?.accessToken
	// 	const jid = data?.refreshAccessToken?.refreshToken

	// 	if (!acc || !jid) {
	// 		throw new Error('Missing acc or jid')
	// 	}

	// 	setAuthCookies(context, { key: CookieKeys.ACC, value: acc })
	// 	setAuthCookies(context, { key: CookieKeys.JID, value: jid })

	// 	console.log(`[${callRefreshAccessToken.name}] success`)
	// 	success = true
	// } catch (err) {
	// 	logError(callRefreshAccessToken.name, err)
	// } finally {
	// 	return success
	// }
}

export const callLoginWithGoogle = async (
	context: Context,
	idToken: string
): Promise<void> => {
	// const language = getLocale(context)
	// const userAgent = context.request.headers.get('user-agent')
	// const variables = {
	// 	data: {
	// 		idToken,
	// 		language
	// 	}
	// } as LoginWithGoogleMutationVariables
	// try {
	// 	const { data, error } = await client.mutation<LoginWithGoogleMutation>(
	// 		LoginWithGoogle,
	// 		variables,
	// 		prepareOperationContext('DEFAULT', null)
	// 	)
	// 	if (error) throw error
	// 	const acc = data?.loginWithGoogle?.accessToken
	// 	const jid = data?.loginWithGoogle?.refreshToken
	// 	if (!acc || !jid) {
	// 		throw new Error('Missing acc or jid')
	// 	}
	// 	setAuthCookies(context, { key: CookieKeys.ACC, value: acc })
	// 	setAuthCookies(context, { key: CookieKeys.JID, value: jid })
	// 	console.log(`[${callLoginWithGoogle.name}] success`)
	// } catch (err) {
	// 	logError(callLoginWithGoogle.name, err)
	// 	throw err
	// }
}
