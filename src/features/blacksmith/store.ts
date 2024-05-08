import { create } from 'zustand'

type BlacksmithState = {
  isEnter: boolean
  setIsEnter: (isEnter: boolean) => void

  isOpenUI: boolean
  setIsOpenUI: (isOpenUI: boolean) => void
}

export const useBlacksmithStore = create<BlacksmithState>()((set) => ({
  isEnter: false,
  setIsEnter: (isEnter: boolean) => set({ isEnter }),

  isOpenUI: false,
  setIsOpenUI: (isOpenUI: boolean) => set({ isOpenUI }),
}))
