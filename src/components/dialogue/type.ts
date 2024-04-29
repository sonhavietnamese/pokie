export type Dialogue = {
	[key: string]: DialogueNode
} & {
	_entry: string
}

export interface DialogueNode {
	isSpeak?: boolean
	isPrompt?: boolean
	id: string
	before?: Action[]
	bubbles?: string[]
	next?: NextNode[]
	choices?: Choices
}

export interface Action {
	action: string
	opts?: string[]
}

export interface NextNode {
	action: string
	node?: string
}

export interface Choices {
	[key: string]: Choice
}

export interface Choice {
	id: string
	value: string
	next?: NextNode[]
}
