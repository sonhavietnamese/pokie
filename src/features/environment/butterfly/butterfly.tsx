import { Detailed, useAnimations, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { CuboidCollider, type RapierRigidBody, RigidBody, type RigidBodyProps } from '@react-three/rapier'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { Vector2 } from 'three'
import { FBM } from 'three-noise'
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils'

const vec = new Vector2()
const pos = new THREE.Vector3()

export function Butterfly(props: RigidBodyProps) {
	const group = useRef<THREE.Group>(null)
	const physicRef = useRef<RapierRigidBody>(null)
	const modelRef = useRef<THREE.Group>(null)
	const { scene, animations } = useGLTF('/models/butterfly.glb')
	const cloneScene = useMemo(() => SkeletonUtils.clone(scene), [scene])
	const { actions } = useAnimations(animations, group)
	const fbm = useMemo(() => new FBM({ seed: Math.random() }), [])
	const offset = useMemo(() => Math.random() * 100, [])

	useEffect(() => {
		if (!group.current) return

		actions['ArmatureAction.001']?.setEffectiveTimeScale(6)
		actions['ArmatureAction.001']?.reset().fadeIn(0.2).play()

		group.current.rotation.y = offset

		return () => {
			actions['ArmatureAction.001']?.fadeOut(0.2).stop()
		}
	}, [])

	useFrame(({ clock }, dt) => {
		if (!group.current) return
		if (!physicRef.current) return
		if (!modelRef.current) return

		vec.set(clock.elapsedTime, clock.elapsedTime)

		modelRef.current.getWorldPosition(pos)

		group.current.position.set(0, fbm.get2(vec), 0)
		group.current.rotation.y -= dt

		physicRef.current.setTranslation(pos, false)
	})

	return (
		<>
			<RigidBody ref={physicRef} type="fixed" colliders={false} {...props}>
				<CuboidCollider name={props.name} args={[0.2, 0.2, 0.2]} sensor />
			</RigidBody>

			<group ref={group} dispose={null}>
				<group {...props}>
					<group ref={modelRef}>
						<Detailed distances={[0, 15]}>
							<primitive object={cloneScene} />

							<mesh>
								<planeGeometry args={[0.2, 0.2]} />
								<meshBasicMaterial color="red" />
							</mesh>
						</Detailed>
					</group>
				</group>
			</group>
		</>
	)
}
