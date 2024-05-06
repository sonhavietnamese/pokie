import SapidaeT from '@/components/sapidae/sapidae'
import SapidaeNotation, { type SapidaeEmote } from '@/components/sapidae/sapidae-notation'
import { useGuideLineStore } from '@/features/guide-line/guide-line-store'
import { Billboard, Text } from '@react-three/drei'
import { CapsuleCollider, type CollisionPayload, RigidBody, type RigidBodyProps } from '@react-three/rapier'
import { useState } from 'react'
import { useNpcStore } from './npc-store'

type BimyProps = {} & RigidBodyProps

export default function Bimy({ ...props }: BimyProps) {
	const [emotion, setEmotion] = useState<SapidaeEmote>('normal')
	const meetNpc = useNpcStore((s) => s.meetNpc)
	const setTarget = useGuideLineStore((s) => s.setTarget)

	const onEnter = (e: CollisionPayload) => {
		if (e.colliderObject?.name === 'character-body') {
			setTarget(null)
			setEmotion('question')
			meetNpc('bimy')
		}
	}

	const onExit = (e: CollisionPayload) => {
		if (e.colliderObject?.name === 'character-body') {
			setEmotion('normal')
			meetNpc(undefined)
		}
	}

	return (
		<RigidBody {...props} type="fixed" colliders={false}>
			<CapsuleCollider sensor args={[1, 2.5]} onIntersectionEnter={onEnter} onCollisionExit={onExit} />

			<SapidaeNotation emote={emotion}>
				<Billboard position={[0, 2.3, 0]}>
					<Text font="Prompt-Black.ttf" color="white" strokeWidth={0.015} strokeColor="#735427" fontSize={0.25}>
						Bimy
					</Text>
				</Billboard>
				<SapidaeT animation="idle-00" />
			</SapidaeNotation>
		</RigidBody>
	)
}
