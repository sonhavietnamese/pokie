import { MapSchema, Schema, type } from '@colyseus/schema'

import { Player, type Position } from './player'

export class RoomState extends Schema {
	@type({ map: Player }) players = new MapSchema<Player>()

	@type('number') serverTime: number = Date.now()

	createUser(sessionId: string, username: string, address: string, position: Position, skin: string) {
		this.players.set(sessionId, new Player(username, address, position, 'idle', skin))
	}

	removeUser(sessionId: string) {
		this.players.delete(sessionId)
	}
}
