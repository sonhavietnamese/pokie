import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { Sprite } from './ui/sprite'

const containerVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 10,
		x: '-50%',
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			delay: 2,
		},
		x: '-50%',
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
					className="absolute bottom-6 left-1/2 z-[2] flex w-full flex-col px-8"
				>
					<Sprite
						data={{
							part: '1',
							m: SPRITESHEET_DATA.frames['guide-movement-01.png'].frame,
						}}
						className="w-[200px]"
					/>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
