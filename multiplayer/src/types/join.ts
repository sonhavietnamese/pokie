import type { Position } from '@/rooms/schema/player'

export interface JoinOptions {
	roomId: string
	username: string
	position: Position
	address: string
	skin: string
}
