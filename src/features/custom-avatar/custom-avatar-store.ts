import { create } from 'zustand'

type CustomAvatarState = {
	isOpenUI: boolean
	setOpenUI: (isOpenUI: boolean) => void
}

export const useCustomAvatarStore = create<CustomAvatarState>()((set) => ({
	isOpenUI: false,
	setOpenUI: (isOpenUI: boolean) => set({ isOpenUI }),
}))
