import { SPRITESHEET_ELEMENT } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import React, { type HTMLAttributes, type ReactNode } from 'react'
import { Sprite } from './sprite'

type Color = 'pink' | 'blue' | 'green' | 'yellow' | 'red'

type ButtonProps = {
	children: ReactNode
	color?: Color
} & HTMLAttributes<HTMLDivElement>

const Button = React.forwardRef<HTMLDivElement, ButtonProps>(
	({ children, className, color = 'blue', ...props }, ref) => {
		const l = SPRITESHEET_ELEMENT.frames[`btn-${color}-l.png`].frame
		const m = SPRITESHEET_ELEMENT.frames[`btn-${color}-m.png`].frame
		const r = SPRITESHEET_ELEMENT.frames[`btn-${color}-r.png`].frame

		return (
			<div role="button" className={cn('relative flex p-3 px-5', className)} {...props}>
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
			</div>
		)
	},
)

Button.displayName = 'Button'

export { Button }
