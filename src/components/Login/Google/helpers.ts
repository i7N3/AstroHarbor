import { Routes } from '@utils/routing'
import type { Credentials } from 'google-auth-library'
import { PUBLIC_GOOGLE_CLIENT_ID } from '@utils/config'
import { GoogleOAuthProvider, type CodeResponse } from 'google-oauth-gsi'
import { logError } from '@utils/common/common'

export const googleProvider = new GoogleOAuthProvider({
	clientId: PUBLIC_GOOGLE_CLIENT_ID
})

export const onGoogleLoginSuccess = async ({
	code
}: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) => {
	try {
		const response = await fetch(Routes.API_AUTH_GOOGLE, {
			method: 'POST',
			body: JSON.stringify({ code }),
			headers: { 'Content-Type': 'application/json' }
		})

		const payload = (await response.json()) as Credentials
		if (!payload.id_token) {
			return
		}

		const newLocation = `${window.location.origin}/?${Routes.GOOGLE_CODE_KEY}=${payload.id_token}`
		window.location.replace(newLocation)
	} catch (err) {
		logError(onGoogleLoginSuccess.name, err)
	}
}

export const onGoogleLoginError = (
	errorResponse: Pick<CodeResponse, 'error' | 'error_description' | 'error_uri'>
) => {
	logError(onGoogleLoginError.name, errorResponse)
}
