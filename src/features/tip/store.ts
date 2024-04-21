import type { ReactNode } from 'react'
import { create } from 'zustand'
import type { Tip } from './type'

interface TipStore {
	tips: Tip | null
	showTip: (content: string | ReactNode) => void
}

export const useTipStore = create<TipStore>()((set) => ({
	tips: null,
	showTip: (content: string | ReactNode) =>
		set(() => {
			return { tips: { id: Date.now(), content } }
		}),
}))
