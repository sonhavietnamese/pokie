import { type InsertUser, db } from '@/drizzle'
import { backpack, profile, users } from '@/drizzle/schema'

export async function createUser(user: InsertUser): Promise<InsertUser | undefined> {
	try {
		const newUser = await db.insert(users).values(user).returning()

		await db.insert(profile).values({ userId: newUser[0].id, energy: 100 })
		await db
			.insert(backpack)
			.values({
				userId: newUser[0].id,
				milks: 0,
				fishes: 0,
				feathers: 0,
				rocks: 0,
				nuts: 0,
				plants: 0,
				bugs: 0,
				stars: 0,
				moons: 0,
			})

		return newUser[0]
	} catch (error) {
		console.error('Failed to create user:', error)
		throw new Error('Failed to create user.')
	}
}
