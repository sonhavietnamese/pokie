import { Sprite } from '@/components/ui/sprite'
import Vignette from '@/components/vignette'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { useDialogueStore } from '@/features/dialogue/store'
import { cn } from '@/libs/utils'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'
import { useEffect } from 'react'
import { useOnboardingStore } from '../onboarding/onboarding-store'
import { useToastStore } from '../toast/store'
import { useCatchAxieStore } from './catch-axie-store'

const BALLS_COLORS: Record<string, string> = {
	aquatic: '#7AA2E3',
	beast: '#FB6D48',
	plant: '#2C7865',
	reptile: '#912BBC',
	mech: '#E5C3A3',
	bug: '#F3D5A2',
	dawn: '#F9E8A2',
	dusk: '#A2A2A2',
	bird: '#A2E3D8',
}

export default function CatchAxieAim() {
	const selectedBall = 'aquatic'

	const [scope, animate] = useAnimate<HTMLDivElement>()
	const [showDialogue, selectedDialogue, clear] = useDialogueStore((s) => [s.showDialogue, s.selectedDialogue, s.clear])
	const [isOpen, setIsThrew, setOpenUI] = useCatchAxieStore((s) => [s.isOpen, s.setIsThrew, s.setOpenUI])

	const showToast = useToastStore((s) => s.showToast)

	const isFirstTimeCatchAxie = useOnboardingStore((s) => s.isFirstTimeCatchAxie)

	const onHold = () => {
		animate(scope.current, { width: 1200 }, { duration: 1.7, ease: 'linear' }).play()
	}

	const onRelease = () => {
		const width = scope.current.getClientRects()[0].width

		animate(scope.current, { width: 1200 }, { duration: 1.7, ease: 'linear' }).pause()

		if (width - 2 * 2 >= 350 - 30 * 2 && width <= 350) {
			setIsThrew(true)
		} else {
			setIsThrew(false)
			showToast('Missed!')
		}

		const timeout = setTimeout(() => {
			setOpenUI(false)
			clearTimeout(timeout)
		}, 200)
	}

	useEffect(() => {
		if (isFirstTimeCatchAxie && isOpen) {
			showDialogue('first_time_catch_axie', 'bottom')
		}
		if (!isOpen && selectedDialogue === 'first_time_catch_axie') {
			clear()
		}
	}, [isOpen])

	return (
		<>
			<AnimatePresence mode="wait">
				{isOpen && (
					<div className="absolute z-[3] flex h-screen w-screen flex-col items-center justify-center bg-black/10">
						<Vignette />
						<motion.div
							initial={{ scale: 0.5, opacity: 0 }}
							animate={isOpen ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
							exit={{ opacity: 0 }}
							transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.3 }}
							className="relative mb-20 flex w-[450px] items-center justify-center"
						>
							<motion.div
								animate={{
									rotate: 360,
									transition: { ease: 'linear', duration: 15, repeat: Number.POSITIVE_INFINITY },
								}}
								className="h-full w-full"
							>
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames['aim-01.png'].frame,
									}}
									className="w-full"
								/>
							</motion.div>

							<div
								className={cn('absolute aspect-square w-[350px] rounded-full border-[30px] transition-colors')}
								style={{
									// borderColor: BALLS_COLORS[selectedBall],
									borderColor: 'red',
									opacity: 0.7,
								}}
							/>

							<div
								ref={scope}
								className={cn('absolute aspect-square rounded-full border-[2px]')}
								style={{
									borderColor: BALLS_COLORS[selectedBall],
									background: `radial-gradient(circle at center, #00ff0000 50%, ${BALLS_COLORS[selectedBall]} 100%)`,
								}}
							/>
						</motion.div>

						<motion.div
							className="absolute bottom-10 z-[4] flex w-[120px] items-center justify-center outline-none active:outline-none"
							whileTap={{ scale: 0.8 }}
							transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.3 }}
							exit={{ opacity: 0 }}
							onMouseDown={onHold}
							onMouseUp={onRelease}
						>
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['frame-btn-circle-01.png'].frame,
								}}
								className="w-full"
							/>

							<span className="absolute text-[#DECB85]">HODL</span>
						</motion.div>

						<div className="absolute left-32 z-[4] flex h-full w-[150px] items-center overflow-hidden">
							<motion.div
								initial={{ opacity: 0, x: -30 }}
								animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0 }}
								transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.3 }}
								exit={{ opacity: 0 }}
								className="flex h-[60%] w-full overflow-hidden"
							>
								<div className="h-full w-full overflow-auto">
									{Array.from({ length: 9 }).map((_, i) => (
										<div
											// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
											key={i}
											className={cn(
												'group relative flex w-[80px] scale-90 items-center rounded-2xl border-[4px] p-2 transition-transform hover:scale-100',
												i % 2 === 0 ? 'border-white/50 bg-[#FFF0C7]/50' : 'border-white bg-[#FFF0C7]',
											)}
										>
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['icon-ball-aquatic.png'].frame,
												}}
												className="w-full"
											/>

											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['icon-arrow-01.png'].frame,
												}}
												className="-right-8 absolute hidden w-5 animate-shake-horizontal group-hover:block"
											/>
										</div>
									))}
								</div>
							</motion.div>
						</div>
					</div>
				)}
			</AnimatePresence>
		</>
	)
}
