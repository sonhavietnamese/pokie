import { SPRITESHEET_ELEMENT } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import React, { type HTMLAttributes } from 'react'
import { Sprite } from './sprite'

type Size = 'big' | 'small'

type DividerProps = {
	size?: Size
} & HTMLAttributes<HTMLDivElement>

const Divider = React.forwardRef<HTMLDivElement, DividerProps>(({ className, size = 'small', ...props }, ref) => {
	const l = SPRITESHEET_ELEMENT.frames[`divider-${size}-l.png`].frame
	const r = SPRITESHEET_ELEMENT.frames[`divider-${size}-r.png`].frame

	return (
		<div ref={ref} className={cn('relative flex w-[300px] items-center', className)} {...props}>
			<Sprite
				data={{
					part: '2',
					l,
					r,
				}}
				className={className}
			/>
		</div>
	)
})

Divider.displayName = 'Divider'

export { Divider }
