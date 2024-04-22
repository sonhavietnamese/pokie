'use server'

import { type SelectBackpack, db } from '@/drizzle'
import { backpack } from '@/drizzle/schema'
import type { STUFFS } from '@/libs/constants'
import { eq } from 'drizzle-orm'

export async function updateBackpack(
	userId: string,
	stuff: (typeof STUFFS)[number],
	amount: number,
): Promise<SelectBackpack | undefined> {
	try {
		const userBackpack = await db.select().from(backpack).where(eq(backpack.userId, userId))

		if (userBackpack.length === 0) throw new Error('No backpack.')

		const updatedBackpack = await db
			.update(backpack)
			.set({ [stuff]: userBackpack[0][stuff] + amount })
			.where(eq(backpack.userId, userId))
			.returning()

		return updatedBackpack[0]
	} catch (error) {
		console.error('Failed to fetch profile:', error)
		throw new Error('Failed to fetch profile.')
	}
}
