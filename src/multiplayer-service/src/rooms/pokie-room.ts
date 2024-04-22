import { UserChangeAnimationCommand, UserJoinCommand, UserLeaveCommand, UserMoveCommand } from '@/commands/user-command'
import type { JoinOptions } from '@/types/join'
import type { UserChangeAnimationMessage, UserMoveMessage } from '@/types/messages'
import { Dispatcher } from '@colyseus/command'
import { type Client, Room } from '@colyseus/core'
import { RoomState } from './schema/room-state'

export class PokieRoom extends Room<RoomState> {
	dispatcher = new Dispatcher(this)

	onCreate() {
		this.setState(new RoomState())

		this.onMessage('move', (client, message: UserMoveMessage) => {
			this.dispatcher.dispatch(new UserMoveCommand(), {
				sessionId: client.sessionId,
				position: message.position,
				rotation: message.rotation,
			})
		})
		this.onMessage('change-animation', (client, message: UserChangeAnimationMessage) => {
			this.dispatcher.dispatch(new UserChangeAnimationCommand(), {
				sessionId: client.sessionId,
				animation: message.animation,
			})
		})

		this.onMessage('change-skin', (client, message: { skin: string }) => {
			this.state.players.get(client.sessionId).skin = message.skin
		})
	}

	onJoin(client: Client, options: JoinOptions) {
		console.log(client.sessionId, 'joined!')

		this.dispatcher.dispatch(new UserJoinCommand(), {
			sessionId: client.sessionId,
			username: options.username,
			position: options.position,
			address: options.address,
			skin: options.skin,
		})
	}

	onLeave(client: Client, consented: boolean) {
		this.dispatcher.dispatch(new UserLeaveCommand(), {
			sessionId: client.sessionId,
		})
	}

	onDispose() {
		console.log('room', this.roomId, 'disposing...')
	}
}
