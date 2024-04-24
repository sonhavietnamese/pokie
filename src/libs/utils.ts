import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type * as THREE from 'three'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getSpriteStyles(
	dimensions: { w: number; h: number; x: number; y: number },
	meta: { w: number; h: number },
) {
	return {
		backgroundPosition: `${(dimensions.x / Math.max(meta.w - dimensions.w, 1)) * 100}% ${
			(dimensions.y / Math.max(meta.h - dimensions.h, 1)) * 100
		}%`,
		backgroundSize: `${(meta.w / dimensions.w) * 100}% ${(meta.h / dimensions.h) * 100}%`,
	}
}

export function catchAxie(): boolean {
	return true
}

export const trimWallet = (wallet: string, count = 8) => `${wallet.slice(0, count + 2)}...${wallet.slice(-count)}`

export const generateId = () => {
	const characters = '0123456789'
	let id = ''

	for (let i = 0; i < 24; i++) {
		if (i > 0 && i % 8 === 0) {
			id += '-'
		}
		const randomIndex = Math.floor(Math.random() * characters.length)

		id += characters[randomIndex]
	}

	return id
}

export const getMovingDirection = (
	forward: boolean,
	backward: boolean,
	leftward: boolean,
	rightward: boolean,
	pivot: THREE.Object3D,
): number | null => {
	if (!forward && !backward && !leftward && !rightward) return null
	if (forward && leftward) return pivot.rotation.y + Math.PI / 4
	if (forward && rightward) return pivot.rotation.y - Math.PI / 4
	if (backward && leftward) return pivot.rotation.y - Math.PI / 4 + Math.PI
	if (backward && rightward) return pivot.rotation.y + Math.PI / 4 + Math.PI
	if (backward) return pivot.rotation.y + Math.PI
	if (leftward) return pivot.rotation.y + Math.PI / 2
	if (rightward) return pivot.rotation.y - Math.PI / 2
	if (forward) return pivot.rotation.y

	return null
}
