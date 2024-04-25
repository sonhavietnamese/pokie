'use client'

import AnimationManager from '@/features/axie/animation-manager'
import { Ground } from '@/features/environment/ground'
import { Sapidae } from '@/features/movement/character'
import CharacterController from '@/features/movement/character-controller'
import { KEYBOARD_MAP } from '@/libs/constants'
import { Box, Environment, KeyboardControls, ScreenSizer, ScreenSpace } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import dynamic from 'next/dynamic'
import { Suspense, useRef } from 'react'
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
		<main className="relative flex h-screen w-screen flex-col items-center justify-center bg-slate-200">
			<AnimationManager />

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
						<group name="avatar">
							{/* <ScreenSpace
								depth={1} // Distance from camera
							>
								<Box>I'm in screen space</Box>
							</ScreenSpace>Z */}

							{/* <ScreenSpace depth={1}>
								<mesh>
									<circleGeometry />
									<meshNormalMaterial />
								</mesh>
							</ScreenSpace> */}
						</group>

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
						<ambientLight intensity={2} />

						<Environment
							background
							blur={0.05}
							files={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']}
							path="/sky/"
						/>

						<Physics debug={true}>
							<Ground />

							<CharacterController
								followLight
								camInitDir={{ x: 0, y: Math.PI, z: 0 }}
								springK={2}
								dampingC={0.2}
								autoBalanceSpringK={1.2}
								autoBalanceDampingC={0.04}
								autoBalanceSpringOnY={0.7}
								autoBalanceDampingOnY={0.05}
							>
								<Sapidae position={[0, -0.9, 0]} />
							</CharacterController>
						</Physics>
					</Canvas>
				</Suspense>

				<ShortcutManager />
			</KeyboardControls>
		</main>
	)
}

const n = new THREE.Vector3() // normal - for re-use
const cpp = new THREE.Vector3() //coplanar point - for re-use
const plane = new THREE.Plane()

const P = () => {
	const pRef = useRef()

	useFrame(({ camera }) => {
		n.subVectors(camera.position, pRef.current.position).normalize()
		cpp.copy(pRef.current.position)
		pRef.setFromNormalAndCoplanarPoint(n, cpp)
	})

	return (
		<mesh ref={pRef}>
			<planeGeometry />
			<meshBasicMaterial />
		</mesh>
	)
}
