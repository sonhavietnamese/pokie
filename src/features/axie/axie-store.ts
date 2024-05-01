import type { BodyShape } from '@/components/axie-mixer/types'
import { create } from 'zustand'

export type AxieParts = {
	bodyShape: BodyShape
	parts: Record<string, { id: string; name: string }>
	primaryColor: string
	class: string
}

type AxieState = {
	axies: Record<string, AxieParts>
	addAxie: (id: string, axie: AxieParts) => void
}

export const useAxieStore = create<AxieState>()((set) => ({
	axies: {},
	addAxie: (id, axie) => set((state) => ({ axies: { ...state.axies, [id]: axie } })),
}))
