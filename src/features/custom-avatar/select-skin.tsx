import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import { useCharacterStore } from '@/stores/character'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useCustomAvatarStore } from './custom-avatar-store'

export default function CustomAvatarSelectSkin() {
	const [isOpenUI, setOpenUI] = useCustomAvatarStore((s) => [s.isOpenUI, s.setOpenUI])
	const setCanControl = useCharacterStore((s) => s.setCanControl)

	useEffect(() => {
		setCanControl(!isOpenUI)
	}, [isOpenUI])

	return (
		<AnimatePresence>
			{isOpenUI && (
				<div className="absolute bottom-10 z-[4] flex h-[120px] w-screen items-end justify-center overflow-hidden">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isOpenUI ? { opacity: 1, y: 0 } : { opacity: 0 }}
						transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.3 }}
						exit={{ opacity: 0 }}
						className="flex"
					>
						{Array.from({ length: 5 }).map((_, i) => (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={i}
								className={cn(
									'group relative flex w-[80px] scale-90 justify-center rounded-2xl border-[4px] p-2 transition-transform hover:scale-100',
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
								<div className="-top-8 absolute hidden animate-shake group-hover:block">
									<Sprite
										data={{
											part: '1',
											m: SPRITESHEET_DATA.frames['icon-arrow-01.png'].frame,
										}}
										className="-rotate-90 w-5"
									/>
								</div>
							</div>
						))}

						<div className="ml-1 h-[30px] w-[30px]" onMouseUp={() => setOpenUI(false)}>
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['btn-close-01.png'].frame,
								}}
								className="w-full"
							/>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}
