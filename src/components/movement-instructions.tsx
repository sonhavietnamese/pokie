import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { Sprite } from './ui/sprite'

const containerVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 10,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			delay: 2,
		},
	},
}

export default function MovementInstructions() {
	const timeout = useRef<NodeJS.Timeout>()
	const [isOpened, setIsOpened] = useState(true)

	useEffect(() => {
		timeout.current = setTimeout(() => {
			setIsOpened(false)
			clearTimeout(timeout.current)
		}, 5000)

		return () => {
			if (timeout.current) {
				clearTimeout(timeout.current)
			}
		}
	}, [])

	return (
		<AnimatePresence>
			{isOpened && (
				<motion.div
					initial="hidden"
					animate={isOpened ? 'visible' : 'hidden'}
					variants={containerVariants}
					exit="hidden"
					className="absolute bottom-6 z-[2] flex w-full flex-col px-10"
				>
					<Sprite
						data={{
							part: '1',
							m: SPRITESHEET_DATA.frames['guide-movement.png'].frame,
						}}
						className="w-[300px]"
					/>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
