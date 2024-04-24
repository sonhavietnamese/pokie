import { useEffect } from 'react'
import useSWRImmutable, { useSWRConfig } from 'swr'
import useSWR from 'swr'
import * as THREE from 'three'
import ANIMATIONS_DATA from './animations.json'
import { useAnimationClipStore } from './use-animation-clips'

export default function AnimationManager() {
	const setAnimationClips = useAnimationClipStore((state) => state.setClips)

	// const { data, isLoading } = useSWR(
	// 	'https://gohbmlljstcgfhwtjiey.supabase.co/storage/v1/object/public/assets/compressed-animations.json',
	// )

	// if (isLoading) return <div>Loading...</div>

	// console.log(data)

	// useEffect(() => {
	// 	const animations: Record<string, THREE.AnimationClip> = {}

	// 	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// 	const { body } = ANIMATIONS_DATA as { body: any }

	// 	for (const key in body) {
	// 		if (Object.prototype.hasOwnProperty.call(body, key)) {
	// 			const raw = body[key]

	// 			for (const animationKey in raw) {
	// 				if (['idle', 'run'].includes(animationKey)) {
	// 					const animation = raw[animationKey]

	// 					animations[`${key}_${animationKey}`] = THREE.AnimationClip.parse(animation)
	// 				}
	// 			}
	// 		}
	// 	}

	// 	setAnimationClips(animations)
	// }, [])

	return <></>
}
