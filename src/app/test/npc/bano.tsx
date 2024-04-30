import SapidaeT from '@/components/sapidae/sapidae'
import SapidaeNotation, { type SapidaeEmote } from '@/components/sapidae/sapidae-notation'
import { CapsuleCollider, type CollisionPayload, RigidBody, type RigidBodyProps } from '@react-three/rapier'
import React, { useState } from 'react'

type BanoProps = {} & RigidBodyProps

export default function Bano({ ...props }: BanoProps) {
	const [emotion, setEmotion] = useState<SapidaeEmote>('normal')

	const onEnter = (e: CollisionPayload) => {
		if (e.colliderObject?.name === 'character-body') {
			setEmotion('question')
		}
	}

	const onExit = (e: CollisionPayload) => {
		if (e.colliderObject?.name === 'character-body') {
			setEmotion('normal')
		}
	}

	return (
		<RigidBody {...props} type="fixed" colliders={false}>
			<CapsuleCollider sensor args={[1, 1]} onIntersectionEnter={onEnter} onCollisionExit={onExit} />

			<SapidaeNotation emote={emotion}>
				<SapidaeT animation="idle-00" />
			</SapidaeNotation>
		</RigidBody>
	)
}
