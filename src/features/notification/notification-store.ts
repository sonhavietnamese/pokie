import type { ReactNode } from 'react'
import { create } from 'zustand'
import type { Notification } from './type'

interface NotificationStoreState {
	notifications: Notification | null
	showNotification: (content: string | ReactNode) => void
}

export const useNotificationStore = create<NotificationStoreState>()((set) => ({
	notifications: null,
	showNotification: (content: string | ReactNode) =>
		set(() => {
			return { notifications: { id: Date.now(), content } }
		}),
}))
