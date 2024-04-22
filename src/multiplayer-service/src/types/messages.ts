import type { Position, Rotation } from '@/rooms/schema/player'

export interface UserMoveMessage {
	position: Position
	rotation: Rotation
}

export interface UserChangeAnimationMessage {
	animation: string
}
