import type { RigidBodyProps } from '@react-three/rapier'
import type { ReactNode } from 'react'

export type Props = RigidBodyProps & {
	children: ReactNode
	capsuleHalfHeight?: number
	capsuleRadius?: number
	floatHeight?: number
	characterInitDir?: number
	followLight?: boolean
	disableFollowCam?: boolean
	disableFollowCamPos?: { x: number; y: number; z: number }
	disableFollowCamTarget?: { x: number; y: number; z: number }
	camInitDis?: number
	camMaxDis?: number
	camMinDis?: number
	camInitDir?: { x: number; y: number; z: number }
	camTargetPos?: { x: number; y: number; z: number }
	camMoveSpeed?: number
	camZoomSpeed?: number
	camCollision?: boolean
	camCollisionOffset?: number
	followLightPos?: { x: number; y: number; z: number }
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
	camFollowMult?: number
	fallingGravityScale?: number
	fallingMaxVel?: number
	wakeUpDelay?: number
	rayOriginOffest?: { x: number; y: number; z: number }
	rayHitForgiveness?: number
	rayLength?: number
	rayDir?: { x: number; y: number; z: number }
	floatingDis?: number
	springK?: number
	dampingC?: number
	showSlopeRayOrigin?: boolean
	slopeMaxAngle?: number
	slopeRayOriginOffest?: number
	slopeRayLength?: number
	slopeRayDir?: { x: number; y: number; z: number }
	slopeUpExtraForce?: number
	slopeDownExtraForce?: number
	autoBalance?: boolean
	autoBalanceSpringK?: number
	autoBalanceDampingC?: number
	autoBalanceSpringOnY?: number
	autoBalanceDampingOnY?: number
	mode?: 'PointToMove' | 'CameraBasedMovement'
	props?: RigidBodyProps
}

export interface userDataType {
	canJump?: boolean
}
