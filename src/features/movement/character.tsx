// import { useBackpackStore } from '@/components/backpack/store'
// import { useCustomAvatarStore } from '@/components/custom-avatar/store'
// import { useButterflyStore } from '@/stores/butterfly'
// import { useMultiplayerStore } from '@/stores/multiplayer'
// import { useGame } from '@/stores/use-game'
import useTextureFactory from '@/components/sapidae/use-texture-factory'
import { useAnimations, useGLTF } from '@react-three/drei'
import { useFrame, useGraph } from '@react-three/fiber'
import {
	type CollisionPayload,
	CuboidCollider,
	type RapierRigidBody,
	RigidBody,
} from '@react-three/rapier'
import { type JSX, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { type GLTF, SkeletonUtils } from 'three-stdlib'
import { ANIMATION_SET, useCharacterControl } from './use-character-control'
// import useTextureFactory from './use-texture-factory'
// import { useCharacterStore } from '@/stores/character'

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
	animations: string[]
}

export function Sapidae(props: JSX.IntrinsicElements['group']) {
	const group = useRef<THREE.Group>(null)
	const eyeMaterialRef = useRef<THREE.MeshStandardMaterial>(null)
	const netRef = useRef<RapierRigidBody>(null)
	const { skins } = useTextureFactory()
	// const { selectedSkin } = useCustomAvatarStore()
	// const usingItem = useBackpackStore((s) => s.usingItem)

	const { scene, animations } = useGLTF('/models/character.glb') as GLTFResult
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
	const { nodes } = useGraph(clone) as GLTFResult
	const { actions, mixer } = useAnimations(animations, group)

	// const room = useMultiplayerStore((state) => state.room)

	// const texture = skins[selectedSkin.toUpperCase()]
	const texture = skins.DEFAULT
	const textureEyeClose = skins.EYE_CLOSE
	const textureEyeOpen = skins.EYE_OPEN

	const curAnimation = useCharacterControl((state) => state.curAnimation)
	const resetAnimation = useCharacterControl((state) => state.reset)
	const initializeAnimationSet = useCharacterControl(
		(state) => state.initializeAnimationSet,
	)

	// const removeButterfly = useButterflyStore((state) => state.removeButterfly)

	// const userId = useCharacterStore((state) => state.userId)

	const [enableNet, setEnableNet] = useState(false)

	useEffect(() => {
		initializeAnimationSet(ANIMATION_SET)
	}, [])

	useEffect(() => {
		const a = curAnimation ? curAnimation : ANIMATION_SET.idle

		const customAnim = a === 'idle' ? 'idle-00' : a
		const action = actions[customAnim]

		if (!action) return

		// room?.send('change-animation', { animation: customAnim })

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

	useEffect(() => {
		if (!eyeMaterialRef.current) return

		const blink = () => {
			if (!eyeMaterialRef.current) return

			eyeMaterialRef.current.map = textureEyeClose
			setTimeout(() => {
				if (!eyeMaterialRef.current) return

				eyeMaterialRef.current.map = textureEyeOpen
			}, 120)
		}

		const blinkInterval = setInterval(blink, 2500)

		return () => {
			clearInterval(blinkInterval)
		}
	}, [])

	const timeout = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		if (curAnimation === ANIMATION_SET.swing) {
			timeout.current = setTimeout(() => {
				setEnableNet(true)
			}, 800)
		} else {
			if (timeout.current) {
				clearTimeout(timeout.current)
			}
			setEnableNet(false)
		}
	}, [curAnimation])

	useFrame(() => {
		const pos = new THREE.Vector3()
		const quat = new THREE.Quaternion()

		if (curAnimation === ANIMATION_SET.swing && enableNet) {
			netRef.current?.setEnabled(true)
			nodes.mixamorigLeftHand.children[1].getWorldPosition(pos)
			nodes.mixamorigLeftHand.children[1].getWorldQuaternion(quat)

			netRef.current?.setTranslation(pos, false)
			netRef.current?.setRotation(quat, false)
		} else {
			netRef.current?.setEnabled(false)
		}
	})

	const onNetCollision = async (e: CollisionPayload) => {
		// if (e.colliderObject?.name.includes('bug') && usingItem === 'net') {
		// 	removeButterfly(e.colliderObject.name.split('-')[1])
		// 	await fetch('https://pokemon-psi-two.vercel.app/api/stuffs', {
		// 		method: 'POST',
		// 		body: JSON.stringify({
		// 			userId,
		// 			stuffId: 5,
		// 			action: 'increase',
		// 			amount: 1,
		// 		}),
		// 	})
		// }
	}

	return (
		<group ref={group} {...props} dispose={null} scale={0.009}>
			<group rotation={[Math.PI / 2, 0, 0]}>
				<primitive object={nodes.mixamorigHips} />
				<skinnedMesh
					geometry={nodes.Sapidae_male_arms2_new001.geometry}
					material={nodes.Sapidae_male_arms2_new001.material}
					skeleton={nodes.Sapidae_male_arms2_new001.skeleton}
				>
					<meshStandardMaterial map={texture} roughness={1} />
				</skinnedMesh>

				<RigidBody ref={netRef} type="dynamic" scale={80} name="local-tool">
					<CuboidCollider
						sensor
						args={[3, 0.8, 0.8]}
						mass={0}
						onIntersectionEnter={onNetCollision}
					/>
				</RigidBody>

				<skinnedMesh
					geometry={nodes.Sapidae_male_arms2_new003.geometry}
					skeleton={nodes.Sapidae_male_arms2_new003.skeleton}
				>
					<meshStandardMaterial
						ref={eyeMaterialRef}
						map={textureEyeOpen}
						roughness={1}
					/>
				</skinnedMesh>

				{/* {usingItem &&
					{
						net: (
							<skinnedMesh
								geometry={nodes.Sapidae_male_arms2_new002.geometry}
								skeleton={nodes.Sapidae_male_arms2_new002.skeleton}
							>
								<meshStandardMaterial color={'pink'} roughness={1} />
							</skinnedMesh>
						),
						hammer: (
							<skinnedMesh
								name="Sapidae_male_arms2_new004"
								geometry={nodes.Sapidae_male_arms2_new004.geometry}
								skeleton={nodes.Sapidae_male_arms2_new004.skeleton}
							>
								<meshStandardMaterial color={'grey'} />
							</skinnedMesh>
						),
					}[usingItem]} */}
			</group>
		</group>
	)
}
