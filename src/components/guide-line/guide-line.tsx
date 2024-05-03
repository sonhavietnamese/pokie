import { useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export default function GuideLine() {
	const ref = useRef<THREE.Group>(null)
	const arrowMaterialRef = useRef<THREE.MeshBasicMaterial>(null)
	const meshRef = useRef<THREE.Mesh>(null)
	const texture = useTexture('/textures/icon-arrow-01.png')

	texture.wrapS = texture.wrapT = THREE.RepeatWrapping

	const distance = useRef(0)
	const midPoint = useRef(new THREE.Vector3())
	const targetPosition = useRef(new THREE.Vector3())
	const characterPosition = useRef(new THREE.Vector3())

	useFrame((state, delta) => {
		if (!meshRef.current || !arrowMaterialRef.current || !ref.current) return

		state.scene.getObjectByName('character')?.getWorldPosition(characterPosition.current)
		midPoint.current.copy(targetPosition.current).add(characterPosition.current).divideScalar(2)
		ref.current?.position.copy(midPoint.current.setY(characterPosition.current.y - 0.3))
		ref.current.lookAt(targetPosition.current.setY(characterPosition.current.y - 0.3))

		distance.current = targetPosition.current.distanceTo(characterPosition.current)

		meshRef.current.scale.set(distance.current, 1, 0.3)
		texture.repeat.x = distance.current * 3.5

		if (arrowMaterialRef.current?.map) arrowMaterialRef.current.map.offset.x += delta * 4
	})

	return (
		<group ref={ref}>
			<mesh ref={meshRef} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
				<planeGeometry args={[1, 0.3]} />
				<meshBasicMaterial
					side={THREE.DoubleSide}
					ref={arrowMaterialRef}
					alphaTest={0.5}
					map={texture}
					map-repeat={[50, 1]}
					toneMapped={false}
				/>
			</mesh>
		</group>
	)
}
