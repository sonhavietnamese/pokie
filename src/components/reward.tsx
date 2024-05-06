'use client'

import { Sprite } from '@/components/ui/sprite'
import Vignette from '@/components/vignette'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { type Variants, motion } from 'framer-motion'

const itemVariants: Variants = {
	hidden: { opacity: 0, scale: 1.5 },
	visible: { opacity: 1, scale: 1 },
}

const itemTitleVariants: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0, transition: { delay: 1 } },
}

export default function Reward() {
	return (
		<div className="h-screen w-screen">
			<Vignette />
			<div className="infinite-bg absolute inset-0 h-screen w-screen" />
			<section className="relative flex h-full w-full">
				<div className="z-[2] flex flex-1 items-center">
					<Sprite
						data={{
							part: '1',
							m: SPRITESHEET_DATA.frames['frame-reward.png'].frame,
						}}
						className="w-full"
					/>
				</div>

				<div className="z-[2] flex flex-1 scale-x-[-1] items-center">
					<Sprite
						data={{
							part: '1',
							m: SPRITESHEET_DATA.frames['frame-reward.png'].frame,
						}}
						className="w-full"
					/>
				</div>

				<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-[3] aspect-square w-[30%] origin-center">
					<Sprite
						data={{
							part: '1',
							m: SPRITESHEET_DATA.frames['ray-01.png'].frame,
						}}
						className="h-full w-full animate-spin-slow"
					/>
				</div>

				<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-[4] flex w-[20%] origin-center gap-10">
					<motion.div
						variants={itemVariants}
						animate={'visible'}
						initial={'hidden'}
						className="flex w-[100%] flex-col items-center"
					>
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_DATA.frames['icon-ball-beast.png'].frame,
							}}
							className="h-full w-full"
						/>
						<motion.span
							variants={itemTitleVariants}
							initial="hidden"
							animate="visible"
							className="mt-5 text-center font-extrabold text-3xl text-[#FFF] tracking-wide outline-2-primary-medium"
						>
							Beast Ball
						</motion.span>
					</motion.div>
				</div>
			</section>
		</div>
	)
}
