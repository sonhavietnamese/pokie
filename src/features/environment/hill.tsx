import { useGLTF } from '@react-three/drei'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		hill004: THREE.Mesh
	}
	materials: {
		'Material.001': THREE.MeshStandardMaterial
	}
}

export function Hill(props: JSX.IntrinsicElements['group']) {
	const { nodes } = useGLTF('/models/map/map-hill.glb') as GLTFResult

	return (
		<group {...props} dispose={null}>
			<mesh
				receiveShadow
				geometry={nodes.hill004.geometry}
				material={nodes.hill004.material}
				position={[-7.183, -3.249, 134.141]}
				rotation={[3.038, 1.243, -2.99]}
				scale={2.728}
			/>
		</group>
	)
}
