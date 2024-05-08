// @ts-ignore
// @ts-nocheck

'use client'

import LoadingText from '@/components/loading-text'
import { Button } from '@/components/ui/button'
import { Sprite } from '@/components/ui/sprite'
import Vignette from '@/components/vignette'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { type DialogueID, useDialogueStore } from '@/features/dialogue/store'
import { useGuideLineStore } from '@/features/guide-line/guide-line-store'
import { useNpcStore } from '@/features/npc/npc-store'
import { usePokieCoin } from '@/features/poxie-coin/use-poxie-coin'
import { useToastStore } from '@/features/toast/store'
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
			id: STUFFS.STAR,
			type: 'item',
			amount: 20,
		},
		{
			id: STUFFS.MOON,
			type: 'item',
			amount: 20,
		},
	],
	quest_03: [
		{
			id: 'pokie-coin',
			type: 'coin',
			amount: 20,
		},
	],
}

// TODO: Improve later
export default function QuestManager() {
	const [currentQuest, setCurrentQuest] = useState<Quest>()

	const [showDialogue, selectedDialogue, clearDialogue] = useDialogueStore((s) => [
		s.showDialogue,
		s.selectedDialogue,
		s.clear,
	])
	const setTarget = useGuideLineStore((s) => s.setTarget)
	const [reward, setReward] = useQuestStore((s) => [s.reward, s.setReward])
	const {
		onGoingQuest,
		isLoading,
		idleQuest,
		getNextQuestId,
		latestCompletedQuest,
		createNewQuest,
		latestClaimedQuest,
		reward: rewardQuest,
		switchToClaimedQuest,
	} = useQuest()
	const { data, status } = useSession()
	const setIsTalking = useNpcStore((s) => s.setIsTalking)
	const showToast = useToastStore((s) => s.showToast)
	const [rewarding, setRewarding] = useState(false)
	const { fetchBalances } = usePokieCoin()

	const onClose = () => {
		setReward(null)
		setIsTalking(false)
	}

	useEffect(() => {
		if (isLoading) return

		if (status === 'authenticated' && !data?.user.isBoarded) {
			if (idleQuest) {
				showDialogue(idleQuest.questId as DialogueID, 'bottom')
			}
		}
	}, [isLoading, status, data, idleQuest])

	useEffect(() => {
		if (latestClaimedQuest && !onGoingQuest && !latestCompletedQuest && !idleQuest && !reward) {
			if (getNextQuestId()) createNewQuest()
		}
	}, [latestClaimedQuest, idleQuest, onGoingQuest, latestCompletedQuest, reward])

	useEffect(() => {
		if (onGoingQuest) {
			// TODO: update typesafe
			setCurrentQuest(questData[onGoingQuest.questId as keyof typeof questData] as unknown as Quest)
			check({ ...onGoingQuest, id: onGoingQuest.questId } as unknown as Quest)
		}
	}, [onGoingQuest])

	useEffect(() => {
		if (latestCompletedQuest) {
			// TODO: update typesafe
			setCurrentQuest(questData[latestCompletedQuest.questId as keyof typeof questData] as unknown as Quest)
		}
	}, [latestCompletedQuest])

	const check = async (quest: Quest) => {
		if (latestCompletedQuest?.questId === quest.id) {
			try {
				setRewarding(true)
				setCurrentQuest(undefined)

				setReward({ id: quest.id })
				await rewardQuest(quest.id)
				switchToClaimedQuest(quest.id)

				await fetchBalances()

				return
			} catch (error) {
				showToast('Failed to reward!')
			} finally {
				setRewarding(false)
			}
		} else
			switch (quest.id) {
				// TODO: Make it dynamic
				case 'quest_01':
					setTarget(new THREE.Vector3().fromArray(NPCS.bimy.position))
					break

				case 'quest_02':
					setTarget(new THREE.Vector3().fromArray(NPCS.ooap.position))
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
			{reward && (
				<div className="absolute inset-0 z-[20] h-screen w-screen">
					<Vignette />

					<section className="relative flex h-full w-full">
						<div className="z-[2] flex flex-1 items-center">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['frame-reward.png'].frame,
								}}
								className="w-full"
							/>
						</div>

						<div className="z-[2] flex flex-1 scale-x-[-1] items-center">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['frame-reward.png'].frame,
								}}
								className="w-full"
							/>
						</div>

						<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-[3] aspect-square w-[30%] origin-center">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['ray-01.png'].frame,
								}}
								className="h-full w-full animate-spin-slow"
							/>
						</div>

						<div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-[4] flex origin-center gap-[80px]">
							{REWARDS[reward.id].map((re, index) => (
								<motion.div
									key={re.id}
									variants={itemVariants}
									animate={'visible'}
									initial={'hidden'}
									className="flex min-w-[8cqw] max-w-[20cqw] flex-col items-center"
								>
									{re.type === 'coin' ? (
										<>
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['icon-pokie-coin.png'].frame,
												}}
												className="h-full w-full"
											/>
											<motion.span
												variants={itemTitleVariants}
												initial="hidden"
												animate="visible"
												className="mt-5 w-full text-center font-extrabold text-[#FFF] text-[1.2cqw] tracking-wide outline-2-primary-medium"
											>
												Poxie Coin <br />x{re.amount}
											</motion.span>
										</>
									) : (
										<>
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
										</>
									)}
								</motion.div>
							))}
						</div>
					</section>

					<motion.div
						variants={itemTitleVariants}
						initial="hidden"
						animate="visible"
						className="absolute bottom-10 z-[10] flex w-full justify-center"
					>
						{rewarding ? (
							<LoadingText text="Rewarding" />
						) : (
							<Button color="yellow" onMouseUp={onClose}>
								Close
							</Button>
						)}
					</motion.div>
				</div>
			)}

			<section className="absolute bottom-10 left-6 z-[5]">
				<AnimatePresence>
					{currentQuest && (
						<QuestItem
							onClick={() => onQuestClick(currentQuest)}
							key={currentQuest.id}
							isCompleted={latestCompletedQuest?.questId === currentQuest.id}
							quest={currentQuest}
						/>
					)}
				</AnimatePresence>
			</section>
		</>
	)
}
