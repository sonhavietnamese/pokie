import { create } from 'zustand'

type CustomAvatarState = {
	isOpenUI: boolean
	setOpenUI: (isOpenUI: boolean) => void

	selectedSkin: string
	setSelectedSkin: (selectedSkin: string) => void
}

export const useCustomAvatarStore = create<CustomAvatarState>()((set) => ({
	isOpenUI: false,
	setOpenUI: (isOpenUI: boolean) => set({ isOpenUI }),

	selectedSkin: 'default',
	setSelectedSkin: (selectedSkin: string) => set({ selectedSkin }),
}))
