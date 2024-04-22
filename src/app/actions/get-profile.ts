'use server'

import { type SelectProfile, db } from '@/drizzle'
import { profile } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function getProfile(userId: string): Promise<SelectProfile | undefined> {
	try {
		const userProfile = await db.select().from(profile).where(eq(profile.userId, userId))

		if (userProfile.length === 0) return undefined

		return userProfile[0]
	} catch (error) {
		console.error('Failed to fetch profile:', error)
		throw new Error('Failed to fetch profile.')
	}
}
