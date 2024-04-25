import { useGLTF, useTexture } from '@react-three/drei'
import { forwardRef, useDeferredValue, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'

interface EarProps {
	variant: string
	position: string
}

export const Ear = forwardRef<THREE.Group, EarProps>(({ variant, position }, ref) => {
	const deferredModel = useDeferredValue(`/glb/${variant}_ear_${position}_1_idle.glb`)
	const deferredTexture = useDeferredValue(`/textures/axie/${variant.split('_')[0]}_ear_${variant.split('_')[1]}.jpg`)
	const { scene } = useGLTF(deferredModel)
	const texture = useTexture(deferredTexture)
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])

	const diffuse = useTexture('/fourTone.jpg')

	diffuse.minFilter = diffuse.magFilter = THREE.NearestFilter

	texture.flipY = false

	useEffect(() => {
		clone.traverse((o) => {
			if (!o.userData.isEdited && (variant.includes('06') || variant.includes('12')) && variant !== 'mystic') {
				if (o.name === 'Ear_L_1_JNT') {
					o.position.set(0, 0, 0)
					o.rotateX(0.4)
					o.rotateZ(0.08)
				}

				if (o.name === 'Ear_R_1_JNT') {
					o.position.set(0, 0, 0)
					o.rotateX(0.4)
					o.rotateZ(0.08)
				}

				o.userData.isEdited = true
			}

			if (o instanceof THREE.Mesh) {
				// o.material = new THREE.MeshStandardMaterial({ map: texture })
				o.material = new THREE.MeshToonMaterial({ map: texture, gradientMap: diffuse })
			}
		})
	}, [])

	return (
		<group ref={ref} dispose={null}>
			<primitive object={clone} />
		</group>
	)
})

Ear.displayName = 'Ear'
