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
	{ name: 'marketplace', keys: ['KeyM'] },
]

export const POKIEID_ADDRESS = '0xCb9FD0aDE8Be6Cb7d094473189a7AF39986Fd0BF'
export const POKIEAXIE_ADDRESS = '0x69B539f14Cd8298be4ebFAd958f9525eC5D43278'
export const POKIECOIN_ADDRESS = '0x69f44cb68352f1727FA6120e1b03a3d64EF8C279'
export const POKIEPROPS_ADDRESS = '0x2C4a8Bacd834286A0c76860E2cd119b865A3da55'
export const POKIEMARKETPLACE_ADDRESS = '0x4ADF8385d353D16e410fE3df0196a53e253c2e89'
export const POKIEBALL_ADDRESS = '0x2C4a8Bacd834286A0c76860E2cd119b865A3da55'

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

export const BATTLE_READY_COUNTDOWN = 3.2
export const BATTLE_ROUND_COUNTDOWN = 5
export const BATTLE_ANIMATION_COUNTDOWN = 5
export const BATTLE_END_COUNTDOWN = 5
export const BATTLE_MAX_HEALTH = 100
export const BATTLE_MAX_ROUND = 3
export const BATTLE_MAX_DAMAGE = 100

export enum BALLS {
	BEAST = 1,
	AQUATIC = 2,
	PLANT = 3,
	BUG = 4,
	BIRD = 5,
	REPTILE = 6,
	MECH = 7,
	DAWN = 8,
	DUSK = 9,
}

export enum SKINS {
	BLUE = 1,
	GREEN = 2,
	RED = 3,
	YELLOW = 4,
}

export enum TOOLS {
	HAMMER = 11,
	NET = 12,
}
