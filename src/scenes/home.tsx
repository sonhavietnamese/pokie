'use client'

import { AxieMixer } from '@/components/axie-mixer'
import { SapidaeRaw } from '@/components/sapidae/sapidae'
import { Environment, OrbitControls } from '@react-three/drei'
import React from 'react'

export default function Home() {
	return (
		<>
			<OrbitControls />

			<directionalLight position={[0, 10, 0]} intensity={1} />

			<ambientLight intensity={0.5} />

			<Environment
				background
				blur={0.05}
				files={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']}
				path="/sky/"
			/>

			<AxieMixer axieId="123" animation="idle" />

			<SapidaeRaw />
		</>
	)
}
