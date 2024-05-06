'use client'

import Reward from '@/components/reward'
import { type DialogueID, useDialogueStore } from '@/features/dialogue/store'
import { useGuideLineStore } from '@/features/guide-line/guide-line-store'
import { NPCS } from '@/libs/constants'
import { AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { QuestItem } from './quest-item'
import { useQuestStore } from './quest-store'
import questData from './quests.json'
import type { Quest } from './type'
import useQuest from './use-quest'

// TODO: Improve later
export default function QuestManager() {
	const setTarget = useGuideLineStore((s) => s.setTarget)

	const [currentQuest, setCurrentQuest] = useState<Quest>()

	const [showDialogue, selectedDialogue, clearDialogue] = useDialogueStore((s) => [
		s.showDialogue,
		s.selectedDialogue,
		s.clear,
	])

	const [reward] = useQuestStore((s) => [s.reward])

	const { onGoingQuest, isLoading, idleQuest } = useQuest()

	const { data, status } = useSession()

	useEffect(() => {
		if (isLoading) return

		if (status === 'authenticated' && !data?.user.isBoarded) {
			if (idleQuest) {
				showDialogue(idleQuest.questId as DialogueID, 'bottom')
			}
		}
	}, [isLoading, status, data])

	useEffect(() => {
		if (onGoingQuest) {
			// TODO: update typesafe
			setCurrentQuest(questData[onGoingQuest.questId as keyof typeof questData] as unknown as Quest)
			check({ ...onGoingQuest, id: onGoingQuest.questId } as unknown as Quest)
		} else {
			setCurrentQuest(undefined)
		}
	}, [onGoingQuest])

	const check = (quest: Quest) => {
		switch (quest.id) {
			// TODO: Make it dynamic
			case 'quest_01':
				setTarget(new THREE.Vector3().fromArray(NPCS.bimy.position))
				break

			default:
				console.log('Quest not found')
				break
		}
	}

	const onQuestClick = (quest: Quest) => {
		check(quest)
	}

	return (
		<>
			{reward && <Reward />}

			<section className="absolute bottom-10 left-6 z-[5]">
				<AnimatePresence>
					{currentQuest && (
						<QuestItem onClick={() => onQuestClick(currentQuest)} key={currentQuest.id} quest={currentQuest} />
					)}
				</AnimatePresence>
			</section>
		</>
	)
}
