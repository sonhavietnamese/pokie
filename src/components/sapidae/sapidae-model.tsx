import { getMouseDegrees } from '@/libs/utils'
import { Detailed, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useGraph } from '@react-three/fiber'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import type { SapidaeGLTFResult } from './type'
import useTextureFactory from './use-texture-factory'

type SapidaeRawProps = JSX.IntrinsicElements['group'] & {
	enableShadow?: boolean
	skin?: string
	isLookAtMouse?: boolean
}

export const SapidaeModel = forwardRef<THREE.Group, SapidaeRawProps>(
	({ skin = 'default', enableShadow = true, isLookAtMouse = false, ...props }, ref) => {
		const eyeMaterialRef = useRef<THREE.MeshStandardMaterial>(null)
		const { scene } = useGLTF('/models/character.glb')
		const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
		const { nodes } = useGraph(clone) as SapidaeGLTFResult
		const { skins } = useTextureFactory()

		const diffuse = useTexture('/fourTone.jpg')

		const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

		diffuse.minFilter = diffuse.magFilter = THREE.NearestFilter

		const texture = skins[skin.toUpperCase()]
		const textureEyeClose = skins.EYE_CLOSE
		const textureEyeOpen = skins.EYE_OPEN

		useEffect(() => {
			const handleMouseMove = (e: MouseEvent) => {
				if (nodes.mixamorigNeck) {
					mousePosition.current = { x: e.clientX, y: e.clientY }
				}
			}

			if (!eyeMaterialRef.current) return

			const blink = () => {
				if (!eyeMaterialRef.current) return
				eyeMaterialRef.current.map = textureEyeClose

				setTimeout(() => {
					if (!eyeMaterialRef.current) return
					eyeMaterialRef.current.map = textureEyeOpen
				}, 120)
			}

			const blinkInterval = setInterval(blink, 2500)

			document.addEventListener('mousemove', handleMouseMove, false)

			return () => {
				clearInterval(blinkInterval)

				document.removeEventListener('mousemove', handleMouseMove, false)
			}
		}, [])

		useFrame(() => {
			if (!isLookAtMouse) return
			const degrees = getMouseDegrees(mousePosition.current.x, mousePosition.current.y, 30)

			nodes.mixamorigNeck.rotation.y = THREE.MathUtils.degToRad(degrees.x)
			nodes.mixamorigNeck.rotation.x = THREE.MathUtils.degToRad(degrees.y)
		})

		return (
			<group renderOrder={1} ref={ref} {...props} dispose={null}>
				<group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.009}>
					<primitive object={nodes.mixamorigHips} />

					<skinnedMesh
						name="Sapidae_male_arms2_new001"
						geometry={nodes.Sapidae_male_arms2_new003.geometry}
						skeleton={nodes.Sapidae_male_arms2_new003.skeleton}
					>
						<meshStandardMaterial ref={eyeMaterialRef} map={textureEyeOpen} roughness={1} />
					</skinnedMesh>

					<Detailed distances={[0, 30]}>
						<skinnedMesh
							name="Sapidae_male_arms2_new001"
							geometry={nodes.Sapidae_male_arms2_new001.geometry}
							skeleton={nodes.Sapidae_male_arms2_new001.skeleton}
						>
							{/* <meshStandardMaterial map={texture} roughness={1} /> */}
							<meshToonMaterial map={texture} gradientMap={diffuse} />
						</skinnedMesh>
						<mesh scale={80} rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
							<capsuleGeometry args={[1, 1.5, 1]} />
							<meshStandardMaterial color={'red'} />
						</mesh>
					</Detailed>
				</group>
			</group>
		)
	},
)

SapidaeModel.displayName = 'SapidaeModel'
