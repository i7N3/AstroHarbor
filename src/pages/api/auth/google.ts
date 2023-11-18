import type { APIRoute } from 'astro'
import { Routes } from '@utils/routing'
import { logError } from '@utils/common/common'
import { OAuth2Client } from 'google-auth-library'
import { PRIVATE_GOOGLE_SECRET, PUBLIC_GOOGLE_CLIENT_ID } from '@utils/config'

const oAuth2Client = new OAuth2Client(
	PUBLIC_GOOGLE_CLIENT_ID,
	PRIVATE_GOOGLE_SECRET,
	'postmessage'
)

export const POST: APIRoute = async ({ request }) => {
	try {
		const payload = await request.json()

		if (!payload?.code) {
			return new Response(null, {
				status: 400,
				statusText: 'No code provided'
			})
		}

		const { tokens } = await oAuth2Client.getToken(payload.code)

		return new Response(
			tokens ? JSON.stringify(tokens) : null,
			tokens ? { status: 200 } : { status: 500, statusText: 'Internal error' }
		)
	} catch (err) {
		logError(Routes.API_AUTH_GOOGLE, err)
		return new Response(null, {
			status: 500,
			statusText: 'Internal error'
		})
	}
}
