'use client'

import AxieManager from '@/features/axie/axie-manager'
import { Ground } from '@/features/environment/ground'
import { Sapidae } from '@/features/movement/character'
import CharacterController from '@/features/movement/character-controller'
import { Environment, OrbitControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'

export default function Home() {
	return (
		<>
			<OrbitControls />

			<directionalLight
				castShadow
				rotation={[42.2, -30.65, -24]}
				position={[0, 3, 0]}
				intensity={1}
				color={'#FFE396'}
				shadow-mapSize={[1024, 1024]}
				shadow-camera-near={1}
				shadow-camera-far={50}
				shadow-camera-top={50}
				shadow-camera-right={50}
				shadow-camera-bottom={-50}
				shadow-camera-left={-50}
			/>
			<ambientLight intensity={1.5} />

			<Environment
				background
				blur={0.05}
				files={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']}
				path="/sky/"
			/>

			<Physics debug={true}>
				<Ground />

				{/* <group position={[1, 2, 0]}>
					<AxieManager />
				</group> */}

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
		</>
	)
}
