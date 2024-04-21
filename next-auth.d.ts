import NextAuth from 'next-auth'

export declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			wallet: string
			id: string
		}
	}

	interface JWT {
		user: {
			wallet: string
			id: string
		}
	}

	interface User {
		wallet: string
		id: string
	}
}
