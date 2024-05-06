import { NPCS } from '@/libs/constants'
import { create } from 'zustand'
import type { Npc, NpcType } from './type'

interface NpcStore {
	npc: Npc | null
	meetNpc: (id: NpcType | undefined) => void
}

export const useNpcStore = create<NpcStore>()((set) => ({
	npc: null,
	meetNpc: (id) =>
		set(() => {
			if (!id) return { npc: null }

			return { npc: NPCS[id] }
		}),
}))
