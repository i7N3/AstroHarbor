<script lang="ts">
	import Cookies from 'js-cookie'
	import { onMount } from 'svelte'
	import { fade } from 'svelte/transition'
	import { CookieKeys } from '@utils/cookies'
	import { logError } from '@utils/common/common'
	import Error from '@components/Icons/Error.svelte'
	import Success from '@components/Icons/Success.svelte'
	import {
		type Notification,
		NotificationType,
		clientNotification,
		getDefaultNotification
	} from './helpers'

	export let locale: Locales

	const timeout = 5000

	let notification: Notification | undefined

	onMount(() => {
		htmx.on('htmx:responseError', (evt) => {
			notification = getDefaultNotification(locale, NotificationType.ERROR)
			setTimeout(() => (notification = undefined), timeout)
		})
	})
</script>

{#if notification}
	<div class="wrap" in:fade out:fade>
		{#if notification.type === NotificationType.SUCCESS}
			<div class="icon">
				<Success class="w-4 h-4 text-green-medium" />
			</div>
		{/if}
		{#if notification.type === NotificationType.ERROR}
			<div class="icon">
				<Error class="w-4 h-4 text-red-500" />
			</div>
		{/if}
		<p class="text-b2 text-black line-clamp-3" title={notification.message}>
			{notification.message}
		</p>
	</div>
{/if}

<style lang="postcss">
	.wrap {
		@apply fixed bottom-4 left-4 bg-white px-5 py-3 rounded-3xl max-w-sm z-50 border flex;
	}
	.icon {
		@apply mr-2 mt-1;
	}
</style>
