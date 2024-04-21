import { useEffect } from 'react'
import * as THREE from 'three'
import ANIMATIONS_DATA from './animations.json'
import { useAnimationClipStore } from './use-animation-clips'

export default function AnimationManager() {
	const setAnimationClips = useAnimationClipStore((state) => state.setClips)

	useEffect(() => {
		const animations: Record<string, THREE.AnimationClip> = {}

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const { body } = ANIMATIONS_DATA as { body: any }

		for (const key in body) {
			if (Object.prototype.hasOwnProperty.call(body, key)) {
				const raw = body[key]

				for (const animationKey in raw) {
					if (['idle', 'run'].includes(animationKey)) {
						const animation = raw[animationKey]

						animations[`${key}_${animationKey}`] =
							THREE.AnimationClip.parse(animation)
					}
				}
			}
		}

		setAnimationClips(animations)
	}, [])

	return <></>
}
