import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import { type Variants, motion } from 'framer-motion'
import React, { type HTMLAttributes, type ReactNode } from 'react'
import { Sprite } from './sprite'

const notificationVatiants: Variants = {
	hidden: {
		opacity: 0,
		y: -20,
	},
	visible: {
		opacity: 1,
		y: 0,
	},
}

type NotificationProps = {
	children: ReactNode
} & HTMLAttributes<HTMLDivElement>

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(({ children, className, ...props }, ref) => {
	const l = SPRITESHEET_DATA.frames['notification-01-l.png'].frame
	const m = SPRITESHEET_DATA.frames['notification-01-m.png'].frame
	const r = SPRITESHEET_DATA.frames['notification-01-r.png'].frame

	return (
		<motion.div
			ref={ref}
			className={cn('relative flex items-center p-2 px-20')}
			variants={notificationVatiants}
			initial={'hidden'}
			animate={'visible'}
			exit={'hidden'}
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

			<div className="z-[1]">{children}</div>
		</motion.div>
	)
})

Notification.displayName = 'Notification'

export { Notification }
