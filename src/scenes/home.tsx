'use client'

import AxieManager from '@/features/axie/axie-manager'
import { Fence } from '@/features/environment/fence'
import { ETrees } from '@/features/environment/map-e-trees'
import { NMountain } from '@/features/environment/map-n-mountain'
import { RiverTrees } from '@/features/environment/map-river-trees'
import { SMountain } from '@/features/environment/map-s-mountain'
import { STrees } from '@/features/environment/map-s-trees'
import { SmallIsland } from '@/features/environment/map-small-island'
import { WMountain } from '@/features/environment/map-w-mountain'
import { OldTree } from '@/features/environment/old-tree'
import { Tree02 } from '@/features/environment/tree-02'
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

			<Fence />
			<WMountain />
			<NMountain />
			<SmallIsland />
			<ETrees />
			<Tree02 />
			<Physics debug={Boolean(debug)} timeStep="vary" paused={loading}>
				<STrees />
				<SMountain />
				<RiverTrees />
				<OldTree />
				<Bimy position={NPCS.bimy.position as [number, number, number]} />
				<Ooap position={NPCS.ooap.position as [number, number, number]} />

				<Butterflies />
				<ShootBall />

				{/* <Chest position={[-5, 2, 3]} /> */}

				<PokiedexRay />

				<Ground />

				<AxieManager />

				<Local />
			</Physics>
		</>
	)
}
