import { useGLTF } from '@react-three/drei'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		Cylinder: THREE.Mesh
	}
	materials: {
		sky: THREE.MeshStandardMaterial
	}
}

export function BattleBackdrop(props: JSX.IntrinsicElements['group']) {
	const { nodes, materials } = useGLTF('/models/battle-map.glb') as GLTFResult
	return (
		<group {...props} dispose={null} scale={8.6} rotation={[0, -1.59, 0]} position={[0, 4.62, 0]}>
			<mesh geometry={nodes.Cylinder.geometry} material={materials.sky} scale={[3.366, 1.063, 3.366]} />
		</group>
	)
}

useGLTF.preload('/models/battle-map.glb')
