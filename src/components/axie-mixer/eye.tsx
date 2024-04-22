import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { type GLTF, SkeletonUtils } from 'three-stdlib'

interface EyeProps {
	variant: string
}

type GLTFResult = GLTF & {
	nodes: {
		SM_Eye_M_1: THREE.SkinnedMesh
		Eyes_M_1_JNT: THREE.Bone
	}
	materials: {
		eye: THREE.MeshStandardMaterial
	}
}

export const Eye = forwardRef<THREE.Group, EyeProps>(({ variant }, ref) => {
	const { scene } = useGLTF(`/glb/${variant}_eye_m_1_idle.glb`) as GLTFResult
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
	const texture = useTexture(`/textures/axie/${variant.split('_')[0]}_eyes_${variant.split('_')[1]}.jpg`)

	texture.flipY = false

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

Eye.displayName = 'Eye'
