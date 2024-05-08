'use client'

import Reward from '@/components/reward'
import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { type DialogueID, useDialogueStore } from '@/features/dialogue/store'
import { useGuideLineStore } from '@/features/guide-line/guide-line-store'
import { BALLS, NPCS, STUFFS } from '@/libs/constants'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import { capitalize } from 'lodash-es'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { QuestItem } from './quest-item'
import { useQuestStore } from './quest-store'
import questData from './quests.json'
import type { Quest } from './type'
import useQuest from './use-quest'

const itemVariants: Variants = {
	hidden: { opacity: 0, scale: 1.5 },
	visible: { opacity: 1, scale: 1 },
}

const itemTitleVariants: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
}

const REWARDS = {
	quest_01: [
		{
			id: STUFFS.ROCK,
			type: 'item',
			amount: 20,
		},
		{
			id: STUFFS.NUT,
			type: 'item',
			amount: 20,
		},
		{
			id: STUFFS.FISH,
			type: 'item',
			amount: 20,
		},
		{
			id: STUFFS.BUG,
			type: 'item',
			amount: 20,
		},
		{
			id: STUFFS.FEATHER,
			type: 'item',
			amount: 20,
		},
		{
			id: STUFFS.MILK,
			type: 'item',
			amount: 20,
		},
		{
			id: STUFFS.PLANT,
			type: 'item',
			amount: 20,
		},
	],
	quest_02: [
		{
			id: BALLS.AQUATIC,
			type: 'ball',
			amount: 1,
		},
		{
			id: BALLS.BEAST,
			type: 'ball',
			amount: 1,
		},
		{
			id: BALLS.BIRD,
			type: 'ball',
			amount: 1,
		},
		{
			id: BALLS.BUG,
			type: 'ball',
			amount: 1,
		},
		{
			id: BALLS.PLANT,
			type: 'ball',
			amount: 1,
		},
		{
			id: BALLS.REPTILE,
			type: 'ball',
			amount: 1,
		},
	],
}

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
			{/* {reward && <Reward />} */}

			<Reward>
				{REWARDS.quest_01.map((re, index) => (
					<motion.div
						key={re.id}
						variants={itemVariants}
						animate={'visible'}
						initial={'hidden'}
						className="flex min-w-[8cqw] max-w-[20cqw] flex-col items-center"
					>
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_DATA.frames[
									`icon-${re.type}-${STUFFS[re.id].toLowerCase()}.png` as keyof typeof SPRITESHEET_DATA.frames
								].frame,
							}}
							className="h-full w-full"
						/>
						<motion.span
							variants={itemTitleVariants}
							initial="hidden"
							animate="visible"
							className="mt-5 w-full text-center font-extrabold text-[#FFF] text-[1.2cqw] tracking-wide outline-2-primary-medium"
						>
							{capitalize(STUFFS[re.id])} <br />x{re.amount}
						</motion.span>
					</motion.div>
				))}
			</Reward>

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
