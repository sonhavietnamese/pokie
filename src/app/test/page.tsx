'use client'

import AnimationManager from '@/features/axie/animation-manager'
import { useDialogueStore } from '@/features/dialogue/store'
import QuestManager from '@/features/quest/quest-manager'
import { KEYBOARD_MAP } from '@/libs/constants'
import { useStageStore } from '@/stores/stage'
import { KeyboardControls, View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Perf } from 'r3f-perf'
import { type MutableRefObject, useRef } from 'react'
import * as THREE from 'three'

const Home = dynamic(() => import('@/scenes/home'), { ssr: false })
const Avatar = dynamic(() => import('@/components/avatar'), { ssr: false })
const Vignette = dynamic(() => import('@/components/vignette'), { ssr: false })
const Onboarding = dynamic(() => import('@/scenes/onboarding'), { ssr: false })
const LogoutButton = dynamic(() => import('@/features/user/logout-button'), { ssr: false })
const ToastManager = dynamic(() => import('@/features/toast/toast-manager'), { ssr: false })
const RonManager = dynamic(() => import('@/features/ron-manager'), { ssr: false })
const OnboardingManager = dynamic(() => import('@/features/onboarding/onboarding-manager'), { ssr: false })

export default function Page() {
	const ref = useRef<HTMLDivElement>(null)
	const selectedDialogue = useDialogueStore((s) => s.selectedDialogue)
	const stage = useStageStore((s) => s.stage)

	return (
		<>
			<main ref={ref} className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
				<QuestManager />
				<OnboardingManager />
				<ToastManager />
				{/* <RonManager /> */}

				{/* <KeyboardControls map={KEYBOARD_MAP}>
					<Canvas
						className="absolute z-0 h-screen w-screen"
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
				</KeyboardControls>
				<AnimationManager />

				{/* <Vignette /> */}

				{/* <View index={1} className="absolute z-0 h-screen w-screen">
					<Perf />
					{stage === 'home' && <Home />}
					{stage === 'onboarding' && <Onboarding />}
				</View>

				{stage === 'home' && <Avatar />}

				<LogoutButton />  */}
			</main>
		</>
	)
}
