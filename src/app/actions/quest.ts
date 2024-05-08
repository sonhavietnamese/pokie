'use server'

import { db } from '@/drizzle'
import { usersToQuests } from '@/drizzle/schema'
import { and, eq } from 'drizzle-orm'

export const getQuests = async (userId: string) => {
	const quests = await db.select().from(usersToQuests).where(eq(usersToQuests.userId, userId))

	return quests
}

export const createQuest = async (userId: string, questId: string) => {
	await db.insert(usersToQuests).values({ userId, questId, status: 'idle' })
}

export const switchToOngoing = async (userId: string, questId: string) => {
	await db
		.update(usersToQuests)
		.set({ status: 'ongoing' })
		.where(and(eq(usersToQuests.userId, userId), eq(usersToQuests.questId, questId)))
}

export const switchToCompleted = async (userId: string, questId: string) => {
	await db
		.update(usersToQuests)
		.set({ status: 'completed' })
		.where(and(eq(usersToQuests.userId, userId), eq(usersToQuests.questId, questId)))
}

export const switchToClaimed = async (userId: string, questId: string) => {
	await db
		.update(usersToQuests)
		.set({ status: 'claimed' })
		.where(and(eq(usersToQuests.userId, userId), eq(usersToQuests.questId, questId)))
}
