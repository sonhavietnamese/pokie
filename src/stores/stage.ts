import { create } from 'zustand'

export type Stage = 'onboarding' | 'home' | 'profile' | 'settings'

interface StageState {
	stage: Stage | null
	setStage: (stage: Stage) => void
}

export const useStageStore = create<StageState>()((set) => ({
	stage: null,
	setStage: (stage: Stage) => set({ stage }),
}))
