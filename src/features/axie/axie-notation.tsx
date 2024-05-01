import { animated, useSpring } from '@react-spring/three'
import { Billboard, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import type { AxieEmote } from './type'

type AxieNotationProps = {
	children: ReactNode
	emote: AxieEmote
}

export default function AxieNotation({ children, emote }: AxieNotationProps) {
	const notationRef = useRef<THREE.Mesh>(null)
	const materialRef = useRef<THREE.MeshBasicMaterial>(null)
	const angryMarkRef = useRef<THREE.Mesh>(null)

	const exclamation = useTexture('/exclamation.png')
	const happy = useTexture('/emote-happy.png')
	const angry = useTexture('/emote-angry.png')
	const angryMark = useTexture('/angry.png')

	exclamation.colorSpace = THREE.SRGBColorSpace
	happy.colorSpace = THREE.SRGBColorSpace
	angry.colorSpace = THREE.SRGBColorSpace

	const [textureAspect, setTextureAspect] = useState(exclamation.image.width / exclamation.image.height)

	const prevEmote = useRef(emote)

	const springs = useSpring({
		rotate: prevEmote.current !== emote ? [0, 0, 0.5] : [0, 0, 0],
		scale: prevEmote.current !== emote ? [0.2, 0.2, 1] : [1.2, 1.2, 1.2],
		config:
			prevEmote.current !== emote
				? {
						tension: 400,
						friction: 35,
						precision: 0.05,
					}
				: {
						tension: 400,
						friction: 15,
						precision: 0.01,
					},

		onRest: () => {
			if (!materialRef.current) return

			materialRef.current.map = emote === 'normal' ? exclamation : emote === 'happy' ? happy : angry
			materialRef.current.needsUpdate = true

			setTextureAspect(getTextureAspect())
			prevEmote.current = emote
		},
	})

	const getTextureAspect = () => {
		if (emote === 'normal') {
			return exclamation.image.width / exclamation.image.height
		}
		if (emote === 'happy') {
			return happy.image.width / happy.image.height
		}

		return angry.image.width / angry.image.height
	}
	const angryAspect = angry.image.width / angry.image.height

	useFrame((state) => {
		if (!notationRef.current) return

		notationRef.current.position.setY(Math.sin(state.clock.getElapsedTime() * 7) * 0.03)

		if (angryMarkRef.current) {
			angryMarkRef.current.scale.setX(Math.max(Math.sin(state.clock.getElapsedTime() * 15) + 0.4, 0.8))
			angryMarkRef.current.scale.setY(Math.max(Math.sin(state.clock.getElapsedTime() * 15) + 0.4, 0.8))
		}
	})

	const geoRef = useRef<THREE.PlaneGeometry>(null)

	useLayoutEffect(() => {
		geoRef.current?.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0.3 / 2, 0))
	}, [textureAspect])

	return (
		<group>
			<Billboard position={[0, 1.3, 0]}>
				<animated.mesh
					scale={springs.scale as unknown as number}
					rotation={springs.rotate as unknown as [number, number, number]}
					ref={notationRef}
				>
					<planeGeometry ref={geoRef} args={[0.3 * textureAspect, 0.3]} />
					<meshBasicMaterial
						ref={materialRef}
						map={exclamation}
						alphaTest={0.5}
						toneMapped={false}
						onUpdate={(self) => {
							self.needsUpdate = true
						}}
					/>
				</animated.mesh>
			</Billboard>

			{emote === 'angry' && (
				<mesh ref={angryMarkRef} position={[-0.25, 0.95, 0.55]} scale={1.2}>
					<planeGeometry args={[0.2 * angryAspect, 0.2]} />
					<meshBasicMaterial map={angryMark} alphaTest={0.5} />
				</mesh>
			)}

			{children}
		</group>
	)
}
