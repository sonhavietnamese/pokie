// @ts-nocheck

import type * as THREE from 'three'
import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

export const useCharacterControl = create(
	subscribeWithSelector<State>((set, get) => {
		return {
			moveToPoint: null,
			isCameraBased: false,
			curAnimation: null,
			animationSet: {} as AnimationSet,

			initializeAnimationSet: (animationSet: AnimationSet) => {
				set((state) => {
					if (Object.keys(state.animationSet).length === 0) {
						return { animationSet }
					}

					return {}
				})
			},

			reset: (isRiding: boolean) => {
				set((state) => {
					if (isRiding) {
						return { curAnimation: state.animationSet.ride }
					}

					return { curAnimation: state.animationSet.idle }
				})
			},

			idle: () => {
				set((state) => {
					if (state.curAnimation === state.animationSet.jumpIdle) {
						return { curAnimation: state.animationSet.jumpLand }
					}
					if (
						state.curAnimation !== state.animationSet.action1 &&
						state.curAnimation !== state.animationSet.swing &&
						state.curAnimation !== state.animationSet.pet
					) {
						return { curAnimation: state.animationSet.idle }
					}

					return {}
				})
			},

			ride: () => {
				set((state) => {
					return { curAnimation: state.animationSet.ride }
				})
			},

			walk: () => {
				set((state) => {
					if (state.curAnimation !== state.animationSet.swing) {
						return { curAnimation: state.animationSet.walk }
					}

					return {}
				})
			},

			run: () => {
				set((state) => {
					if (state.curAnimation !== state.animationSet.swing) {
						return { curAnimation: state.animationSet.run }
					}

					return {}
				})
			},

			jump: () => {
				set((state) => {
					return { curAnimation: state.animationSet.jump }
				})
			},

			jumpIdle: () => {
				set((state) => {
					if (state.curAnimation === state.animationSet.jump) {
						return { curAnimation: state.animationSet.jumpIdle }
					}

					return {}
				})
			},

			jumpLand: () => {
				set((state) => {
					if (state.curAnimation === state.animationSet.jumpIdle) {
						return { curAnimation: state.animationSet.jumpLand }
					}

					return {}
				})
			},

			fall: () => {
				set((state) => {
					return { curAnimation: state.animationSet.fall }
				})
			},

			action1: () => {
				set((state) => {
					if (state.curAnimation === state.animationSet.idle) {
						return { curAnimation: state.animationSet.action1 }
					}

					return {}
				})
			},

			swing: () => {
				set((state) => {
					if (state.curAnimation === state.animationSet.idle) {
						return { curAnimation: state.animationSet.swing }
					}
					if (state.curAnimation === state.animationSet.walk || state.curAnimation === state.animationSet.run) {
						return { curAnimation: state.animationSet.swing }
					}

					return {}
				})
			},

			action: () => {
				set((state) => {
					if (state.curAnimation === state.animationSet.idle) {
						return { curAnimation: state.animationSet.action }
					}
					if (state.curAnimation === state.animationSet.walk || state.curAnimation === state.animationSet.run) {
						return { curAnimation: state.animationSet.action }
					}

					return {}
				})
			},

			swim: () => {
				set((state) => {
					if (
						state.curAnimation === state.animationSet.idle ||
						state.curAnimation === state.animationSet.walk ||
						state.curAnimation === state.animationSet.run
					) {
						return { curAnimation: state.animationSet.swim }
					}

					return {}
				})
			},

			pet: () => {
				set((state) => {
					if (state.curAnimation === state.animationSet.idle) {
						return { curAnimation: state.animationSet.pet }
					}
					if (state.curAnimation === state.animationSet.walk || state.curAnimation === state.animationSet.run) {
						return { curAnimation: state.animationSet.pet }
					}

					return {}
				})
			},

			setMoveToPoint: (point: THREE.Vector3) => {
				set(() => {
					return { moveToPoint: point }
				})
			},

			getMoveToPoint: () => {
				return {
					moveToPoint: get().moveToPoint,
				}
			},

			setCameraBased: (isCameraBased: boolean) => {
				set(() => {
					return { isCameraBased: isCameraBased }
				})
			},

			getCameraBased: () => {
				return {
					isCameraBased: get().isCameraBased,
				}
			},
		}
	}),
)

export const ANIMATION_SET = {
	punch: 'punch',
	slap: 'slap',
	getHitSlap: 'get-hit-slap',
	getHitGroin: 'get-hit-groin',
	idle: 'idle',
	walk: 'walk',
	run: 'run',
	jump: 'jump-up',
	jumpIdle: 'jump-up',
	jumpLand: 'jump-up',
	fall: 'floating',
	ride: 'ride',
	action1: 'throw',
	throw: 'throw',
	swing: 'swing-stick',
	action: 'floating',
	swim: 'swim',
	pet: 'pet-animal',
} as const

export type AnimationSet = typeof ANIMATION_SET

type State = {
	moveToPoint: THREE.Vector3 | null
	isCameraBased: boolean
	curAnimation: string | null
	animationSet: AnimationSet
	initializeAnimationSet: (animationSet: AnimationSet) => void
	reset: (isRiding: boolean) => void
	setMoveToPoint: (point: THREE.Vector3) => void
	getMoveToPoint: () => {
		moveToPoint: THREE.Vector3 | null
	}
	setCameraBased: (isCameraBased: boolean) => void
	getCameraBased: () => {
		isCameraBased: boolean
	}
} & {
	[key in keyof AnimationSet]: () => void
}
