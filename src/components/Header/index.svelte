<script lang="ts">
	import L from '@i18n/i18n-node'
	import type { Locales } from '@i18n/i18n-types'
	import { Routes } from '@utils/routing'

	export let locale: Locales
</script>

<div class="container">
	<header>
		<a href={`/${locale}`} aria-label="home page">Astro advanced POC</a>

		<nav class="flex">
			<a href="/{locale}{Routes.HOME}" class="pr-2">Home</a>
			<a href="/{locale}{Routes.LOGIN}">Login</a>
		</nav>
	</header>
</div>

<style lang="postcss">
	header {
		@apply flex justify-between;
	}
</style>
