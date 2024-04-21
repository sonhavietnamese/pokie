import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getSpriteStyles(
	dimensions: { w: number; h: number; x: number; y: number },
	meta: { w: number; h: number },
) {
	return {
		backgroundPosition: `${(dimensions.x / (meta.w - dimensions.w)) * 100}% ${
			(dimensions.y / (meta.h - dimensions.h)) * 100
		}%`,
		backgroundSize: `${(meta.w / dimensions.w) * 100}% ${
			(meta.h / dimensions.h) * 100
		}%`,
	}
}

export function catchAxie(): boolean {
	return true
}

export const trimWallet = (wallet: string, count = 8) =>
	`${wallet.slice(0, count + 2)}...${wallet.slice(-count)}`
