import { create } from 'zustand'
import type { Quest } from './type'

interface QuestState {
	onGoingQuestId: string
	setOnGoingQuestId: (questId: string) => void

	clear: () => void
}

export const useQuestStore = create<QuestState>()((set) => ({
	onGoingQuestId: '',
	setOnGoingQuestId: (questId: string) => set(() => ({ onGoingQuestId: questId })),

	clear: () => set(() => ({ quests: null, onGoingQuestId: '' })),
}))
