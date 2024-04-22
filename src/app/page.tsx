'use client'

import ScreenSizeBreakpoint from '@/components/screen-size-breakpoint'
import { KEYBOARD_MAP } from '@/libs/constants'
import Home from '@/scenes/home'
import { KeyboardControls, Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import * as THREE from 'three'

import AnimationManager from '@/features/axie/animation-manager'
// import BackpackTrigger from '@/features/backpack/trigger'
// import Backpack from '@/features/backpack/ui'
// import ToastManager from '@/features/toast/toast-manager'

const Avatar = dynamic(() => import('@/components/avatar'))
const ToastManager = dynamic(() => import('@/features/toast/toast-manager'))
const Energy = dynamic(() => import('@/features/energy-system/energy'))
const PokieCoinBalance = dynamic(() => import('@/features/pokie-coin/balance'))
const Backpack = dynamic(() => import('@/features/backpack/ui'))
const BackpackTrigger = dynamic(() => import('@/features/backpack/trigger'))
const ShortcutManager = dynamic(() => import('@/features/shortcut/shortcut-manager'))

export default function Page() {
	return (
		<main className="relative flex h-screen w-screen justify-center">
			<div className="absolute top-5 z-[1] flex w-full items-center justify-between px-5">
				<Avatar />

				<div className="flex items-center gap-5">
					<div className="flex gap-4 h-fit">
						<Energy />
						<PokieCoinBalance />
					</div>

					<div>
						<BackpackTrigger />
					</div>
				</div>
			</div>

			<KeyboardControls map={KEYBOARD_MAP}>
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

				<Loader />
				<ShortcutManager />
			</KeyboardControls>

			<ToastManager />
			<AnimationManager />

			<Backpack />

			<ScreenSizeBreakpoint />
		</main>
	)
}
