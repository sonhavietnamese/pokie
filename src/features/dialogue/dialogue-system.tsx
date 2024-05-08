import { Button } from '@/components/ui/button'
import { useMavisIdStore } from '@/features/mavis-id/store'
import { useNpcStore } from '@/features/npc/npc-store'
import { useOnboardingStore } from '@/features/onboarding/onboarding-store'
import { useQuestStore } from '@/features/quest/quest-store'
import useQuest from '@/features/quest/use-quest'
import { useCharacterStore } from '@/stores/character'
import { type Stage, useStageStore } from '@/stores/stage'
import { size } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { useBlacksmithStore } from '../blacksmith/store'
import { useDialogueStore } from './store'
import type { Choice, NextNode } from './type'

const TopDialogue = dynamic(() => import('./top-dialogue'))
const BottomDialogue = dynamic(() => import('./bottom-dialogue'))

export default function DialogueSystem() {
	const [selectedDialogue, dialogueType, subDialogue, topDialogues, bottomDialogues, setSubDialogue, clear] =
		useDialogueStore((s) => [
			s.selectedDialogue,
			s.dialogueType,
			s.subDialogue,
			s.topDialogues,
			s.bottomDialogues,
			s.setSubDialogue,
			s.clear,
		])
	const setOpenMavisId = useMavisIdStore((s) => s.setOpen)
	const setStage = useStageStore((s) => s.setStage)
	const setReward = useQuestStore((s) => s.setReward)
	const { switchToOngoingQuest, switchToCompletedQuest } = useQuest()
	const [setIsTalking, setCameraPosition] = useNpcStore((s) => [s.setIsTalking, s.setCameraPosition])
	const setOpenBlacksmith = useBlacksmithStore((s) => s.setIsOpenUI)

	const dialogues = useMemo(
		() => (dialogueType === 'bottom' ? bottomDialogues : topDialogues),
		[dialogueType, bottomDialogues, topDialogues],
	)
	const [choices, setChoices] = useState(subDialogue ? subDialogue.choices : null)
	const [setCanControl] = useCharacterStore((s) => [s.setCanControl])
	const [setIsFirstTimeChest, setIsFirstTimeCatchAxie, setIsFirstTimeMeetAxie] = useOnboardingStore((s) => [
		s.setIsFirstTimeChest,
		s.setIsFirstTimeCatchAxie,
		s.setIsFirstTimeMeetAxie,
	])

	useEffect(() => {
		if (subDialogue?.bubbles) {
			setChoices({})
		}
		if (subDialogue?.choices) {
			setChoices(subDialogue.choices ?? {})
		}
	}, [subDialogue])

	useEffect(() => {
		setCanControl(Boolean(!selectedDialogue))
	}, [selectedDialogue])

	const onBubbleClick = () => {
		if (size(choices) > 0 || !subDialogue) return

		check(subDialogue.next ? subDialogue.next[0] : undefined)
	}

	const check = (next: NextNode | undefined) => {
		if (!next || !dialogues) return
		const { action, node } = next

		switch (action) {
			case 'GOTO':
				if (!node) return
				setSubDialogue(dialogues[node])

				return

			case 'CONNECT_WALLET':
				localStorage.removeItem('MAVIS.ID:PROFILE')
				setOpenMavisId(true)

				return

			case 'OPEN_NEW_TAB':
				window.open(node, '_blank')

				return

			case 'OPEN_PANEL':
				if (!node) return
				if (node === 'blacksmith') {
					setOpenBlacksmith(true)
					setCameraPosition([9.3, 1.2, -3])
				}
				clear()

				return

			case 'CHANGE_STAGE':
				if (!node) return
				setStage(node as Stage)
				clear()

				return

			case 'NEW_QUEST':
				if (!node) return

				if (node === 'quest_01') {
					switchToOngoingQuest('quest_01')
				}

				if (node === 'quest_02') {
					switchToOngoingQuest('quest_02')
				}

				if (node === 'quest_03') {
					switchToOngoingQuest('quest_03')
				}
				clear()

				return

			case 'REWARD':
				if (!node) return

				if (node === 'quest_01') {
					switchToCompletedQuest('quest_01')
				}
				clear()

				return

			case 'END':
				if (selectedDialogue === 'first_time_chest') {
					setIsFirstTimeChest(false)
				}
				if (selectedDialogue === 'first_time_catch_axie') {
					setIsFirstTimeCatchAxie(false)
				}
				if (selectedDialogue === 'first_time_meet_axie') {
					setIsFirstTimeMeetAxie(false)
				}

				clear()
				setIsTalking(false)

				return

			default:
				console.log('default')
		}
	}

	const onActionClick = (choice: Choice) => {
		if (!choice.next) return

		check(choice.next[0])
	}

	return (
		<>
			{selectedDialogue && dialogueType === 'top' && (
				<section className="absolute inset-0 z-[20] flex h-screen w-screen justify-center">
					<TopDialogue onBubbleClick={onBubbleClick} content={subDialogue?.bubbles?.[0] ?? ''} />

					<div className="absolute bottom-10 z-[20] flex">
						{size(choices) > 0 && choices && (
							<div className="flex gap-4">
								{choices.no && (
									<Button
										onClick={() => onActionClick(choices.no)}
										className="hover:-translate-y-1 transition-transform"
										color="red"
									>
										{choices.no.value}
									</Button>
								)}
								{choices.yes && (
									<Button
										onClick={() => onActionClick(choices.yes)}
										className="hover:-translate-y-1 transition-transform"
										color="yellow"
									>
										{choices.yes.value}
									</Button>
								)}
							</div>
						)}
					</div>
				</section>
			)}

			{selectedDialogue && dialogueType === 'bottom' && (
				<BottomDialogue onBubbleClick={onBubbleClick} content={subDialogue?.bubbles?.[0] ?? ''} />
			)}
		</>
	)
}
