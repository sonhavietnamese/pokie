'use client'

import { Button } from '@/components/ui/button'
import { Sprite } from '@/components/ui/sprite'
import Vignette from '@/components/vignette'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { APPS } from '@/libs/constants'
import { AnimatePresence, type Variants, motion, useAnimate, useAnimation } from 'framer-motion'
import { useEffect, useState } from 'react'
import AppBadges from './app-badges'
import AppIcon from './app-icon'
import { usePhoneStore } from './phone-store'
import type { App } from './type'

const overlayVariants: Variants = {
	hidden: {
		opacity: 0,
		transition: {
			delay: 0.4,
		},
	},
	visible: {
		opacity: 1,
	},
}

const phoneContainerVariants: Variants = {
	hidden: {
		opacity: 0,
		transition: {
			ease: [1, -0.235, 0.525, 0.905],
			duration: 0.7,
		},
		transform: 'translate3d(0, 110%, 0) rotate(75deg)',
	},
	visible: {
		opacity: 1,
		rotate: 0,
		transition: {
			ease: [0.245, 1.315, 0.25, 0.97],
			duration: 0.92,
			delay: 0.2,
		},
		transform: 'rotateZ(0deg)',
	},
}

export default function PhoneCase() {
	const [hand, setHand] = useState(0)

	const [isOpen, setIsOpen, selectedApp, setSelectedApp, openingApp, setOpeningApp] = usePhoneStore((s) => [
		s.isOpen,
		s.setIsOpen,
		s.selectedApp,
		s.setSelectedApp,
		s.openingApp,
		s.setOpeningApp,
	])

	const [scope, animate] = useAnimate()
	const controls = useAnimation()

	useEffect(() => {
		if (isOpen) {
			controls.start('visible')
		}

		if (!isOpen) {
			setSelectedApp(undefined)
			setHand(0)
		}
	}, [isOpen])

	useEffect(() => {
		const doAnim = async () => {
			if (selectedApp) {
				const app = document.getElementById(`app-${selectedApp.id}`)

				if (app) {
					await animate(
						scope.current,
						{
							x: app.getBoundingClientRect().x + 20,
							y: app.getBoundingClientRect().y + 20,
							scale: 1.8,
							opacity: 1,
							top: 0,
							left: 0,
						},
						{
							ease: 'circInOut',
							duration: 0.5,
						},
					).then(() => {
						setHand(1)
					})

					await new Promise<void>((resolve) =>
						setTimeout(() => {
							setHand(0)
							resolve()
						}, 200),
					)

					await animate(
						scope.current,
						{
							x: app.getBoundingClientRect().x + 20,
							y: window.innerHeight,
							scale: 1.8,
						},
						{
							ease: 'circInOut',
							delay: 0.3,
						},
					)

					if (selectedApp?.type === 'external') {
						window.open(selectedApp.url, '_blank')
						setOpeningApp(undefined)
						setSelectedApp(undefined)
					} else {
						setOpeningApp(selectedApp)
					}
				}
			}
		}

		doAnim()
	}, [selectedApp])

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="absolute inset-0 z-[5] flex items-center justify-center">
					<Vignette />
					<motion.div
						initial={'hidden'}
						animate={isOpen ? 'visible' : 'hidden'}
						exit={'hidden'}
						variants={overlayVariants}
						className="h-screen w-screen bg-[#d942426e]"
					/>
					<div className="absolute z-[5] flex h-screen w-screen items-center justify-center rounded-lg">
						<motion.div
							variants={phoneContainerVariants}
							initial="hidden"
							animate={isOpen ? 'visible' : 'hidden'}
							exit={'hidden'}
							className="relative aspect-[9/13] h-[85%] origin-[bottom_left]"
						>
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['ex-hand.png'].frame,
								}}
								className="-bottom-32 -left-32 absolute z-[-1] h-[200px] w-[400px]"
							/>

							<img src="/phone-frame.png" alt="" className="absolute z-[3] h-full w-full" />

							<div className="absolute top-0 right-0 z-[6]">
								<Button onClick={() => setIsOpen(false)}>X</Button>
							</div>

							<div className="absolute inset-0 z-[3] h-full w-full p-10 pt-16">
								<motion.div
									initial="hidden"
									className="relative grid h-full w-full auto-rows-min grid-cols-4 gap-3 overflow-hidden rounded-xl bg-[#FFF6D5] p-5"
									animate={controls}
									variants={{}}
								>
									{APPS.map((app, i) => (
										<AppIcon key={app.id} app={app} index={i} onMouseUp={() => setSelectedApp(app)} />
									))}

									<AnimatePresence>
										{openingApp && openingApp.type === 'internal' && <AppBadges isOpen={openingApp.id === 'badges'} />}
									</AnimatePresence>
								</motion.div>
							</div>
						</motion.div>
					</div>

					<div
						ref={scope}
						className="-bottom-[500px] pointer-events-none absolute z-[5] w-[300px] origin-top-left scale-[1.8] opacity-0"
					>
						{hand === 0 ? (
							<div className="h-full w-full">
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames['ex-hand-02.png'].frame,
									}}
									className="w-full"
								/>
							</div>
						) : (
							<div className="h-full w-full">
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames['ex-hand-03.png'].frame,
									}}
									className="w-full"
								/>
							</div>
						)}
					</div>
				</div>
			)}
		</AnimatePresence>
	)
}
