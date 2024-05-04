'use client'

import { useCatchAxieStore } from '@/features/catch-axie/catch-axie-store'
import { useCustomAvatarStore } from '@/features/custom-avatar/custom-avatar-store'
import { usePhoneStore } from '@/features/phone/phone-store'
import { usePokiedexStore } from '@/features/pokiedex/pokiedex-store'
import { NPCS } from '@/libs/constants'
import { Environment } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { Perf } from 'r3f-perf'
import { Suspense } from 'react'

const AxieAutoMove = dynamic(() => import('@/features/axie/axie-auto-move'))
const Bimy = dynamic(() => import('@/features/npc/bimy'))
const PokiedexRay = dynamic(() => import('@/features/pokiedex/pokiedex-ray'))
const CharacterController = dynamic(() => import('@/features/movement/character-controller'))
const Chest = dynamic(() => import('@/components/chest/chest'))
const ShootBall = dynamic(() => import('@/features/catch-axie/shoot-ball'))
const Butterflies = dynamic(() => import('@/features/environment/butterfly/butterflies'))
const GuideLineManager = dynamic(() => import('@/features/guide-line/guide-line-manager'))
const Sapidae = dynamic(() => import('@/features/movement/character'))
const Ground = dynamic(() => import('@/features/environment/ground'))

export default function Home() {
	const isPokiedexOpen = usePokiedexStore((s) => s.isOpen)
	const isCatchAxieOpen = useCatchAxieStore((s) => s.isOpen)
	const isCustomAvatarOpen = useCustomAvatarStore((s) => s.isOpenUI)
	const isPhoneOpen = usePhoneStore((s) => s.isOpen)

	const searchParams = useSearchParams()
	const debug = searchParams.get('debug')

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

			<Suspense>
				<Physics debug={Boolean(debug)} timeStep="vary">
					<Bimy position={NPCS.bano.position as [number, number, number]} />

					<Butterflies />
					<ShootBall />

					<Chest position={[-5, 2, 3]} />

					<PokiedexRay />

					<Ground />

					<AxieAutoMove position={[5, 3, 0]} axieId="123" />
					<AxieAutoMove position={[15, 3, 0]} axieId="11429880" />

					<CharacterController
						followLight
						camMaxDis={-10}
						camInitDis={isCustomAvatarOpen || isPhoneOpen ? -5 : isPokiedexOpen || isCatchAxieOpen ? -2 : -10}
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
