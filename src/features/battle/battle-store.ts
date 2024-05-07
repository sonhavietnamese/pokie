import { create } from 'zustand'

export type Move = 'rock' | 'paper' | 'scissors' | null
export type Actor = 'player' | 'bot'

export type PlayerState = {
  health: number
  move: Move
}

export type State = 'ready' | 'waiting' | 'animation' | 'end'

export type History = {
  player: {
    move: Move
    result: 'draw' | 'win' | 'lose'
  }
  bot: { move: Move; result: 'draw' | 'win' | 'lose' }
}

type BattleState = {
  isStarted: boolean
  setIsStarted: (isStarted: boolean) => void

  players: Record<Actor, PlayerState> | null
  setPlayers: (players: Record<Actor, PlayerState> | null) => void
  setPlayerMove: (actor: Actor, move: Move) => void
  setPlayerHealth: (actor: Actor, health: number) => void

  currentTurn: string
  setCurrentTurn: (currentTurn: string) => void

  roundCountdown: number

  history: History[]
  addHistory: (history: History) => void
  clearHistory: () => void

  stage: State
  setStage: (stage: State) => void

  round: number
  setRound: (round: number) => void

  selectedMove: Move
  setSelectedMove: (move: Move) => void

  roundWinner: 'player' | 'bot' | 'draw'
  setRoundWinner: (roundWinner: 'player' | 'bot' | 'draw') => void
}

export const useBattleStore = create<BattleState>()((set) => ({
  isStarted: false,
  setIsStarted: (isStarted) => set({ isStarted }),

  players: null,
  setPlayers: (players) => set({ players }),
  setPlayerMove: (actor, move) => {
    set((state) => {
      if (!state.players) return state
      return {
        players: {
          ...state.players,
          [actor]: { ...state.players[actor], move },
        },
      }
    })
  },
  setPlayerHealth: (actor, health) => {
    set((state) => {
      if (!state.players) return state
      return {
        players: {
          ...state.players,
          [actor]: { ...state.players[actor], health },
        },
      }
    })
  },

  currentTurn: '',
  setCurrentTurn: (currentTurn) => set({ currentTurn }),

  roundCountdown: 10,

  history: [],
  addHistory: (history) => set((state) => ({ history: [...state.history, history] })),
  clearHistory: () => set({ history: [] }),

  stage: 'ready',
  setStage: (stage) => set({ stage }),

  round: 0,
  setRound: (round) => set({ round }),

  selectedMove: null,
  setSelectedMove: (selectedMove) => set({ selectedMove }),

  roundWinner: 'draw',
  setRoundWinner: (roundWinner) => set({ roundWinner }),
}))
