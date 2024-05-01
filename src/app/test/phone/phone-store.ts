import { create } from 'zustand'

type PhoneState = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

export const usePhoneStore = create<PhoneState>()((set) => ({
	isOpen: false,
	setIsOpen: (isOpen) => set({ isOpen }),
}))
