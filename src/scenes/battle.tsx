import Sapidae from '@/components/sapidae/sapidae'
import BattleCamera from '@/features/battle/battle-camera'
import { BattleBackdrop } from '@/features/battle/battle-map'
import { BattleSystem } from '@/features/battle/battle-system'
import { useBattle } from '@/features/battle/use-battle'
import { Canvas } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import type * as THREE from 'three'

// const BATTLE_BACKGROUND = new Howl({
// 	src: ['/audio/battle-background.mp3'],
// 	volume: 0.5,
// 	loop: true,
// })

export default function BattleScene() {
	// useEffect(() => {
	// 	if (SOUNDS.HOME_BACKGROUND.playing()) {
	// 		SOUNDS.HOME_BACKGROUND.fade(1, 0, 2000)
	// 	}
	// 	if (!BATTLE_BACKGROUND.playing()) {
	// 		BATTLE_BACKGROUND.play()
	// 	}
	// }, [])

	return (
		<main className="relative h-screen w-screen cursor-none overflow-hidden">
			<BattleSystem />

			<Canvas shadows>
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
			</Canvas>
		</main>
	)
}

const Sapidaes = () => {
	const meRef = useRef<THREE.Group>(null)
	const enemyRef = useRef<THREE.Group>(null)

	const {
		stage,
		roundWinner,
		// players
	} = useBattle()
	const timeout = useRef<NodeJS.Timeout>()

	useEffect(() => {
		if (stage === 'animation') {
			if (roundWinner === 'player') {
				timeout.current = setTimeout(() => {
					if (meRef.current && enemyRef.current) {
						meRef.current.position.set(0, 0, -2.5)

						// SOUNDS.BATTLE.play(`MOVE_${players?.player.move.toUpperCase()}`)
						// console.log('MOVE_', players?.player.move.toUpperCase())

						setTimeout(() => {
							if (meRef.current && enemyRef.current) {
								meRef.current.position.set(0, 0, 4)
							}
						}, 2000)
					}
				}, 3500)
			} else if (roundWinner === 'bot') {
				timeout.current = setTimeout(() => {
					if (enemyRef.current && meRef.current) {
						enemyRef.current.position.set(0, 0, 2.5)

						// SOUNDS.BATTLE.play(`MOVE_${players?.bot.move.toUpperCase()}`)
						// console.log('MOVE_', players?.bot.move.toUpperCase())

						setTimeout(() => {
							if (enemyRef.current && meRef.current) {
								enemyRef.current.position.set(0, 0, -4)
							}
						}, 2000)
					}
				}, 3500)
			}
		}

		return () => {
			clearTimeout(timeout.current)
		}
	}, [stage])

	return (
		<>
			<group ref={meRef} position={[0, 0, 4]} rotation={[0, Math.PI, 0]}>
				<Sapidae animation="idle-00" />
			</group>
			<group ref={enemyRef} position={[0, 0, -4]}>
				<Sapidae animation="idle-00" />
			</group>
		</>
	)
}
