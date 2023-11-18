import type { APIContext } from 'astro'

export type Context = Omit<
	APIContext<Record<string, any>, Record<string, string | undefined>>,
	'ResponseWithEncoding'
>
