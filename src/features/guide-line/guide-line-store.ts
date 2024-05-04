import type * as THREE from 'three'
import { create } from 'zustand'

type GuideLineState = {
	target: THREE.Vector3 | null
	setTarget: (target: THREE.Vector3 | null) => void
}

export const useGuideLineStore = create<GuideLineState>()((set) => ({
	target: null,
	setTarget: (target) => set({ target }),
}))
