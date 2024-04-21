'use client'

import { Button } from '@/components/ui/button'
import { useNotificationStore } from '@/features/notification/store'
import { useTipStore } from '@/features/tip/store'
import { useToastStore } from '@/features/toast/store'
import { signIn, useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'

export default function Home() {
	const showTip = useTipStore((s) => s.showTip)
	const showNotification = useNotificationStore((s) => s.showNotification)
	const showToast = useToastStore((s) => s.showToast)

	const { data } = useSession()

	const login = async () => {
		try {
			await signIn('credentials', {
				wallet: '0xd434682d2b4398f39e15e32eeebeeb19db3b8378',
			})
		} catch (error) {
			console.log(error)
			throw error
		}
	}

	const playAsGuest = () => {
		const res = signIn('credentials', { wallet: `0x-guess-${Date.now()}` })
	}

	return (
		<main className="relative flex flex-col h-screen w-screen items-center justify-center">
			<Button onClick={login}>
				<span className="">Login</span>
			</Button>

			<Button onClick={playAsGuest}>
				<span className="">Play as guess</span>
			</Button>
		</main>
	)
}
