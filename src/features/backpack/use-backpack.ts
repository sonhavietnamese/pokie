'use client'

import { getBackpack } from '@/app/actions/get-backpack'
import { updateBackpack } from '@/app/actions/update-backpack'
import type { STUFFS } from '@/libs/constants'
import { useSession } from 'next-auth/react'
import useSWRImmutable, { useSWRConfig } from 'swr'
import { useBackpackStore } from './backpack-store'

export default function useBackpack() {
	const { isOpen, setOpen } = useBackpackStore()
	const { data } = useSession()

	const { data: backpack, isLoading } = useSWRImmutable(data?.user ? 'getBackpack' : null, () =>
		getBackpack(data ? data.user.id : ''),
	)

	const { mutate } = useSWRConfig()

	const fetchBackpack = async () => {
		mutate('getBackpack')
	}

	const addItem = async (stuff: (typeof STUFFS)[number], amount: number) => {
		if (!data) return
		await updateBackpack(data.user.id, stuff, amount)
	}

	const removeItem = async (stuff: (typeof STUFFS)[number], amount: number) => {
		if (!data) return
		await updateBackpack(data.user.id, stuff, -amount)
	}

	return { fetchBackpack, addItem, removeItem, backpack: backpack ? backpack : null, isOpen, setOpen, isLoading }
}
