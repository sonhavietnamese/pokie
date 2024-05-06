export type Quest = {
	id: string
	name: string
	isFinished: boolean
	goal?: {
		type: string
		target: string
	}
	rewards?: {
		token?: number
		balls?: string[]
		props?: string[]
		stuffs?: string[]
	}
	current?: number
}
