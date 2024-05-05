import { create } from 'zustand'
import type { Quest } from './type'

interface QuestState {
	quest: Quest | null
	newQuest: (quest: Quest) => void

	onGoingQuest: string

	clear: () => void
}

export const useQuestStore = create<QuestState>()((set) => ({
	quest: null,
	newQuest: (quest: Quest) =>
		set(() => {
			return { quests: quest, onGoingQuest: quest.id }
		}),

	onGoingQuest: '',

	clear: () => set(() => ({ quests: null, onGoingQuest: '' })),
}))
