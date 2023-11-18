// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'ru'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	/**
	 * O​o​p​s​,​ ​s​o​m​e​t​h​i​n​g​ ​w​e​n​t​ ​w​r​o​n​g​!
	 */
	error: string
	/**
	 * S​u​c​c​e​s​s
	 */
	success: string
	seo: {
		/**
		 * A​s​t​r​o​ ​a​d​v​a​n​c​e​d​ ​P​O​C
		 */
		title: string
		/**
		 * A​s​t​r​o​ ​a​d​v​a​n​c​e​d​ ​P​O​C
		 */
		description: string
	}
}

export type TranslationFunctions = {
	/**
	 * Oops, something went wrong!
	 */
	error: () => LocalizedString
	/**
	 * Success
	 */
	success: () => LocalizedString
	seo: {
		/**
		 * Astro advanced POC
		 */
		title: () => LocalizedString
		/**
		 * Astro advanced POC
		 */
		description: () => LocalizedString
	}
}

export type Formatters = {}
