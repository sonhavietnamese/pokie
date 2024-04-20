import { SPRITESHEET_ELEMENT } from '@/config/spritesheet'
import { cn } from '@/lib/utils'
import React, { type HTMLAttributes, type ReactNode } from 'react'
import { Sprite } from './sprite'

type NotificationProps = {
	children: ReactNode
} & HTMLAttributes<HTMLDivElement>

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
	({ children, className, ...props }) => {
		const l = SPRITESHEET_ELEMENT.frames['notification-l.png'].frame
		const m = SPRITESHEET_ELEMENT.frames['notification-m.png'].frame
		const r = SPRITESHEET_ELEMENT.frames['notification-r.png'].frame

		return (
			<div
				className={cn('relative flex h-[50px] w-[200px]', className)}
				{...props}
			>
				<Sprite
					data={{
						part: '3',
						l,
						m,
						r,
					}}
					className={className}
				>
					{children}
				</Sprite>
			</div>
		)
	},
)

Notification.displayName = 'Notification'

export { Notification }
