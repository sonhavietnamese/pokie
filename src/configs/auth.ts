import { createUser } from '@/app/actions/create-user'
import { getUser } from '@/app/actions/get-user'
import { db } from '@/drizzle'
import { generateId } from '@/libs/utils'
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
			async authorize(credentials, req) {
				try {
					if (!credentials) throw new Error('no credentials to log in as')
					const parsedCredentials = z
						.object({ wallet: z.string().startsWith('0x') })
						.safeParse(credentials)

					if (!parsedCredentials.success) {
						return null
					}

					const user = await getUser(parsedCredentials.data.wallet)

					if (!user) {
						const newUser = await createUser({
							id: generateId(),
							wallet: parsedCredentials.data.wallet,
						})

						if (!newUser) {
							return null
						}

						return {
							id: newUser.id,
							wallet: newUser.wallet,
							// biome-ignore lint/suspicious/noExplicitAny: <explanation>
						} as any
					}

					return {
						id: user.id,
						wallet: user.wallet,
					}
				} catch (error) {
					return null
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.wallet = user.wallet
			}

			return token
		},
		async session({ session, token }) {
			session.user.id = token.id as string
			session.user.wallet = token.wallet as string

			return session
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
		maxAge: 7 * 24 * 60 * 60,
	},
	jwt: {
		maxAge: 7 * 24 * 60 * 60,
	},

	pages: {
		signIn: '/',
		error: '/',
	},
}
