import { type InsertUser, db } from '@/drizzle'
import { users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function getUser(wallet: string): Promise<InsertUser | undefined> {
	try {
		const user = await db.select().from(users).where(eq(users.wallet, wallet))

		if (user.length === 0) return undefined

		return user[0]
	} catch (error) {
		console.error('Failed to fetch user:', error)
		throw new Error('Failed to fetch user.')
	}
}
