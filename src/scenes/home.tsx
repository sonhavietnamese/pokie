'use client'

import { Ground } from '@/features/environment/ground'
import { Sapidae } from '@/features/movement/character'
import { usePokiedexStore } from '@/features/pokiedex/pokiedex-store'
import { Environment } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import dynamic from 'next/dynamic'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'

const AxieAutoMove = dynamic(() => import('@/features/axie/axie-auto-move'))
const Bano = dynamic(() => import('@/app/test/npc/bano'))
const PokiedexRay = dynamic(() => import('@/features/pokiedex/pokiedex-ray'))
const CharacterController = dynamic(() => import('@/features/movement/character-controller'))

export default function Home() {
	const isPokiedexOpen = usePokiedexStore((s) => s.isOpen)

	return (
		<>
			<Perf />

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

			<Suspense>
				<Physics
					debug={true}
					timeStep="vary"
					// updateLoop="independent"
				>
					<Bano position={[1, 1.8, 0]} />

					<PokiedexRay />

					<Ground />

					<AxieAutoMove position={[-1, 3, 0]} axieId="123" />
					<AxieAutoMove position={[2, 3, 0]} axieId="11429880" />

					<CharacterController
						followLight
						camMaxDis={-10}
						camInitDis={isPokiedexOpen ? -2 : -8}
						camInitDir={{ x: 0, y: Math.PI, z: 0 }}
						springK={2}
						dampingC={0.2}
						position={[2, 5, 3]}
						autoBalanceSpringK={1.2}
						autoBalanceDampingC={0.04}
						autoBalanceSpringOnY={0.7}
						autoBalanceDampingOnY={0.05}
					>
						<Sapidae position={[0, -0.9, 0]} />
					</CharacterController>
				</Physics>
			</Suspense>
		</>
	)
}
