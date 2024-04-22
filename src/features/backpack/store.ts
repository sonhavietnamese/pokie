import { create } from 'zustand'

interface BackpackStoreState {
	isOpen: boolean
	setOpen: (isOpen: boolean) => void
}

export const useBackpackStore = create<BackpackStoreState>()((set) => ({
	isOpen: false,
	setOpen: (isOpen: boolean) => set({ isOpen }),
}))
