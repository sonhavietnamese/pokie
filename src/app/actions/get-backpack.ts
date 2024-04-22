'use server'

import { type SelectBackpack, db } from '@/drizzle'
import { backpack } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function getBackpack(userId: string): Promise<SelectBackpack | undefined> {
	try {
		const useBackpack = await db.select().from(backpack).where(eq(backpack.userId, userId))

		if (useBackpack.length === 0) return undefined

		return useBackpack[0]
	} catch (error) {
		console.error('Failed to fetch backpack:', error)
		throw new Error('Failed to fetch backpack.')
	}
}
