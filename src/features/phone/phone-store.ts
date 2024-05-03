import { create } from 'zustand'
import type { App } from './type'

type PhoneState = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void

	selectedApp: App | undefined
	setSelectedApp: (app: App | undefined) => void

	openingApp: App | undefined
	setOpeningApp: (app: App | undefined) => void
}

export const usePhoneStore = create<PhoneState>()((set) => ({
	isOpen: false,
	setIsOpen: (isOpen) => set({ isOpen }),

	selectedApp: undefined,
	setSelectedApp: (selectedApp) => set({ selectedApp }),

	openingApp: undefined,
	setOpeningApp: (openingApp) => set({ openingApp }),
}))
