export const ANIMATIONS = ['idle', 'jump', 'run', 'walk'] as const

export type AxieAnimation = (typeof ANIMATIONS)[number]

export type Axis = 'x' | 'y' | 'z'
export type AxieClass =
	| 'aqua'
	| 'beast'
	| 'bird'
	| 'bug'
	| 'mystic'
	| 'plant'
	| 'reptile'
	| 'japanese'
export const BODY_SHAPES = [
	'bigyak',
	'curly',
	'furry',
	'normal',
	'spiky',
	'sumo',
	'wetdog',
] as const
export type BodyShape = (typeof BODY_SHAPES)[number]

export interface MixerProps {
	primaryColor: string
	bodyShape: BodyShape
	parts: {
		ear: string
		eyes: string
		horn: string
		tail: string
		back: string
		mouth: string
	}
}
