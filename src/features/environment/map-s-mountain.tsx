import { useGLTF, useTexture } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		Plane004: THREE.Mesh
		Rock01050: THREE.Mesh
	}
	materials: {
		'Material.001': THREE.MeshStandardMaterial
		'1x1Gradient.022': THREE.MeshStandardMaterial
	}
}

export function SMountain(props: JSX.IntrinsicElements['group']) {
	const { nodes, materials } = useGLTF('/models/map/map-s-mountain.glb') as GLTFResult
	const texture = useTexture('/textures/CT_Pallete.png')

	texture.flipY = false

	return (
		<group {...props} dispose={null}>
			<RigidBody colliders="trimesh" type="fixed">
				<mesh geometry={nodes.Plane004.geometry} position={[0, 0.041, 0]}>
					<meshStandardMaterial transparent opacity={0} />
				</mesh>
			</RigidBody>
			<mesh
				material={materials['1x1Gradient.022']}
				geometry={nodes.Rock01050.geometry}
				position={[-61.943, 0.686, 52.351]}
				rotation={[0.043, 0.746, -0.025]}
				scale={[4.112, 6.311, 4.115]}
			/>
		</group>
	)
}
