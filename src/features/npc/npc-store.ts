import { NPCS } from '@/libs/constants'
import { create } from 'zustand'
import type { Npc, NpcType } from './type'

interface NpcStore {
	npc: Npc | null
	meetNpc: (id: NpcType | undefined) => void

	isTalking: boolean
	setIsTalking: (isTalking: boolean) => void

	cameraPosition: [number, number, number]
	setCameraPosition: (position: [number, number, number]) => void
}

export const useNpcStore = create<NpcStore>()((set) => ({
	npc: null,
	meetNpc: (id) =>
		set(() => {
			if (!id) return { npc: null }

			return { npc: NPCS[id] }
		}),

	isTalking: false,
	setIsTalking: (isTalking) => set({ isTalking }),

	cameraPosition: [0, 0, 0],
	setCameraPosition: (position) => set({ cameraPosition: position }),
}))
