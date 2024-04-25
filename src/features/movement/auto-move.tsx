import { AxieMixer } from '@/components/axie-mixer'
import type { AxieAnimation } from '@/components/axie-mixer/types'
import { getMovingDirection } from '@/libs/utils'
import type { Collider, RayColliderToi, Vector } from '@dimforge/rapier3d-compat'
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

const modelFacingVec = new THREE.Vector3()
const bodyFacingVec = new THREE.Vector3()
const bodyBalanceVec = new THREE.Vector3()
const bodyBalanceVecOnX = new THREE.Vector3()
const bodyFacingVecOnY = new THREE.Vector3()
const bodyBalanceVecOnZ = new THREE.Vector3()
const vectorY = new THREE.Vector3(0, 1, 0)
const vectorZ = new THREE.Vector3(0, 0, 1)
const bodyContactForce = new THREE.Vector3()

const standingForcePoint = new THREE.Vector3()
const movingObjectVelocity = new THREE.Vector3()
const movingObjectVelocityInCharacterDir = new THREE.Vector3()
const pivot = new THREE.Object3D()
const modelEuler = new THREE.Euler()
const modelQuat = new THREE.Quaternion()
const moveImpulse = new THREE.Vector3()
const movingDirection = new THREE.Vector3()
const moveAccNeeded = new THREE.Vector3()
const currentVel = new THREE.Vector3()
const currentPos = new THREE.Vector3()
const dragForce = new THREE.Vector3()
const dragAngForce = new THREE.Vector3()
const wantToMoveVel = new THREE.Vector3()
const rejectVel = new THREE.Vector3()

const nextPosition = new THREE.Vector3()

const MonsterFollow = ({
	followCharacter = false,

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
	const characterModelIndicator = useMemo(() => new THREE.Object3D(), [])

	const isModePointToMove = true
	const scene = useThree((s) => s.scene)

	const [animation, setAnimation] = useState<AxieAnimation>('idle')

	const { rapier, world } = useRapier()

	const initialGravityScale: number = props.gravityScale || 1

	let isOnMovingObject = false

	let floatingForce = null
	const springDirVec = useMemo(() => new THREE.Vector3(), [])
	const characterMassForce = useMemo(() => new THREE.Vector3(), [])
	const rayOrigin = useMemo(() => new THREE.Vector3(), [])
	const rayCast = new rapier.Ray(rayOrigin, rayDir)
	let rayHit: RayColliderToi | null = null

	let slopeAngle = 0
	let actualSlopeNormal: Vector | null = null
	let actualSlopeAngle: number | null = null
	const actualSlopeNormalVec = useMemo(() => new THREE.Vector3(), [])
	const floorNormal = useMemo(() => new THREE.Vector3(0, 1, 0), [])
	const slopeRayOriginRef = useRef<THREE.Mesh>(null)
	const slopeRayorigin = useMemo(() => new THREE.Vector3(), [])
	const slopeRayCast = new rapier.Ray(slopeRayorigin, slopeRayDir)
	let slopeRayHit: RayColliderToi | null = null

	const isBodyHitWall = false
	let isPointMoving = false
	const crossVector = useMemo(() => new THREE.Vector3(), [])
	const pointToPoint = useMemo(() => new THREE.Vector3(), [])

	const moveCharacter = (_: number, run: boolean, slopeAngle: number, movingObjectVelocity: THREE.Vector3) => {
		if (!characterRef.current) return
		if (!actualSlopeAngle) actualSlopeAngle = 0

		if (actualSlopeAngle < slopeMaxAngle && Math.abs(slopeAngle) > 0.2 && Math.abs(slopeAngle) < slopeMaxAngle) {
			movingDirection.set(0, Math.sin(slopeAngle), Math.cos(slopeAngle))
		} else if (actualSlopeAngle >= slopeMaxAngle) {
			movingDirection.set(0, Math.sin(slopeAngle) > 0 ? 0 : Math.sin(slopeAngle), Math.sin(slopeAngle) > 0 ? 0.1 : 1)
		} else {
			movingDirection.set(0, 0, 1)
		}

		movingDirection.applyQuaternion(characterModelIndicator.quaternion)

		movingObjectVelocityInCharacterDir
			.copy(movingObjectVelocity)
			.projectOnVector(movingDirection)
			.multiply(movingDirection)
		const angleBetweenCharacterDirAndObjectDir = movingObjectVelocity.angleTo(movingDirection)

		const wantToMoveMeg = currentVel.dot(movingDirection)

		wantToMoveVel.set(movingDirection.x * wantToMoveMeg, 0, movingDirection.z * wantToMoveMeg)
		rejectVel.copy(currentVel).sub(wantToMoveVel)

		moveAccNeeded.set(
			(movingDirection.x * (maxVelLimit * (run ? sprintMult : 1) + movingObjectVelocityInCharacterDir.x) -
				(currentVel.x -
					movingObjectVelocity.x * Math.sin(angleBetweenCharacterDirAndObjectDir) +
					rejectVel.x * (isOnMovingObject ? 0 : rejectVelMult))) /
				accDeltaTime,
			0,
			(movingDirection.z * (maxVelLimit * (run ? sprintMult : 1) + movingObjectVelocityInCharacterDir.z) -
				(currentVel.z -
					movingObjectVelocity.z * Math.sin(angleBetweenCharacterDirAndObjectDir) +
					rejectVel.z * (isOnMovingObject ? 0 : rejectVelMult))) /
				accDeltaTime,
		)

		// Wanted to move force function: F = ma
		const moveForceNeeded = moveAccNeeded.multiplyScalar(characterRef.current.mass())

		const characterRotated =
			Math.sin(characterModelIndicator.rotation.y).toFixed(3) === Math.sin(modelEuler.y).toFixed(3)

		if (!characterRotated) {
			moveImpulse.set(
				moveForceNeeded.x * turnVelMultiplier * airDragMultiplier,
				slopeAngle === 0
					? 0
					: movingDirection.y *
							turnVelMultiplier *
							(movingDirection.y > 0 // check it is on slope up or slope down
								? slopeUpExtraForce
								: slopeDownExtraForce) *
							(run ? sprintMult : 1),
				moveForceNeeded.z * turnVelMultiplier * airDragMultiplier, // if it's in the air, give it less control
			)
		} else {
			moveImpulse.set(
				moveForceNeeded.x * airDragMultiplier,
				slopeAngle === 0
					? 0
					: movingDirection.y *
							(movingDirection.y > 0 ? slopeUpExtraForce : slopeDownExtraForce) *
							(run ? sprintMult : 1),
				moveForceNeeded.z * airDragMultiplier,
			)
		}

		characterRef.current.applyImpulseAtPoint(
			moveImpulse.multiplyScalar(3),
			{
				x: currentPos.x,
				y: currentPos.y + moveImpulsePointY,
				z: currentPos.z,
			},
			true,
		)
	}

	const autoBalanceCharacter = () => {
		if (!characterRef.current) return

		// Match body component to character model rotation on Y
		bodyFacingVec.set(0, 0, 1).applyQuaternion(quat(characterRef.current.rotation()))
		bodyBalanceVec.set(0, 1, 0).applyQuaternion(quat(characterRef.current.rotation()))

		bodyBalanceVecOnX.set(0, bodyBalanceVec.y, bodyBalanceVec.z)
		bodyFacingVecOnY.set(bodyFacingVec.x, 0, bodyFacingVec.z)
		bodyBalanceVecOnZ.set(bodyBalanceVec.x, bodyBalanceVec.y, 0)

		characterModelIndicator.getWorldDirection(modelFacingVec)
		const crossVecOnX = vectorY.clone().cross(bodyBalanceVecOnX)
		const crossVecOnY = modelFacingVec.clone().cross(bodyFacingVecOnY)
		const crossVecOnZ = vectorY.clone().cross(bodyBalanceVecOnZ)

		dragAngForce.set(
			(crossVecOnX.x < 0 ? 1 : -1) * autoBalanceSpringK * bodyBalanceVecOnX.angleTo(vectorY) -
				characterRef.current.angvel().x * autoBalanceDampingC,
			(crossVecOnY.y < 0 ? 1 : -1) * autoBalanceSpringOnY * modelFacingVec.angleTo(bodyFacingVecOnY) -
				characterRef.current.angvel().y * autoBalanceDampingOnY,
			(crossVecOnZ.z < 0 ? 1 : -1) * autoBalanceSpringK * bodyBalanceVecOnZ.angleTo(vectorY) -
				characterRef.current.angvel().z * autoBalanceDampingC,
		)

		characterRef.current.applyTorqueImpulse(dragAngForce, true)
	}

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

	const pointToMove = (delta: number, slopeAngle: number, movingObjectVelocity: THREE.Vector3) => {
		if (followCharacter) {
			const character = scene.getObjectByName('character')

			if (character) {
				character.getWorldPosition(nextPosition)
			}
		} else {
			!isPointMoving && nextPosition.set(random(10), 0, random(10))
		}

		pointToPoint.set(nextPosition.x - currentPos.x, 0, nextPosition.z - currentPos.z)
		crossVector.crossVectors(pointToPoint, vectorZ)

		modelEuler.y = (crossVector.y > 0 ? -1 : 1) * pointToPoint.angleTo(vectorZ)

		if (characterRef.current) {
			if (pointToPoint.length() > 0.5 && !isBodyHitWall) {
				moveCharacter(delta, false, slopeAngle, movingObjectVelocity)
				isPointMoving = true
			} else {
				isPointMoving = false
			}
		}
	}

	useEffect(() => {
		modelEuler.y = characterInitDir

		window.addEventListener('visibilitychange', sleepCharacter)

		return () => {
			window.removeEventListener('visibilitychange', sleepCharacter)
		}
	}, [])

	useFrame((_, delta) => {
		if (!characterRef.current) return
		if (!characterModelRef.current) return

		currentPos.copy(characterRef.current.translation() as THREE.Vector3)

		modelEuler.y = ((movingDirection) => (movingDirection === null ? modelEuler.y : movingDirection))(
			getMovingDirection(false, false, false, false, pivot),
		)

		currentVel.copy(characterRef.current.linvel() as THREE.Vector3)

		modelQuat.setFromEuler(modelEuler)
		characterModelIndicator.quaternion.rotateTowards(modelQuat, delta * turnSpeed)

		rayOrigin.addVectors(currentPos, rayOriginOffset as THREE.Vector3)
		rayHit = world.castRay(
			rayCast,
			rayLength,
			true,
			undefined,
			undefined,
			characterRef.current as unknown as Collider,
			characterRef.current,
			(collider) => !collider.isSensor(),
		)

		isOnMovingObject = false
		bodyContactForce.set(0, 0, 0)
		movingObjectVelocity.set(0, 0, 0)

		slopeRayorigin.y = rayOrigin.y
		slopeRayHit = world.castRay(
			slopeRayCast,
			slopeRayLength,
			true,
			undefined,
			undefined,
			characterRef.current as unknown as Collider,
			characterRef.current,
			(collider) => !collider.isSensor(),
		)

		if (slopeRayHit) {
			actualSlopeNormal = slopeRayHit.collider.castRayAndGetNormal(slopeRayCast, slopeRayLength, false)
				?.normal as Vector
			if (actualSlopeNormal) {
				actualSlopeNormalVec?.set(actualSlopeNormal.x, actualSlopeNormal.y, actualSlopeNormal.z)
				actualSlopeAngle = actualSlopeNormalVec?.angleTo(floorNormal)
			}
		}

		if (slopeRayHit && rayHit && slopeRayHit.toi < floatingDis + 0.5) {
			slopeAngle = 0
		}

		if (rayHit != null) {
			if (rayHit.collider.parent()) {
				floatingForce = springK * (floatingDis - rayHit.toi) - characterRef.current.linvel().y * dampingC
				characterRef.current.applyImpulse(springDirVec.set(0, floatingForce, 0), false)

				characterMassForce.set(0, floatingForce > 0 ? -floatingForce : 0, 0)
				rayHit.collider.parent()?.applyImpulseAtPoint(characterMassForce, standingForcePoint, true)
			}
		}

		if (!isPointMoving) {
			if (!isOnMovingObject) {
				dragForce.set(-currentVel.x * dragDampingC, 0, -currentVel.z * dragDampingC)
				characterRef.current.applyImpulse(dragForce, false)
			} else {
				dragForce.set(
					(movingObjectVelocity.x - currentVel.x) * dragDampingC,
					0,
					(movingObjectVelocity.z - currentVel.z) * dragDampingC,
				)
				characterRef.current.applyImpulse(dragForce, true)
			}
		}

		if (currentVel.y < fallingMaxVel && characterRef.current.gravityScale() !== 0) {
			characterRef.current.setGravityScale(0, true)
		} else if (characterRef.current.gravityScale() !== initialGravityScale) {
			characterRef.current.setGravityScale(initialGravityScale, true)
		}

		autoBalanceCharacter()

		isModePointToMove && pointToMove(delta, slopeAngle, movingObjectVelocity)

		if (!isPointMoving) {
			setAnimation('idle')
		} else if (isPointMoving) {
			setAnimation('walk')
		}

		//#endregion
	})

	return (
		<>
			<RigidBody
				name="monster-rigid-body"
				colliders={false}
				ref={characterRef}
				enabledRotations={[true, true, true]}
				position={props.position}
				onContactForce={(e) => bodyContactForce.set(e.totalForce.x, e.totalForce.y, e.totalForce.z)}
				onCollisionExit={() => bodyContactForce.set(0, 0, 0)}
				{...props}
			>
				<CapsuleCollider name="monster-capsule-collider" args={[capsuleHalfHeight, capsuleRadius]} />
				<BallCollider args={[0.5]} position={[0, 0.3, 0]} />
				<group ref={characterModelRef} name="monster" position={[0, -0.6, 0]} userData={{ camExcludeCollision: true }}>
					<mesh
						position={[rayOriginOffset.x, rayOriginOffset.y, rayOriginOffset.z + slopeRayOriginOffset]}
						ref={slopeRayOriginRef}
						visible={showSlopeRayOrigin}
						userData={{ camExcludeCollision: true }}
					>
						<boxGeometry args={[0.15, 0.15, 0.15]} />
					</mesh>

					<AxieMixer animation={animation} axieId="7530500" />
				</group>
			</RigidBody>
		</>
	)
}

export default MonsterFollow

type Props = RigidBodyProps & {
	followCharacter?: boolean

	capsuleHalfHeight?: number
	capsuleRadius?: number
	floatHeight?: number
	characterInitDir?: number

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
