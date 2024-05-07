import { BATTLE_MAX_DAMAGE } from '@/libs/constants'
import { useRef } from 'react'
import { type Actor, type Move, useBattleStore } from './battle-store'

type MoveParams = {
	[player in Actor]: { move: Move }
}

export function useBattle() {
	const store = useBattleStore()

	const playerMove = useRef<Move>(null)
	const botMove = useRef<Move>(null)

	const start = () => {
		store.setIsStarted(true)
		store.setPlayers({
			player: { health: 100, move: null },
			bot: { health: 100, move: null },
		})
		store.setRound(1)
	}

	const cleanUp = () => {
		store.setIsStarted(false)
		store.setPlayers(null)
		store.setCurrentTurn('')
		store.clearHistory()
		store.setStage('ready')
		store.setRoundWinner('draw')
	}

	const move = ({ player, bot }: MoveParams) => {
		if (!store.isStarted) return
		if (!store.players) return

		store.setPlayerMove('player', player.move)
		store.setPlayerMove('bot', bot.move)

		playerMove.current = player.move
		botMove.current = bot.move
	}

	const process = () => {
		let roundWinner = 'draw'

		if (!store.isStarted) return roundWinner
		if (!store.players) return roundWinner

		if (botMove.current === 'rock' && playerMove.current === 'scissors') {
			store.setPlayerHealth('player', store.players.player.health - BATTLE_MAX_DAMAGE)
			roundWinner = 'bot'
		}
		if (botMove.current === 'scissors' && playerMove.current === 'paper') {
			store.setPlayerHealth('player', store.players.player.health - BATTLE_MAX_DAMAGE)
			roundWinner = 'bot'
		}
		if (botMove.current === 'paper' && playerMove.current === 'rock') {
			store.setPlayerHealth('player', store.players.player.health - BATTLE_MAX_DAMAGE)
			roundWinner = 'bot'
		}
		if (playerMove.current === 'rock' && botMove.current === 'scissors') {
			store.setPlayerHealth('bot', store.players.bot.health - BATTLE_MAX_DAMAGE)
			roundWinner = 'player'
		}
		if (playerMove.current === 'scissors' && botMove.current === 'paper') {
			store.setPlayerHealth('bot', store.players.bot.health - BATTLE_MAX_DAMAGE)
			roundWinner = 'player'
		}
		if (playerMove.current === 'paper' && botMove.current === 'rock') {
			store.setPlayerHealth('bot', store.players.bot.health - BATTLE_MAX_DAMAGE)
			roundWinner = 'player'
		}

		store.addHistory({
			player: {
				move: playerMove.current,
				result: roundWinner === 'draw' ? 'draw' : roundWinner === 'player' ? 'win' : 'lose',
			},
			bot: { move: botMove.current, result: roundWinner === 'draw' ? 'draw' : roundWinner === 'bot' ? 'win' : 'lose' },
		})

		// store.setRound(store.round + 1)

		return roundWinner
	}

	const winner = () => {
		if (!store.isStarted) return null
		if (!store.players) return null

		if (store.players.player.health <= 0) {
			return 'bot' as Actor
		}

		if (store.players.bot.health <= 0) {
			return 'player' as Actor
		}

		return null
	}

	return {
		...store,
		start,
		move,
		cleanUp,
		winner,
		process,
	}
}
