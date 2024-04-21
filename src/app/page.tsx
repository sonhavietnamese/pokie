'use client'

import AnimationManager from '@/features/axie/animation-manager'
import Home from '@/scenes/home'
import { Loader } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

export default function Page() {
	return (
		<main className="h-screen w-screen">
			<Canvas>
				<Home />
			</Canvas>
			<AnimationManager />
			<Loader />
		</main>
	)
}
