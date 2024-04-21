import { getUser } from '@/app/actions/get-user'
import { db } from '@/drizzle'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import type { AuthOptions } from 'next-auth'
import type { Adapter } from 'next-auth/adapters'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

export const authConfig: AuthOptions = {
	adapter: DrizzleAdapter(db) as Adapter,
	providers: [
		Credentials({
			name: 'Credentials',
			credentials: {
				wallet: { label: 'wallet', type: 'text', placeholder: 'wallet' },
			},
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ wallet: z.string().length(42).startsWith('0x') })
					.safeParse(credentials)

				if (parsedCredentials.success) {
					const user = await getUser(parsedCredentials.data.wallet)

					if (!user) return null
				}

				return null
			},
		}),
	],
	pages: {
		signIn: '/',
		error: '/',
	},
}
