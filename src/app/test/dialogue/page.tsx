'use client'

import AnimationManager from '@/features/axie/animation-manager'
import { useDialogueStore } from '@/features/dialogue/store'
import OnboardingManager from '@/features/onboarding/onboarding-manager'
import LogoutButton from '@/features/user/logout-button'
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
const Vignette = dynamic(() => import('@/components/vignette'))
const Onboarding = dynamic(() => import('@/scenes/onboarding'))
const DialogueSystem = dynamic(() => import('@/features/dialogue/dialogue-system'))
const OnboardingDialog = dynamic(() => import('@/features/onboarding/onboarding-dialog'))

export default function Page() {
	const ref = useRef<HTMLDivElement>(null)
	const selectedDialogue = useDialogueStore((s) => s.selectedDialogue)
	const stage = useStageStore((s) => s.stage)

	return (
		<>
			<main
				ref={ref}
				className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-slate-200"
			>
				<OnboardingManager />

				<KeyboardControls map={KEYBOARD_MAP}>
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

				{stage === 'onboarding' && selectedDialogue === 'onboarding' && <OnboardingDialog />}

				{/* <Vignette /> */}

				<View index={1} className="absolute h-screen w-screen">
					<Perf />

					{stage === 'home' && <Home />}

					{stage === 'onboarding' && <Onboarding />}
				</View>

				{stage === 'home' && <Avatar />}

				<LogoutButton />

				{/* <BottomDialogue /> */}

				{/* <div className="absolute bottom-0 h-[300px] w-screen bg-gradient-to-b from-[#f6f6f600] to-[#A9BAD2]" /> */}
			</main>
		</>
	)
}
