<script lang="ts">
	import { languages } from '@i18n/utils'
	import type { Locales } from '@i18n/i18n-types'
	import { clickOutside } from '@utils/hooks.client'
	import Arrow from '@components/Icons/Arrow.svelte'
	import Success from '@components/Icons/Success.svelte'

	export let locale: Locales
	export let pathname: string

	const restPath = pathname.replace(`/${locale}/`, '')

	let isOpen = false
</script>

<button
	aria-label="langs"
	class="dropdown text-b2"
	on:click={() => (isOpen = !isOpen)}
	use:clickOutside={() => (isOpen = false)}
>
	<div class="flex items-center">
		<img
			width="26"
			height="26"
			alt={locale}
			loading="lazy"
			src="/images/{locale}.webp"
			class="pointer-events-none mr-2"
		/>
		<span class="text-black mr-1">{languages[locale]}</span>
		<div class:rotate-180={isOpen}>
			<Arrow class="text-grey-dark" />
		</div>
	</div>
	{#if isOpen}
		<div class="content">
			<div class="content-inner">
				{#each Object.entries(languages) as [lang, label]}
					<a
						href={`/${lang}/${restPath}`}
						aria-label={label}
						class={`font-normal py-4 px-3 flex text-black items-center rounded-2xl ${
							lang === locale ? 'bg-green-light' : 'hover:text-green-medium'
						}`}
					>
						<img
							width="26"
							height="26"
							alt={label}
							loading="lazy"
							src="/images/{lang}.webp"
							class="pointer-events-none mr-4"
						/>
						<span>{label}</span>
						{#if lang === locale}
							<Success class="text-green-300 h-4 w-4 ml-auto" />
						{/if}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</button>

<style lang="postcss">
	.dropdown {
		@apply relative inline-block text-grey-dark;
	}
	.content {
		z-index: 1;
		@apply absolute block bottom-0 -translate-y-11 -left-6;
	}
	.content-inner {
		@apply rounded-2xl p-2 bg-white flex flex-col overflow-hidden;
		-webkit-mask-image: -webkit-radial-gradient(white, black);
		min-width: 200px;
	}
</style>
