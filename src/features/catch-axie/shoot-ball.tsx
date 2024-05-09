import { useCharacterControl } from '@/features/movement/use-character-control'
import { useThree } from '@react-three/fiber'
import { type CollisionPayload, type RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useWalletgo } from '@roninnetwork/walletgo'
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useNotificationStore } from '../notification/notification-store'
import { useToastStore } from '../toast/store'
import { BALLS_COLORS } from './catch-axie-aim'
import { useCatchAxieStore } from './catch-axie-store'
import useCatchAxie from './use-catch-axie'

export default function ShootBall() {
	const [cubeMesh, setCubeMesh] = useState<ReactNode[]>([])
	const cubeRef = useRef<RapierRigidBody>(null)

	const currentBall = useRef<THREE.Mesh>(null)

	const throwAnimation = useCharacterControl((s) => s.throw)

	const [isThrew, setIsThrew, selectedBall, setCaughtAxie] = useCatchAxieStore((state) => [
		state.isThrew,
		state.setIsThrew,
		state.selectedBall,
		state.setCaughtAxie,
	])
	const { capture } = useCatchAxie()
	const showNotification = useNotificationStore((s) => s.showNotification)
	const showToast = useToastStore((s) => s.showToast)

	const scene = useThree((s) => s.scene)

	const position = useMemo(() => new THREE.Vector3(), [])
	const direction = useMemo(() => new THREE.Vector3(), [])

	const { account } = useWalletgo()

	const clickToCreateBox = () => {
		const character = scene.getObjectByName('character')

		character?.getWorldPosition(position)

		const newMesh = (
			<mesh ref={currentBall} position={[position.x, position.y + 1, position.z]}>
				<sphereGeometry args={[0.15, 8, 8]} />
				<meshStandardMaterial color={BALLS_COLORS[selectedBall]} />
			</mesh>
		)

		setCubeMesh((prevMeshes) => [...prevMeshes, newMesh])
		setIsThrew(false)
	}

	useEffect(() => {
		const character = scene.getObjectByName('character')

		character?.getWorldDirection(direction)

		if (cubeMesh.length > 0) {
			cubeRef.current?.setLinvel(new THREE.Vector3(direction.x * 15, direction.y + 2, direction.z * 15), false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cubeMesh])

	useEffect(() => {
		if (isThrew) {
			throwAnimation()
			// setCanControl(false)

			const timeout = setTimeout(() => {
				clickToCreateBox()
			}, 1700)

			return () => {
				clearTimeout(timeout)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isThrew])

	const onEnter = async (e: CollisionPayload) => {
		if (!account) return

		if (currentBall.current && cubeRef.current && e.rigidBodyObject?.name.includes('axie')) {
			const a = scene.getObjectByName(e.rigidBodyObject.name)

			if (a) {
				cubeRef.current.setBodyType(1, false)
			}

			let count = 0
			const blinkInterval = setInterval(() => {
				count++
				;(currentBall.current?.material as THREE.MeshStandardMaterial).color.set(
					count % 2 === 0 ? BALLS_COLORS[selectedBall] : '#00ffff',
				)
			}, 500)

			try {
				const tx = await capture(account, Number(e.rigidBodyObject.name.split('-')[1]))

				setCaughtAxie({ caught: tx, id: e.rigidBodyObject.name.split('-')[1] })

				if (tx) showNotification(`Caught #${e.rigidBodyObject.name.split('-')[1]}!`)
				else showToast('Failed to catch Axie!')

				clearInterval(blinkInterval)
				setCubeMesh([])
			} catch (error) {
				console.log(error)
				setCaughtAxie(null)
			}
		}
	}

	return (
		<>
			{cubeMesh.map((item, i) => {
				return (
					<RigidBody
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={i}
						mass={0.6}
						ref={cubeRef}
						colliders="ball"
						name="ball-aquatic"
						onCollisionEnter={(e) => onEnter(e)}
					>
						{item}
					</RigidBody>
				)
			})}
		</>
	)
}
