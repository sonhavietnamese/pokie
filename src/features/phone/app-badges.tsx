import { type Variants, motion } from 'framer-motion'
import React from 'react'
import AppWrapper from './app-wrapper'

const appContainerVariants: Variants = {
	hidden: {
		y: '100%',
		transition: { ease: 'circInOut', duration: 0.3 },
	},
	visible: {
		y: 0,
		transition: { ease: 'circInOut', duration: 0.3 },
	},
}

type AppBadgesProps = {
	isOpen: boolean
}

export default function AppBadges({ isOpen }: AppBadgesProps) {
	return (
		<motion.div
			variants={appContainerVariants}
			initial="hidden"
			animate={isOpen ? 'visible' : 'hidden'}
			exit={'hidden'}
			className="absolute top-0 h-full w-full border-inherit bg-white"
		>
			<AppWrapper>
				<span>wau</span>
				<div className="h-full w-full overflow-auto">
					{Array.from({ length: 4 }).map((_, i) => (
						<motion.div
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={i}
							// onClick={() => {
							// 	setOpeningApp(undefined)
							// 	setSelectedApp(undefined)
							// }}
							className="h-[200px] w-[100px] bg-green-300"
						>
							<span>wau</span>
						</motion.div>
					))}
				</div>
			</AppWrapper>
		</motion.div>
	)
}
