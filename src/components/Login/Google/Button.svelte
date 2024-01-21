<script lang="ts">
	import L from '@i18n/i18n-node'
	import type { Locales } from '@i18n/i18n-types'
	import {
		googleProvider,
		onGoogleLoginError,
		onGoogleLoginSuccess
	} from './helpers'

	export let locale: Locales

	const login = googleProvider.useGoogleLogin({
		flow: 'auth-code',
		onError: onGoogleLoginError,
		onSuccess: onGoogleLoginSuccess
	})
</script>

<button class="wrap" on:click={login} aria-label="Login with Google">
	<div class="flex items-center justify-center">
		<span>Login with Google</span>
	</div>
</button>

<style lang="postcss">
	.wrap {
		@apply bg-white text-black inline-block px-2 pr-3 py-3 mb-4 h-14 border;
		min-width: 255px;
		border-radius: 32px;
	}
</style>
