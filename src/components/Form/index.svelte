<script lang="ts">
	import L from '@i18n/i18n-node'
	import { onMount } from 'svelte'
	import { Routes } from '@utils/routing'
	import { IS_BROWSER } from '@utils/config'
	import type { ocales } from '@i18n/i18n-types'
	import Error from '@components/Icons/Error.svelte'
	import Success from '@components/Icons/Success.svelte'

	export let locale: Locales

	export let errorMsg: string | undefined
	export let state: 'default' | 'submitted' | 'error' = 'default'

	// onMount(() => {
	// 	const scriptSrc = `https://www.google.com/recaptcha/api.js?render=${PUBLIC_RECAPTCHA_KEY}`

	// 	let existingScript = document.querySelector(`script[src="${scriptSrc}"]`)
	// 	if (existingScript) {
	// 		existingScript.parentNode.removeChild(existingScript)
	// 	}

	// 	const loadRecaptchaScript = document.createElement('script')
	// 	loadRecaptchaScript.async = true
	// 	loadRecaptchaScript.src = scriptSrc
	// 	document.head.appendChild(loadRecaptchaScript)

	// 	window.announce = function announce(token) {
	// 		const input = document.createElement('input')
	// 		input.type = 'hidden'
	// 		input.name = 'recaptcha_token'
	// 		input.value = token
	// 		const form = document.getElementById(Routes.BUSINESS_FORM_KEY)
	// 		form.appendChild(input)

	// 		form.dispatchEvent(new Event('verified'))
	// 	}
	// })
</script>

<!-- hx-trigger="verified" -->
<form
	method="POST"
	autocomplete="off"
	hx-target="this"
	hx-swap="outerHTML"
	class="container"
	hx-post={Routes.HTMX_SUBMIT_FORM}
	hx-indicator="#{Routes.FORM_INDICATOR_KEY}"
>
	<input required type="email" name="email" class="border" />

	<!-- <button data-action="submit" data-loading-disable data-callback="announce">
		<span>submit</span>
		<span id={Routes.FORM_INDICATOR_KEY} class="htmx-indicator">
			loading ..
		</span>
	</button> -->

	<div>
		<button class="border" type="submit" data-loading-disable>
			<span>submit</span>
			<span id={Routes.FORM_INDICATOR_KEY} class="htmx-indicator">
				loading ..
			</span>
		</button>
	</div>

	{#if state === 'submitted'}
		<div class="mt-2 flex justify-center">
			<div class="mr-2 mt-1">
				<Success class="w-4 h-4 text-green-medium" />
			</div>
			<p class="text-b2 text-center text-black">Success</p>
		</div>
	{:else if state === 'error' && errorMsg}
		<div class="mt-2 flex justify-center">
			<div class="mr-2 mt-1">
				<Error class="w-4 h-4 text-red-500" />
			</div>
			<p class="text-b2 text-center text-black">
				{errorMsg}
			</p>
		</div>
	{/if}
</form>

<style lang="postcss">
	form {
		@apply flex flex-col;
	}
	form > input {
		@apply mb-4;
	}

	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
