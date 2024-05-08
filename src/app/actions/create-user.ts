import { type InsertUser, db } from '@/drizzle'
import { backpack, profile, users } from '@/drizzle/schema'
import { createQuest } from './quest'

export async function createUser(user: InsertUser): Promise<InsertUser | undefined> {
	try {
		const newUser = await db.insert(users).values(user).returning()

		await db.insert(profile).values({ userId: newUser[0].id, energy: 100 })
		await db.insert(backpack).values({
			userId: newUser[0].id,
			milks: 20,
			fishes: 20,
			feathers: 20,
			rocks: 20,
			nuts: 20,
			plants: 20,
			bugs: 20,
			stars: 20,
			moons: 20,
		})
		await createQuest(newUser[0].id, 'quest_01')

		return newUser[0]
	} catch (error) {
		console.error('Failed to create user:', error)
		throw new Error('Failed to create user.')
	}
}
