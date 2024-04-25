'use client'

import AnimationManager from '@/features/axie/animation-manager'
import { KEYBOARD_MAP } from '@/libs/constants'
import { KeyboardControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import * as THREE from 'three'

const Avatar = dynamic(() => import('@/components/avatar'))
const ScreenSizeBreakpoint = dynamic(() => import('@/components/screen-size-breakpoint'))
const ToastManager = dynamic(() => import('@/features/toast/toast-manager'))
const Energy = dynamic(() => import('@/features/energy-system/energy'))
const PokieCoinBalance = dynamic(() => import('@/features/pokie-coin/balance'))
const Backpack = dynamic(() => import('@/features/backpack/ui'))
const BackpackTrigger = dynamic(() => import('@/features/backpack/trigger'))
const ShortcutManager = dynamic(() => import('@/features/shortcut/shortcut-manager'))
const Home = dynamic(() => import('@/scenes/home'))

export default function Page() {
	return (
		<main className="relative flex h-screen w-screen justify-center">
			{/* <div className="absolute top-5 z-[1] flex w-full items-center justify-between px-5">
				<Avatar />

				<div className="flex items-center gap-5">
					<div className="flex h-fit gap-4">
						<Energy />
						<PokieCoinBalance />
					</div>

					<div>
						<BackpackTrigger />
					</div>
				</div>
			</div> */}

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
							position: [0, 20, 40],
						}}
					>
						<Home />
					</Canvas>
				</Suspense>

				<ShortcutManager />
			</KeyboardControls>

			<ToastManager />
			<AnimationManager />

			<Backpack />

			<ScreenSizeBreakpoint />
		</main>
	)
}
