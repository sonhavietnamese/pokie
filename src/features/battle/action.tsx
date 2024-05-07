import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import type { HTMLProps } from 'react'
import type { Move } from './battle-store'

type ActionProps = {
	move: Move
	side?: 'red' | 'blue'
	variant?: 'selected' | 'normal' | 'disabled'
	vfxScale?: number
} & HTMLProps<HTMLDivElement>

export default function Action({ move, side = 'blue', variant = 'disabled', className, ...props }: ActionProps) {
	return (
		<div className={cn('relative h-[200px] w-[200px]', className)} {...props}>
			<figure className="h-full w-full">
				{
					{
						selected: (
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames[`battle-glow-${side}.png`].frame,
								}}
								className="h-full w-full"
							/>
						),
						normal: (
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames[`battle-glow-${side}.png`].frame,
								}}
								className="h-full w-full"
							/>
						),
						disabled: <div className="h-full w-full" />,
					}[variant]
				}
			</figure>
			<figure className="absolute top-[50%] left-[50%] w-[68%] translate-x-[-50%] translate-y-[-50%]">
				<Sprite
					data={{
						part: '1',
						m: SPRITESHEET_DATA.frames[`battle-frame-action-${side}.png`].frame,
					}}
					className="h-full w-full"
				/>
			</figure>

			{move && (
				<figure className="absolute top-[50%] left-[50%] w-[62%] translate-x-[-50%] translate-y-[-50%]">
					<Sprite
						data={{
							part: '1',
							m: SPRITESHEET_DATA.frames[`battle-move-${move}.png`].frame,
						}}
						className="h-full w-full"
					/>
				</figure>
			)}

			{variant === 'disabled' && (
				<div className="absolute top-[50%] left-[50%] z-10 h-[68%] w-[68%] translate-x-[-50%] translate-y-[-50%] rounded-full bg-[#000000]/70" />
			)}

			<div className="vfx-electric-01 absolute top-[45%] left-[50%] h-[128px] w-[128px] origin-center translate-x-[-50%] translate-y-[-50%] scale-[2]" />
		</div>
	)
}
