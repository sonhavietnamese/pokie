'use client'

import { Button } from '@/components/ui/button'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { usePhoneStore } from './phone-store'

export default function Page() {
	const [isOpen, setIsOpen] = usePhoneStore((s) => [s.isOpen, s.setIsOpen])

	return (
		<main className="relative h-screen w-screen">
			<Button onClick={() => setIsOpen(true)}>Phone</Button>

			<AnimatePresence mode="wait">
				{isOpen && (
					<div className="absolute inset-0 z-[3]">
						<div className="h-screen w-screen bg-[#d942426e]" />

						<div className="bg-white rounded-lg p-4">
							<Button onClick={() => setIsOpen(false)}>Close</Button>
						</div>
					</div>
				)}
			</AnimatePresence>
		</main>
	)
}
