<script lang="ts">
	import L from '@i18n/i18n-node'
	import { Routes } from '@utils/routing'
	import type { Locales } from '@i18n/i18n-types'
	import Google from '@components/Login/Google/Button.svelte'

	export let locale: Locales
</script>

<Google {locale} />
