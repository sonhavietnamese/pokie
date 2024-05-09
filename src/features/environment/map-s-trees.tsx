import { useGLTF, useTexture } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		Tree048: THREE.Mesh
	}
	materials: {
		Tree048: THREE.MeshStandardMaterial
	}
}

export function STrees() {
	const { nodes } = useGLTF('/models/map/map-s-trees.glb') as GLTFResult
	const texture = useTexture('/textures/CT_Pallete.png')

	texture.flipY = false

	return (
		<>
			<RigidBody position={[-75.754, 2.311, -5.373]} type="fixed">
				<CylinderCollider args={[4, 12]} sensor />
			</RigidBody>
			<mesh
				geometry={nodes.Tree048.geometry}
				position={[-75.754, 2.311, -5.373]}
				rotation={[0.008, 0, 0.114]}
				scale={1.677}
			>
				<meshStandardMaterial map={texture} />
			</mesh>
		</>
	)
}
