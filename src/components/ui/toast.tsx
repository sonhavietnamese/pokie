import { SPRITESHEET_ELEMENT } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import React, { type HTMLAttributes, type ReactNode } from 'react'
import { Sprite } from './sprite'

type ToastProps = {
	children: ReactNode
} & HTMLAttributes<HTMLDivElement>

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
	({ children, className, ...props }) => {
		const l = SPRITESHEET_ELEMENT.frames['toast-l.png'].frame
		const r = SPRITESHEET_ELEMENT.frames['toast-r.png'].frame

		return (
			<div
				className={cn('relative flex w-[300px] items-center', className)}
				{...props}
			>
				<Sprite
					data={{
						part: '2',
						l,
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

Toast.displayName = 'Toast'

export { Toast }
