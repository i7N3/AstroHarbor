import L from '@i18n/i18n-node'
import { writable } from 'svelte/store'
import type { Locales } from '@i18n/i18n-types'

export enum NotificationType {
	INFO = 'INFO',
	ERROR = 'ERROR',
	SUCCESS = 'SUCCESS'
}

export type Notification = {
	message: string
	type: NotificationType
}

export const getDefaultNotification = (
	locale: Locales,
	type: NotificationType
): Notification => {
	switch (type) {
		case NotificationType.ERROR:
			return {
				message: L[locale].error(),
				type: NotificationType.ERROR
			}

		case NotificationType.SUCCESS:
			return {
				message: L[locale].success(),
				type: NotificationType.SUCCESS
			}

		default:
			throw new Error('Invalid notification type')
	}
}

export const clientNotification = writable<Notification | undefined>(undefined)
