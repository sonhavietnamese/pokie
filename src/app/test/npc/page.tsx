'use client'

import { Button } from '@/components/ui/button'
import AnimationManager from '@/features/axie/animation-manager'
import DialogueSystem from '@/features/dialogue/dialogue-system'
import { useDialogueStore } from '@/features/dialogue/store'
import { KEYBOARD_MAP } from '@/libs/constants'
import Home from '@/scenes/home'
import { KeyboardControls, View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'
import * as THREE from 'three'

const ScreenSizeBreakpoint = dynamic(() => import('@/components/screen-size-breakpoint'))
const ShortcutManager = dynamic(() => import('@/features/shortcut/shortcut-manager'))

export default function Page() {
	const showDialogue = useDialogueStore((s) => s.showDialogue)

	const onTrigger = () => {
		// showDialogue('test', 'top')
		showDialogue('test', 'bottom')
	}

	return (
		<main className="relative flex h-screen w-screen justify-center">
			<div className="absolute top-5 left-5 z-10" onMouseUp={onTrigger}>
				<Button>Trigger</Button>
			</div>

			<DialogueSystem />

			<KeyboardControls map={KEYBOARD_MAP}>
				<Suspense>
					<Canvas
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
							position: [0, 2, 5],
						}}
					>
						<View.Port />
					</Canvas>
				</Suspense>

				<ShortcutManager />
			</KeyboardControls>

			<View index={1} className="absolute z-0 h-screen w-screen">
				<Perf />

				<Home />
			</View>

			<AnimationManager />

			<ScreenSizeBreakpoint />
		</main>
	)
}
