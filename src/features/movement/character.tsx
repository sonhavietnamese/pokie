import { SapidaeModel } from '@/components/sapidae/sapidae-model'
// import { useBackpackStore } from '@/components/backpack/store'
// import { useCustomAvatarStore } from '@/components/custom-avatar/store'
// import { useButterflyStore } from '@/stores/butterfly'
// import { useMultiplayerStore } from '@/stores/multiplayer'
// import { useGame } from '@/stores/use-game'
import { useAnimations, useGLTF } from '@react-three/drei'
import { sample } from 'lodash-es'
import { type JSX, useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'
import { ANIMATION_SET, useCharacterControl } from './use-character-control'

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

export default function Sapidae(props: JSX.IntrinsicElements['group']) {
	const group = useRef<THREE.Group>(null)

	const { animations } = useGLTF('/models/character.glb') as GLTFResult
	const { actions, mixer } = useAnimations(animations, group)

	const curAnimation = useCharacterControl((state) => state.curAnimation)
	const resetAnimation = useCharacterControl((state) => state.reset)
	const initializeAnimationSet = useCharacterControl((state) => state.initializeAnimationSet)

	useEffect(() => {
		initializeAnimationSet(ANIMATION_SET)
	}, [])

	useEffect(() => {
		const a = curAnimation ? curAnimation : ANIMATION_SET.idle

		let customAnim = a

		if (a === 'idle') {
			customAnim = sample(['idle-01', 'idle-02', 'idle-00'])
		} else if (a === 'throw') {
			customAnim = sample(['throw-00'])
		}

		const action = actions[customAnim]

		if (!action) return

		if (
			a === ANIMATION_SET.jump ||
			a === ANIMATION_SET.pet ||
			a === ANIMATION_SET.swing ||
			a === ANIMATION_SET.action1
		) {
			action.reset().fadeIn(0.2).setLoop(THREE.LoopOnce, 1).play()
			action.clampWhenFinished = true
		} else {
			action.reset().fadeIn(0.2).play()
		}

		const reset = () => {
			resetAnimation(false)
		}

		mixer.addEventListener('finished', reset)

		return () => {
			action.fadeOut(0.2)

			mixer.removeEventListener('finished', reset)
		}
	}, [curAnimation])

	return <SapidaeModel ref={group} {...props} />
}
