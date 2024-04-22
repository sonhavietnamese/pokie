'use client'

import AnimationManager from '@/features/axie/animation-manager'
import { KEYBOARD_MAP } from '@/libs/constants'
import Home from '@/scenes/home'
import { KeyboardControls, Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import * as THREE from 'three'

export default function Page() {
	return (
		<main className="h-screen w-screen">
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
