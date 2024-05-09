import { useGLTF, useTexture } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		Tree023: THREE.Mesh
	}
	materials: {
		// biome-ignore lint/complexity/useLiteralKeys: <explanation>
		['Material.001']: THREE.MeshStandardMaterial
	}
}

export function RiverTrees() {
	const { nodes } = useGLTF('/models/map/map-river-trees.glb') as GLTFResult
	const texture = useTexture('/textures/CT_Pallete.png')

	texture.flipY = false

	return (
		<>
			<RigidBody position={[12.074, 0.305, -28.32]} type="fixed">
				<CylinderCollider args={[4, 3]} sensor />
			</RigidBody>
			<mesh
				geometry={nodes.Tree023.geometry}
				material={nodes.Tree023.material}
				position={[12.562, 0.305, -22.297]}
				rotation={[-0.014, -0.545, -0.16]}
				scale={2.055}
			>
				<meshStandardMaterial map={texture} />
			</mesh>
		</>
	)
}
