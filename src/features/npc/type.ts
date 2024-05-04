import type { NPCS } from '@/libs/constants'

export type NpcType = keyof typeof NPCS

export type Npc = (typeof NPCS)[NpcType]
