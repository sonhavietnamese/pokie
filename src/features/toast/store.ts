import type { ReactNode } from 'react'
import { create } from 'zustand'
import type { Toast } from './type'

interface ToastStore {
	toasts: Toast | null
	showToast: (content: string | ReactNode) => void
}

export const useToastStore = create<ToastStore>()((set) => ({
	toasts: null,
	showToast: (content: string | ReactNode) =>
		set(() => {
			return { toasts: { id: Date.now(), content } }
		}),
}))
