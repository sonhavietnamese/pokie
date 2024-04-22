import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { type GLTF, SkeletonUtils } from 'three-stdlib'

interface MouthProps {
	variant: string
}

type GLTFResult = GLTF & {
	nodes: {
		SM_Mouth_1: THREE.SkinnedMesh
		Mouth_1_JNT: THREE.Bone
	}
	materials: {
		lambert1: THREE.MeshStandardMaterial
	}
}

export const Mouth = forwardRef<THREE.Group, MouthProps>(({ variant }, ref) => {
	const { scene } = useGLTF(`/glb/${variant}_mouth_1_idle.glb`) as GLTFResult

	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

	const texture = useTexture(`/textures/axie/${variant.split('_')[0]}_mouth_${variant.split('_')[1]}.jpg`)

	texture.wrapS = THREE.RepeatWrapping
	texture.repeat.x = -1
	texture.center = new THREE.Vector2(0.5, 0.5)
	texture.rotation = Math.PI

	useEffect(() => {
		clone.traverse((o: THREE.Object3D) => {
			if (o instanceof THREE.Mesh) {
				o.material = new THREE.MeshStandardMaterial({ map: texture })
			}
		})
	}, [])

	return (
		<group ref={ref} dispose={null}>
			<primitive object={clone} />
		</group>
	)
})

Mouth.displayName = 'Mouth'
