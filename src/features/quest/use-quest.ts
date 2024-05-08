'use client'

import { createQuest, getQuests, switchToClaimed, switchToCompleted, switchToOngoing } from '@/app/actions/quest'
import { rewardQuest } from '@/app/actions/reward-quest'
import { useSession } from 'next-auth/react'
import useSWRImmutable from 'swr'

const QUEST_QUEUE = ['quest_01', 'quest_02', 'quest_03']

export default function useQuest() {
	const { data } = useSession()
	const {
		data: quests,
		isLoading,
		mutate,
	} = useSWRImmutable(data?.user ? 'getQuests' : null, () => getQuests(data ? data.user.id : ''))

	const fetchQuests = async () => {
		mutate()
	}

	const latestClaimedQuest = quests
		?.filter((quest) => quest.status === 'claimed')
		.sort((a, b) => Number(b.questId.split('_')[1]) - Number(a.questId.split('_')[1]))[0]

	const latestCompletedQuest = quests
		?.filter((quest) => quest.status === 'completed')
		.sort((a, b) => Number(b.questId.split('_')[1]) - Number(a.questId.split('_')[1]))[0]
	const onGoingQuest = quests?.find((quest) => quest.status === 'ongoing')

	const idleQuest = quests
		?.filter((quest) => quest.status === 'idle')
		.sort((a, b) => Number(b.questId.split('_')[1]) - Number(a.questId.split('_')[1]))[0]

	const getNextQuestId = () => {
		fetchQuests()
		if (!latestClaimedQuest) return QUEST_QUEUE[0]
		const currentQuestIndex = QUEST_QUEUE.findIndex((quest) => quest === latestClaimedQuest.questId)

		return QUEST_QUEUE[currentQuestIndex + 1] || null
	}

	const createNewQuest = () => {
		const nextQuestId = getNextQuestId()

		if (!nextQuestId) return
		if (!data) return

		createQuest(data.user.id, nextQuestId)

		mutate()
	}

	const switchToOngoingQuest = (questId: string) => {
		if (!data) return

		switchToOngoing(data.user.id, questId)
		mutate()
	}

	const switchToCompletedQuest = (questId: string) => {
		if (!data) return

		switchToCompleted(data.user.id, questId)
		mutate()
	}

	const switchToClaimedQuest = (questId: string) => {
		if (!data) return

		switchToClaimed(data.user.id, questId)
		mutate()
	}

	const reward = async (questId: string) => {
		if (!data) return

		await rewardQuest(data.user.id, questId, data.user.wallet)
		mutate()
	}

	return {
		fetchQuests,
		quests,
		latestCompletedQuest,
		onGoingQuest,
		getNextQuestId,
		isLoading,
		createNewQuest,
		switchToOngoingQuest,
		idleQuest,
		switchToCompletedQuest,
		latestClaimedQuest,
		reward,
		switchToClaimedQuest,
	}
}
