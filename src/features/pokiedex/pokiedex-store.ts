import { create } from 'zustand'

type PokiedexState = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void

	aimedAxie: string | null
	setAimedAxie: (axieId: string | null) => void
}

export const usePokiedexStore = create<PokiedexState>()((set) => ({
	isOpen: false,
	setIsOpen: (isOpen: boolean) => set({ isOpen }),

	aimedAxie: null,
	setAimedAxie: (aimedAxie: string | null) => set({ aimedAxie }),
}))
