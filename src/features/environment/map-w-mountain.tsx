import { useGLTF } from '@react-three/drei'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		Cylinder021: THREE.Mesh
		Cylinder021_1: THREE.Mesh
	}
	materials: {
		Base_Material: THREE.MeshStandardMaterial
		'1x1Gradient.022': THREE.MeshStandardMaterial
	}
}

export function WMountain() {
	const { nodes, materials } = useGLTF('/models/map/map-w-mountain.glb') as GLTFResult

	return (
		<group position={[51.072, -0.366, 73.973]} rotation={[0.23, 1.54, -0.217]} scale={2.055} dispose={null}>
			<mesh geometry={nodes.Cylinder021.geometry} material={materials.Base_Material} />
			<mesh geometry={nodes.Cylinder021_1.geometry} material={materials['1x1Gradient.022']} />
		</group>
	)
}
