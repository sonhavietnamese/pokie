import { create } from 'zustand'

interface QuestState {
	onGoingQuestId: string
	setOnGoingQuestId: (questId: string) => void

	reward: {
		id: string
	} | null
	setReward: (
		reward: {
			id: string
		} | null,
	) => void

	clear: () => void
}

export const useQuestStore = create<QuestState>()((set) => ({
	onGoingQuestId: '',
	setOnGoingQuestId: (questId: string) => set(() => ({ onGoingQuestId: questId })),

	reward: null,
	setReward: (reward) => set(() => ({ reward })),

	clear: () => set(() => ({ quests: null, onGoingQuestId: '' })),
}))
