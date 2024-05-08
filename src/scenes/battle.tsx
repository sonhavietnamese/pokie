import type { SapidaeAnimation } from '@/components/sapidae/type'
import { useBattle } from '@/features/battle/use-battle'
import { useCustomAvatarStore } from '@/features/custom-avatar/custom-avatar-store'
import { useFrame } from '@react-three/fiber'
import { sample } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

const Sapidae = dynamic(() => import('@/components/sapidae/sapidae'), { ssr: false })
const BattleCamera = dynamic(() => import('@/features/battle/battle-camera'), { ssr: false })
const BattleBackdrop = dynamic(() => import('@/features/battle/battle-map'), { ssr: false })

export default function BattleScene() {
	return (
		<>
			<ambientLight intensity={2} />
			<directionalLight
				castShadow
				position={[20, 10, 10]}
				intensity={1}
				shadow-mapSize={[1024, 1024]}
				shadow-camera-near={1}
				shadow-camera-far={50}
				shadow-camera-top={50}
				shadow-camera-right={50}
				shadow-camera-bottom={-50}
				shadow-camera-left={-50}
			/>

			<BattleCamera />
			<BattleBackdrop />

			<Sapidaes />
		</>
	)
}

const Sapidaes = () => {
	const meRef = useRef<THREE.Group>(null)
	const enemyRef = useRef<THREE.Group>(null)
	const selectedSkin = useCustomAvatarStore((s) => s.selectedSkin)

	const lerpMe = useRef(false)
	const lerpEnemy = useRef(false)

	const { stage, roundWinner } = useBattle()
	const timeout = useRef<NodeJS.Timeout>()

	const myAnimation = useMemo<SapidaeAnimation>(() => {
		if (stage === 'ready') return 'fight-00'
		if (stage === 'animation' && roundWinner === 'draw') return sample<SapidaeAnimation>(['fight-03', 'gesture-01'])
		if (stage === 'end' && roundWinner !== 'player') return 'fight-01'

		return 'idle-00'
	}, [stage])
	const enemyAnimation = useMemo<SapidaeAnimation>(() => {
		if (stage === 'ready') return 'fight-02'
		if (stage === 'end' && roundWinner !== 'bot') return 'fight-01'
		if (stage === 'animation' && roundWinner === 'draw') return sample<SapidaeAnimation>(['fight-03', 'gesture-01'])

		return 'idle-00'
	}, [stage])

	useEffect(() => {
		if (stage === 'animation') {
			if (roundWinner === 'player') {
				timeout.current = setTimeout(() => {
					lerpMe.current = true
					if (meRef.current && enemyRef.current) {
						setTimeout(() => {
							if (meRef.current && enemyRef.current) {
								meRef.current.position.set(0, 0, 4)
							}
						}, 2000)
					}
				}, 3500)
			} else if (roundWinner === 'bot') {
				timeout.current = setTimeout(() => {
					lerpEnemy.current = true
					if (enemyRef.current && meRef.current) {
						setTimeout(() => {
							if (enemyRef.current && meRef.current) {
								enemyRef.current.position.set(0, 0, -4)
							}
						}, 2000)
					}
				}, 3500)
			}
		} else {
			lerpMe.current = false
			lerpEnemy.current = false
		}

		return () => {
			clearTimeout(timeout.current)
		}
	}, [stage])

	useFrame((_, delta) => {
		if (lerpMe.current) {
			if (meRef.current) {
				meRef.current.position.lerp(new THREE.Vector3(0, 0, -2.5), delta * 10)
			}
		}

		if (lerpEnemy.current) {
			if (enemyRef.current) {
				enemyRef.current.position.lerp(new THREE.Vector3(0, 0, 2.5), delta * 10)
			}
		}
	})

	return (
		<>
			<group ref={meRef} position={[0, 0, 4]} rotation={[0, Math.PI, 0]}>
				<Sapidae skin={selectedSkin} animation={myAnimation} />
			</group>
			<group ref={enemyRef} position={[0, 0, -4]}>
				<Sapidae skin={'default'} animation={enemyAnimation} />
			</group>
		</>
	)
}
