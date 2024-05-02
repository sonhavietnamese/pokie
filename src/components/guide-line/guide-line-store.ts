import { create } from 'zustand'

type CatchAxie = {
	id: string
	caught: boolean
}

type GuideLineState = {
	isEnable: boolean
	setEnable: (isEnable: boolean) => void
}

export const useGuideLineStore = create<GuideLineState>()((set) => ({
	isEnable: false,
	setEnable: (isEnable: boolean) => set({ isEnable }),
}))
