import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import { type Variants, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useBattle } from './use-battle'

const containerVariants: Variants = {
	hide: {
		x: -100,
		opacity: 0,
	},
	show: {
		x: 0,
		opacity: 1,
		transition: {
			ease: [0, 0.71, 0.2, 1.01],
			delay: 1,
		},
	},
}

const ICONS = {
	win: 'sword',
	draw: 'equal',
	lose: 'sword',
}

export default function BattleHistory() {
	const { history, stage } = useBattle()
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: 'smooth' })

		const element = document.getElementById(`item-${history.length - 1}`)

		if (element) {
			element.scrollIntoView()
		}
	}, [history])

	return (
		<motion.section
			variants={containerVariants}
			initial="hide"
			animate={stage !== 'animation' ? 'show' : 'hide'}
			exit={'hide'}
			className="pointer-events-none absolute top-[20%] left-4 z-[1]"
		>
			{history.length > 0 && (
				<div className="pointer-events-auto h-full max-h-[460px] space-y-1 overflow-auto rounded-[44px] border-[#82FDDC]/50 border-[6px] bg-[#2B7A82]/40 p-2">
					{history.map((h) => (
						<div ref={ref} id={`item-${h.player.result}`} className={'flex items-center gap-2'} key={JSON.stringify(h)}>
							<figure className={'w-16'}>
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames[
											`battle-icon-${h.player.result}-${h.player.move}.png` as keyof typeof SPRITESHEET_DATA.frames
										].frame,
									}}
									className="h-full w-full"
								/>
							</figure>

							<figure className={'w-10'}>
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames[
											`icon-${ICONS[h.player.result]}.png` as keyof typeof SPRITESHEET_DATA.frames
										].frame,
									}}
									className={cn('h-full w-full', h.player.result === 'lose' && 'scale-x-[-1]')}
								/>
							</figure>

							<figure className={'w-16'}>
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames[
											`battle-icon-${h.bot.result}-${h.bot.move}.png` as keyof typeof SPRITESHEET_DATA.frames
										].frame,
									}}
									className="h-full w-full"
								/>
							</figure>
						</div>
					))}
				</div>
			)}
		</motion.section>
	)
}
