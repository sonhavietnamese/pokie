import { SapidaeModel } from '@/components/sapidae/model'
import useTextureFactory from '@/components/sapidae/use-texture-factory'
// import { useBackpackStore } from '@/components/backpack/store'
// import { useCustomAvatarStore } from '@/components/custom-avatar/store'
// import { useButterflyStore } from '@/stores/butterfly'
// import { useMultiplayerStore } from '@/stores/multiplayer'
// import { useGame } from '@/stores/use-game'
import { Billboard, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useGraph } from '@react-three/fiber'
import { type JSX, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'
import { SkeletonUtils } from 'three-stdlib'
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
	animations: string[]
}

const v = new THREE.Vector3(1, -1.45 + window.innerHeight / 7000, 0)
const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, -0.4, 0))

export function Sapidae(props: JSX.IntrinsicElements['group']) {
	const group = useRef<THREE.Group>(null)
	const notationRef = useRef<THREE.Mesh>(null)

	const exclamation = useTexture('/exclamation.png')
	const happy = useTexture('/emote-happy.png')
	const angry = useTexture('/emote-angry.png')
	const angryMark = useTexture('/angry.png')
	const bubble = useTexture('/bubble.png')

	const textureAspect = exclamation.image.width / exclamation.image.height
	const bubbleAspect = bubble.image.width / bubble.image.height

	const { animations, scene } = useGLTF('/models/character.glb') as GLTFResult
	const { actions, mixer } = useAnimations(animations, group)
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
	const { nodes } = useGraph(clone)

	const { skins } = useTextureFactory()

	const texture = skins.DEFAULT

	const curAnimation = useCharacterControl((state) => state.curAnimation)
	const resetAnimation = useCharacterControl((state) => state.reset)
	const initializeAnimationSet = useCharacterControl((state) => state.initializeAnimationSet)

	useEffect(() => {
		initializeAnimationSet(ANIMATION_SET)
	}, [])

	const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

	useEffect(() => {
		animations[1].tracks.splice(3, 3)
		animations[1].tracks.splice(6, 3)

		const handleMouseMove = (e) => {
			if (nodes.mixamorigNeck) {
				mousePosition.current = { x: e.clientX, y: e.clientY }
			}
		}

		actions['idle-00'].play()

		document.addEventListener('mousemove', handleMouseMove, false)

		return () => {
			document.removeEventListener('mousemove', handleMouseMove, false)
			actions['idle-00'].stop()
		}
	}, [animations])

	useFrame(() => {
		const degrees = getMouseDegrees(mousePosition.current.x, mousePosition.current.y, 30)

		nodes.mixamorigNeck.rotation.y = THREE.MathUtils.degToRad(degrees.x)
		nodes.mixamorigNeck.rotation.x = THREE.MathUtils.degToRad(degrees.y)
	})

	return (
		<group ref={group} {...props} dispose={null}>
			<group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.009}>
				<primitive object={nodes.mixamorigHips} />

				<skinnedMesh
					name="Sapidae_male_arms2_new001"
					geometry={nodes.Sapidae_male_arms2_new003.geometry}
					skeleton={nodes.Sapidae_male_arms2_new003.skeleton}
				>
					{/* <meshStandardMaterial ref={eyeMaterialRef} map={textureEyeOpen} roughness={1} /> */}
				</skinnedMesh>

				<skinnedMesh
					name="Sapidae_male_arms2_new001"
					geometry={nodes.Sapidae_male_arms2_new001.geometry}
					skeleton={nodes.Sapidae_male_arms2_new001.skeleton}
				>
					<meshToonMaterial map={texture} />
				</skinnedMesh>
			</group>
		</group>
	)
}

function getMouseDegrees(x: number, y: number, degreeLimit: number) {
	let dx = 0
	let dy = 0
	let xdiff = 0
	let xPercentage = 0
	let ydiff = 0
	let yPercentage = 0

	const w = { x: window.innerWidth, y: window.innerHeight }

	if (x <= w.x / 2) {
		xdiff = w.x / 2 - x
		xPercentage = (xdiff / (w.x / 2)) * 100
		dx = ((degreeLimit * xPercentage) / 100) * -1
	}

	if (x >= w.x / 2) {
		xdiff = x - w.x / 2
		xPercentage = (xdiff / (w.x / 2)) * 100
		dx = (degreeLimit * xPercentage) / 100
	}

	if (y <= w.y / 2) {
		ydiff = w.y / 2 - y
		yPercentage = (ydiff / (w.y / 2)) * 100
		dy = ((degreeLimit * 0.5 * yPercentage) / 100) * -1
	}

	if (y >= w.y / 2) {
		ydiff = y - w.y / 2
		yPercentage = (ydiff / (w.y / 2)) * 100
		dy = (degreeLimit * yPercentage) / 100
	}

	return { x: dx, y: dy }
}
