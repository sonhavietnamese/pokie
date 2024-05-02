import { random } from 'lodash-es'
import { useEffect } from 'react'
import * as THREE from 'three'
import { Butterfly } from './butterfly'
import { useButterflyStore } from './butterfly-store'

export default function Butterflies() {
	const [butterflies, addButterfly] = useButterflyStore((state) => [state.butterflies, state.addButterfly])

	useEffect(() => {
		let timeout: NodeJS.Timeout | null = null

		if (butterflies.length < 5) {
			timeout = setTimeout(() => {
				addButterfly({
					position: [
						THREE.MathUtils.randFloat(-10, 10),
						THREE.MathUtils.randFloat(2.5, 3),
						THREE.MathUtils.randFloat(-10, 10),
					],
					scale: THREE.MathUtils.randFloat(0.5, 1),
					id: random(0, 100000).toString(),
				})
				addButterfly({
					position: [
						THREE.MathUtils.randFloat(-5, 5),
						THREE.MathUtils.randFloat(2.5, 3),
						THREE.MathUtils.randFloat(-5, 5),
					],
					scale: THREE.MathUtils.randFloat(0.5, 1),
					id: random(0, 100000).toString(),
				})
			}, Math.random() * 5000)
		}

		return () => {
			timeout && clearInterval(timeout)
		}
	}, [butterflies])

	return (
		butterflies.length > 0 &&
		butterflies.map((e) => <Butterfly name={`bug-${e.id}`} key={e.id} position={e.position} scale={e.scale} />)
	)
}
