import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingState {
	isBoarded: boolean
	setIsBoarded: (isBoarded: boolean) => void

	isFirstTimeChest: boolean
	setIsFirstTimeChest: (isFirstTimeChest: boolean) => void

	isFirstTimeCatchAxie: boolean
	setIsFirstTimeCatchAxie: (isFirstTimeCatchAxie: boolean) => void

	isFirstTimeMeetAxie: boolean
	setIsFirstTimeMeetAxie: (isFirstTimeAxie: boolean) => void
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

			isFirstTimeMeetAxie: true,
			setIsFirstTimeMeetAxie: (isFirstTimeMeetAxie: boolean) => set(() => ({ isFirstTimeMeetAxie })),
		}),
		{
			name: 'poxie-storage',
			partialize: (state) => ({
				isFirstTimeChest: state.isFirstTimeChest,
				isFirstTimeCatchAxie: state.isFirstTimeCatchAxie,
				isFirstTimeMeetAxie: state.isFirstTimeMeetAxie,
			}),
		},
	),
)
