import { OrthographicCamera, View } from '@react-three/drei'
import React from 'react'
import { SapidaeModel } from '../sapidae/model'
import GuideBubble from './guide-bubble'

export default function BottomDialogue() {
	return (
		<>
			<div className="-bottom-24 -translate-x-1/2 absolute left-[50%] z-[3] flex items-center">
				<View index={3} className="z-[2] h-[400px] w-[330px]">
					<OrthographicCamera makeDefault position={[0, 0, 5]} zoom={90} />
					<ambientLight intensity={4} />
					<SapidaeModel position={[0, -2.3, 0]} scale={2} rotation={[0, 0.2, 0]} />
				</View>

				<div className="z-[2] w-[400px]">
					<GuideBubble message="asdasd" />
				</div>
			</div>
		</>
	)
}
