export function clickOutside(
	node: HTMLElement,
	handler: () => void
): { destroy: () => void } {
	const onClick = (event: MouseEvent) => {
		if (
			node &&
			!event.defaultPrevented &&
			!node.contains(event.target as HTMLElement)
		) {
			handler()
		}
	}

	document.addEventListener('click', onClick, true)

	return {
		destroy() {
			document.removeEventListener('click', onClick, true)
		}
	}
}
