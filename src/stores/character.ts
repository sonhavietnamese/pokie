import { create } from 'zustand'

interface CharacterState {
	canControl: boolean
	setCanControl: (canControl: boolean) => void
}

export const useCharacterStore = create<CharacterState>()((set) => ({
	canControl: true,
	setCanControl: (canControl: boolean) => set({ canControl }),
}))
