import { get } from 'lodash-es'
import { CookieKeys } from './cookies'
import { jwtDecode } from 'jwt-decode'
import type { Context } from 'src/types'
import { PUBLIC_API_URL } from '@utils/config'
import type { OperationContext } from '@urql/core'
import { callRefreshAccessToken } from './mutations.server'
import { Client, fetchExchange, mapExchange } from '@urql/core'

export const client = new Client({
	url: PUBLIC_API_URL,
	exchanges: [
		mapExchange({
			onError(error, operation) {
				let errorMessage = `${error.name} ${error.toString()}\n`
				const operationName = get(operation, 'query.definitions.0.name.value')

				if (error.networkError) {
					errorMessage += `network error cause: ${error.networkError.cause}\n`
					if (operationName) {
						errorMessage += `operation: ${operationName}\n`
					}
				}

				if (error.graphQLErrors.length) {
					errorMessage += `graphQLErrors:\n`
				}
				error.graphQLErrors.forEach((gqlErr) => {
					const path = gqlErr.path
					const code = get(gqlErr, 'extensions.code')
					const stacktrace = get(gqlErr, 'extensions.exception.stacktrace', [])
					if (path) errorMessage += `path: ${path}\n`
					if (code) errorMessage += `code: ${code}\n`
					if (stacktrace.length)
						errorMessage += `stacktrace: ${stacktrace.join('\n')}\n`
				})

				console.error(
					JSON.stringify({
						message: errorMessage,
						severity: 'ERROR'
					})
				)
			}
		}),
		fetchExchange
	]
})

const preparHeaders = () => {
	return { 'Content-Type': 'application/json' } as HeadersInit
}

export const prepareOperationContext = (
	variant: 'DEFAULT' | 'WITH_TOKEN' = 'DEFAULT',
	accessToken?: string | null
): Partial<OperationContext> => {
	const headers = preparHeaders()

	if (variant === 'WITH_TOKEN') {
		if (accessToken) {
			Object.assign(headers, {
				Authorization: `Bearer ${accessToken}`
			})
		}
	}

	return {
		requestPolicy: 'network-only',
		fetchOptions: {
			headers: headers
		}
	}
}

export const isAuthorized = async (astro: Context): Promise<boolean> => {
	let success = false
	const acc = astro.cookies.get(CookieKeys.ACC)?.value
	const jid = astro.cookies.get(CookieKeys.JID)?.value

	if (!jid) {
		// console.log('jid is missing')
		return success
	}

	let accExp: number | undefined
	const jidExp = get(jwtDecode(jid), 'exp') as number | undefined

	if (acc) {
		accExp = get(jwtDecode(acc), 'exp') as number | undefined
	}

	if (!jidExp || !accExp) {
		// console.log('acc or jid is not valid')
		return success
	}

	// subtracting 5 minute for safe margin
	const accExpDate = new Date((accExp - 60 * 5) * 1000) // ms

	if (accExpDate > new Date()) {
		// console.log('acc is valid')
		success = true
	} else {
		// console.log('acc is not valid')
		success = await callRefreshAccessToken(astro, jid)
	}

	// console.log(`isAuthorized: ${success}`)
	return success
}
