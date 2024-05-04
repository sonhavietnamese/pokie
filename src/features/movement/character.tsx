import { SapidaeModel } from '@/components/sapidae/sapidae-model'
import type { SapidaeGLTFResult } from '@/components/sapidae/type'
import { getMouseDegrees } from '@/libs/utils'
// import { useBackpackStore } from '@/components/backpack/store'
// import { useCustomAvatarStore } from '@/components/custom-avatar/store'
// import { useButterflyStore } from '@/stores/butterfly'
// import { useMultiplayerStore } from '@/stores/multiplayer'
// import { useGame } from '@/stores/use-game'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { sample } from 'lodash-es'
import { type JSX, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { ANIMATION_SET, useCharacterControl } from './use-character-control'

export default function Sapidae(props: JSX.IntrinsicElements['group']) {
	const group = useRef<THREE.Group>(null)

	const { animations, nodes } = useGLTF('/models/character.glb') as SapidaeGLTFResult
	const { actions, mixer } = useAnimations(animations, group)

	const curAnimation = useCharacterControl((state) => state.curAnimation)
	const resetAnimation = useCharacterControl((state) => state.reset)
	const initializeAnimationSet = useCharacterControl((state) => state.initializeAnimationSet)

	animations[4].tracks.splice(3, 3).splice(6, 3)

	useEffect(() => {
		initializeAnimationSet(ANIMATION_SET)
	}, [])

	useEffect(() => {
		const a = curAnimation ? curAnimation : ANIMATION_SET.idle

		let customAnim = a

		if (a === 'idle') {
			// customAnim = sample(['idle-01', 'idle-02', 'idle-00'])
			customAnim = sample(['idle-01'])
		} else if (a === 'throw') {
			customAnim = sample(['throw-00'])
		}

		const action = actions[customAnim]

		// const handleMouseMove = (e) => {
		// 	if (nodes.mixamorigNeck) {
		// 		mousePosition.current = { x: e.clientX, y: e.clientY }
		// 	}
		// }

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

		// document.addEventListener('mousemove', handleMouseMove, false)

		return () => {
			action.fadeOut(0.2)

			mixer.removeEventListener('finished', reset)
			// document.removeEventListener('mousemove', handleMouseMove, false)
		}
	}, [curAnimation])

	// useFrame(() => {
	// 	const degrees = getMouseDegrees(mousePosition.current.x, mousePosition.current.y, 30)

	// 	nodes.mixamorigNeck.rotation.y = THREE.MathUtils.degToRad(degrees.x)
	// 	nodes.mixamorigNeck.rotation.x = THREE.MathUtils.degToRad(degrees.y)
	// })

	return <SapidaeModel isLookAtMouse={curAnimation === ANIMATION_SET.idle} ref={group} {...props} />
}
