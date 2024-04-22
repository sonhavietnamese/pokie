'use server'

import { type SelectProfile, db } from '@/drizzle'
import { profile } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function updateEnergy(
	userId: string,
	amount: number,
): Promise<SelectProfile | undefined> {
	try {
		const userProfile = await db
			.select()
			.from(profile)
			.where(eq(profile.userId, userId))

		if (userProfile.length === 0) throw new Error('No profile.')

		const updatedProfile = await db
			.update(profile)
			.set({ energy: userProfile[0].energy + amount })
			.where(eq(profile.userId, userId))
			.returning()

		return updatedProfile[0]
	} catch (error) {
		console.error('Failed to fetch profile:', error)
		throw new Error('Failed to fetch profile.')
	}
}
