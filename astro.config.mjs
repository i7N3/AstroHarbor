import node from '@astrojs/node'
import svelte from '@astrojs/svelte'
import compress from 'astro-compress'
import mkcert from 'vite-plugin-mkcert'
import tailwind from '@astrojs/tailwind'
import compressor from 'astro-compressor'
import partytown from '@astrojs/partytown'
import { defineConfig } from 'astro/config'

const IS_PROD = import.meta.env.PROD

/**
 *
 * If you want to run app on https://google.com turn on DEV_HTTPS
 *
 * DEV_HTTPS
 *
 * Also add this to /etc/hosts:
 *
 * - "127.0.0.1 google.com"
 *
 */
const DEV_HTTPS = false

const serverHost = () => {
	if (IS_PROD) return '0.0.0.0'
	if (DEV_HTTPS) return 'google.com'
	return undefined
}
const serverPort = () => {
	if (IS_PROD) return import.meta.env.PORT || 8080
	if (DEV_HTTPS) return 443
	return undefined
}

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: node({ mode: 'standalone' }),
	integrations: [
		svelte(),
		tailwind(),
		compress(),
		compressor(),
		partytown({ config: { debug: false } })
	],
	server: {
		host: serverHost(),
		port: serverPort()
	},
	vite: {
		server: DEV_HTTPS ? { https: true } : undefined,
		plugins: DEV_HTTPS
			? [mkcert({ hosts: ['google.com', 'localhost'] })]
			: undefined
	}
})
