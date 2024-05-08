import { create } from 'zustand'

type CatchAxie = {
	id: string
	caught: boolean
}

type CatchAxieState = {
	isCaught: boolean
	setIsCaught: (isCaught: boolean) => void

	isOpen: boolean
	setOpenUI: (isOpen: boolean) => void

	isThrew: boolean
	setIsThrew: (isThrew: boolean) => void

	selectedBall: string
	setSelectedBall: (selectedBall: string) => void

	caughtAxie: CatchAxie | null
	setCaughtAxie: (caughtAxie: CatchAxie | null) => void
}

export const useCatchAxieStore = create<CatchAxieState>()((set) => ({
	isCaught: false,
	setIsCaught: (isCaught: boolean) => set({ isCaught }),

	isOpen: false,
	setOpenUI: (isOpen: boolean) => set({ isOpen }),

	isThrew: false,
	setIsThrew: (isThrew: boolean) => set({ isThrew }),

	selectedBall: 'aquatic',
	setSelectedBall: (selectedBall: string) => set({ selectedBall }),

	caughtAxie: null,
	setCaughtAxie: (caughtAxie: CatchAxie | null) => set({ caughtAxie }),
}))
