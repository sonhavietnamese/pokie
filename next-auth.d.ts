type CustomUser = {
	wallet: string
	id: string
	isBoarded: boolean
}

export declare module 'next-auth' {
	interface Session {
		user: CustomUser
	}

	interface JWT {
		user: CustomUser
	}

	interface User extends CustomUser {}
}
