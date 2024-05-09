import { useGLTF, useTexture } from '@react-three/drei'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		Tree073: THREE.Mesh
	}
	materials: {
		Base_Material: THREE.MeshStandardMaterial
	}
}

export function Tree02(props: JSX.IntrinsicElements['group']) {
	const { nodes } = useGLTF('/models/map/map-tree-02.glb') as GLTFResult
	const texture = useTexture('/textures/CT_Pallete.png')

	texture.flipY = false

	return (
		<group {...props} dispose={null}>
			<mesh
				geometry={nodes.Tree073.geometry}
				position={[39.2976, -0.016, -33.16622]}
				rotation={[0.014, 0, 0.025]}
				scale={2.438}
			>
				<meshStandardMaterial map={texture} />
			</mesh>
		</group>
	)
}
