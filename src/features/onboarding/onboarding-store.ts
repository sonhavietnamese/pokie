import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingState {
	isBoarded: boolean
	setIsBoarded: (isBoarded: boolean) => void

	isFirstTimeChest: boolean
	setIsFirstTimeChest: (isFirstTimeChest: boolean) => void

	isFirstTimeCatchAxie: boolean
	setIsFirstTimeCatchAxie: (isFirstTimeCatchAxie: boolean) => void
}

export const useOnboardingStore = create<OnboardingState>()(
	persist(
		(set) => ({
			isBoarded: false,
			setIsBoarded: (isBoarded: boolean) => set(() => ({ isBoarded })),

			isFirstTimeChest: true,
			setIsFirstTimeChest: (isFirstTimeChest: boolean) => set(() => ({ isFirstTimeChest })),

			isFirstTimeCatchAxie: true,
			setIsFirstTimeCatchAxie: (isFirstTimeCatchAxie: boolean) => set(() => ({ isFirstTimeCatchAxie })),
		}),
		{
			name: 'poxie-storage',
			partialize: (state) => ({
				isFirstTimeChest: state.isFirstTimeChest,
				isFirstTimeCatchAxie: state.isFirstTimeCatchAxie,
			}),
		},
	),
)
