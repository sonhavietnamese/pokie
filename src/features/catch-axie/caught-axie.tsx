import { Button } from '@/components/ui/button'
import { Sprite } from '@/components/ui/sprite'
import Vignette from '@/components/vignette'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { type Variants, motion } from 'framer-motion'
import React from 'react'
import { useCatchAxieStore } from './catch-axie-store'

const itemVariants: Variants = {
	hidden: { opacity: 0, scale: 1.5 },
	visible: { opacity: 1, scale: 1 },
}

const itemTitleVariants: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
}

export default function CaughtAxie() {
	const [caughtAxie, setCaughtAxie] = useCatchAxieStore((s) => [s.caughtAxie, s.setCaughtAxie])

	const onClose = () => {
		setCaughtAxie(null)
	}

	return (
		<>
			{caughtAxie?.caught && caughtAxie.id && (
				<div className="absolute inset-0 z-[20] h-screen w-screen">
					<Vignette />

					<section className="relative flex h-full w-full">
						<div className="z-[2] flex flex-1 items-center">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['frame-reward.png'].frame,
								}}
								className="w-full"
							/>
						</div>

						<div className="z-[2] flex flex-1 scale-x-[-1] items-center">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['frame-reward.png'].frame,
								}}
								className="w-full"
							/>
						</div>

						<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-[3] aspect-square w-[30%] origin-center">
							<Sprite
								data={{ part: '1', m: SPRITESHEET_DATA.frames['ray-01.png'].frame }}
								className="h-full w-full animate-spin-slow"
							/>
						</div>

						<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-[4] flex origin-center gap-[80px]">
							<motion.div
								variants={itemVariants}
								animate={'visible'}
								initial={'hidden'}
								className="flex min-w-[12cqw] flex-col items-center"
							>
								<img
									id="axie-preview"
									src={`https://axiecdn.axieinfinity.com/axies/${caughtAxie.id}/axie/axie-full-transparent.png`}
									alt={'Axie'}
									className="h-full w-full"
								/>

								<motion.span
									variants={itemTitleVariants}
									initial="hidden"
									animate="visible"
									className="w-full text-center font-extrabold text-[#FFF] text-[2cqw] tracking-wide outline-2-primary-medium"
								>
									Axie #{caughtAxie.id}
								</motion.span>
							</motion.div>
						</div>
					</section>

					<motion.div
						variants={itemTitleVariants}
						initial="hidden"
						animate="visible"
						className="absolute bottom-10 z-[10] flex w-full justify-center"
					>
						<Button color="yellow" onMouseUp={onClose}>
							Close
						</Button>
					</motion.div>
				</div>
			)}
		</>
	)
}
