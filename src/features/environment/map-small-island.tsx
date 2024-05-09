import { useGLTF } from '@react-three/drei'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		Cube054: THREE.Mesh
		Cube054_1: THREE.Mesh
	}
	materials: {
		Base_Material: THREE.MeshStandardMaterial
		'1x1Gradient.022': THREE.MeshStandardMaterial
	}
}

export function SmallIsland() {
	const { nodes, materials } = useGLTF('/models/map/map-small-island.glb') as GLTFResult

	return (
		<group position={[-56.412, 6.983, -40.644]} rotation={[-0.117, -0.945, -0.096]} scale={2.491}>
			<mesh geometry={nodes.Cube054.geometry} material={materials.Base_Material} />
			<mesh geometry={nodes.Cube054_1.geometry} material={materials['1x1Gradient.022']} />
		</group>
	)
}
