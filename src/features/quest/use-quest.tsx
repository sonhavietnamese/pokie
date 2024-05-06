'use client'

import { createQuest, getQuests, switchToCompleted, switchToOngoing } from '@/app/actions/quest'
import { useSession } from 'next-auth/react'
import { useCallback } from 'react'
import useSWRImmutable from 'swr'

const QUEST_QUEUE = ['quest_01', 'quest_02', 'quest_03', 'quest_04', 'quest_05', 'quest_06', 'quest_07', 'quest_08']

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

	const latestCompletedQuest = quests
		?.filter((quest) => quest.status === 'completed')
		.sort((a, b) => Number(b.questId.split('-')[1]) - Number(a.questId.split('-')[1]))[0]
	const onGoingQuest = quests?.find((quest) => quest.status === 'ongoing')

	const idleQuest = quests
		?.filter((quest) => quest.status === 'idle')
		.sort((a, b) => Number(b.questId.split('-')[1]) - Number(a.questId.split('-')[1]))[0]

	const getNextQuestId = useCallback(() => {
		if (!latestCompletedQuest) return QUEST_QUEUE[0]
		const currentQuestIndex = QUEST_QUEUE.findIndex((quest) => quest === latestCompletedQuest.questId)

		return QUEST_QUEUE[currentQuestIndex + 1]
	}, [latestCompletedQuest])

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

	const switchToCompletedQuest = () => {
		if (!data) return
		if (!onGoingQuest) return

		switchToCompleted(data.user.id, onGoingQuest.questId)
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
	}
}
