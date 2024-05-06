import { Button } from '@/components/ui/button'
import React from 'react'
import useQuest from '../quest/use-quest'
import { useNpcStore } from './npc-store'

export default function NpcOpenChatButton() {
	const npc = useNpcStore((s) => s.npc)

	const { onGoingQuest, switchToCompletedQuest } = useQuest()

	// const handleClick = () => {

	// }

	return (
		<>
			{npc && (
				<div className="-translate-x-1/2 absolute bottom-6 left-1/2 z-[5]">
					<Button onClick={switchToCompletedQuest}>Chat</Button>
				</div>
			)}
		</>
	)
}
