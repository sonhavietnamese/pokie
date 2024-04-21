import { Toast } from '@/components/ui/toast' // Import the Toast component
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useToastStore } from './store'

export default function ToastManager() {
	const toasts = useToastStore((state) => state.toasts)
	const timeout = useRef<NodeJS.Timeout>()

	useEffect(() => {
		if (toasts) {
			timeout.current = setTimeout(() => {
				useToastStore.setState({ toasts: null })

				clearTimeout(timeout.current)
			}, 3000)
		}

		return () => {
			clearTimeout(timeout.current)
		}
	}, [toasts])

	return (
		<section className="absolute top-20">
			<AnimatePresence mode="wait">
				{toasts && (
					<Toast key={toasts.id}>
						<span>{toasts.content}</span>
					</Toast>
				)}
			</AnimatePresence>
		</section>
	)
}
