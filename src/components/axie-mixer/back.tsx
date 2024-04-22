import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

interface BackProps {
	variant: string
	position: string
}

export const Back = forwardRef<THREE.Group, BackProps>(({ variant, position }, ref) => {
	const { scene } = useGLTF(`/glb/${variant}_back_${position}_1_idle.glb`)
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

	const texture = useTexture(`/textures/axie/${variant.split('_')[0]}_back_${variant.split('_')[1]}.jpg`)

	texture.flipY = false

	useEffect(() => {
		clone.traverse((o) => {
			if (!o.userData.isEdited && (variant.includes('06') || variant.includes('12')) && variant !== 'mystic') {
				if (o.name === 'Back_M_JNT') o.name = 'Back_M_1_JNT'
				if (o.name === 'Back_M_1_JNT') {
					o.position.set(0, 0.012, -0.015)
				}

				if (o.name === 'Back_L_1_JNT') {
					o.position.set(0, 0, 0)
				}

				if (o.name === 'Back_R_1_JNT') {
					o.position.set(0, -0, -0)
				}

				o.userData.isEdited = true
			}

			if (o instanceof THREE.Mesh) {
				o.material = new THREE.MeshStandardMaterial({ map: texture })
			}
		})
	}, [variant, position])

	return (
		<group ref={ref} dispose={null}>
			<primitive object={clone} />
		</group>
	)
})

Back.displayName = 'Back'
