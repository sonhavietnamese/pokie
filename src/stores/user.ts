import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type User = {
	id: string
	wallet: string
}

interface UserStoreState {
	user: User | null
	setUser: (user: User | null) => void
}

export const useUserStore = create<UserStoreState>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user: User | null) => set({ user }),
		}),
		{
			name: 'user-storage',
			getStorage: () => localStorage,
			partialize: (state) => ({ user: state.user }),
		},
	),
)
