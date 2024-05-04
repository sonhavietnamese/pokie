import type { Stuff } from '@/features/backpack/type'
import type { App } from '@/features/phone/type'

export const VERSION = '0.0.1'

export const KEYBOARD_MAP = [
	{ name: 'forward', keys: ['ArrowUp', 'KeyW'] },
	{ name: 'backward', keys: ['ArrowDown', 'KeyS'] },
	{ name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
	{ name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
	{ name: 'jump', keys: ['Space'] },
	{ name: 'run', keys: ['Shift'] },

	{ name: 'action', keys: ['KeyF'] },

	{ name: 'open-ui', keys: ['Space'] },

	{ name: 'exit', keys: ['Escape'] },

	{ name: 'backpack', keys: ['KeyB'] },
	{ name: 'catch-axie', keys: ['KeyC'] },
	{ name: 'pokiedex', keys: ['KeyE'] },
	{ name: 'custom-avatar', keys: ['KeyZ'] },
	{ name: 'pet-axie', keys: ['KeyP'] },
	{ name: 'phone', keys: ['KeyP'] },
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

export const APPS: App[] = [
	{
		id: 'badges',
		name: 'Badges',
		url: 'https://sentre.io/#/home',
		type: 'internal',
	},
	{
		id: 'classic',
		name: 'Classic',
		url: 'https://hub.skymavis.com/games/classic',
		type: 'external',
	},
	{
		id: 'marketplace',
		name: 'Marketplace',
		url: 'https://app.axieinfinity.com/marketplace/axies',
		type: 'external',
	},
	{
		id: 'project-t',
		name: 'Project T',
		url: 'https://play.axieinfinity.com/project-t',
		type: 'external',
	},
]

export const NPCS = {
	bano: {
		name: 'Bano',
		id: 'bano',
		position: [2, 1.67, 0],
		rotation: [0, 0, 0],
	},
	bimy: {
		name: 'Bimy',
		id: 'bimy',
		position: [2, 1.67, 0],
		rotation: [0, 0, 0],
	},
	lolo: {
		name: 'Lolo',
		id: 'lolo',
		position: [2, 1.67, 0],
		rotation: [0, 0, 0],
	},
	ooap: {
		name: 'Ooap',
		id: 'ooap',
		position: [2, 1.67, 0],
		rotation: [0, 0, 0],
	},
	blub: {
		name: 'Blub',
		id: 'blub',
		position: [2, 1.67, 0],
		rotation: [0, 0, 0],
	},
	koac: {
		name: 'Koac',
		id: 'koac',
		position: [2, 1.67, 0],
		rotation: [0, 0, 0],
	},
} as const
