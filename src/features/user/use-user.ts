'use client'

import { getProfile } from '@/app/actions/get-profile'
import { updateEnergy } from '@/app/actions/update-energy'
import { useWalletgo } from '@roninnetwork/walletgo'
import { signIn, useSession } from 'next-auth/react'
import useSWRImmutable, { useSWRConfig } from 'swr'

export default function useUser() {
	const { data } = useSession()
	const { data: profile } = useSWRImmutable(data?.user ? 'getProfile' : null, () =>
		getProfile(data ? data.user.id : ''),
	)
	const { account } = useWalletgo()

	const { mutate } = useSWRConfig()

	const fetchEnergy = async () => {
		mutate('getProfile')
	}

	const increaseEnergy = async () => {
		if (!data) return
		await updateEnergy(data.user.id, 1)
		mutate('getProfile')
	}

	const login = async () => {
		try {
			await signIn('credentials', {
				wallet: account,
				redirect: false,
			})
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	return { fetchEnergy, increaseEnergy, profile: profile, login }
}
