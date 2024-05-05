'use client'

import { getQuests } from '@/app/actions/quest'
import { useSession } from 'next-auth/react'
import useSWRImmutable, { useSWRConfig } from 'swr'

export default function useQuest() {
	const { data } = useSession()
	const { data: quests } = useSWRImmutable(data?.user ? 'getQuests' : null, () => getQuests(data ? data.user.id : ''))

	const { mutate } = useSWRConfig()

	const fetchQuests = async () => {
		mutate('getQuests')
	}

	// const increaseEnergy = async () => {
	// 	if (!data) return
	// 	await updateEnergy(data.user.id, 1)
	// 	mutate('getProfile')
	// }

	return { fetchQuests, quests }
}
