export const logError = (location: string, error: unknown) => {
	if (error instanceof Error) {
		console.error(`[${location}] ${error.message}`, { stack: error.stack })
	} else {
		console.error(`[${location}] ${error}`)
	}
}
