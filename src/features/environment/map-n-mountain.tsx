import { useGLTF } from '@react-three/drei'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		Rock01037: THREE.Mesh
	}
	materials: {
		'1x1Gradient.022': THREE.MeshStandardMaterial
	}
}

export function NMountain() {
	const { nodes, materials } = useGLTF('/models/map/map-n-mountain.glb') as GLTFResult

	return (
		<mesh
			geometry={nodes.Rock01037.geometry}
			material={materials['1x1Gradient.022']}
			position={[87.103, -27.48, -28.689]}
			rotation={[-0.061, -1.047, -0.097]}
			scale={[8.791, 15.941, 11.634]}
		/>
	)
}
