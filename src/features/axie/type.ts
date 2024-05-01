export type AxieProperty = {
	axie_id: number
	back_id: string
	birthdate: number
	bodyshape: string
	breed_count: number
	class: string
	ears_id: string
	eyes_id: string
	horn_id: string
	matron_id: number
	mouth_id: string
	num_japan: number
	num_mystic: number
	num_shiny: number
	num_summer: number
	num_xmas: number
	primary_color: string
	pureness: number
	purity: number
	sire_id: number
	stage: number
	tail_id: string
	title: string
}

export type AxieMetadata = {
	external_url: string
	genes: string
	id: number
	image: string
	name: string
	properties: AxieProperty
}

export type AxieItem = {
	tokenId: string
	contractAddress: string
	tokenName: string
	tokenSymbol: string
	tokenStandard: string
	tokenURI: string
	createdAtBlock: number
	createdAtBlockTime: string
	updatedAtBlock: number
	updatedAtBlockTime: string
	rawMetadata: AxieMetadata
}

export type SearchAxieResponse = {
	result: {
		items: AxieItem[]
	}
}

export type AxieEmote = 'normal' | 'happy' | 'angry'
