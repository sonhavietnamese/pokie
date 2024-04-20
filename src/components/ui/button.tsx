import { SPRITESHEET_ELEMENT } from '@/config/spritesheet'
import { cn } from '@/lib/utils'
import React, { type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Sprite } from './sprite'

type Color = 'pink' | 'blue' | 'green' | 'yellow' | 'red'

type ButtonProps = {
	children: ReactNode
	color?: Color
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, color = 'blue', ...props }) => {
		const l = SPRITESHEET_ELEMENT.frames[`btn-${color}-l.png`].frame
		const m = SPRITESHEET_ELEMENT.frames[`btn-${color}-m.png`].frame
		const r = SPRITESHEET_ELEMENT.frames[`btn-${color}-r.png`].frame

		return (
			<button
				type="button"
				className={cn('relative flex h-[50px] w-[100px]', className)}
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
			</button>
		)
	},
)

Button.displayName = 'Button'

export { Button }
