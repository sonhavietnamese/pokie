import SapidaeT from '@/components/sapidae/sapidae'
import SapidaeNotation, { type SapidaeEmote } from '@/components/sapidae/sapidae-notation'
import { useGuideLineStore } from '@/features/guide-line/guide-line-store'
import { CapsuleCollider, type CollisionPayload, RigidBody, type RigidBodyProps } from '@react-three/rapier'
import React, { useState } from 'react'
import { useNpcStore } from './npc-store'

type BanoProps = {} & RigidBodyProps

export default function Bano({ ...props }: BanoProps) {
	const [emotion, setEmotion] = useState<SapidaeEmote>('normal')
	const meetNpc = useNpcStore((s) => s.meetNpc)
	const setTarget = useGuideLineStore((s) => s.setTarget)

	const onEnter = (e: CollisionPayload) => {
		if (e.colliderObject?.name === 'character-body') {
			setTarget(null)
			setEmotion('question')
			meetNpc('bano')
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
