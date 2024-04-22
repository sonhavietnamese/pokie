import { Command } from '@colyseus/command'
import type { PokieRoom } from '../rooms/pokie-room'
import type {
	UserChangeAnimationCommandPayload,
	UserJoinCommandPayload,
	UserLeaveCommandPayload,
	UserMoveCommandPayload,
} from '../types/commands'

export class UserJoinCommand extends Command<
	PokieRoom,
	UserJoinCommandPayload
> {
	execute({
		sessionId,
		username,
		position,
		address,
		skin,
	}: UserJoinCommandPayload) {
		this.state.createUser(sessionId, username, address, position, skin)
	}
}

export class UserMoveCommand extends Command<
	PokieRoom,
	UserMoveCommandPayload
> {
	execute({ sessionId, position, rotation }: UserMoveCommandPayload) {
		const user = this.state.players.get(sessionId)

		user.setPosition(position)
		user.setRotation(rotation)

		user.timestamp = Date.now()
	}
}

export class UserChangeAnimationCommand extends Command<
	PokieRoom,
	UserChangeAnimationCommandPayload
> {
	execute({ sessionId, animation }: UserChangeAnimationCommandPayload) {
		this.state.players.get(sessionId).setAnimation(animation)
	}
}

export class UserLeaveCommand extends Command<
	PokieRoom,
	UserLeaveCommandPayload
> {
	execute({ sessionId }: UserLeaveCommandPayload) {
		this.state.removeUser(sessionId)
	}
}
