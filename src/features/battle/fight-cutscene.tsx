import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { type AnimationSequence, type Variants, animate, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Action from './action'
import type { Move } from './battle-store'

const trailVariants: Variants = {
	hide: {
		x: '-40%',
		opacity: 0,
	},
	show: {
		x: 0,
		opacity: 1,
		transition: {
			ease: 'easeOut',
			delay: 0.2,
		},
	},
}

const mascotRedVariants: Variants = {
	hide: {
		x: '60%',
		opacity: 0,
	},
	show: {
		x: 0,
		opacity: 1,
		transition: {
			ease: 'easeOut',
			delay: 0.3,
		},
	},
}

const mascotBlueVariants: Variants = {
	hide: {
		x: '-60%',
		opacity: 0,
	},
	show: {
		x: 0,
		opacity: 1,
		transition: {
			ease: 'easeOut',
			delay: 0.3,
		},
	},
}

const actionVariants: Variants = {
	hide: {
		scale: 2,
		opacity: 0,
	},
	show: {
		scale: 1.7,
		opacity: 1,
		transition: {
			ease: 'easeOut',
			delay: 0.4,
		},
	},
	win: {
		scale: 2.5,
		opacity: 1,
		transition: {
			ease: 'easeOut',
			duration: 0.1,
			delay: 0.15,
		},
	},
}

type FightCutsceneProps = {
	show: boolean
	leftMove?: Move
	rightMove?: Move
	winner: 'left' | 'right' | 'draw'
}

export default function FightCutscene({ show, leftMove = 'paper', rightMove = 'paper', winner }: FightCutsceneProps) {
	const [isWinner, setIsWinner] = useState('')

	useEffect(() => {
		const sequence: AnimationSequence = show
			? [['#flash', { opacity: 1 }, { duration: 0.2 }]]
			: [['#flash', { opacity: 0 }, { duration: 0.1 }]]

		animate(sequence)
	}, [show])

	useEffect(() => {
		return () => {
			setIsWinner('')
		}
	}, [])

	return (
		<>
			<motion.section>
				<div className="absolute inset-0 z-[6] h-screen w-screen bg-[#002450]/60">
					<div className="scale-x-[-1]">
						<div className="-ml-[33%] absolute top-[8%] flex w-fit items-center">
							<motion.figure variants={trailVariants} initial={'hide'} animate={'show'} className="z-[6] w-[1500px]">
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames['battle-trail-red.png'].frame,
									}}
									className="h-auto w-full"
								/>
							</motion.figure>
							<figure className="-ml-[18%] z-10 ml-z-[7] flex h-[600px] w-[600px] items-center justify-center">
								<motion.div
									variants={actionVariants}
									initial={'hide'}
									animate={isWinner === 'right' ? 'win' : 'show'}
									exit={'hide'}
									className="scale-[1.7]"
									onAnimationComplete={() => setIsWinner(winner)}
								>
									<Action move={rightMove} side={'red'} variant="normal" className={''} />
								</motion.div>
							</figure>
						</div>
					</div>

					<div className="-ml-[33%] absolute bottom-[10%] z-[20] flex w-fit items-center">
						<motion.figure variants={trailVariants} initial={'hide'} animate={'show'} className="z-[6] w-[1500px]">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['battle-trail-blue.png'].frame,
								}}
								className="h-auto w-full"
							/>
						</motion.figure>
						<figure className="-ml-[18%] z-20 ml-z-[7] flex h-[600px] w-[600px] items-center justify-center">
							<motion.div
								variants={actionVariants}
								initial={'hide'}
								animate={isWinner === 'left' ? 'win' : 'show'}
								className="scale-[1.7]"
								exit={'hide'}
								onAnimationComplete={() => setIsWinner(winner)}
							>
								<Action move={leftMove} side={'blue'} variant="normal" className={''} />
							</motion.div>
						</figure>
					</div>
				</div>

				<div className="absolute inset-0 z-[7] h-screen w-screen">
					<motion.figure
						variants={mascotRedVariants}
						initial={'hide'}
						animate={'show'}
						className="-right-[11%] absolute top-[2%] w-[700px]"
					>
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_DATA.frames['battle-mascot-kotaro.png'].frame,
							}}
							className="h-auto w-full"
						/>
					</motion.figure>

					<motion.figure
						variants={mascotBlueVariants}
						initial={'hide'}
						animate={'show'}
						className="-left-[8%] -bottom-[5%] absolute w-[600px]"
					>
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_DATA.frames['battle-mascot-puffy.png'].frame,
							}}
							className="h-auto w-full"
						/>
					</motion.figure>
				</div>
			</motion.section>

			<motion.div
				id="flash"
				animate={{
					backgroundPositionX: 0,
					transition: {
						ease: 'linear',
						duration: 3,
						repeat: Number.POSITIVE_INFINITY,
					},
					opacity: 1,
				}}
				className="pointer-events-none absolute z-[5] h-screen w-screen bg-[url('/sprites/flash-2.png')] bg-left opacity-0 mix-blend-soft-light"
				style={{
					backgroundPositionX: '100%',
				}}
			/>
		</>
	)
}
