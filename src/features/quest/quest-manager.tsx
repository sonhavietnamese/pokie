'use client'

import { useDialogueStore } from '@/features/dialogue/store'
import { useGuideLineStore } from '@/features/guide-line/guide-line-store'
import { NPCS } from '@/libs/constants'
import { AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import useEnergy from '../energy-system/use-energy'
import useQuest from './hook'
import { QuestItem } from './quest-item'
import { useQuestStore } from './quest-store'

export default function QuestManager() {
	const [quest, onGoingQuest] = useQuestStore((state) => [state.quest, state.onGoingQuest])
	const timeout = useRef<NodeJS.Timeout>()
	const setTarget = useGuideLineStore((s) => s.setTarget)

	const [showDialogue, selectedDialogue, clearDialogue] = useDialogueStore((s) => [
		s.showDialogue,
		s.selectedDialogue,
		s.clear,
	])

	const { quests } = useQuest()
	const { energy } = useEnergy()

	console.log(quests)
	console.log(energy)

	const { data, status } = useSession()

	useEffect(() => {
		// fetchQuests()

		if (quest) {
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
	}, [quest])

	useEffect(() => {
		if (selectedDialogue === 'ron_insufficient') return

		if (status === 'authenticated' && !data?.user.isBoarded) {
			if (quest?.id === 'quest_01') {
				clearDialogue()
			} else showDialogue('quest_01', 'bottom')
		}
	}, [showDialogue, selectedDialogue, data, quest])

	return (
		<section className="absolute bottom-[20%] left-5 z-[4]">
			<AnimatePresence>{quest && <QuestItem key={quest.id} quest={quest} />}</AnimatePresence>
		</section>
	)
}
