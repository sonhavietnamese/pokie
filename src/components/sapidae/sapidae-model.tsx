import { Detailed, useGLTF, useTexture } from '@react-three/drei'
import { useGraph } from '@react-three/fiber'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'
import { SkeletonUtils } from 'three-stdlib'
import useTextureFactory from './use-texture-factory'

type GLTFResult = GLTF & {
	nodes: {
		Sapidae_male_arms2_new001: THREE.SkinnedMesh
		Sapidae_male_arms2_new002: THREE.SkinnedMesh
		Sapidae_male_arms2_new003: THREE.SkinnedMesh
		mixamorigHips: THREE.Bone
	}
	materials: {
		lambert11: THREE.MeshStandardMaterial
	}
	animations: string[]
}

type SapidaeRawProps = JSX.IntrinsicElements['group'] & {
	enableShadow?: boolean
	skin?: string
}

export const SapidaeModel = forwardRef<THREE.Group, SapidaeRawProps>(
	({ skin = 'default', enableShadow = true, ...props }, ref) => {
		const eyeMaterialRef = useRef<THREE.MeshStandardMaterial>(null)
		const { scene } = useGLTF('/models/character.glb') as GLTFResult
		const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
		const { nodes } = useGraph(clone) as GLTFResult
		const { skins } = useTextureFactory()

		const diffuse = useTexture('/fourTone.jpg')

		diffuse.minFilter = diffuse.magFilter = THREE.NearestFilter

		const texture = skins[skin.toUpperCase()]
		const textureEyeClose = skins.EYE_CLOSE
		const textureEyeOpen = skins.EYE_OPEN

		// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
		useEffect(() => {
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

			return () => {
				clearInterval(blinkInterval)
			}
		}, [])

		return (
			<group ref={ref} {...props} dispose={null}>
				<group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.009}>
					<primitive object={nodes.mixamorigHips} />

					<Detailed distances={[0, 20]} position={[0, 2, 0]}>
						<skinnedMesh
							name="Sapidae_male_arms2_new001"
							geometry={nodes.Sapidae_male_arms2_new003.geometry}
							skeleton={nodes.Sapidae_male_arms2_new003.skeleton}
						>
							<meshStandardMaterial ref={eyeMaterialRef} map={textureEyeOpen} roughness={1} />
						</skinnedMesh>
						<mesh scale={80} rotation={[Math.PI / 2, 0, 0]} position={[0, 2.5, 0]}>
							<planeGeometry args={[1, 3, 1]} />
							<meshStandardMaterial color={'red'} />
						</mesh>
					</Detailed>

					<Detailed distances={[0, 20]}>
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
