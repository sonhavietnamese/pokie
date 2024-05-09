import { useAnimations, useGLTF } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import type * as THREE from 'three'
import type { GLTF } from 'three-stdlib'
import { SapidaeModel } from './sapidae-model'
import type { SapidaeAnimation } from './type'

type GLTFResult = GLTF & {
	nodes: {
		Sapidae_male_arms2_new001: THREE.SkinnedMesh
		Sapidae_male_arms2_new002: THREE.SkinnedMesh
		Sapidae_male_arms2_new003: THREE.SkinnedMesh
		Sapidae_male_arms2_new004: THREE.SkinnedMesh
		mixamorigLeftHand: THREE.Bone
		mixamorigHips: THREE.Bone
	}
	materials: {
		lambert11: THREE.MeshStandardMaterial
	}
}

type SapidaeProps = {
	animation: SapidaeAnimation
	skin?: string
} & JSX.IntrinsicElements['group']

export default function Sapidae({ skin = 'default', animation, ...props }: SapidaeProps) {
	const group = useRef<THREE.Group>(null)

	const { animations } = useGLTF('/models/character.glb') as GLTFResult
	const { actions } = useAnimations(animations, group)

	useEffect(() => {
		actions[animation]?.reset().fadeIn(0.2).play()

		return () => {
			actions[animation]?.fadeOut(0.2)
		}
	}, [animation])

	return <SapidaeModel skin={skin} ref={group} {...props} />
}
