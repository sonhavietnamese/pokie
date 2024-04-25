'use client'

import MeshFresnelMaterial from '@/components/fresnel'
import ScreenSizeBreakpoint from '@/components/screen-size-breakpoint'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import AnimationManager from '@/features/axie/animation-manager'
import Axie from '@/features/axie/axie'
import { Sapidae } from '@/features/movement/character'
import PhoneScreen from '@/features/phone/phone-screen'
import { usePhoneStore } from '@/features/phone/store'
import { Environment, OrbitControls, useScroll, useTexture } from '@react-three/drei'
import { Canvas, extend, useFrame } from '@react-three/fiber'
import { useWalletgo } from '@roninnetwork/walletgo'
import { useControls } from 'leva'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function Page() {
	const [loading, setLoading] = useState(true)

	const { walletProvider } = useWalletgo()

	const { setIsOpen } = usePhoneStore()

	useEffect(() => {
		setLoading(true)

		if (walletProvider) {
			setLoading(false)
		}
	}, [walletProvider])

	return (
		<main className="relative flex h-screen w-screen flex-col items-center justify-center bg-slate-200">
			<AnimationManager />

			{/* <Canvas>
				<directionalLight
					castShadow
					rotation={[42.2, -30.65, -24]}
					position={[2, 3, 0]}
					intensity={2}
					color={'#FFE396'}
					shadow-mapSize={[1024, 1024]}
					shadow-camera-near={1}
					shadow-camera-far={50}
					shadow-camera-top={50}
					shadow-camera-right={50}
					shadow-camera-bottom={-50}
					shadow-camera-left={-50}
				/>

				<OrbitControls />
				<ambientLight intensity={2} />

				<Environment
					background
					blur={0.05}
					files={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']}
					path="/sky/"
				/>

				<Banner />

				<axesHelper />

				<Axie />
				<Sapidae />
			</Canvas> */}

			{/* <motion.div whileHover={{ scale: 2 }}>
				<Button color="yellow" className="items-center justify-center w-[100px]  h-[50px]">
					<span>Click me</span>
				</Button>
			</motion.div> */}

			<Button onClick={() => setIsOpen(true)}>
				<span className="leading-none">asdasd</span>
			</Button>

			<PhoneScreen />

			{/* <Dialog open>
				<DialogContent className="w-[300px] h-[300px]">
					<div className="bg-slate-400">
						<span>asdasd</span>
					</div>
				</DialogContent>
			</Dialog> */}

			<ScreenSizeBreakpoint />

			{/* <Dialog /> */}

			{/* <Avatar /> */}

			{/* <Energy /> */}
			{/* {!loading ? <PokieCoinBalance /> : <div>Loading...</div>}


			<Login /> */}
		</main>
	)
}
