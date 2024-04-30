// @ts-nocheck

import { Button } from '@/components/ui/button'
import { useDialogueStore } from '@/features/dialogue/store'
import type { Choice, NextNode } from '@/features/dialogue/type'
import { useMavisIdStore } from '@/features/mavis-id/store'
import useUser from '@/features/user/use-user'
import { useStageStore } from '@/stores/stage'
import { useWalletgo } from '@roninnetwork/walletgo'
import { AnimatePresence, motion } from 'framer-motion'
import { size } from 'lodash-es'
import dynamic from 'next/dynamic'
import { useEffect, useMemo, useState } from 'react'

const TopBubble = dynamic(() => import('@/features/dialogue/top-bubble'))

export default function OnboardingDialog() {
	const [dialogues, setSelectedDialogue, subDialogue, setSubDialogue] = useDialogueStore((s) => [
		s.dialogues,
		s.setSelectedDialogue,
		s.subDialogue,
		s.setSubDialogue,
	])

	const [bubbleIndex, setBubbleIndex] = useState(0)
	const [bubbles, setBubbles] = useState(subDialogue.bubbles ?? [])
	const [choices, setChoices] = useState(subDialogue.choices ?? {})
	const [nextActionIndex, setNextActionIndex] = useState(0)
	const bubble = useMemo(() => bubbles[Math.min(bubbleIndex, bubbles.length)], [bubbleIndex, bubbles])

	const setOpenMavisId = useMavisIdStore((s) => s.setOpen)
	const setStage = useStageStore((s) => s.setStage)
	const { walletProvider } = useWalletgo()
	const { login } = useUser()

	useEffect(() => {
		if (walletProvider) login()
	}, [walletProvider])

	const onBubbleClick = () => {
		if (size(choices) > 0) return

		if (bubbleIndex === bubbles.length - 1) {
			check(subDialogue.next ? subDialogue.next[nextActionIndex] : undefined)

			return
		}

		setBubbleIndex((prev) => prev + 1)
	}

	const check = (next: NextNode | undefined) => {
		if (!next) return
		const { action, node } = next

		switch (action) {
			case 'GOTO':
				if (!node) return
				setSubDialogue(dialogues[node])

				if (dialogues[node].bubbles) {
					setBubbles(dialogues[node].bubbles ?? [])
					setChoices({})
					setBubbleIndex(0)
					setNextActionIndex(0)
				}
				if (dialogues[node].choices) {
					setChoices(dialogues[node].choices ?? {})
				}

				return

			case 'CONNECT_WALLET':
				setOpenMavisId(true)
				setNextActionIndex(nextActionIndex + 1)

				return

			case 'END':
				setStage('home')

				return

			default:
				console.log('default')
		}
	}

	const onChoiceClick = (choice: Choice) => {
		if (!choice.next) return

		check(choice.next[nextActionIndex])
	}

	useEffect(() => {
		if (bubbleIndex === bubbles.length - 1 && subDialogue.next) {
			if (!subDialogue.next[nextActionIndex].node) return

			if (
				subDialogue.next[nextActionIndex].action === 'GOTO' &&
				dialogues[subDialogue.next[nextActionIndex].node].choices
			) {
				const nextNode = dialogues[subDialogue.next[nextActionIndex].node]

				setSubDialogue(nextNode)
				setChoices(nextNode.choices ?? {})
			}
		}

		if (nextActionIndex > 0 && walletProvider) {
			const nextChoice = subDialogue.choices?.yes.next ? subDialogue.choices.yes.next[nextActionIndex] : undefined

			check(nextChoice)
		}
	}, [bubbleIndex, subDialogue, walletProvider, nextActionIndex])

	return (
		<>
			<div className="absolute top-20 z-[3] max-w-[700px]">
				<AnimatePresence mode="wait">
					<TopBubble message={bubble} author="bino" onMouseUp={onBubbleClick} key={bubble} />
				</AnimatePresence>
			</div>

			<motion.div className="absolute bottom-10 z-[10] flex">
				{size(choices) > 0 && (
					<div className="flex gap-4">
						{choices.no && (
							<Button
								onClick={() => onChoiceClick(choices.no)}
								className="hover:-translate-y-1 transition-transform"
								color="red"
							>
								{choices.no.value}
							</Button>
						)}
						{choices.yes && (
							<Button
								onClick={() => onChoiceClick(choices.yes)}
								className="hover:-translate-y-1 transition-transform"
								color="yellow"
							>
								{choices.yes.value}
							</Button>
						)}
					</div>
				)}
			</motion.div>
		</>
	)
}
