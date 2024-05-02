'use client'

import MovementInstructions from '@/components/movement-instructions'
import Aim from '@/features/catch-axie/aim'
import { KEYBOARD_MAP } from '@/libs/constants'
import { useStageStore } from '@/stores/stage'
import { KeyboardControls, View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { type MutableRefObject, useRef } from 'react'
import * as THREE from 'three'

const Home = dynamic(() => import('@/scenes/home'), { ssr: false })
const Avatar = dynamic(() => import('@/components/avatar'), { ssr: false })
const Vignette = dynamic(() => import('@/components/vignette'), { ssr: false })
const Onboarding = dynamic(() => import('@/scenes/onboarding'), { ssr: false })
const LogoutButton = dynamic(() => import('@/features/user/logout-button'), { ssr: false })
const ToastManager = dynamic(() => import('@/features/toast/toast-manager'), { ssr: false })
const RonManager = dynamic(() => import('@/features/ron-manager'))
const OnboardingManager = dynamic(() => import('@/features/onboarding/onboarding-manager'), { ssr: false })
const DialogueSystem = dynamic(() => import('@/features/dialogue/dialogue-system'), { ssr: false })
const AnimationManager = dynamic(() => import('@/features/axie/animation-manager'), { ssr: false })
const ShortcutManager = dynamic(() => import('@/features/shortcut/shortcut-manager'), { ssr: false })
const Pokiedex = dynamic(() => import('@/features/pokiedex/pokiedex'), { ssr: false })

export default function Page() {
	const ref = useRef<HTMLDivElement>(null)
	const stage = useStageStore((s) => s.stage)

	return (
		<>
			<main ref={ref} className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
				<OnboardingManager />
				<AnimationManager />

				{/* <Vignette /> */}
				<ToastManager />
				<DialogueSystem />
				<RonManager />

				<Aim />

				<KeyboardControls map={KEYBOARD_MAP}>
					<ShortcutManager />

					<Pokiedex>
						<Canvas
							className="absolute inset-0 z-0 h-screen w-screen"
							dpr={0.75}
							shadows={{
								enabled: true,
								type: THREE.PCFShadowMap,
							}}
							gl={{
								outputColorSpace: THREE.SRGBColorSpace,
								toneMapping: THREE.ACESFilmicToneMapping,
							}}
							camera={{
								fov: 40,
								near: 0.1,
								far: 200,
							}}
							eventSource={ref as MutableRefObject<HTMLElement>}
						>
							<View.Port />
						</Canvas>

						<View index={1} className="absolute inset-0 z-0 h-screen w-screen">
							{stage === 'home' && <Home />}
							{stage === 'onboarding' && <Onboarding />}
						</View>

						{stage === 'home' && (
							<>
								<Avatar />
								<LogoutButton />
								<MovementInstructions />
							</>
						)}

						{stage === 'onboarding' && (
							<div className="absolute bottom-0 h-[300px] w-screen bg-gradient-to-b from-[#f6f6f600] to-[#A9BAD2]" />
						)}
					</Pokiedex>
				</KeyboardControls>
			</main>
		</>
	)
}
