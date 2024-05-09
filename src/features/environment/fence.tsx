import { useGLTF } from '@react-three/drei'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		fence10003: THREE.Mesh
	}
	materials: {
		fence: THREE.MeshStandardMaterial
	}
}

export function Fence() {
	const { nodes, materials } = useGLTF('/models/map/map-fence.glb') as GLTFResult

	return (
		<mesh
			geometry={nodes.fence10003.geometry}
			material={materials.fence}
			position={[26.9, -0.37, 80.682]}
			rotation={[3.129, -0.363, 3.117]}
		/>
	)
}
