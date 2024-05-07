'use client'

import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { useNpcStore } from '@/features/npc/npc-store'
import { useCountDown } from '@/hooks/use-countdown'
import {
	BATTLE_ANIMATION_COUNTDOWN,
	BATTLE_END_COUNTDOWN,
	BATTLE_READY_COUNTDOWN,
	BATTLE_ROUND_COUNTDOWN,
} from '@/libs/constants'
import { useStageStore } from '@/stores/stage'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { ActionPanel } from './action-panel'
import type { Move } from './battle-store'
import { useBattle } from './use-battle'

const Defeat = dynamic(() => import('@/features/battle/defeat'))
const Victory = dynamic(() => import('@/features/battle/victory'))
const BattleHeader = dynamic(() => import('@/features/battle/header'))
const BattleHistory = dynamic(() => import('@/features/battle/history'))
const FightCutscene = dynamic(() => import('@/features/battle/fight-cutscene'))

const initialTime: number = 20000
const interval: number = 1000

export default function BattleSystem() {
	const {
		stage,
		setStage,
		isStarted,
		start: startGame,
		process,
		cleanUp,
		winner,
		move,
		round,
		setRound,
		selectedMove,
		setSelectedMove,
		roundWinner,
		setRoundWinner,
	} = useBattle()
	const setGameStage = useStageStore((s) => s.setStage)
	const [showFightCutscene, setShowFightCutscene] = useState(false)
	const setIsTalking = useNpcStore((s) => s.setIsTalking)

	const [timeLeft, { start, isRunning, isEnd, reset }] = useCountDown(initialTime, interval)

	const [playerMove, setPlayerMove] = useState<Move>(null)
	const [botMove, setBotMove] = useState<Move>(null)

	useEffect(() => {
		startGame()
	}, [])

	useEffect(() => {
		if (!isStarted) return

		switch (stage) {
			case 'ready':
				if (isEnd && timeLeft === 0) {
					setStage('waiting')
				}
				if (!isRunning) start(BATTLE_READY_COUNTDOWN * interval)
				break
			case 'waiting':
				if (isEnd && timeLeft <= 0) {
					if (!selectedMove) {
						action('rock')
						setSelectedMove('rock')
					}
					setStage('animation')
					setRoundWinner(process() as 'player' | 'bot' | 'draw')
				}
				if (!isRunning) start(BATTLE_ROUND_COUNTDOWN * interval)
				break
			case 'animation':
				if (isEnd && timeLeft <= 0) {
					setStage('waiting')
					setRound(round + 1)
					setSelectedMove(null)
					if (winner()) {
						setStage('end')
					}
				}

				if (!isRunning) {
					start(BATTLE_ANIMATION_COUNTDOWN * interval)
				}
				break
			case 'end':
				if (!isRunning && timeLeft !== 0) start(BATTLE_END_COUNTDOWN * interval)
				if (isEnd && timeLeft === 0) {
					cleanUp()
					reset()
				}
				break
		}
	}, [stage, isStarted, isEnd, isRunning, timeLeft, start, winner, setStage, process, cleanUp, reset])

	const action = (selectedMove: Move) => {
		const moves = ['rock', 'paper', 'scissors']
		const botMove = moves[Math.floor(Math.random() * moves.length)] as Move

		move({ player: { move: selectedMove }, bot: { move: botMove } })

		setPlayerMove(selectedMove)
		setBotMove(botMove)
	}

	useEffect(() => {
		if (stage === 'animation') {
			setShowFightCutscene(true)

			setTimeout(() => {
				setShowFightCutscene(false)
			}, 2500)
		} else {
			setShowFightCutscene(false)
		}

		if (stage === 'end') {
			setTimeout(() => {
				setGameStage('home')
				setIsTalking(false)

				cleanUp()
				reset()
			}, 2000)
		}
	}, [stage])

	return (
		<>
			<BattleHeader timer={stage === 'waiting' ? String(timeLeft / 1000) : '-'} round={round} />

			<AnimatePresence>
				{showFightCutscene && (
					<FightCutscene
						show={showFightCutscene}
						winner={roundWinner === 'player' ? 'left' : roundWinner === 'bot' ? 'right' : 'draw'}
						leftMove={playerMove}
						rightMove={botMove}
					/>
				)}
			</AnimatePresence>

			{stage !== 'animation' && <BattleHistory />}

			{stage === 'waiting' && <ActionPanel onSelected={(move) => action(move)} />}

			<figure className="absolute bottom-6 left-6 z-[3]" onMouseUp={() => setStage('end')}>
				<Sprite
					data={{
						part: '1',
						m: SPRITESHEET_DATA.frames['battle-icon-arrow.png'].frame,
					}}
					className="h-20 w-20"
				/>
			</figure>

			{winner() === 'player' && stage === 'end' && <Victory />}
			{winner() === 'bot' && stage === 'end' && <Defeat />}
		</>
	)
}
