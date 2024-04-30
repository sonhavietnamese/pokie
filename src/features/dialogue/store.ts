import { create } from 'zustand'
import dialoguesData from './dialogues.json'
import type { Dialogue, DialogueNode } from './type'

interface DialogueStore {
	data: typeof dialoguesData

	dialogues: Dialogue
	setDialogues: (dialogues: Dialogue) => void

	selectedDialogue: keyof typeof dialoguesData | null
	setSelectedDialogue: (selectedDialogue: keyof typeof dialoguesData | null) => void

	subDialogue: DialogueNode
	setSubDialogue: (subDialogue: DialogueNode) => void

	bottomDialogues: Dialogue | null
	setBottomDialogues: (bottomDialogues: Dialogue | null) => void
}

export const useDialogueStore = create<DialogueStore>()((set, get) => ({
	data: dialoguesData,

	dialogues: dialoguesData.onboarding as unknown as Dialogue,
	setDialogues: (dialogues) => set({ dialogues }),

	selectedDialogue: 'onboarding',
	setSelectedDialogue: (selectedDialogue) => set({ selectedDialogue }),

	subDialogue: dialoguesData.onboarding.hello_01,
	setSubDialogue: (subDialogue) => set({ subDialogue }),

	bottomDialogues: null,
	setBottomDialogues: (bottomDialogues) => set({ bottomDialogues }),
}))
