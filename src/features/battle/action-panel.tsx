import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { Move } from './battle-store'
import { useBattle } from './use-battle'

const buttonVariants: Variants = {
	init: {
		scale: 0.9,
	},
	shake: {
		scale: [0.9, 1, 1, 1, 1, 0.9],
		rotate: [0, 10, -10, 10, -10, 0],
		transition: {
			ease: 'easeInOut',
			duration: 0.7,
		},
	},
	hover: {
		scale: 1,
	},
}

const containerVariants: Variants = {
	show: {
		y: 0,
		transition: {
			ease: [0, 0.71, 0.2, 1.01],
			duration: 0.8,
		},
	},
	hide: { y: 300 },
}

type ActionPanelProps = {
	onSelected: (action: Move) => void
}

export function ActionPanel({ onSelected }: ActionPanelProps) {
	const [action, setAction] = useState<Move>(null)
	// const [selected, setSelectedAction] = useState<Move>(null)
	const { selectedMove, setSelectedMove } = useBattle()

	const timer = useRef<NodeJS.Timeout>()

	useEffect(() => {
		if (selectedMove) {
			clearInterval(timer.current)
			setAction(null)

			return
		}

		timer.current = setInterval(() => {
			const actions = ['rock', 'paper', 'scissors']
			const randomAction = actions[Math.floor(Math.random() * actions.length)]

			setAction(randomAction as Move)
		}, 1000)

		return () => {
			setAction(null)
			clearInterval(timer.current)
		}
	}, [selectedMove])

	return (
		<AnimatePresence>
			<motion.section
				variants={containerVariants}
				initial={'hide'}
				animate={'show'}
				exit={'hide'}
				className="pointer-events-none absolute right-0 bottom-0 z-20"
			>
				<figure className="w-[850px]">
					<Sprite
						data={{
							part: '3',
							l: SPRITESHEET_DATA.frames['battle-panel-action-l.png'].frame,
							m: SPRITESHEET_DATA.frames['battle-panel-action-m.png'].frame,
							r: SPRITESHEET_DATA.frames['battle-panel-action-r.png'].frame,
						}}
						className="h-[260px] w-[850px]"
					/>
				</figure>

				<figure className="-top-8 absolute left-[40%] z-[3]">
					<Sprite
						data={{
							part: '1',
							m: SPRITESHEET_DATA.frames['battle-choose-action.png'].frame,
						}}
						className="w-[350px]"
					/>
				</figure>

				<div className="absolute bottom-0 z-[2] h-full w-[850px]">
					<div className="-space-x-5  absolute right-[4%] bottom-[3%] flex">
						<motion.figure
							animate={action === 'rock' ? 'shake' : 'init'}
							initial={'init'}
							variants={buttonVariants}
							whileHover={'hover'}
							className={cn('relative h-[220px] w-[220px]')}
							onClick={() => {
								setSelectedMove('rock')
								onSelected('rock')
								clearInterval(timer.current)
							}}
						>
							{selectedMove === 'rock' ? (
								<figure className="h-full w-full">
									<Sprite
										data={{
											part: '1',
											m: SPRITESHEET_DATA.frames['battle-glow-blue.png'].frame,
										}}
										className="h-full w-full"
									/>
								</figure>
							) : (
								<>
									{selectedMove && (
										<div className="absolute top-[50%] left-[50%] z-10 h-[81%] w-[81%] translate-x-[-50%] translate-y-[-50%] rounded-full bg-[#000000]/70" />
									)}
								</>
							)}

							<figure className="absolute top-[54%] left-[50%] w-[80%] translate-x-[-50%] translate-y-[-50%]">
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames['battle-action-rock.png'].frame,
									}}
									className="h-full w-full"
								/>
							</figure>
						</motion.figure>

						<motion.figure
							animate={action === 'paper' ? 'shake' : 'init'}
							initial={'init'}
							variants={buttonVariants}
							whileHover={'hover'}
							className={cn('relative h-[220px] w-[220px]')}
							onClick={() => {
								setSelectedMove('paper')
								onSelected('paper')
								clearInterval(timer.current)
							}}
						>
							{selectedMove === 'paper' ? (
								<figure className="h-full w-full">
									<Sprite
										data={{
											part: '1',
											m: SPRITESHEET_DATA.frames['battle-glow-blue.png'].frame,
										}}
										className="h-full w-full"
									/>
								</figure>
							) : (
								<>
									{selectedMove && (
										<div className="absolute top-[50%] left-[50%] z-10 h-[81%] w-[81%] translate-x-[-50%] translate-y-[-50%] rounded-full bg-[#000000]/70" />
									)}
								</>
							)}
							<figure className="absolute top-[54%] left-[50%] w-[80%] translate-x-[-50%] translate-y-[-50%]">
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames['battle-action-paper.png'].frame,
									}}
									className="h-full w-full"
								/>
							</figure>
						</motion.figure>

						<motion.figure
							animate={action === 'scissors' ? 'shake' : 'init'}
							initial={'init'}
							variants={buttonVariants}
							whileHover={'hover'}
							className={cn('relative h-[220px] w-[220px]')}
							onClick={() => {
								setSelectedMove('scissors')
								onSelected('scissors')
								clearInterval(timer.current)
							}}
						>
							{selectedMove === 'scissors' ? (
								<figure className="h-full w-full">
									<Sprite
										data={{
											part: '1',
											m: SPRITESHEET_DATA.frames['battle-glow-blue.png'].frame,
										}}
										className="h-full w-full"
									/>
								</figure>
							) : (
								<>
									{selectedMove && (
										<div className="absolute top-[50%] left-[50%] z-10 h-[81%] w-[81%] translate-x-[-50%] translate-y-[-50%] rounded-full bg-[#000000]/70" />
									)}
								</>
							)}

							<figure className="absolute top-[54%] left-[50%] w-[80%] translate-x-[-50%] translate-y-[-50%]">
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames['battle-action-scissors.png'].frame,
									}}
									className="h-full w-full"
								/>
							</figure>
						</motion.figure>
					</div>
				</div>
			</motion.section>
		</AnimatePresence>
	)
}
