'use client'

import { Billboard, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import React from 'react'
import { useRef } from 'react'
import * as THREE from 'three'

type BackdropProps = {
	repeat?: number
} & JSX.IntrinsicElements['mesh']

export default function Backdrop({ repeat, ...props }: BackdropProps) {
	const ref = useRef<THREE.Mesh>(null)

	const backdrop = useTexture('/backdrop-02.png')

	backdrop.wrapS = backdrop.wrapT = THREE.RepeatWrapping
	backdrop.repeat.set(repeat ?? 80, repeat ?? 80)

	useFrame((_, delta) => {
		if (!ref.current) return

		if (ref.current.material instanceof THREE.MeshBasicMaterial) {
			if (!ref.current.material.map) return

			ref.current.material.map.offset.x += delta / 2
			ref.current.material.map.offset.y -= delta / 2
		}
	})

	return (
		<Billboard>
			<mesh ref={ref} {...props}>
				<planeGeometry args={[50, 50]} />
				<meshBasicMaterial map={backdrop} />
			</mesh>
		</Billboard>
	)
}
