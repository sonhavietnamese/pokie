'use client'

import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { type HTMLMotionProps, type Variants, motion } from 'framer-motion'
import React from 'react'
import type { App } from './type'

type AppIconProps = {
	app: App
	index: number
} & HTMLMotionProps<'div'>

const delays = [
	0.0816, 0, 0.0816, 0.1632, 0.11942529045390679, 0.0872, 0.11942529045390679, 0.1850353479743803, 0.19254589063389538,
	0.1744,
]

const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0.5,
	},
	visible: (delay: number) => ({
		opacity: 1,
		scale: 1,
		transition: { delay },
	}),
	extend: {
		scale: 10,
	},
}

export default function AppIcon({ index, app, ...props }: AppIconProps) {
	return (
		<motion.div
			key={app.id}
			className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-[20px] hover:outline hover:outline-[#FFA200] hover:outline-[4px]"
			layoutId={app.id.toString()}
			variants={itemVariants}
			custom={delays[index] + 0.5}
			id={`app-${app.id}`}
			{...props}
		>
			<Sprite
				data={{
					part: '1',
					m: SPRITESHEET_DATA.frames[`icon-app-${app.id}.png` as keyof typeof SPRITESHEET_DATA.frames].frame,
				}}
			/>
		</motion.div>
	)
}
