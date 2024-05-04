import { NPCS } from '@/libs/constants'
import { create } from 'zustand'
import type { Npc, NpcType } from './type'

interface NpcStore {
	npc: Npc | null
	meetNpc: (id: NpcType) => void
}

export const useNpcStore = create<NpcStore>()((set) => ({
	npc: null,
	meetNpc: (id) =>
		set(() => {
			return { npc: NPCS[id] }
		}),
}))
