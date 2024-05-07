import { create } from 'zustand'

interface PokieCoinBalanceStoreState {
	balance: number
	setBalance: (balance: number) => void
}

export const usePokieCoinBalanceStore = create<PokieCoinBalanceStoreState>()((set) => ({
	balance: 0,
	setBalance: (balance: number) => set(() => ({ balance })),
}))
