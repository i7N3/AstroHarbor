import en from '@i18n/locales/en.json'
import ru from '@i18n/locales/ru.json'
import type { Locales } from '@i18n/i18n-types'
import type { BaseTranslation } from 'typesafe-i18n'
import {
	storeTranslationToDisk,
	type ImportLocaleMapping
} from 'typesafe-i18n/importer'

const getDataFromAPI = async (_locale: Locales): Promise<BaseTranslation> => {
	// custom implementation to fetch the data from a service
	switch (_locale) {
		case 'ru':
			return ru

		default:
			return en
	}
}

const importTranslationsForLocale = async (locale: Locales) => {
	const translations = await getDataFromAPI(locale)

	const localeMapping: ImportLocaleMapping = {
		locale,
		translations
	}

	const result = await storeTranslationToDisk(localeMapping)

	console.log(`translations imported for locale '${result}'`)
}

for (const locale of ['en', 'ru'] as Locales[]) {
	importTranslationsForLocale(locale)
}
