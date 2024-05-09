import { useGLTF } from '@react-three/drei'
import { CylinderCollider, RigidBody } from '@react-three/rapier'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		Tree055: THREE.Mesh
		Tree099: THREE.Mesh
	}
	materials: {
		Base_Material: THREE.MeshStandardMaterial
	}
}

export function OldTree() {
	const { nodes, materials } = useGLTF('/models/map/map-old-tree.glb') as GLTFResult

	return (
		<RigidBody
			colliders={false}
			position={[76.482, 0.26, 41.491]}
			scale={4.686}
			rotation={[2.998, -1.401, 2.945]}
			type="fixed"
		>
			<CylinderCollider args={[2.1, 1.1]} />
			<mesh geometry={nodes.Tree055.geometry} material={materials.Base_Material} />
		</RigidBody>
	)
}
