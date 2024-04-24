import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_ICON } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import type { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { Stuff } from './type'

type Props = {
	selected: boolean
	item: Stuff & { quantity: number }
	type: 'stuff' | 'ball' | 'props'
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export default function Item({ item, selected, className, type = 'stuff', ...props }: Props) {
	return (
		<div
			className={cn('relative col-span-1 row-span-1 flex aspect-square items-center justify-center', className)}
			{...props}
		>
			<figure className="relative flex h-full w-full items-center justify-center">
				<Sprite
					data={{
						part: '1',
						m: SPRITESHEET_ICON.frames['frame-item-01.png'].frame,
					}}
					className="h-full w-full scale-[0.9]"
				/>

				{selected && (
					<Sprite
						data={{
							part: '1',
							m: SPRITESHEET_ICON.frames['frame-item-01-selected.png'].frame,
						}}
						className="absolute h-full w-full"
					/>
				)}
			</figure>

			<figure className="absolute top-[50%] left-[50%] w-[65%] translate-x-[-50%] translate-y-[-50%]">
				<Sprite
					className={'h-full w-full'}
					data={{
						part: '1',
						m: SPRITESHEET_ICON.frames[`icon-item-${item.slug}.png` as keyof typeof SPRITESHEET_ICON.frames].frame,
					}}
				/>
			</figure>
			<span className="absolute right-[1.5cqw] bottom-[.5cqw] z-[5] text-right font-black text-[#fff] text-[3cqw] outline-2-primary-medium">
				{item.quantity}
			</span>
		</div>
	)
}
