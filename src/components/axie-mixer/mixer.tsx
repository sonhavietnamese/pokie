import { useAnimationClipStore } from '@/features/axie/use-animation-clips'
import { Capsule, Detailed, useGLTF } from '@react-three/drei'
import { useFrame, useGraph } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { type GLTF, SkeletonUtils } from 'three-stdlib'
import { Back } from './back'
import { Ear } from './ear'
import { Eye } from './eye'
import { Horn } from './horn'
import { Mouth } from './mouth'
import { Tail } from './tail'
import type { AxieAnimation, BodyShape } from './types'
import { getPartPosition } from './utils'

interface MixerProps {
	body: BodyShape
	primaryColor: string
	parts: {
		mouth: string
		tail: string
		eyes: string
		horn: string
		ear: string
		back: string
	}
	animation: AxieAnimation
}

const animationSet = {
	idle: 'idle',
	walk: 'run',
	run: 'run',
	jump: 'jump',
	jumpIdle: 'jump',
	jumpLand: 'idle',
	fall: 'idle',
	action1: 'qwe',
	action2: 'qwe',
	action3: 'qwe',
	action4: 'qew',
}

type GLTFResult = GLTF & {
	nodes: {
		SM_Body: THREE.SkinnedMesh
		SM_Body_1: THREE.SkinnedMesh
		SM_Body_2: THREE.SkinnedMesh
		SM_Body_3: THREE.SkinnedMesh
		Mouth_1_JNT: THREE.Bone
		Root_Mouth_JNT: THREE.Bone
		Root_Tail_L_JNT: THREE.Bone
		Root_Tail_M_JNT: THREE.Bone
		Root_Tail_R_JNT: THREE.Bone
		Root_Eye_L_JNT: THREE.Bone
		Root_Eye_R_JNT: THREE.Bone
		Root_Eye_M_JNT: THREE.Bone
		Root_Ear_L_JNT: THREE.Bone
		Root_Ear_R_JNT: THREE.Bone
		Root_Horn_L_JNT: THREE.Bone
		Root_Horn_R_JNT: THREE.Bone
		Root_Horn_M_JNT: THREE.Bone
		Root_Horn_T_JNT: THREE.Bone
		Root_Back_L_JNT: THREE.Bone
		Root_Back_R_JNT: THREE.Bone
		Root_Back_M_JNT: THREE.Bone
	}
	materials: {
		lambert1: THREE.MeshStandardMaterial
	}
}

export default function Mixer({ parts, body, primaryColor, animation = 'idle' }: MixerProps) {
	const { scene } = useGLTF(`/glb/body_${body}_idle.glb`)

	const axieref = useRef<THREE.Group>(null)

	const cloneScenes = useMemo(() => SkeletonUtils.clone(scene), [scene])
	const bodyGraph = useGraph(cloneScenes) as GLTFResult
	const mixer = useMemo(() => new THREE.AnimationMixer(cloneScenes), [cloneScenes])

	const [selectedAnimation, setSelectedAnimation] = useState<AxieAnimation>(animation)

	const mouthRef = useRef<THREE.Group>(null)
	const hornLRef = useRef<THREE.Group>(null)
	const hornRRef = useRef<THREE.Group>(null)
	const hornTRef = useRef<THREE.Group>(null)
	const earLRef = useRef<THREE.Group>(null)
	const earRRef = useRef<THREE.Group>(null)
	const eyeMRef = useRef<THREE.Group>(null)
	const tailMRef = useRef<THREE.Group>(null)
	const backLRef = useRef<THREE.Group>(null)
	const backRRef = useRef<THREE.Group>(null)
	const backMRef = useRef<THREE.Group>(null)

	const { clips } = useAnimationClipStore()

	useEffect(() => {
		if (!clips) return

		const clip = clips[`${body}_${selectedAnimation}`]
		const action = new THREE.AnimationAction(mixer, clip, cloneScenes)

		if (!action) return

		if (animation === animationSet.jump) {
			action.reset().fadeIn(0.2).setLoop(THREE.LoopOnce, 1).play()
			action.clampWhenFinished = true
		} else {
			action.reset().fadeIn(0.2).play()
		}

		const resetAnimation = () => {
			setSelectedAnimation('idle')
		}

		mixer.addEventListener('finished', () => resetAnimation())

		return () => {
			action.fadeOut(0.2)

			mixer.removeEventListener('finished', () => resetAnimation())
		}
	}, [animation, body, clips, cloneScenes, mixer, selectedAnimation])

	useFrame((_, delta) => {
		mixer.update(delta)

		mouthRef.current?.position.copy(bodyGraph.nodes.Root_Mouth_JNT.position)
		mouthRef.current?.rotation.copy(bodyGraph.nodes.Root_Mouth_JNT.rotation)
		tailMRef.current?.position.copy(bodyGraph.nodes.Root_Tail_M_JNT.position)
		tailMRef.current?.rotation.copy(bodyGraph.nodes.Root_Tail_M_JNT.rotation)
		eyeMRef.current?.position.copy(bodyGraph.nodes.Root_Eye_M_JNT.position)
		eyeMRef.current?.rotation.copy(bodyGraph.nodes.Root_Eye_M_JNT.rotation)
		backLRef.current?.position.copy(bodyGraph.nodes.Root_Back_L_JNT.position)
		backLRef.current?.rotation.copy(bodyGraph.nodes.Root_Back_L_JNT.rotation)
		backRRef.current?.position.copy(bodyGraph.nodes.Root_Back_R_JNT.position)
		backRRef.current?.rotation.copy(bodyGraph.nodes.Root_Back_R_JNT.rotation)
		backMRef.current?.position.copy(bodyGraph.nodes.Root_Back_M_JNT.position)
		backMRef.current?.rotation.copy(bodyGraph.nodes.Root_Back_M_JNT.rotation)
		earLRef.current?.position.copy(bodyGraph.nodes.Root_Ear_L_JNT.position)
		earLRef.current?.rotation.copy(bodyGraph.nodes.Root_Ear_L_JNT.rotation)
		earRRef.current?.position.copy(bodyGraph.nodes.Root_Ear_R_JNT.position)
		earRRef.current?.rotation.copy(bodyGraph.nodes.Root_Ear_R_JNT.rotation)
		hornLRef.current?.position.copy(bodyGraph.nodes.Root_Horn_L_JNT.position)
		hornLRef.current?.rotation.copy(bodyGraph.nodes.Root_Horn_L_JNT.rotation)
		hornRRef.current?.position.copy(bodyGraph.nodes.Root_Horn_R_JNT.position)
		hornRRef.current?.rotation.copy(bodyGraph.nodes.Root_Horn_R_JNT.rotation)
		hornTRef.current?.position.copy(bodyGraph.nodes.Root_Horn_T_JNT.position)
		hornTRef.current?.rotation.copy(bodyGraph.nodes.Root_Horn_T_JNT.rotation)

		// if (!axieref.current) return
		// axieref.current.position.x += 0.001
	})

	useEffect(() => {
		if (!cloneScenes) return
		cloneScenes.traverse((object: THREE.Object3D) => {
			if (object instanceof THREE.Mesh) {
				object.material = new THREE.MeshStandardMaterial({
					color: primaryColor,
				})
			}
		})
	}, [cloneScenes])

	return (
		<group ref={axieref}>
			<Detailed distances={[0, 45]}>
				<group>
					<primitive object={cloneScenes} />

					<Mouth ref={mouthRef} variant={parts.mouth} />
					<Eye ref={eyeMRef} variant={parts.eyes} />
					<Tail ref={tailMRef} variant={parts.tail} />

					{getPartPosition('back', parts.back).includes('l') && (
						<Back ref={backLRef} position="l" variant={parts.back} />
					)}
					{getPartPosition('back', parts.back).includes('r') && (
						<Back ref={backRRef} position="r" variant={parts.back} />
					)}
					{getPartPosition('back', parts.back).includes('m') && (
						<Back ref={backMRef} position="m" variant={parts.back} />
					)}

					{getPartPosition('horn', parts.horn).includes('l') && (
						<Horn ref={hornLRef} position="l" variant={parts.horn} />
					)}
					{getPartPosition('horn', parts.horn).includes('r') && (
						<Horn ref={hornRRef} position="r" variant={parts.horn} />
					)}
					{getPartPosition('horn', parts.horn).includes('t') && (
						<Horn ref={hornTRef} position="t" variant={parts.horn} />
					)}

					{getPartPosition('ear', parts.ear).includes('l') && <Ear ref={earLRef} position="l" variant={parts.ear} />}
					{getPartPosition('ear', parts.ear).includes('r') && <Ear ref={earRRef} position="r" variant={parts.ear} />}
				</group>

				<Capsule args={[0.7]} material={new THREE.MeshStandardMaterial({ color: primaryColor })} />
			</Detailed>
		</group>
	)
}
