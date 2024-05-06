// @ts-nocheck

import { create } from 'zustand'
import dialoguesData from './dialogues.json'
import type { Dialogue, DialogueNode } from './type'

type DialogType = 'top' | 'bottom'
export type DialogueID = keyof typeof dialoguesData

interface DialogueStore {
	data: typeof dialoguesData

	topDialogues: Dialogue
	setTopDialogues: (topDialogues: Dialogue) => void

	selectedDialogue: DialogueID | null
	setSelectedDialogue: (selectedDialogue: DialogueID | null) => void

	subDialogue: DialogueNode | null
	setSubDialogue: (subDialogue: DialogueNode | null) => void

	bottomDialogues: Dialogue | null
	setBottomDialogues: (bottomDialogues: Dialogue | null) => void

	dialogueType: DialogType | null
	showDialogue: (dialogue: DialogueID, dialogueType: DialogType | null) => void

	clear: () => void
}

export const useDialogueStore = create<DialogueStore>()((set, get) => ({
	data: dialoguesData,

	topDialogues: dialoguesData.onboarding as unknown as Dialogue,
	setTopDialogues: (topDialogues) => set({ topDialogues }),

	selectedDialogue: null,
	setSelectedDialogue: (selectedDialogue) => set({ selectedDialogue }),

	subDialogue: null,
	setSubDialogue: (subDialogue) => set({ subDialogue }),

	bottomDialogues: null,
	setBottomDialogues: (bottomDialogues) => set({ bottomDialogues }),

	dialogueType: null,
	showDialogue: (dialogue, dialogueType) =>
		set((state) => {
			const dialogues = state.data[dialogue]
			const subDialogue = dialogues[dialogues._entry]

			return {
				subDialogue,
				selectedDialogue: dialogue,
				bottomDialogues: dialogueType === 'bottom' && dialogues,
				topDialogues: dialogueType === 'top' && dialogues,
				dialogueType,
			}
		}),

	clear: () =>
		set({ selectedDialogue: null, subDialogue: null, bottomDialogues: null, topDialogues: null, dialogueType: null }),
}))
