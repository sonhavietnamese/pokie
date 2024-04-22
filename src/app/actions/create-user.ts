import { type InsertUser, db } from '@/drizzle'
import { profile, users } from '@/drizzle/schema'

export async function createUser(
	user: InsertUser,
): Promise<InsertUser | undefined> {
	try {
		const newUser = await db.insert(users).values(user).returning()

		await db.insert(profile).values({ userId: newUser[0].id, energy: 100 })

		return newUser[0]
	} catch (error) {
		console.error('Failed to create user:', error)
		throw new Error('Failed to create user.')
	}
}
