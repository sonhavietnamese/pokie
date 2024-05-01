import { animated, useSpring } from '@react-spring/three'
import { Billboard, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { type ReactNode, useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export type SapidaeEmote = 'normal' | 'question' | 'angry'

type SapidaeNotationProps = {
	children: ReactNode
	emote: SapidaeEmote
} & JSX.IntrinsicElements['group']

export default function SapidaeNotation({ children, emote, ...props }: SapidaeNotationProps) {
	const notationRef = useRef<THREE.Mesh>(null)
	const materialRef = useRef<THREE.MeshBasicMaterial>(null)

	const exclamation = useTexture('/exclamation.png')
	const question = useTexture('/npc-bubble-01.png')
	const angry = useTexture('/emote-angry.png')

	exclamation.colorSpace = THREE.SRGBColorSpace
	question.colorSpace = THREE.SRGBColorSpace
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

			materialRef.current.map = emote === 'normal' ? exclamation : emote === 'question' ? question : angry
			materialRef.current.needsUpdate = true

			setTextureAspect(getTextureAspect())
			prevEmote.current = emote
		},
	})

	const getTextureAspect = () => {
		if (emote === 'normal') {
			return exclamation.image.width / exclamation.image.height
		}
		if (emote === 'question') {
			return question.image.width / question.image.height
		}

		return angry.image.width / angry.image.height
	}

	useFrame((state) => {
		if (!notationRef.current) return
		notationRef.current.position.setY(Math.sin(state.clock.getElapsedTime() * 7) * 0.03)
	})

	const geoRef = useRef<THREE.PlaneGeometry>(null)

	useLayoutEffect(() => {
		geoRef.current?.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0.3 / 2, 0))
	}, [textureAspect])

	return (
		<group {...props}>
			<Billboard position={[0, 2.35, 0]}>
				<animated.mesh
					scale={springs.scale as unknown as number}
					rotation={springs.rotate as unknown as [number, number, number]}
					ref={notationRef}
				>
					<planeGeometry ref={geoRef} args={[0.5 * textureAspect, 0.5]} />
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

			{children}
		</group>
	)
}
