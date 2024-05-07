import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

const CAMERA_POSITION = {
	INITIAL: new THREE.Vector3(20, 2, 0),
	ZOOM: new THREE.Vector3(8, 2, 0),
	PLAYER: new THREE.Vector3(1.9, 0.6, -1.5),

	BOT: new THREE.Vector3(2.2, 0.9, -0.2),
	END: new THREE.Vector3(4.35, 1.0, 8.06),
}

const CAMERA_ROTATION = {
	INITIAL: new THREE.Euler(0, Math.PI / 2, 0),
	ZOOM: new THREE.Euler(0, Math.PI / 2, 0),
	PLAYER: new THREE.Euler(0, 2.7, 0),
	BOT: new THREE.Euler(0, 0.4, 0),
	END: new THREE.Euler(0, 0.61, 0),
}

const CAMERA_POSITIONS = [CAMERA_POSITION.PLAYER, CAMERA_POSITION.BOT, CAMERA_POSITION.END]

const CAMERA_ROTATIONS = [CAMERA_ROTATION.PLAYER, CAMERA_ROTATION.BOT, CAMERA_ROTATION.END]

export default function BattleCamera() {
	const cameraRef = useRef<THREE.PerspectiveCamera>(null)
	const currentPoint = useRef(0)

	useFrame((state, delta) => {
		if (!cameraRef.current) return

		const camera = cameraRef.current

		if (currentPoint.current <= CAMERA_POSITIONS.length - 1) {
			camera.position.lerp(CAMERA_POSITIONS[currentPoint.current], 1 - Math.exp(-4 * delta))

			camera.quaternion.slerp(
				new THREE.Quaternion().setFromEuler(CAMERA_ROTATIONS[currentPoint.current]),
				1 - Math.exp(-4 * delta),
			)

			if (camera.position.distanceTo(CAMERA_POSITIONS[currentPoint.current]) < 0.01) {
				currentPoint.current = Math.min(currentPoint.current + 1, 4)
			}
		} else {
		}
	})

	return (
		<PerspectiveCamera
			ref={cameraRef}
			fov={40}
			makeDefault={true}
			rotation={[0, Math.PI / 2, 0]}
			// position={cameraConfigs.position}
			// rotation={cameraConfigs.rotation}
		/>
	)
}
