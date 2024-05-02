import type { ReactNode } from 'react'
import { create } from 'zustand'
import type { Quest } from './type'

interface QuestState {
	quests: Quest | null
	newQuest: (quest: Quest) => void
}

export const useQuestStore = create<QuestState>()((set) => ({
	quests: null,
	newQuest: (quest: Quest) =>
		set(() => {
			return { quests: quest }
		}),
}))
