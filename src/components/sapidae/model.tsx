import { ANIMATION_SET } from '@/features/movement/use-character-control'
import { Detailed, useAnimations, useGLTF } from '@react-three/drei'
import { useGraph } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
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
	animation?: string
	enableShadow?: boolean
	skin?: string
}

export function SapidaeModel({
	animation = 'idle-00',
	skin = 'default',
	enableShadow = true,
	...props
}: SapidaeRawProps) {
	const group = useRef<THREE.Group>(null)
	const eyeMaterialRef = useRef<THREE.MeshStandardMaterial>(null)

	const { scene, animations } = useGLTF('/models/character.glb') as GLTFResult
	const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
	const { nodes } = useGraph(clone) as GLTFResult
	const { actions, mixer } = useAnimations(animations, group)

	const { skins } = useTextureFactory()

	const texture = skins[skin.toUpperCase()]
	const textureEyeClose = skins.EYE_CLOSE
	const textureEyeOpen = skins.EYE_OPEN

	// const placeholder = useTexture('/textures/sapidae-placeholder.png')

	// placeholder.flipY = false

	const [anim, setAnim] = useState(animation)

	useEffect(() => {
		setAnim(animation)
	}, [animation])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const action = actions[anim]

		if (!action) return

		if (
			anim === ANIMATION_SET.punch ||
			anim === ANIMATION_SET.slap
			// ||
			// anim === animationSet.getHitSlap ||
			// anim === animationSet.getHitGroin
		) {
			action.reset().fadeIn(0.2).setLoop(THREE.LoopOnce, 1).play()
			action.clampWhenFinished = true
		} else {
			action.reset().fadeIn(0.2).play()
		}

		const resetAnimation = () => {
			setAnim('idle-00')
		}

		mixer.addEventListener('finished', resetAnimation)

		return () => {
			action.fadeOut(0.2)

			mixer.removeEventListener('finished', resetAnimation)
		}
	}, [anim])

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
		<group ref={group} {...props} dispose={null}>
			<group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.009}>
				<primitive object={nodes.mixamorigHips} />

				<Detailed distances={[0, 20]}>
					<skinnedMesh
						name="Sapidae_male_arms2_new001"
						geometry={nodes.Sapidae_male_arms2_new003.geometry}
						skeleton={nodes.Sapidae_male_arms2_new003.skeleton}
					>
						<meshStandardMaterial
							ref={eyeMaterialRef}
							map={textureEyeOpen}
							roughness={1}
						/>
					</skinnedMesh>
					<mesh
						scale={80}
						rotation={[Math.PI / 2, 0, 0]}
						position={[0, 2.5, 0]}
					>
						<planeGeometry args={[1, 3, 1]} />
						<meshStandardMaterial color={'red'} />
					</mesh>
				</Detailed>

				<Detailed distances={[0, 20]}>
					<skinnedMesh
						name="Sapidae_male_arms2_new001"
						geometry={nodes.Sapidae_male_arms2_new001.geometry}
						material={nodes.Sapidae_male_arms2_new001.material}
						skeleton={nodes.Sapidae_male_arms2_new001.skeleton}
					>
						<meshStandardMaterial map={texture} roughness={1} />
					</skinnedMesh>
					<mesh scale={80} rotation={[Math.PI / 2, 0, 0]} position={[0, 10, 0]}>
						<capsuleGeometry args={[1, 1.5, 1]} />
						<meshStandardMaterial color={'red'} />
					</mesh>
				</Detailed>

				{/* <skinnedMesh
          name="Sapidae_male_arms2_new001"
          geometry={nodes.Sapidae_male_arms2_new002.geometry}
          skeleton={nodes.Sapidae_male_arms2_new002.skeleton}
        >
          <meshStandardMaterial ref={eyeMaterialRef} map={textureEyeOpen} roughness={1} />
        </skinnedMesh> */}
			</group>
		</group>
	)
}
