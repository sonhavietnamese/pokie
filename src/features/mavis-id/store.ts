import { create } from 'zustand'

interface MavisIdStoreState {
	open: boolean
	setOpen: (open: boolean) => void

	connected: boolean
	setConnected: (connected: boolean) => void
}

export const useMavisIdStore = create<MavisIdStoreState>()((set) => ({
	open: false,
	setOpen: (open: boolean) => set({ open }),

	connected: false,
	setConnected: (connected: boolean) => set({ connected }),
}))
