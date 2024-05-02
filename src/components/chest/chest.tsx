// import { usePokieCoinBalance, usePokieCoinContract } from '@/components/pokie-coin'
// import { useInteraction } from '@/hooks/use-interaction'
import { useDialogueStore } from '@/features/dialogue/store'
import { useOnboardingStore } from '@/features/onboarding/onboarding-store'
import { useTipStore } from '@/features/tip/store'
import { useCharacterStore } from '@/stores/character'
import { useGLTF, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import {
	type CollisionPayload,
	CuboidCollider,
	CylinderCollider,
	RigidBody,
	type RigidBodyProps,
} from '@react-three/rapier'
import { useWalletgo } from '@roninnetwork/walletgo'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
	nodes: {
		chest_gold: THREE.Mesh
		chest_gold_lid: THREE.Mesh
	}
	materials: {
		'texture.005': THREE.MeshStandardMaterial
	}
}

export default function Chest(props: RigidBodyProps) {
	const lidRef = useRef<THREE.Mesh>(null)
	// const { setInteractionTarget, setIsInteracting } = useInteraction()
	// const { setBalance } = usePokieCoinBalance()
	// const { getBalances } = usePokieCoinContract()
	// const { mint } = usePokieCoinContract()
	const { walletProvider } = useWalletgo()

	const showTip = useTipStore((s) => s.showTip)
	const [isFirstTimeChest, setIsFirstTimeChest] = useOnboardingStore((s) => [s.isFirstTimeChest, s.setIsFirstTimeChest])
	const [showDialogue] = useDialogueStore((s) => [s.showDialogue])
	const [setCanControl] = useCharacterStore((s) => [s.setCanControl])
	const chestRef = useRef<THREE.Group>(null)

	const collectPressed = useKeyboardControls((state) => state.action)

	const isOpen = useRef(false)
	const isOpening = useRef(false)
	const isEnter = useRef(false)

	const { nodes, materials } = useGLTF('/models/chest.glb') as GLTFResult

	useEffect(() => {
		const handle = async () => {
			if (collectPressed && !isOpen.current && isEnter.current) {
				console.log('collectPressed')
				isOpening.current = true
				// SOUNDS.OPENING_CHEST.play()
				// await mint(20)

				await new Promise((resolve) => setTimeout(resolve, 5000))

				isOpening.current = false
				isOpen.current = true

				// SOUNDS.OPENING_CHEST.stop()
				// SOUNDS.OPENED_CHEST.play()

				// wait for 5 seconds before getting the balance
				await new Promise((resolve) => setTimeout(resolve, 5000))

				// const balance = await getBalances()
				// setBalance(round(Number(balance) / 1e18, 3))
			}
		}

		handle()
	}, [collectPressed])

	useFrame(({ clock }) => {
		if (!lidRef.current) return
		if (!chestRef.current) return

		// scale the chest to make it bouncing every frame
		isOpening.current && chestRef.current.scale.setScalar(0.7 + Math.sin(performance.now() / 100) * 0.025)

		// lerping the rotation of the lid
		lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, isOpen.current ? -Math.PI / 4 : 0, 0.1)
	})

	const onEnter = (e: CollisionPayload) => {
		if (e.colliderObject?.name === 'character-body') {
			if (isFirstTimeChest) {
				showDialogue('first_time_chest', 'bottom')
			}

			if (isOpen.current) return
			isEnter.current = true
			showTip('Press F to open the chest')
		}
	}

	return (
		<RigidBody type="fixed" {...props} colliders={false}>
			<CylinderCollider
				args={[2, 2]}
				sensor
				onIntersectionEnter={onEnter}
				onIntersectionExit={() => {
					isEnter.current = false
				}}
			/>

			<CuboidCollider args={[0.7, 0.9, 0.5]} />

			<group dispose={null} scale={0.7} ref={chestRef}>
				<mesh geometry={nodes.chest_gold.geometry}>
					<meshStandardMaterial map={materials['texture.005'].map} roughness={1} />
				</mesh>

				<mesh
					castShadow
					ref={lidRef}
					geometry={nodes.chest_gold_lid.geometry}
					rotation={[0, 0, 0]}
					position={[0, 0.5, -0.565]}
				>
					<meshStandardMaterial map={materials['texture.005'].map} roughness={1} />
				</mesh>
			</group>
		</RigidBody>
	)
}
