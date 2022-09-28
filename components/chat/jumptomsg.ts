export default function() {
	const app = document.querySelector('#chat-room')
	app.addEventListener(
		'click', (e) => {
			const currentUrl = window.location
			const link = (e.target as Element).closest('a')
			if (link && !link.closest('.vp-raw')) {
				link.target = '_blank'
				const { pathname, hash, search } = link
				if (
					pathname === currentUrl.pathname &&
					search === currentUrl.search
					&& hash && hash.match(/^#\d+$/)) {
					e.preventDefault()
					e.stopPropagation()
					document.querySelector('#chat-room #\\31 ' + hash.slice(2)).scrollIntoView()
				}
			}
		}
	)

}
