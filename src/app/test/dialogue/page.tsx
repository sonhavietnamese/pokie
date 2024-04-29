'use client'

import { useDialogueStore } from '@/components/dialogue/store'
import ScreenSizeBreakpoint from '@/components/screen-size-breakpoint'
import { Button } from '@/components/ui/button'
import AnimationManager from '@/features/axie/animation-manager'
import { KEYBOARD_MAP } from '@/libs/constants'
import { KeyboardControls, View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Perf } from 'r3f-perf'
import { type MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const Home = dynamic(() => import('@/scenes/home'), { ssr: false })
const Avatar = dynamic(() => import('@/components/avatar'), { ssr: false })
const BottomDialogue = dynamic(() => import('@/components/dialogue/bottom-dialogue'), { ssr: false })
const Vignette = dynamic(() => import('@/components/vignette'))
const Onboarding = dynamic(() => import('@/scenes/onboarding'))
const DialogueSystem = dynamic(() => import('@/components/dialogue/dialogue-system'))

export default function Page() {
	const ref = useRef<HTMLDivElement>(null)
	const selectedDialogue = useDialogueStore((s) => s.selectedDialogue)

	return (
		<main
			ref={ref}
			className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-slate-200"
		>
			<AnimationManager />

			{selectedDialogue && <DialogueSystem />}

			<Vignette />

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

			<View index={1} className="absolute h-screen w-screen">
				<Perf />
				<Onboarding />
				{/* <Home /> */}
			</View>

			{/* <Avatar /> */}
			{/* <BottomDialogue /> */}

			{/* <ScreenSizeBreakpoint /> */}

			<div className="absolute bottom-0 h-[300px] w-screen bg-gradient-to-b from-[#f6f6f600] to-[#A9BAD2]" />
		</main>
	)
}
