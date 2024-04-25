import { create } from 'zustand'

interface PhoneState {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
}

export const usePhoneStore = create<PhoneState>()((set) => ({
	isOpen: false,
	setIsOpen: (isOpen) => set({ isOpen }),
}))
