'use client'

import Tip from '@/components/ui/tip'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useTipStore } from './store'

export default function TipManager() {
	const tips = useTipStore((state) => state.tips)
	const timeout = useRef<NodeJS.Timeout>()

	useEffect(() => {
		if (tips) {
			timeout.current = setTimeout(() => {
				useTipStore.setState({ tips: null })

				clearTimeout(timeout.current)
			}, 3000)
		}

		return () => {
			clearTimeout(timeout.current)
		}
	}, [tips])

	return (
		<section className="absolute top-[30%] left-6 z-[5]">
			<AnimatePresence>
				{tips && (
					<Tip key={tips.id}>
						<span>{tips.content}</span>
					</Tip>
				)}
			</AnimatePresence>
		</section>
	)
}
