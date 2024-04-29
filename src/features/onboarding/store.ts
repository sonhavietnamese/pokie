import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface OnboardingState {
	isBoarded: boolean
	setIsBoarded: (isBoarded: boolean) => void
}

export const useOnboardingStore = create<OnboardingState>()(
	persist(
		(set) => ({
			isBoarded: false,
			setIsBoarded: (isBoarded: boolean) => set(() => ({ isBoarded })),
		}),
		{
			name: 'poxie-storage',
			partialize: (state) => ({ isBoarded: state.isBoarded }),
		},
	),
)
