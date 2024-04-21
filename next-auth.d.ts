export declare module 'next-auth' {
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
