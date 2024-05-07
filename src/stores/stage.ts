import { create } from 'zustand'

export type Stage = 'onboarding' | 'home' | 'profile' | 'settings' | 'battle'

interface StageState {
	stage: Stage | null
	setStage: (stage: Stage) => void

	loaded: boolean
	setLoaded: (loaded: boolean) => void
}

export const useStageStore = create<StageState>()((set) => ({
	stage: null,
	setStage: (stage: Stage) => set({ stage }),

	loaded: false,
	setLoaded: (loaded: boolean) => set({ loaded }),
}))
