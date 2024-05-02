'use client'

import { cn } from '@/libs/utils'

import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Sprite } from './sprite'

type TipProps = {
	children: ReactNode
}

export default function Tip({ children }: TipProps) {
	const l = SPRITESHEET_DATA.frames['badge-02-l.png'].frame
	const m = SPRITESHEET_DATA.frames['badge-02-m.png'].frame
	const r = SPRITESHEET_DATA.frames['badge-02-r.png'].frame

	const mIcon = SPRITESHEET_DATA.frames['icon-exclamation-01.png'].frame

	return (
		<motion.div
			className={cn('relative flex items-center p-2 px-7')}
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
		>
			<Sprite
				data={{
					part: '3',
					l,
					m,
					r,
				}}
				className="absolute top-0 left-0 z-[0] h-full w-full"
			/>

			<Sprite
				data={{
					part: '1',
					m: mIcon,
				}}
				className="absolute bottom-1/2 left-4 z-[1] h-[12px] w-[12px] rotate-[-10deg]"
			/>

			<div className="z-[1] ml-4">{children}</div>
		</motion.div>
	)
}
