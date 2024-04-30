import type { Stuff } from '@/features/backpack/type'

export const VERSION = '0.0.1'

export const KEYBOARD_MAP = [
	{ name: 'forward', keys: ['ArrowUp', 'KeyW'] },
	{ name: 'backward', keys: ['ArrowDown', 'KeyS'] },
	{ name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
	{ name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
	{ name: 'jump', keys: ['Space'] },
	{ name: 'run', keys: ['Shift'] },
	{ name: 'action1', keys: ['1'] },
	{ name: 'action2', keys: ['2'] },
	{ name: 'action4', keys: ['3'] },

	{ name: 'action', keys: ['KeyF'] },

	{ name: 'aim', keys: ['KeyZ'] },
	{ name: 'spawn', keys: ['KeyQ'] },
	{ name: 'open-ui', keys: ['Space'] },

	{ name: 'exit', keys: ['Escape'] },

	{ name: 'backpack', keys: ['KeyB'] },

	{ name: 'ride-animal', keys: ['KeyR'] },
	{ name: 'catch-axie', keys: ['KeyC'] },

	{ name: 'pet-axie', keys: ['KeyP'] },
]

export const POKIEPROPS_ADDRESS = '0x45aDeB20ea700E785813f8Ce3F04cB779C77785C'
export const POKIECOIN_ADDRESS = '0xb8c7182d7B4262f45E8bC97E6e8eefC811366529'
export const POKIEBALL_ADDRESS = '0xcc1ad99e68edcdcf3b96bdcab5ec9376532655b4'
export const POKIEID_ADDRESS = '0x3B09787c7d9413ECeA2562c1608335EDCE88233B'
export const POKIEMARKETPLACE_ADDRESS = '0x81d5D13bE2515D6D3015cDeB6C7ee3E2d9Bc4078'
export const POKIEAXIE_ADDRESS = '0x424fb719816f30c88d7e8477e0111cb0cb162358'

export const AXIE_ADDRESS = '0xcaca1c072d26e46686d932686015207fbe08fdb8'

export const POKIECOIN_DECIMALS = 1e18
export const RON_DECIMALS = 1e18

export const STUFFS = ['milks', 'fishes', 'feathers', 'rocks', 'nuts', 'plants', 'bugs', 'stars', 'moons'] as const

export const STUFFS_DATA: Record<(typeof STUFFS)[number], Stuff> = {
	milks: {
		name: 'Milks',
		slug: 'milk',
		id: 'milks-milk-01',
		description: '',
	},
	fishes: {
		name: 'Fishes',
		slug: 'fish',
		id: 'fishes-fish-01',
		description: '',
	},
	feathers: {
		name: 'Feathers',
		slug: 'feather',
		id: 'feathers-feather-01',
		description: '',
	},
	rocks: {
		name: 'Rocks',
		slug: 'rock',
		id: 'rocks-rock-01',
		description: '',
	},
	nuts: {
		name: 'Nuts',
		slug: 'nut',
		id: 'nuts-nut-01',
		description: '',
	},
	plants: {
		name: 'Plants',
		slug: 'plant',
		id: 'plants-plant-01',
		description: '',
	},
	bugs: {
		name: 'Bugs',
		slug: 'bug',
		id: 'bugs-bug-01',
		description: '',
	},
	stars: {
		name: 'Stars',
		slug: 'star',
		id: 'stars-star-01',
		description: '',
	},
	moons: {
		name: 'Moons',
		slug: 'moon',
		id: 'moons-moon-01',
		description: '',
	},
}
