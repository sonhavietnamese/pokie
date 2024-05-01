import { AxieMixer } from '@/components/axie-mixer'
import type { AxieAnimation } from '@/components/axie-mixer/types'
import { getMovingDirection } from '@/libs/utils'
import type { RayColliderToi, Vector } from '@dimforge/rapier3d-compat'
import { useFrame, useThree } from '@react-three/fiber'
import {
	BallCollider,
	CapsuleCollider,
	type RapierRigidBody,
	RigidBody,
	type RigidBodyProps,
	quat,
	useRapier,
} from '@react-three/rapier'
import { random } from 'lodash-es'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import AxieNotation from './axie-notation'

const vectorY = new THREE.Vector3(0, 1, 0)
const vectorZ = new THREE.Vector3(0, 0, 1)
const initialGravityScale = 1
const pivot = new THREE.Object3D()

const AxieAutoMove = ({
	followCharacter = false,
	axieId = '7530400',
	capsuleHalfHeight = 0.3,
	capsuleRadius = 0.3,
	floatHeight = 0.1,
	characterInitDir = 0,

	maxVelLimit = 2.5,
	turnVelMultiplier = 0.2,
	turnSpeed = 15,
	sprintMult = 2,
	airDragMultiplier = 0.2,
	dragDampingC = 0.15,
	accDeltaTime = 8,
	rejectVelMult = 4,
	moveImpulsePointY = 0.5,
	fallingGravityScale = 2.5,
	fallingMaxVel = -20,
	wakeUpDelay = 200,

	rayOriginOffset = { x: 0, y: -capsuleHalfHeight, z: 0 },
	rayLength = capsuleRadius + 2,
	rayDir = { x: 0, y: -1, z: 0 },
	floatingDis = capsuleRadius + floatHeight,
	springK = 1.2,
	dampingC = 0.08,

	showSlopeRayOrigin = false,
	slopeMaxAngle = 1,
	slopeRayOriginOffset = capsuleRadius - 0.03,
	slopeRayLength = capsuleRadius + 3,
	slopeRayDir = { x: 0, y: -1, z: 0 },
	slopeUpExtraForce = 0.1,
	slopeDownExtraForce = 0.2,

	autoBalanceSpringK = 0.3,
	autoBalanceDampingC = 0.03,
	autoBalanceSpringOnY = 0.5,
	autoBalanceDampingOnY = 0.015,

	...props
}: Props) => {
	const characterRef = useRef<RapierRigidBody>(null)
	const characterModelRef = useRef<THREE.Group>(null)
	const characterModelIndicator = useRef(new THREE.Object3D())

	const modelFacingVec = useRef(new THREE.Vector3())
	const bodyFacingVec = useRef(new THREE.Vector3())
	const bodyBalanceVec = useRef(new THREE.Vector3())
	const standingForcePoint = useRef(new THREE.Vector3())
	const movingObjectVelocity = useRef(new THREE.Vector3())
	const movingObjectVelocityInCharacterDir = useRef(new THREE.Vector3())
	const modelEuler = useRef(new THREE.Euler())
	const modelQuat = useRef(new THREE.Quaternion())
	const moveImpulse = useRef(new THREE.Vector3())
	const movingDirection = useRef(new THREE.Vector3())
	const moveAccNeeded = useRef(new THREE.Vector3())
	const currentVel = useRef(new THREE.Vector3())
	const currentPos = useRef(new THREE.Vector3())
	const dragForce = useRef(new THREE.Vector3())
	const dragAngForce = useRef(new THREE.Vector3())
	const wantToMoveVel = useRef(new THREE.Vector3())
	const rejectVel = useRef(new THREE.Vector3())

	const scene = useThree((s) => s.scene)
	const [animation, setAnimation] = useState<AxieAnimation>('idle')
	const { rapier, world } = useRapier()

	let isOnMovingObject = false
	let floatingForce = null
	const springDirVec = useRef(new THREE.Vector3())
	const characterMassForce = useRef(new THREE.Vector3())
	const rayOrigin = useRef(new THREE.Vector3())
	const rayCast = new rapier.Ray(rayOrigin.current, rayDir)
	let rayHit: RayColliderToi | null = null

	let slopeAngle = 0
	let actualSlopeNormal: Vector | null = null
	let actualSlopeAngle: number | null = null
	const actualSlopeNormalVec = useRef(new THREE.Vector3())
	const floorNormal = useRef(new THREE.Vector3(0, 1, 0))
	const slopeRayOriginRef = useRef<THREE.Mesh>(null)
	const slopeRayorigin = useRef(new THREE.Vector3())
	const slopeRayCast = new rapier.Ray(slopeRayorigin.current, slopeRayDir)
	let slopeRayHit: RayColliderToi | null = null

	let massRatio = 1
	const distanceFromCharacterToObject = useMemo(() => new THREE.Vector3(), [])
	const objectAngvelToLinvel = useMemo(() => new THREE.Vector3(), [])
	const velocityDiff = useMemo(() => new THREE.Vector3(), [])
	const movingObjectDragForce = useMemo(() => new THREE.Vector3(), [])
	const bodyContactForce = useMemo(() => new THREE.Vector3(), [])

	const bodyBalanceVecOnX = useRef(new THREE.Vector3())
	const bodyFacingVecOnY = useRef(new THREE.Vector3())
	const bodyBalanceVecOnZ = useRef(new THREE.Vector3())

	const nextPosition = useRef(new THREE.Vector3())

	let isPointMoving = false
	const crossVector = useRef(new THREE.Vector3())
	const pointToPoint = useRef(new THREE.Vector3())

	const moveCharacter = (run: boolean, slopeAngle: number, movingObjectVelocity: THREE.Vector3) => {
		if (!characterRef.current) return
		if (!actualSlopeAngle) actualSlopeAngle = 0

		if (actualSlopeAngle < slopeMaxAngle && Math.abs(slopeAngle) > 0.2 && Math.abs(slopeAngle) < slopeMaxAngle) {
			movingDirection.current.set(0, Math.sin(slopeAngle), Math.cos(slopeAngle))
		} else if (actualSlopeAngle >= slopeMaxAngle) {
			movingDirection.current.set(
				0,
				Math.sin(slopeAngle) > 0 ? 0 : Math.sin(slopeAngle),
				Math.sin(slopeAngle) > 0 ? 0.1 : 1,
			)
		} else {
			movingDirection.current.set(0, 0, 1)
		}

		movingDirection.current.applyQuaternion(characterModelIndicator.current.quaternion)

		movingObjectVelocityInCharacterDir.current
			.copy(movingObjectVelocity)
			.projectOnVector(movingDirection.current)
			.multiply(movingDirection.current)
		const angleBetweenCharacterDirAndObjectDir = movingObjectVelocity.angleTo(movingDirection.current)

		const wantToMoveMeg = currentVel.current.dot(movingDirection.current)

		wantToMoveVel.current.set(movingDirection.current.x * wantToMoveMeg, 0, movingDirection.current.z * wantToMoveMeg)
		rejectVel.current.copy(currentVel.current).sub(wantToMoveVel.current)

		moveAccNeeded.current.set(
			(movingDirection.current.x *
				(maxVelLimit * (run ? sprintMult : 1) + movingObjectVelocityInCharacterDir.current.x) -
				(currentVel.current.x -
					movingObjectVelocity.x * Math.sin(angleBetweenCharacterDirAndObjectDir) +
					rejectVel.current.x * (isOnMovingObject ? 0 : rejectVelMult))) /
				accDeltaTime,
			0,
			(movingDirection.current.z *
				(maxVelLimit * (run ? sprintMult : 1) + movingObjectVelocityInCharacterDir.current.z) -
				(currentVel.current.z -
					movingObjectVelocity.z * Math.sin(angleBetweenCharacterDirAndObjectDir) +
					rejectVel.current.z * (isOnMovingObject ? 0 : rejectVelMult))) /
				accDeltaTime,
		)

		// Wanted to move force function: F = ma
		const moveForceNeeded = moveAccNeeded.current.multiplyScalar(characterRef.current.mass())

		const characterRotated =
			Math.sin(characterModelIndicator.current.rotation.y).toFixed(3) === Math.sin(modelEuler.current.y).toFixed(3)

		if (!characterRotated) {
			moveImpulse.current.set(
				moveForceNeeded.x * turnVelMultiplier * airDragMultiplier,
				slopeAngle === 0
					? 0
					: movingDirection.current.y *
							turnVelMultiplier *
							(movingDirection.current.y > 0 // check it is on slope up or slope down
								? slopeUpExtraForce
								: slopeDownExtraForce) *
							(run ? sprintMult : 1),
				moveForceNeeded.z * turnVelMultiplier * airDragMultiplier, // if it's in the air, give it less control
			)
		} else {
			moveImpulse.current.set(
				moveForceNeeded.x * airDragMultiplier,
				slopeAngle === 0
					? 0
					: movingDirection.current.y *
							(movingDirection.current.y > 0 ? slopeUpExtraForce : slopeDownExtraForce) *
							(run ? sprintMult : 1),
				moveForceNeeded.z * airDragMultiplier,
			)
		}

		characterRef.current.applyImpulseAtPoint(
			moveImpulse.current.multiplyScalar(3),
			{
				x: currentPos.current.x,
				y: currentPos.current.y + moveImpulsePointY,
				z: currentPos.current.z,
			},
			true,
		)
	}

	const autoBalanceCharacter = () => {
		if (!characterRef.current) return

		// Match body component to character model rotation on Y
		bodyFacingVec.current.set(0, 0, 1).applyQuaternion(quat(characterRef.current.rotation()))
		bodyBalanceVec.current.set(0, 1, 0).applyQuaternion(quat(characterRef.current.rotation()))

		bodyBalanceVecOnX.current.set(0, bodyBalanceVec.current.y, bodyBalanceVec.current.z)
		bodyFacingVecOnY.current.set(bodyFacingVec.current.x, 0, bodyFacingVec.current.z)
		bodyBalanceVecOnZ.current.set(bodyBalanceVec.current.x, bodyBalanceVec.current.y, 0)

		characterModelIndicator.current.getWorldDirection(modelFacingVec.current)
		const crossVecOnX = vectorY.clone().cross(bodyBalanceVecOnX.current)
		const crossVecOnY = modelFacingVec.current.clone().cross(bodyFacingVecOnY.current)
		const crossVecOnZ = vectorY.clone().cross(bodyBalanceVecOnZ.current)

		dragAngForce.current.set(
			(crossVecOnX.x < 0 ? 1 : -1) * autoBalanceSpringK * bodyBalanceVecOnX.current.angleTo(vectorY) -
				characterRef.current.angvel().x * autoBalanceDampingC,
			(crossVecOnY.y < 0 ? 1 : -1) * autoBalanceSpringOnY * modelFacingVec.current.angleTo(bodyFacingVecOnY.current) -
				characterRef.current.angvel().y * autoBalanceDampingOnY,
			(crossVecOnZ.z < 0 ? 1 : -1) * autoBalanceSpringK * bodyBalanceVecOnZ.current.angleTo(vectorY) -
				characterRef.current.angvel().z * autoBalanceDampingC,
		)

		characterRef.current.applyTorqueImpulse(dragAngForce.current, true)
	}

	const pointToMove = (slopeAngle: number, movingObjectVelocity: THREE.Vector3) => {
		if (followCharacter) {
			const character = scene.getObjectByName('character')

			if (character) {
				character.getWorldPosition(nextPosition.current)
			}
		} else {
			if (!isPointMoving) {
				// const next = { x: 10, z: 10 }
				const next = { x: random(-5, 5), z: random(-5, 5) }

				nextPosition.current.set(next.x, 0, next.z)
			}
		}

		pointToPoint.current.set(
			nextPosition.current.x - currentPos.current.x,
			0,
			nextPosition.current.z - currentPos.current.z,
		)
		crossVector.current.crossVectors(pointToPoint.current, vectorZ)

		modelEuler.current.y = (crossVector.current.y > 0 ? -1 : 1) * pointToPoint.current.angleTo(vectorZ)

		if (characterRef.current) {
			if (pointToPoint.current.length() > (followCharacter ? 2 : 1)) {
				moveCharacter(false, slopeAngle, movingObjectVelocity)
				isPointMoving = true
			} else {
				isPointMoving = false
			}
		}
	}

	useEffect(() => {
		modelEuler.current.y = characterInitDir

		const sleepCharacter = () => {
			if (characterRef.current) {
				if (document.visibilityState === 'hidden') {
					characterRef.current.sleep()
				} else {
					setTimeout(() => {
						characterRef.current?.wakeUp()
					}, wakeUpDelay)
				}
			}
		}

		window.addEventListener('visibilitychange', sleepCharacter)

		return () => {
			window.removeEventListener('visibilitychange', sleepCharacter)
		}
	}, [])

	useFrame((_, delta) => {
		if (!characterRef.current) return
		if (!characterModelRef.current) return

		currentPos.current.copy(characterRef.current.translation() as THREE.Vector3)
		currentVel.current.copy(characterRef.current.linvel() as THREE.Vector3)

		modelEuler.current.y = ((movingDirection) => (movingDirection === null ? modelEuler.current.y : movingDirection))(
			getMovingDirection(false, false, false, false, pivot),
		)

		modelQuat.current.setFromEuler(modelEuler.current)
		characterModelIndicator.current.quaternion.rotateTowards(modelQuat.current, delta * turnSpeed)

		rayOrigin.current.addVectors(currentPos.current, rayOriginOffset as THREE.Vector3)
		rayHit = world.castRay(rayCast, rayLength, true, 16, undefined, undefined, characterRef.current)

		/**
		 * Ray detect if on rigid body or dynamic platform, then apply the linear velocity and angular velocity to character
		 */

		if (rayHit) {
			const parentCol = rayHit.collider.parent()

			if (!parentCol) return

			floatingForce = springK * (floatingDis - rayHit.toi) - characterRef.current.linvel().y * dampingC
			characterRef.current.applyImpulse(springDirVec.current.set(0, floatingForce, 0), false)

			characterMassForce.current.set(0, floatingForce > 0 ? -floatingForce : 0, 0)
			rayHit.collider.parent()?.applyImpulseAtPoint(characterMassForce.current, standingForcePoint.current, true)

			// Getting the standing force apply point
			standingForcePoint.current.set(rayOrigin.current.x, rayOrigin.current.y - rayHit.toi, rayOrigin.current.z)
			const rayHitObjectBodyType = parentCol.bodyType()
			const rayHitObjectBodyMass = parentCol.mass()

			massRatio = characterRef.current.mass() / rayHitObjectBodyMass

			// Body type 0 is rigid body, body type 1 is fixed body, body type 2 is kinematic body
			if (rayHitObjectBodyType === 0 || rayHitObjectBodyType === 2) {
				isOnMovingObject = true
				distanceFromCharacterToObject.copy(currentPos.current).sub(parentCol.translation() as THREE.Vector3)
				const movingObjectLinvel = parentCol.linvel() as THREE.Vector3
				const movingObjectAngvel = parentCol.angvel() as THREE.Vector3

				// Combine object linear velocity and angular velocity to movingObjectVelocity
				movingObjectVelocity.current
					.set(
						movingObjectLinvel.x +
							objectAngvelToLinvel.crossVectors(movingObjectAngvel, distanceFromCharacterToObject).x,
						movingObjectLinvel.y,
						movingObjectLinvel.z +
							objectAngvelToLinvel.crossVectors(movingObjectAngvel, distanceFromCharacterToObject).z,
					)
					.multiplyScalar(Math.min(1, 1 / massRatio))
				// If the velocity diff is too high (> 30), ignore movingObjectVelocity
				velocityDiff.subVectors(movingObjectVelocity.current, currentVel.current)
				if (velocityDiff.length() > 30) movingObjectVelocity.current.multiplyScalar(1 / velocityDiff.length())

				if (rayHitObjectBodyType === 0) {
					if (!isPointMoving) {
						movingObjectDragForce
							.copy(bodyContactForce)
							.multiplyScalar(delta)
							.multiplyScalar(Math.min(1, 1 / massRatio))
							.negate()
						bodyContactForce.set(0, 0, 0)
					} else {
						movingObjectDragForce
							.copy(moveImpulse.current)
							.multiplyScalar(Math.min(1, 1 / massRatio))
							.negate()
					}

					parentCol.applyImpulseAtPoint(movingObjectDragForce, standingForcePoint.current, true)
				}
			} else {
				// on fixed body
				massRatio = 1
				isOnMovingObject = false
				movingObjectVelocity.current.set(0, 0, 0)
				bodyContactForce.set(0, 0, 0)
			}
		}

		slopeRayOriginRef.current?.getWorldPosition(slopeRayorigin.current)
		slopeRayorigin.current.y = rayOrigin.current.y
		slopeRayHit = world.castRay(
			slopeRayCast,
			slopeRayLength,
			true,
			16,
			undefined,
			undefined,
			characterRef.current,
			(collider) => !collider.isSensor(),
		)

		if (slopeRayHit) {
			actualSlopeNormal = slopeRayHit.collider.castRayAndGetNormal(slopeRayCast, slopeRayLength, false)
				?.normal as Vector
			if (actualSlopeNormal) {
				actualSlopeNormalVec.current?.set(actualSlopeNormal.x, actualSlopeNormal.y, actualSlopeNormal.z)
				actualSlopeAngle = actualSlopeNormalVec.current?.angleTo(floorNormal.current)
			}
		}

		if (slopeRayHit && rayHit && slopeRayHit.toi < floatingDis + 0.5) {
			slopeAngle = 0
		}

		if (rayHit !== null) {
			if (rayHit.collider.parent()) {
				floatingForce = springK * (floatingDis - rayHit.toi) - characterRef.current.linvel().y * dampingC
				characterRef.current.applyImpulse(springDirVec.current.set(0, floatingForce, 0), false)

				characterMassForce.current.set(0, floatingForce > 0 ? -floatingForce : 0, 0)
				rayHit.collider.parent()?.applyImpulseAtPoint(characterMassForce.current, standingForcePoint.current, true)
			}
		}

		if (!isPointMoving) {
			// not on a moving object
			if (!isOnMovingObject) {
				dragForce.current.set(-currentVel.current.x * dragDampingC, 0, -currentVel.current.z * dragDampingC)
				characterRef.current.applyImpulse(dragForce.current, false)
			}
			// on a moving object
			else {
				dragForce.current.set(
					(movingObjectVelocity.current.x - currentVel.current.x) * dragDampingC,
					0,
					(movingObjectVelocity.current.z - currentVel.current.z) * dragDampingC,
				)
				characterRef.current.applyImpulse(dragForce.current, true)
			}
		}

		if (currentVel.current.y < fallingMaxVel && characterRef.current.gravityScale() !== 0) {
			characterRef.current.setGravityScale(0, true)
		} else if (characterRef.current.gravityScale() !== initialGravityScale) {
			characterRef.current.setGravityScale(initialGravityScale, true)
		}

		autoBalanceCharacter()

		pointToMove(slopeAngle, movingObjectVelocity.current)

		if (!isPointMoving) {
			setAnimation('idle')
		} else if (isPointMoving) {
			setAnimation('walk')
		}
	})

	return (
		<RigidBody
			name={axieId}
			onContactForce={(e) => bodyContactForce.set(e.totalForce.x, e.totalForce.y, e.totalForce.z)}
			onCollisionExit={() => bodyContactForce.set(0, 0, 0)}
			colliders={false}
			ref={characterRef}
			enabledRotations={[true, true, true]}
			position={props.position}
		>
			<CapsuleCollider name={axieId} args={[capsuleHalfHeight, capsuleRadius]} />
			<BallCollider name={axieId} args={[0.5]} position={[0, 0.3, 0]} />
			<group ref={characterModelRef} name={axieId} position={[0, -0.6, 0]} userData={{ camExcludeCollision: true }}>
				<mesh
					renderOrder={3}
					name={axieId}
					position={[rayOriginOffset.x, rayOriginOffset.y, rayOriginOffset.z + slopeRayOriginOffset]}
					ref={slopeRayOriginRef}
					visible={showSlopeRayOrigin}
					userData={{ camExcludeCollision: true }}
				>
					<boxGeometry args={[0.15, 0.15, 0.15]} />
				</mesh>

				<AxieNotation key={axieId} emote="normal">
					<AxieMixer key={axieId} animation={animation} axieId={axieId} />
				</AxieNotation>
			</group>
		</RigidBody>
	)
}

export default AxieAutoMove

type Props = RigidBodyProps & {
	followCharacter?: boolean

	capsuleHalfHeight?: number
	capsuleRadius?: number
	floatHeight?: number
	characterInitDir?: number
	axieId?: string
	maxVelLimit?: number
	turnVelMultiplier?: number
	turnSpeed?: number
	sprintMult?: number
	jumpVel?: number
	jumpForceToGroundMult?: number
	slopJumpMult?: number
	sprintJumpMult?: number
	airDragMultiplier?: number
	dragDampingC?: number
	accDeltaTime?: number
	rejectVelMult?: number
	moveImpulsePointY?: number
	fallingGravityScale?: number
	fallingMaxVel?: number
	wakeUpDelay?: number

	rayOriginOffset?: Vector
	rayHitForgiveness?: number
	rayLength?: number
	rayDir?: Vector
	floatingDis?: number
	springK?: number
	dampingC?: number

	showSlopeRayOrigin?: boolean
	slopeMaxAngle?: number
	slopeRayOriginOffset?: number
	slopeRayLength?: number
	slopeRayDir?: Vector
	slopeUpExtraForce?: number
	slopeDownExtraForce?: number

	autoBalanceSpringK?: number
	autoBalanceDampingC?: number
	autoBalanceSpringOnY?: number
	autoBalanceDampingOnY?: number
}
