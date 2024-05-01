import { usePokiedexStore } from '@/features/pokiedex/pokiedex-store'
import { getMovingDirection } from '@/libs/utils'
import { useCharacterStore } from '@/stores/character'
import type { Collider, RayColliderToi, Vector } from '@dimforge/rapier3d-compat'
import { useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { BallCollider, CapsuleCollider, type RapierRigidBody, RigidBody, quat, useRapier } from '@react-three/rapier'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { Props, userDataType } from './type'
// import { useMultiplayerStore } from '@/stores/multiplayer'
import { useCharacterControl } from './use-character-control'
// import { useBackpackStore } from '@/components/backpack/store'
// import { useCatchAxieStore } from '@/components/catch-axie/store'
// import { usePokiedex } from '@/components/pokiedex'
import { useFollowCamera } from './use-follow-camera'

const CharacterController = ({
	children,
	capsuleHalfHeight = 0.35,
	capsuleRadius = 0.3,
	floatHeight = 0.3,
	characterInitDir = 0, // in rad
	followLight = false,
	disableFollowCam = false,
	disableFollowCamPos = { x: 0, y: 0, z: -5 },
	disableFollowCamTarget = { x: 0, y: 0, z: 0 },
	// Follow camera setups
	camInitDis = -8,
	camMaxDis = -30,
	camMinDis = -0.7,
	camInitDir = { x: 0, y: 0, z: 0 }, // in rad
	camTargetPos = { x: 0, y: 0, z: 0 },
	camMoveSpeed = 1,
	camZoomSpeed = 1,
	camCollision = true,
	camCollisionOffset = 0.7,
	// Follow light setups
	followLightPos = { x: 20, y: 30, z: 10 },
	// Base control setups
	maxVelLimit = 2.5,
	turnVelMultiplier = 0.2,
	turnSpeed = 15,
	sprintMult = 2,

	airDragMultiplier = 0.2,
	dragDampingC = 0.15,
	accDeltaTime = 8,
	rejectVelMult = 4,
	moveImpulsePointY = 0.5,
	camFollowMult = 10,
	fallingGravityScale = 2.5,
	fallingMaxVel = -20,
	wakeUpDelay = 200,
	// Floating Ray setups
	rayOriginOffest = { x: 0, y: -capsuleHalfHeight, z: 0 },
	rayHitForgiveness = 0.1,
	rayLength = capsuleRadius + 2,
	rayDir = { x: 0, y: -1, z: 0 },
	floatingDis = capsuleRadius + floatHeight,
	springK = 1.2,
	dampingC = 0.08,
	// Slope Ray setups
	showSlopeRayOrigin = false,
	slopeMaxAngle = 1, // in rad
	slopeRayOriginOffest = capsuleRadius - 0.03,
	slopeRayLength = capsuleRadius + 3,
	slopeRayDir = { x: 0, y: -1, z: 0 },
	slopeUpExtraForce = 0.1,
	slopeDownExtraForce = 0.2,
	// AutoBalance Force setups
	autoBalance = true,
	autoBalanceSpringK = 0.3,
	autoBalanceDampingC = 0.03,
	autoBalanceSpringOnY = 0.5,
	autoBalanceDampingOnY = 0.015,
	// Animation temporary setups
	// Mode setups
	mode,

	...props
}: Props) => {
	const characterRef = useRef<RapierRigidBody>(null)
	const characterModelRef = useRef<THREE.Group>(null)

	const spawnPositionRef = useRef<THREE.Object3D>(null)

	const characterModelIndicator = useMemo(() => new THREE.Object3D(), [])

	// const room = useMultiplayerStore((s) => s.room)

	let isModePointToMove = false
	const setCameraBased = useCharacterControl((state) => state.setCameraBased)
	const getCameraBased = useCharacterControl((state) => state.getCameraBased)

	if (mode) {
		if (mode === 'PointToMove') isModePointToMove = true
		if (mode === 'CameraBasedMovement') setCameraBased(true)
	}

	/**
	 * Body collider setup
	 */
	const modelFacingVec = useMemo(() => new THREE.Vector3(), [])
	const bodyFacingVec = useMemo(() => new THREE.Vector3(), [])
	const bodyBalanceVec = useMemo(() => new THREE.Vector3(), [])
	const bodyBalanceVecOnX = useMemo(() => new THREE.Vector3(), [])
	const bodyFacingVecOnY = useMemo(() => new THREE.Vector3(), [])
	const bodyBalanceVecOnZ = useMemo(() => new THREE.Vector3(), [])
	const vectorY = useMemo(() => new THREE.Vector3(0, 1, 0), [])
	const vectorZ = useMemo(() => new THREE.Vector3(0, 0, 1), [])
	const bodyContactForce = useMemo(() => new THREE.Vector3(), [])

	// const usingItem = useBackpackStore((s) => s.usingItem)
	// const isNearAxie = useCatchAxieStore((s) => s.isEnter)

	// Animation change functions
	const idleAnimation = useCharacterControl((state) => state.idle)
	const walkAnimation = useCharacterControl((state) => state.walk)
	const runAnimation = useCharacterControl((state) => state.run)
	// const jumpAnimation = useCharacterControl((state) => state.jump)
	const fallAnimation = useCharacterControl((state) => state.fall)
	const action1Animation = useCharacterControl((state) => state.action1)
	// const action2Animation = useCharacterControl((state) => state.action2)
	const swingAnimation = useCharacterControl((state) => state.swing)
	// const action4Animation = useCharacterControl((state) => state.action4)
	const swimAnimation = useCharacterControl((state) => state.swim)
	const petAnimation = useCharacterControl((state) => state.pet)

	const [canControl] = useCharacterStore((s) => [s.canControl])

	function useIsInsideKeyboardControls() {
		try {
			return !!useKeyboardControls()
		} catch {
			return false
		}
	}

	const isInsideKeyboardControls = useIsInsideKeyboardControls()

	/**
	 * keyboard controls setup
	 */
	// const [subscribeKeys, getKeys] = isInsideKeyboardControls ? useKeyboardControls() : [null]
	const [subscribeKeys, getKeys] = useKeyboardControls()
	// const presetKeys = { forward: false, backward: false, leftward: false, rightward: false, jump: false, run: false }
	const { rapier, world } = useRapier()

	// const isAiming = useRef(false)
	const isPokiedexOpen = usePokiedexStore((s) => s.isOpen)
	// const isCatchAxieUIOpen = useCatchAxieStore((s) => s.isOpenUI)
	// const isOpenCustomAvatarUI = useCustomAvatarStore((s) => s.isOpenUI)

	// const { setSpawnPosition, isSpawn } = useSpawnMonsterStore()

	// can jump setup
	let canJump = false
	let isFalling = false
	const initialGravityScale: number = useMemo(() => props.gravityScale || 1, [])

	// on moving object state
	let massRatio = 1
	let isOnMovingObject = false
	const standingForcePoint = useMemo(() => new THREE.Vector3(), [])
	const movingObjectDragForce = useMemo(() => new THREE.Vector3(), [])
	const movingObjectVelocity = useMemo(() => new THREE.Vector3(), [])
	const movingObjectVelocityInCharacterDir = useMemo(() => new THREE.Vector3(), [])
	const distanceFromCharacterToObject = useMemo(() => new THREE.Vector3(), [])
	const objectAngvelToLinvel = useMemo(() => new THREE.Vector3(), [])
	const velocityDiff = useMemo(() => new THREE.Vector3(), [])

	/**
	 * Follow camera initial setups from props
	 */
	const cameraSetups = {
		disableFollowCam,
		disableFollowCamPos,
		disableFollowCamTarget,
		camInitDis,
		camMaxDis,
		camMinDis,
		camMoveSpeed,
		camZoomSpeed,
		camCollisionOffset,
	}

	/**
	 * Load camera pivot and character move preset
	 */
	const {
		pivot,
		cameraCollisionDetect,
		// joystickCamMove
	} = useFollowCamera(cameraSetups)
	const pivotPosition = useMemo(() => new THREE.Vector3(), [])
	const modelEuler = useMemo(() => new THREE.Euler(), [])
	const modelQuat = useMemo(() => new THREE.Quaternion(), [])
	const moveImpulse = useMemo(() => new THREE.Vector3(), [])
	const movingDirection = useMemo(() => new THREE.Vector3(), [])
	const moveAccNeeded = useMemo(() => new THREE.Vector3(), [])

	const currentVel = useMemo(() => new THREE.Vector3(), [])
	const currentPos = useMemo(() => new THREE.Vector3(), [])
	const dragForce = useMemo(() => new THREE.Vector3(), [])
	const dragAngForce = useMemo(() => new THREE.Vector3(), [])
	const wantToMoveVel = useMemo(() => new THREE.Vector3(), [])
	const rejectVel = useMemo(() => new THREE.Vector3(), [])

	/**
	 * Floating Ray setup
	 */
	let floatingForce = null
	const springDirVec = useMemo(() => new THREE.Vector3(), [])
	const characterMassForce = useMemo(() => new THREE.Vector3(), [])
	const rayOrigin = useMemo(() => new THREE.Vector3(), [])
	const rayCast = new rapier.Ray(rayOrigin, rayDir)
	let rayHit: RayColliderToi | null = null

	/**Test shape ray */
	// const shape = new rapier.Capsule(0.2,0.1)

	/**
	 * Slope detection ray setup
	 */
	let slopeAngle = 0
	let actualSlopeNormal: Vector | null = null
	let actualSlopeAngle: number | null = null
	const actualSlopeNormalVec = useMemo(() => new THREE.Vector3(), [])
	const floorNormal = useMemo(() => new THREE.Vector3(0, 1, 0), [])
	const slopeRayOriginRef = useRef<THREE.Mesh>(null)
	const slopeRayorigin = useMemo(() => new THREE.Vector3(), [])
	const slopeRayCast = new rapier.Ray(slopeRayorigin, slopeRayDir)
	let slopeRayHit: RayColliderToi | null = null

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

		// Apply character quaternion to moving direction
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
				moveForceNeeded.x * turnVelMultiplier * (canJump ? 1 : airDragMultiplier),
				slopeAngle === null || slopeAngle === 0
					? 0
					: movingDirection.y *
							turnVelMultiplier *
							(movingDirection.y > 0 // check it is on slope up or slope down
								? slopeUpExtraForce
								: slopeDownExtraForce) *
							(run ? sprintMult : 1),
				moveForceNeeded.z * turnVelMultiplier * (canJump ? 1 : airDragMultiplier), // if it's in the air, give it less control
			)
		}
		// If character complete turning, change the impulse quaternion default
		else {
			moveImpulse.set(
				moveForceNeeded.x * (canJump ? 1 : airDragMultiplier),
				slopeAngle === null || slopeAngle === 0 // if it's on a slope, apply extra up/down force to the body
					? 0
					: movingDirection.y *
							(movingDirection.y > 0 // check it is on slope up or slope down
								? slopeUpExtraForce
								: slopeDownExtraForce) *
							(run ? sprintMult : 1),
				moveForceNeeded.z * (canJump ? 1 : airDragMultiplier),
			)
		}

		// Move character at proper direction and impulse
		characterRef.current.applyImpulseAtPoint(
			moveImpulse,
			{
				x: currentPos.x,
				y: currentPos.y + moveImpulsePointY,
				z: currentPos.z,
			},
			true,
		)

		// room?.send('move', {
		// 	position: { x: currentPos.x, y: currentPos.y, z: currentPos.z },
		// 	rotation: { x: modelEuler.x, y: modelEuler.y, z: modelEuler.z },
		// })
	}

	/**
	 * Character auto balance function
	 */
	const autoBalanceCharacter = () => {
		if (!characterRef.current) return

		// Match body component to character model rotation on Y
		bodyFacingVec.set(0, 0, 1).applyQuaternion(quat(characterRef.current.rotation()))
		bodyBalanceVec.set(0, 1, 0).applyQuaternion(quat(characterRef.current.rotation()))

		bodyBalanceVecOnX.set(0, bodyBalanceVec.y, bodyBalanceVec.z)
		bodyFacingVecOnY.set(bodyFacingVec.x, 0, bodyFacingVec.z)
		bodyBalanceVecOnZ.set(bodyBalanceVec.x, bodyBalanceVec.y, 0)

		// Check if is camera based movement
		if (getCameraBased().isCameraBased) {
			modelEuler.y = pivot.rotation.y
			pivot.getWorldDirection(modelFacingVec)
		} else {
			characterModelIndicator.getWorldDirection(modelFacingVec)
		}
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

		// Apply balance torque impulse
		characterRef.current.applyTorqueImpulse(dragAngForce, true)
	}

	/**
	 * Character sleep function
	 */
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

	useEffect(() => {
		let unSubscribeAction1 = () => {}
		let unSubscribeAction = () => {}
		let unSubscribeAction7 = () => {}

		if (isInsideKeyboardControls && subscribeKeys) {
			unSubscribeAction1 = subscribeKeys(
				(state) => state.action1,
				(value) => {
					if (value && action1Animation) {
						action1Animation()

						// if (!isSpawn) {
						if (!spawnPositionRef.current) return

						const spawnPosition = new THREE.Vector3()

						spawnPositionRef.current.getWorldPosition(spawnPosition)
						// setSpawnPosition(spawnPosition)
						// }
					}
				},
			)

			unSubscribeAction = subscribeKeys(
				(state) => state.action,
				(value) => {
					if (value) {
						// if (usingItem === 'hammer' || usingItem === 'net') swingAnimation()
						// if (isNearAxie) petAnimation()
					}
				},
			)

			unSubscribeAction7 = subscribeKeys(
				(state) => state.spawn,
				(value) => {
					if (value) {
						if (!spawnPositionRef.current) return

						const spawnPosition = new THREE.Vector3()

						spawnPositionRef.current.getWorldPosition(spawnPosition)
						// setSpawnPosition(spawnPosition)
					}
				},
			)
		}

		return () => {
			unSubscribeAction1()
			// unSubscribeAction2()
			// unSubscribeAction4()

			unSubscribeAction7()
			unSubscribeAction()
		}
	})

	useEffect(() => {
		if (!characterRef.current) return

		// Lock character rotations at Y axis
		characterRef.current.setEnabledRotations(!!autoBalance, !!autoBalance, !!autoBalance, false)

		// Reset character quaternion
		return () => {
			if (characterRef.current && characterModelRef.current) {
				characterModelRef.current.quaternion.set(0, 0, 0, 1)
				characterRef.current.setRotation({ x: 0, y: 0, z: 0, w: 1 }, false)
			}
		}
	}, [autoBalance])

	useEffect(() => {
		modelEuler.y = characterInitDir
		pivot.rotation.x = camInitDir.x
		pivot.rotation.y = camInitDir.y
		pivot.rotation.z = camInitDir.z

		window.addEventListener('visibilitychange', sleepCharacter)

		return () => {
			window.removeEventListener('visibilitychange', sleepCharacter)
		}
	}, [])

	// useEffect(() => {
	//   if (run && !SOUNDS.FOOTSTEP.playing()) SOUNDS.FOOTSTEP.play()
	// }, [])

	useFrame((state, delta) => {
		if (!characterRef.current) return
		if (!characterModelRef.current) return

		if (!slopeRayOriginRef.current) return

		//#region Character controller
		// Character current position
		if (characterRef.current) {
			currentPos.copy(characterRef.current.translation() as THREE.Vector3)
			;(characterRef.current.userData as userDataType).canJump = canJump
		}

		const { forward, backward, leftward, rightward, run } = getKeys()

		// Getting moving directions (IIFE)
		modelEuler.y = ((movingDirection) => (movingDirection === null ? modelEuler.y : movingDirection))(
			getMovingDirection(forward, backward, leftward, rightward, pivot),
		)

		// Move character to the moving direction
		if ((forward || backward || leftward || rightward) && canControl)
			moveCharacter(delta, run, slopeAngle, movingObjectVelocity)

		// Character current velocity
		if (characterRef.current) currentVel.copy(characterRef.current.linvel() as THREE.Vector3)

		// Rotate character Indicator
		modelQuat.setFromEuler(modelEuler)
		characterModelIndicator.quaternion.rotateTowards(modelQuat, delta * turnSpeed)

		/**
		 *  Camera movement
		 */

		// if (isPokiedexOpen || isCatchAxieUIOpen) {
		// 	camTargetPos = { x: 0, y: 1.7, z: 0 }
		// } else if (isOpenCustomAvatarUI) {
		// 	camTargetPos = { x: 0, y: -0, z: 0 }
		// } else {
		// 	camTargetPos = { x: 0, y: 0, z: 0 }
		// }

		if (isPokiedexOpen) {
			camTargetPos = { x: 0, y: 1.7, z: 0 }
		} else {
			camTargetPos = { x: 0, y: 0, z: 0 }
		}

		pivotPosition.set(
			currentPos.x + camTargetPos.x,
			currentPos.y + (camTargetPos.y || capsuleHalfHeight + capsuleRadius / 2),
			currentPos.z + camTargetPos.z,
		)
		pivot.position.lerp(pivotPosition, 1 - Math.exp(-camFollowMult * delta))
		!disableFollowCam && state.camera.lookAt(pivot.position)

		/**
		 * Ray casting detect if on ground
		 */
		rayOrigin.addVectors(currentPos, rayOriginOffest as THREE.Vector3)
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

		if (rayHit && rayHit.toi < floatingDis + rayHitForgiveness) {
			if (slopeRayHit && Number(actualSlopeAngle) < slopeMaxAngle) {
				canJump = true
			}
		} else {
			canJump = false
		}

		/**
		 * Ray detect if on rigid body or dynamic platform, then apply the linear velocity and angular velocity to character
		 */
		if (rayHit) {
			const parentCol = rayHit.collider.parent()

			if (!parentCol) return

			// Getting the standing force apply point
			standingForcePoint.set(rayOrigin.x, rayOrigin.y - rayHit.toi, rayOrigin.z)
			const rayHitObjectBodyType = parentCol.bodyType()
			const rayHitObjectBodyMass = parentCol.mass()

			massRatio = characterRef.current.mass() / rayHitObjectBodyMass
			// Body type 0 is rigid body, body type 1 is fixed body, body type 2 is kinematic body
			if (rayHitObjectBodyType === 0 || rayHitObjectBodyType === 2) {
				isOnMovingObject = true
				// Calculate distance between character and moving object
				distanceFromCharacterToObject.copy(currentPos).sub(parentCol.translation() as THREE.Vector3)
				// Moving object linear velocity
				const movingObjectLinvel = parentCol.linvel() as THREE.Vector3
				// Moving object angular velocity
				const movingObjectAngvel = parentCol.angvel() as THREE.Vector3

				// Combine object linear velocity and angular velocity to movingObjectVelocity
				movingObjectVelocity
					.set(
						movingObjectLinvel.x +
							objectAngvelToLinvel.crossVectors(movingObjectAngvel, distanceFromCharacterToObject).x,
						movingObjectLinvel.y,
						movingObjectLinvel.z +
							objectAngvelToLinvel.crossVectors(movingObjectAngvel, distanceFromCharacterToObject).z,
					)
					.multiplyScalar(Math.min(1, 1 / massRatio))
				// If the velocity diff is too high (> 30), ignore movingObjectVelocity
				velocityDiff.subVectors(movingObjectVelocity, currentVel)
				if (velocityDiff.length() > 30) movingObjectVelocity.multiplyScalar(1 / velocityDiff.length())

				if (rayHitObjectBodyType === 0) {
					if (!forward && !backward && !leftward && !rightward && canJump) {
						movingObjectDragForce
							.copy(bodyContactForce)
							.multiplyScalar(delta)
							.multiplyScalar(Math.min(1, 1 / massRatio)) // Scale up/down base on different masses ratio
							.negate()
						bodyContactForce.set(0, 0, 0)
					} else {
						movingObjectDragForce
							.copy(moveImpulse)
							.multiplyScalar(Math.min(1, 1 / massRatio)) // Scale up/down base on different masses ratio
							.negate()
					}
					parentCol.applyImpulseAtPoint(movingObjectDragForce, standingForcePoint, true)
				}
			} else {
				// on fixed body
				massRatio = 1
				isOnMovingObject = false
				bodyContactForce.set(0, 0, 0)
				movingObjectVelocity.set(0, 0, 0)
			}
		} else {
			// in the air
			massRatio = 1
			isOnMovingObject = false
			bodyContactForce.set(0, 0, 0)
			movingObjectVelocity.set(0, 0, 0)
		}

		/**
		 * Slope ray casting detect if on slope
		 */
		slopeRayOriginRef.current.getWorldPosition(slopeRayorigin)
		slopeRayorigin.y = rayOrigin.y
		slopeRayHit = world.castRay(
			slopeRayCast,
			slopeRayLength,
			true,
			undefined,
			undefined,
			// Still no idea
			characterRef.current as unknown as Collider,
			characterRef.current,
			// this exclude with sensor collider
			(collider) => !collider.isSensor(),
		)

		// Calculate slope angle
		if (slopeRayHit) {
			actualSlopeNormal = slopeRayHit.collider.castRayAndGetNormal(slopeRayCast, slopeRayLength, false)
				?.normal as Vector
			if (actualSlopeNormal) {
				actualSlopeNormalVec?.set(actualSlopeNormal.x, actualSlopeNormal.y, actualSlopeNormal.z)
				actualSlopeAngle = actualSlopeNormalVec?.angleTo(floorNormal)
			}
		}
		if (slopeRayHit && rayHit && slopeRayHit.toi < floatingDis + 0.5) {
			if (canJump) {
				// Round the slope angle to 2 decimal places
				slopeAngle = Number(Math.atan((rayHit.toi - slopeRayHit.toi) / slopeRayOriginOffest).toFixed(2))
			} else {
				slopeAngle = 0
			}
		} else {
			slopeAngle = 0
		}

		/**
		 * Apply floating force
		 */
		if (rayHit != null) {
			if (canJump && rayHit.collider.parent()) {
				floatingForce = springK * (floatingDis - rayHit.toi) - characterRef.current.linvel().y * dampingC
				characterRef.current.applyImpulse(springDirVec.set(0, floatingForce, 0), false)

				// Apply opposite force to standing object (gravity g in rapier is 0.11 ?_?)
				characterMassForce.set(0, floatingForce > 0 ? -floatingForce : 0, 0)
				rayHit.collider.parent()?.applyImpulseAtPoint(characterMassForce, standingForcePoint, true)
			}
		}

		/**
		 * Apply drag force if it's not moving
		 */
		if (!forward && !backward && !leftward && !rightward && canJump) {
			// not on a moving object
			if (!isOnMovingObject) {
				dragForce.set(-currentVel.x * dragDampingC, 0, -currentVel.z * dragDampingC)
				characterRef.current.applyImpulse(dragForce, false)
			}
			// on a moving object
			else {
				dragForce.set(
					(movingObjectVelocity.x - currentVel.x) * dragDampingC,
					0,
					(movingObjectVelocity.z - currentVel.z) * dragDampingC,
				)
				characterRef.current.applyImpulse(dragForce, true)
			}
		}

		isFalling = !!(currentVel.y < 0 && !canJump)

		if (characterRef.current) {
			if (currentVel.y < fallingMaxVel && characterRef.current.gravityScale() !== 0) {
				characterRef.current.setGravityScale(0, true)
			} else if (isFalling && characterRef.current.gravityScale() !== fallingGravityScale) {
				characterRef.current.setGravityScale(fallingGravityScale, true)
			} else if (!isFalling && characterRef.current.gravityScale() !== initialGravityScale) {
				characterRef.current.setGravityScale(initialGravityScale, true)
			}
		}

		autoBalanceCharacter()

		camCollision && cameraCollisionDetect(delta)

		if (!forward && !backward && !leftward && !rightward && canJump) {
			idleAnimation()
			// isUnderWater ? swimAnimation() : idleAnimation()
			// SOUNDS.RUN_FOOTSTEP.stop()
			// SOUNDS.WALK_FOOTSTEP.stop()
		} else if (forward || backward || leftward || rightward) {
			if (run) {
				runAnimation()
				// isUnderWater ? swimAnimation() : runAnimation()
				// if (!SOUNDS.RUN_FOOTSTEP.playing() && run) SOUNDS.RUN_FOOTSTEP.play()
			} else {
				walkAnimation()
				// isUnderWater ? swimAnimation() : walkAnimation()
				// if (!SOUNDS.WALK_FOOTSTEP.playing() && !run) SOUNDS.WALK_FOOTSTEP.play()
			}
		}
		// On high sky, play falling animation
		if (rayHit == null && isFalling) {
			fallAnimation()
		}
		//#endregion
	})

	return (
		<RigidBody
			colliders={false}
			ref={characterRef}
			position={props.position || [0, 5, 0]}
			friction={props.friction || -0.5}
			onContactForce={(e) => bodyContactForce.set(e.totalForce.x, e.totalForce.y, e.totalForce.z)}
			onCollisionExit={() => bodyContactForce.set(0, 0, 0)}
			userData={{ canJump: false }}
			{...props}
		>
			<CapsuleCollider name="character-body" args={[capsuleHalfHeight, capsuleRadius]} />
			<BallCollider args={[0.5]} position={[0, 0.3, 0]} />

			<group name="character" ref={characterModelRef} userData={{ camExcludeCollision: true }}>
				<mesh
					position={[rayOriginOffest.x, rayOriginOffest.y, rayOriginOffest.z + slopeRayOriginOffest]}
					ref={slopeRayOriginRef}
					visible={showSlopeRayOrigin}
					userData={{ camExcludeCollision: true }}
				>
					<boxGeometry args={[0.15, 0.15, 0.15]} />
				</mesh>

				<object3D ref={spawnPositionRef} name="spawn-position" position={[0, 0.1, -2]} />

				{children}
			</group>
		</RigidBody>
	)
}

export default CharacterController
