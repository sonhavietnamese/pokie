import { Button } from '@/components/ui/button'
import { type Stage, useStageStore } from '@/stores/stage'
import { size } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'
import { useMavisIdStore } from '../mavis-id/store'
import { useDialogueStore } from './store'
import type { Choice, NextNode } from './type'

const TopDialogue = dynamic(() => import('./top-dialogue'))
const BottomDialogue = dynamic(() => import('./bottom-dialogue'))

export default function DialogueSystem() {
	const [
		selectedDialogue,
		dialogueType,
		subDialogue,
		topDialogues,
		bottomDialogues,
		setSubDialogue,
		setSelectedDialogue,
		clear,
	] = useDialogueStore((s) => [
		s.selectedDialogue,
		s.dialogueType,
		s.subDialogue,
		s.topDialogues,
		s.bottomDialogues,
		s.setSubDialogue,
		s.setSelectedDialogue,
		s.clear,
	])
	const setOpenMavisId = useMavisIdStore((s) => s.setOpen)
	const setStage = useStageStore((s) => s.setStage)

	const dialogues = useMemo(
		() => (dialogueType === 'bottom' ? bottomDialogues : topDialogues),
		[dialogueType, bottomDialogues, topDialogues],
	)
	const [choices, setChoices] = useState(subDialogue ? subDialogue.choices : null)

	useEffect(() => {
		if (subDialogue?.bubbles) {
			setChoices({})
		}
		if (subDialogue?.choices) {
			setChoices(subDialogue.choices ?? {})
		}
	}, [subDialogue])

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

			case 'CHANGE_STAGE':
				if (!node) return
				setStage(node as Stage)
				clear()

				return

			case 'END':
				clear()

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
				<>
					<TopDialogue onBubbleClick={onBubbleClick} content={subDialogue?.bubbles?.[0] ?? ''} />
					<div className="absolute bottom-10 z-[10] flex">
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
				</>
			)}
			{/* <View index={3} className="z-[10] absolute h-[400px] w-[250px]">
				<OrthographicCamera makeDefault position={[0, 0, 5]} zoom={90} />
				<ambientLight intensity={4} />
				<animated.group position={[0, 0, 0]}>
					<Sapidae animation="talk-01" scale={2} rotation={[0, 0.2, 0]} />
				</animated.group>
			</View> */}
			{selectedDialogue && dialogueType === 'bottom' && (
				<BottomDialogue onBubbleClick={onBubbleClick} content={subDialogue?.bubbles?.[0] ?? ''} />
			)}
		</>
	)
}
