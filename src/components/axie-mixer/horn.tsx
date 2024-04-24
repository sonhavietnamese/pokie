import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef, useDeferredValue, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

interface HornProps {
	variant: string
	position: string
}

export const Horn = forwardRef<THREE.Group, HornProps>(({ variant, position }, ref) => {
	const deferredModel = useDeferredValue(`/glb/${variant}_horn_${position}_1_idle.glb`)
	const deferredTexture = useDeferredValue(`/textures/axie/${variant.split('_')[0]}_horn_${variant.split('_')[1]}.jpg`)

	const { scene } = useGLTF(deferredModel)
	const texture = useTexture(deferredTexture)

	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

	texture.flipY = false

	useEffect(() => {
		clone.traverse((o) => {
			if (!o.userData.isEdited && (variant.includes('06') || variant.includes('12')) && variant !== 'mystic') {
				if (o.name === 'Horn_T_1_JNT') {
					o.position.set(0, 0.012, -0.015)
				}

				if (o.name === 'Horn_L_1_JNT') {
					o.position.set(0, -0, 0)
				}

				if (o.name === 'Horn_R_1_JNT') {
					o.position.set(0, -0, -0)
				}

				o.userData.isEdited = true
			}

			if (o instanceof THREE.Mesh) {
				o.material = new THREE.MeshStandardMaterial({ map: texture })
			}
		})
	}, [variant, position, clone])

	return (
		<group ref={ref} dispose={null}>
			<primitive object={clone} />
		</group>
	)
})

Horn.displayName = 'Horn'
