import { random } from 'lodash-es'
import { create } from 'zustand'

type Butterfly = {
	position: [number, number, number]
	scale: number
	id: string
}

type ButterflyState = {
	butterflies: Butterfly[]
	setButterflies: (butterflies: []) => void
	addButterfly: (butterfly: Butterfly) => void
	removeButterfly: (butterflyId: string) => void
}

export const useButterflyStore = create<ButterflyState>()((set) => ({
	butterflies: [
		{
			position: [3, 1, 2],
			scale: 1,
			id: random(0, 100000).toString(),
		},
	],
	setButterflies: (butterflies: []) => set({ butterflies }),
	addButterfly: (butterfly: Butterfly) => set((state) => ({ butterflies: [...state.butterflies, butterfly] })),
	removeButterfly: (butterflyId: string) =>
		set((state) => ({ butterflies: state.butterflies.filter((b) => b.id !== butterflyId) })),
}))
