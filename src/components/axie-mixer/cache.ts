import type { MixerProps } from '@/components/axie-mixer/types'
import { create } from 'zustand'

type CacheState = {
	axies: Record<string, MixerProps>
	addAxie: (id: string, axie: MixerProps) => void
}

export const useAxieCacheStore = create<CacheState>()((set) => ({
	axies: {},
	addAxie: (id, axie) =>
		set((state) => ({ axies: { ...state.axies, [id]: axie } })),
}))
