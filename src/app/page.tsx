'use client'

import Avatar from '@/components/avatar'
import AnimationManager from '@/features/axie/animation-manager'
import Energy from '@/features/energy-system/energy'
import PokieCoinBalance from '@/features/pokie-coin/balance'
import { KEYBOARD_MAP } from '@/libs/constants'
import Home from '@/scenes/home'
import { KeyboardControls, Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'

export default function Page() {
	return (
		<main className="h-screen w-screen relative">
			<div className="absolute top-5 z-[1] flex justify-between w-full items-center px-5">
				<Avatar />

				<div className="flex gap-5 h-fit">
					<Energy />
					<PokieCoinBalance />
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
			</KeyboardControls>
			<AnimationManager />
			<Loader />
		</main>
	)
}
