import useQuest from '@/features/quest/use-quest'
import { useFrame } from '@react-three/fiber'
import { type CollisionPayload, CuboidCollider, type RapierRigidBody, RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import * as THREE from 'three'
import { usePokiedexStore } from './pokiedex-store'

const offset = new THREE.Vector3(0, 0, 0)

export default function PokiedexRay() {
	const rayRef = useRef<RapierRigidBody>(null)
	const cameraPosition = useRef(new THREE.Vector3(0, 0, 0))
	const cameraDirection = useRef(new THREE.Quaternion())
	const { onGoingQuest, switchToCompletedQuest } = useQuest()

	const [isOpen, setFoundedAxieId] = usePokiedexStore((s) => [s.isOpen, s.setFoundedAxieId])

	useFrame(({ camera }) => {
		if (rayRef.current && isOpen) {
			camera.getWorldPosition(cameraPosition.current)
			camera.getWorldQuaternion(cameraDirection.current)

			rayRef.current.setTranslation(cameraPosition.current.add(offset), false)
			rayRef.current.setRotation(cameraDirection.current, false)
		}
	})

	const enter = (e: CollisionPayload) => {
		if (isOpen && e.colliderObject?.name.includes('axie')) {
			setFoundedAxieId(e.colliderObject.name.split('-')[1])

			if (onGoingQuest?.questId === 'quest_03') {
				switchToCompletedQuest('quest_03')
			}
		}
	}

	return (
		<RigidBody ref={rayRef} type="fixed" colliders={false}>
			<CuboidCollider onIntersectionEnter={enter} sensor args={[0.3, 0.3, 30]} />
		</RigidBody>
	)
}
