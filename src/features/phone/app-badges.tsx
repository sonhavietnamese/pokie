import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { useGuideLineStore } from '@/features/guide-line/guide-line-store'
import { NPCS } from '@/libs/constants'
import { type Variants, motion } from 'framer-motion'
import React from 'react'
import * as THREE from 'three'
import AppWrapper from './app-wrapper'
import { usePhoneStore } from './phone-store'

const appContainerVariants: Variants = {
	hidden: {
		y: '100%',
		transition: { ease: 'circInOut', duration: 0.3 },
	},
	visible: {
		y: 0,
		transition: { ease: 'circInOut', duration: 0.3 },
	},
}

type AppBadgesProps = {
	isOpen: boolean
}

export default function AppBadges({ isOpen }: AppBadgesProps) {
	const [setIsOpen] = usePhoneStore((s) => [s.setIsOpen])
	const setTarget = useGuideLineStore((s) => s.setTarget)

	const onFind = () => {
		setIsOpen(false)
		setTarget(new THREE.Vector3().fromArray(NPCS.bimy.position))
	}

	return (
		<motion.div
			variants={appContainerVariants}
			initial="hidden"
			animate={isOpen ? 'visible' : 'hidden'}
			exit={'hidden'}
			className="absolute top-0 h-full w-full border-inherit bg-[#ffffff]"
		>
			<AppWrapper>
				<div className="relative flex h-[64px] w-full flex-col items-center justify-center">
					<span className="text-[#A7782D] text-xl">Badges</span>

					<div className="absolute bottom-0 w-[250px]">
						<Sprite
							data={{
								part: '2',
								l: SPRITESHEET_DATA.frames['divider-02-l.png'].frame,
								r: SPRITESHEET_DATA.frames['divider-02-r.png'].frame,
							}}
							className="h-full w-full"
						/>
					</div>

					<button type="button" onClick={onFind} className="absolute right-4 flex w-[36px] items-center justify-center">
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_DATA.frames['frame-btn-circle-02.png'].frame,
							}}
							className="h-full w-full"
						/>

						<div className="absolute w-[20px]">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['icon-magnifying.png'].frame,
								}}
								className="h-full w-full"
							/>
						</div>
					</button>
				</div>

				<div className="grid h-full w-full auto-rows-min grid-cols-3 gap-3 overflow-auto p-3">
					<div className="shine-overlay aspect-square w-full">
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_DATA.frames['icon-badge-03.png'].frame,
							}}
							className="h-full w-full"
						/>

						<div className="shine" />
					</div>
				</div>

				<div className="absolute bottom-1 left-2 z-[3]">
					<span className="text-[#b5a87c] text-sm italic">
						*Challenge Bimy to earn badge! Use Find button to find him.
					</span>
				</div>
			</AppWrapper>
		</motion.div>
	)
}
