'use client'

import AxieManager from '@/features/axie/axie-manager'
import Local from '@/features/movement/local'
import { useLoadingAssets } from '@/hooks/use-assets'
import { NPCS } from '@/libs/constants'
import { Environment } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { Perf } from 'r3f-perf'

const Bimy = dynamic(() => import('@/features/npc/bimy'))
const PokiedexRay = dynamic(() => import('@/features/pokiedex/pokiedex-ray'))
const Chest = dynamic(() => import('@/components/chest/chest'))
const ShootBall = dynamic(() => import('@/features/catch-axie/shoot-ball'))
const Butterflies = dynamic(() => import('@/features/environment/butterfly/butterflies'))
const GuideLineManager = dynamic(() => import('@/features/guide-line/guide-line-manager'))
const Ground = dynamic(() => import('@/features/environment/ground'))
const Ooap = dynamic(() => import('@/features/blacksmith/ooap'))

export default function Home() {
	const searchParams = useSearchParams()
	const debug = searchParams.get('debug')

	const loading = useLoadingAssets()

	return (
		<>
			{Boolean(debug) && <Perf />}
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

			<GuideLineManager />

			<Physics debug={Boolean(debug)} timeStep="vary" paused={loading}>
				<Bimy position={NPCS.bimy.position as [number, number, number]} />
				<Ooap position={NPCS.ooap.position as [number, number, number]} />

				<Butterflies />
				<ShootBall />

				<Chest position={[-5, 2, 3]} />

				<PokiedexRay />

				<Ground />

				{/* <AxieAutoMove sprintMult={2.2} position={[5, 3, 0]} axieId="523127" /> */}

				<AxieManager />

				<Local />
				{/* <CharacterController
					isTalkingToNpc={!!isTalking}
					camMaxDis={-10}
					camInitDis={isCustomAvatarOpen || isPhoneOpen ? -5 : isPokiedexOpen || isCatchAxieOpen ? -2 : -10}
					camInitDir={{ x: 0, y: Math.PI, z: 0 }}
					springK={2}
					dampingC={0.2}
					position={[0, 5, 0]}
					autoBalanceSpringK={1.2}
					autoBalanceDampingC={0.04}
					autoBalanceSpringOnY={0.7}
					autoBalanceDampingOnY={0.05}
				>
					<Sapidae position={[0, -0.9, 0]} />
				</CharacterController> */}
			</Physics>
		</>
	)
}
