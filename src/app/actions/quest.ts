'use server'

import { db } from '@/drizzle'
import { usersToQuests } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export const getQuests = async (userId: string) => {
	const quests = await db.select().from(usersToQuests).where(eq(usersToQuests.userId, userId))

	return quests
}
