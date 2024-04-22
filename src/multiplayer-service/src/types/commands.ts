import type { Position } from '@/rooms/schema/player'
import type { BaseCommandPayload } from './common'
import type { UserChangeAnimationMessage, UserMoveMessage } from './messages'

export interface UserLeaveCommandPayload extends BaseCommandPayload {}

export interface UserJoinCommandPayload extends BaseCommandPayload {
	username: string
	address: string
	position: Position
	skin: string
}

export interface UserMoveCommandPayload extends BaseCommandPayload, UserMoveMessage {}

export interface UserChangeAnimationCommandPayload extends BaseCommandPayload, UserChangeAnimationMessage {}
