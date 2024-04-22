import * as THREE from 'three'
import { PART_POSITION } from './constants'

export function getPartPosition(part: string, variant: string) {
	return PART_POSITION[part][variant]
}

export function calculateNewPosition(nodePosition: THREE.Vector3, bonePosition: THREE.Vector3): THREE.Vector3 {
	return new THREE.Vector3(
		nodePosition.x - bonePosition.x,
		nodePosition.y - bonePosition.y,
		nodePosition.z - bonePosition.z,
	)
}

export function calculateNewRotation(nodeRotation: THREE.Euler, boneRotation: THREE.Euler): THREE.Euler {
	return new THREE.Euler(
		nodeRotation.x - boneRotation.x,
		nodeRotation.y - boneRotation.y,
		nodeRotation.z - boneRotation.z,
	)
}
