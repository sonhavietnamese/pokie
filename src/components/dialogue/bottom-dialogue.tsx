import { OrthographicCamera, View } from '@react-three/drei'
import React from 'react'
import { SapidaeModel } from '../sapidae/model'

export default function BottomDialogue() {
	return (
		<>
			<div className="absolute bottom-10 left-[45%] z-[1] w-[400px]">
				<img src="/guide-chat.png" alt="" />
			</div>

			<View index={3} className="-bottom-24 absolute left-[20%] z-[2] h-[400px] w-[360px]">
				<OrthographicCamera makeDefault position={[0, 0, 5]} zoom={90} />
				<ambientLight intensity={4} />
				<SapidaeModel position={[0, -2.3, 0]} scale={2} rotation={[0, 0.2, 0]} />
			</View>
		</>
	)
}
