import { create } from 'zustand'

type MarketplaceState = {
  isOpenUI: boolean
  setIsOpenUI: (isOpenUI: boolean) => void
}

export const useMarketplaceStore = create<MarketplaceState>()((set) => ({
  isOpenUI: false,
  setIsOpenUI: (isOpenUI: boolean) => set({ isOpenUI }),
}))
