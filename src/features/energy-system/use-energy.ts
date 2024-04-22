'use client'

import { getProfile } from '@/app/actions/get-profile'
import { updateEnergy } from '@/app/actions/update-energy'
import { useSession } from 'next-auth/react'
import useSWRImmutable, { useSWRConfig } from 'swr'

export default function useEnergy() {
	const { data } = useSession()
	const { data: profile } = useSWRImmutable(data?.user ? 'getProfile' : null, () =>
		getProfile(data ? data.user.id : ''),
	)

	const { mutate } = useSWRConfig()

	const fetchEnergy = async () => {
		mutate('getProfile')
	}

	const increaseEnergy = async () => {
		if (!data) return
		await updateEnergy(data.user.id, 1)
		mutate('getProfile')
	}

	return { fetchEnergy, increaseEnergy, energy: profile ? profile.energy : '0' }
}
