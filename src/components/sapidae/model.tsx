import { Detailed, Trail, useGLTF, useTexture } from '@react-three/drei'
import { extend, useFrame, useGraph } from '@react-three/fiber'
import { useControls } from 'leva'
import { forwardRef, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import type { GLTF } from 'three-stdlib'
import { SkeletonUtils } from 'three-stdlib'
import MeshFresnelMaterial from '../fresnel'
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
	animation?: string
	enableShadow?: boolean
	skin?: string
}

export const SapidaeModel = forwardRef<THREE.Group, SapidaeRawProps>(
	({ animation = 'idle-00', skin = 'default', enableShadow = true, ...props }, ref) => {
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

		const { FresnelFactor, FresnelBias, FresnelIntensity, rimColor, bodyColor, fresnelAlpha, fresnelOnly } =
			useControls({
				FresnelFactor: {
					value: 0.6,
					min: 0,
					max: 30,
					step: 0.001,
				},
				FresnelBias: {
					value: 0.05,
					min: 0,
					max: 1,
					step: 0.001,
				},
				FresnelIntensity: {
					value: 1.5,
					min: 0,
					max: 50,
					step: 0.001,
				},
				rimColor: {
					value: '#02FEFF',
				},
				bodyColor: {
					value: '#0777FD',
				},
				fresnelAlpha: {
					value: 1,
					min: 0.001,
					max: 1,
					step: 0.01,
				},
				fresnelOnly: {
					value: false,
				},
			})

		return (
			<group ref={ref} {...props} dispose={null}>
				<group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.009}>
					<primitive object={nodes.mixamorigHips} />

					{/* <Trail
						width={4} // Width of the line
						color={'hotpink'} // Color of the line
						length={5} // Length of the line
						decay={1} // How fast the line fades away
						local={false} // Wether to use the target's world or local positions
						stride={0} // Min distance between previous and current point
						interval={10} // Number of frames to wait before next calculation
					> */}
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
							{/* <MeshFresnelMaterial
								fresnelColor={rimColor}
								baseColor={bodyColor}
								amount={FresnelFactor}
								offset={FresnelBias}
								intensity={FresnelIntensity}
								fresnelAlpha={fresnelAlpha}
								alpha={fresnelOnly}
							/> */}
							<meshToonMaterial map={texture} gradientMap={diffuse} />
						</skinnedMesh>
						<mesh scale={80} rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
							<capsuleGeometry args={[1, 1.5, 1]} />
							<meshStandardMaterial color={'red'} />
						</mesh>
					</Detailed>
					{/* </Trail> */}
				</group>
			</group>
		)
	},
)

SapidaeModel.displayName = 'SapidaeModel'
