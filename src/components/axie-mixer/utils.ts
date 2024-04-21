import * as _ from 'lodash-es'

import * as THREE from 'three'
import { COLORS, PARTS, PART_POSITION } from './constants'
import type { BodyShape, MixerProps } from './types'

export function getPartPosition(part: string, variant: string) {
	return PART_POSITION[part][variant]
}

const queryPart = (partObject: {
	special_genes: string | null
	name: string
	ability_id: string
}) => {
	let shortenClassName = 'aqua'
	const [cl, , variant] = partObject.ability_id.split('-')

	if (cl === 'aquatic') shortenClassName = 'aqua'
	else shortenClassName = cl

	let partId = `${shortenClassName}-${variant}`

	if (partObject.special_genes === 'mystic') {
		partId = `mystic-${variant}`
	}

	if (partObject.special_genes === 'japan') {
		partId = `japanese-${variant}`
	}

	partId = partId.replace('-', '_')

	return partId
}

export function getParts(params: MixerProps): MixerProps {
	let primaryColor = '000000'
	const filteredColor = _.find(COLORS, (c) => c.key === params.primaryColor)

	if (filteredColor) primaryColor = `#${filteredColor.primary1}`

	let bodyShape: BodyShape = 'normal'

	if (params.bodyShape.toLowerCase() === 'fuzzy') bodyShape = 'furry'
	else bodyShape = params.bodyShape.toLowerCase() as BodyShape

	let ear = 'aqua_02'
	let eyes = 'aqua_02'
	let horn = 'aqua_02'
	let tail = 'aqua_02'
	let back = 'aqua_02'
	let mouth = 'aqua_02'

	// biome-ignore lint/complexity/noForEach: <explanation>
	PARTS.forEach((part) => {
		if (params.parts.ear.toLowerCase() === part.name.toLowerCase()) {
			ear = queryPart(part)
		}

		if (params.parts.eyes.toLowerCase() === part.name.toLowerCase()) {
			eyes = queryPart(part)
		}

		if (params.parts.horn.toLowerCase() === part.name.toLowerCase()) {
			horn = queryPart(part)
		}

		if (params.parts.tail.toLowerCase() === part.name.toLowerCase()) {
			tail = queryPart(part)
		}

		if (params.parts.back.toLowerCase() === part.name.toLowerCase()) {
			back = queryPart(part)
		}

		if (params.parts.mouth.toLowerCase() === part.name.toLowerCase()) {
			mouth = queryPart(part)
		}
	})

	return {
		primaryColor,
		bodyShape,
		parts: {
			ear,
			eyes,
			horn,
			tail,
			back,
			mouth,
		},
	}
}

export function calculateNewPosition(
	nodePosition: THREE.Vector3,
	bonePosition: THREE.Vector3,
): THREE.Vector3 {
	return new THREE.Vector3(
		nodePosition.x - bonePosition.x,
		nodePosition.y - bonePosition.y,
		nodePosition.z - bonePosition.z,
	)
}

export function calculateNewRotation(
	nodeRotation: THREE.Euler,
	boneRotation: THREE.Euler,
): THREE.Euler {
	return new THREE.Euler(
		nodeRotation.x - boneRotation.x,
		nodeRotation.y - boneRotation.y,
		nodeRotation.z - boneRotation.z,
	)
}
