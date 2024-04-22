import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { type GLTF, SkeletonUtils } from 'three-stdlib'

interface TailProps {
	variant: string
}

type GLTFResult = GLTF & {
	nodes: {
		SM_Tail_M_1: THREE.SkinnedMesh
		SM_Tail_M_1_JNT: THREE.Bone
	}
	materials: {
		eye: THREE.MeshStandardMaterial
	}
}

export const Tail = forwardRef<THREE.Group, TailProps>(({ variant }, ref) => {
	const { scene } = useGLTF(`/glb/${variant}_tail_m_1_idle.glb`) as GLTFResult
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

	const texture = useTexture(`/textures/axie/${variant.split('_')[0]}_tail_${variant.split('_')[1]}.jpg`)

	texture.flipY = false

	useEffect(() => {
		clone.traverse((o) => {
			if (!o.userData.isEdited && (variant.includes('06') || variant.includes('12')) && variant !== 'mystic') {
				if (o.name === 'Tail_M_1_JNT') {
					o.position.setZ(0.03)
					o.position.setY(0.06)
					o.position.setX(0)
				}

				o.userData.isEdited = true
			}

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

Tail.displayName = 'Tail'
