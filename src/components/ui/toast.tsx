'use client'

import { cn } from '@/libs/utils'

import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { type HTMLMotionProps, type Variants, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Sprite } from './sprite'

type ToastProps = {
	children: ReactNode
} & HTMLMotionProps<'div'>

const toastVariants: Variants = {
	hidden: {
		opacity: 0,
		y: -20,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
}

export function Toast({ className, children, ...props }: ToastProps) {
	const l = SPRITESHEET_DATA.frames['toast-01-l.png'].frame
	const r = SPRITESHEET_DATA.frames['toast-01-r.png'].frame

	return (
		<motion.div
			className={cn('relative flex h-[50px] w-[800px] items-center', className)}
			variants={toastVariants}
			initial={'hidden'}
			animate={'visible'}
			exit={'hidden'}
			{...props}
		>
			<Sprite
				data={{
					part: '2',
					l,
					r,
				}}
				className="absolute top-0 left-0 z-[0] h-full w-full"
			>
				{children}
			</Sprite>
		</motion.div>
	)
}
