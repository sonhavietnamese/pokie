import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import { capitalize } from 'lodash-es'
import { type HTMLProps, useEffect, useState } from 'react'
import { Sprite } from './ui/sprite'

type Props = {
	text?: string
} & HTMLProps<HTMLDivElement>

export default function LoadingText({ text = 'Loading', className, ...props }: Props) {
	const [dots, setDots] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setDots((dots) => (dots + 1) % 4)
		}, 500)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div className={cn('flex gap-1 font-bold text-2xl text-[#FCF1CE] outline-2', className)} {...props}>
			<div className="h-8 w-8 animate-spin">
				<Sprite
					data={{
						part: '1',
						m: SPRITESHEET_DATA.frames['icon-gear.png'].frame,
					}}
					className="h-8 w-8"
				/>
			</div>
			<span>{capitalize(text)}</span>
			<span>
				{Array(dots)
					.fill('.')
					.map((dot, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<span key={index}>{dot}</span>
					))}
			</span>
		</div>
	)
}
