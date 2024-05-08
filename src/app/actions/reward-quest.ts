'use server'

import { type SelectBackpack, db } from '@/drizzle'
import { backpack } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { mintPoxieCoin } from './mint'

export async function rewardQuest(userId: string, questId: string, userAddress: string) {
	try {
		const userBackpack = await db.select().from(backpack).where(eq(backpack.userId, userId))

		if (userBackpack.length === 0) return undefined

		if (questId === 'quest_01') {
			const updatedBackpack = await db
				.update(backpack)
				.set({
					fishes: userBackpack[0].fishes + 20,
					bugs: userBackpack[0].bugs + 20,
					rocks: userBackpack[0].rocks + 20,
					nuts: userBackpack[0].nuts + 20,
					plants: userBackpack[0].plants + 20,
					feathers: userBackpack[0].feathers + 20,
					milks: userBackpack[0].milks + 20,
				})
				.where(eq(backpack.userId, userId))
				.returning()

			return updatedBackpack[0]
		}
		if (questId === 'quest_02') {
			const updatedBackpack = await db
				.update(backpack)
				.set({
					stars: userBackpack[0].stars + 20,
					moons: userBackpack[0].moons + 20,
				})
				.where(eq(backpack.userId, userId))
				.returning()

			return updatedBackpack[0]
		}
		if (questId === 'quest_03') {
			const tx = await mintPoxieCoin(userAddress, 20)

			return tx
		}
	} catch (error) {
		console.error('Failed to fetch profile:', error)
		throw new Error('Failed to fetch profile.')
	}
}
