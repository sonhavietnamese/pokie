import { useGLTF, useTexture } from '@react-three/drei'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		Tree029: THREE.Mesh
	}
	materials: {
		'Material.001': THREE.MeshStandardMaterial
	}
}

export function ETrees() {
	const { nodes } = useGLTF('/models/map/map-e-trees.glb') as GLTFResult
	const texture = useTexture('/textures/CT_Pallete.png')

	texture.flipY = false

	return (
		<mesh
			geometry={nodes.Tree029.geometry}
			position={[-5.714, 1.767, -66.017]}
			rotation={[-0.028, 0, 0.004]}
			scale={2.055}
		>
			<meshStandardMaterial map={texture} />
		</mesh>
	)
}
