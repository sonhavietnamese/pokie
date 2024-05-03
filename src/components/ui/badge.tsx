import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'
import { Sprite } from './sprite'

type BadgeProps = {
	children: ReactNode
} & HTMLAttributes<HTMLDivElement>

const Badge = forwardRef<HTMLDivElement, BadgeProps>(({ children, className, ...props }) => {
	const l = SPRITESHEET_DATA.frames['badge-01-l.png'].frame
	const m = SPRITESHEET_DATA.frames['badge-01-m.png'].frame
	const r = SPRITESHEET_DATA.frames['badge-01-r.png'].frame

	return (
		<div className={cn('relative flex h-[50px] w-[100px]', className)} {...props}>
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
})

Badge.displayName = 'Badge'

export { Badge }
