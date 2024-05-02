import { useCharacterControl } from '@/features/movement/use-character-control'
import { useCharacterStore } from '@/stores/character'
// import { useGame } from '@/stores/use-game'
import { useThree } from '@react-three/fiber'
import { type CollisionPayload, type RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useWalletgo } from '@roninnetwork/walletgo'
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useCatchAxieStore } from './catch-axie-store'
// import { useCatchAxieStore } from './store'
// import { catchAxie } from '@/libs/utils'

const BALLS_COLORS: Record<string, string> = {
	aquatic: '#7AA2E3',
	beast: '#FB6D48',
	plant: '#2C7865',
	reptile: '#912BBC',
}

export default function ShootBall() {
	const [cubeMesh, setCubeMesh] = useState<ReactNode[]>([])
	const cubeRef = useRef<RapierRigidBody>(null)

	const currentBall = useRef<THREE.Mesh>(null)

	const throwAnimation = useCharacterControl((s) => s.throw)
	const setCanControl = useCharacterStore((s) => s.setCanControl)

	const [isThrew, setIsThrew] = useCatchAxieStore((state) => [
		state.isThrew,
		state.setIsThrew,
		// state.selectedBall,
		// state.setCaughtAxie,
	])

	const scene = useThree((s) => s.scene)

	const position = useMemo(() => new THREE.Vector3(), [])
	const direction = useMemo(() => new THREE.Vector3(), [])

	const { walletProvider } = useWalletgo()

	const clickToCreateBox = () => {
		const character = scene.getObjectByName('character')

		character?.getWorldPosition(position)

		const newMesh = (
			<mesh ref={currentBall} position={[position.x, position.y + 1, position.z]}>
				<sphereGeometry args={[0.15, 8, 8]} />
				<meshStandardMaterial color={'red'} />
			</mesh>
		)

		setCubeMesh((prevMeshes) => [...prevMeshes, newMesh])
		setIsThrew(false)
		setCanControl(true)
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
			setCanControl(false)

			const timeout = setTimeout(() => {
				clickToCreateBox()
			}, 1700)

			return () => {
				clearTimeout(timeout)
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isThrew])

	// const onEnter = async (e: CollisionPayload) => {
	// 	if (!walletProvider) return

	// 	if (
	// 		currentBall.current &&
	// 		cubeRef.current &&
	// 		e.colliderObject &&
	// 		e.colliderObject.name.includes('obtainable-axie') &&
	// 		isCaught
	// 	) {
	// 		const a = scene.getObjectByName(e.colliderObject.name)
	// 		const pos = new THREE.Vector3()

	// 		if (a) {
	// 			a.getWorldPosition(pos)
	// 			cubeRef.current.setBodyType(1, false)
	// 			cubeRef.current.setTranslation(new THREE.Vector3(pos.x, pos.y, pos.z), false)
	// 		}

	// 		const address = await walletProvider.getSigner().getAddress()

	// 		let count = 0
	// 		const blinkInterval = setInterval(() => {
	// 			count++
	// 			;(currentBall.current!.material as THREE.MeshStandardMaterial).color.set(
	// 				count % 2 === 0 ? BALLS_COLORS[selectedBall] : '#00ffff',
	// 			)
	// 		}, 500)

	// 		try {
	// 			const response = await fetch('https://pokemon-psi-two.vercel.app/api/catch', {
	// 				// const response = await fetch('http://localhost:3333/api/catch', {
	// 				method: 'POST',
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 				},
	// 				body: JSON.stringify({
	// 					to: address,
	// 					axie: e.colliderObject.name.split('-')[2],
	// 				}),
	// 			})

	// 			const data = await response.json()

	// 			setCaughtAxie({ caught: data.caught, id: e.colliderObject.name.split('-')[2] })

	// 			clearInterval(blinkInterval)
	// 			setCubeMesh([])
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	}
	// }

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
						// onCollisionEnter={(e) => onEnter(e)}
					>
						{item}
					</RigidBody>
				)
			})}
		</>
	)
}
