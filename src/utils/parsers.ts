import { z } from 'zod'

export const submitFormInputSchema = z.object({
	email: z.string()
})
