<script lang="ts">
	import L from '@i18n/i18n-node'
	import Guest from './Guest.svelte'
	import { Routes } from '@utils/routing'
	import type { Locales } from '@i18n/i18n-types'
	import { LoginFlowState } from './helpers'

	export let locale: Locales
	export let origin: string
	export let state: LoginFlowState = LoginFlowState.guest
</script>

<section class="container">
	<slot name="header" />

	<p>Login page</p>

	<div>
		{#if state === LoginFlowState.guest}
			<Guest {locale} {origin} />
		{:else}
			Authorized
		{/if}
	</div>
</section>
