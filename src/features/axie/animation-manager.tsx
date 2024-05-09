import pako from 'pako'
import { useEffect } from 'react'
import useSWRImmutable from 'swr'
import * as THREE from 'three'
import { useAnimationClipStore } from './use-axie-clips'

const fetcher = (url: string) => fetch(url).then((res) => res.arrayBuffer())

export default function AnimationManager() {
	const { data } = useSWRImmutable('/compressed-animations.json', fetcher, {
		refreshWhenHidden: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	})
	const setAnimationClips = useAnimationClipStore((state) => state.setClips)

	useEffect(() => {
		const load = async () => {
			if (!data) return

			const restored = JSON.parse(pako.inflate(data, { to: 'string' }))
			const animations: Record<string, THREE.AnimationClip> = {}

			console.log(restored)

			for (const key in restored.body) {
				if (Object.prototype.hasOwnProperty.call(restored.body, key)) {
					const raw = restored.body[key]

					for (const animationKey in raw) {
						if (['idle', 'walk', 'run'].includes(animationKey)) {
							const animation = raw[animationKey]

							let body = key
							if (key === 'furry') body = 'fuzzy'

							animations[`${body}_${animationKey}`] = THREE.AnimationClip.parse(animation)
						}
					}
				}
			}

			setAnimationClips(animations)
		}

		load()
	}, [data])

	return <></>
}
