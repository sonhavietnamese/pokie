import type * as THREE from 'three'
import { create } from 'zustand'

type AnimationClipState = {
	clips: Record<string, THREE.AnimationClip>
	setClips: (clips: Record<string, THREE.AnimationClip>) => void
}

export const useAnimationClipStore = create<AnimationClipState>()((set) => ({
	clips: {},
	setClips: (clips) => set({ clips }),
}))
