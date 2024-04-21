'use client'

import { Button } from '@/components/ui/button'
import { useMavisIdStore } from '@/features/mavis-id/store'
import { useNotificationStore } from '@/features/notification/store'
import { useTipStore } from '@/features/tip/store'
import { useToastStore } from '@/features/toast/store'
import { useUserStore } from '@/stores/user'
import { useWalletgo } from '@roninnetwork/walletgo'
import { signIn, useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'

export default function Login() {
	const showTip = useTipStore((s) => s.showTip)
	const showNotification = useNotificationStore((s) => s.showNotification)
	const showToast = useToastStore((s) => s.showToast)

	const { data } = useSession()
	const { walletProvider } = useWalletgo()

	const [user, setUser] = useUserStore((s) => [s.user, s.setUser])

	const setOpenMavisId = useMavisIdStore((s) => s.setOpen)

	// useEffect(() => {
	// 	const login = async () => {
	// 		const wallet = await walletProvider.getSigner().getAddress()

	// 		try {
	// 			await signIn('credentials', {
	// 				wallet,
	// 				redirect: false,
	// 			})
	// 		} catch (error) {
	// 			console.log(error)
	// 			throw error
	// 		}
	// 	}

	// 	if (walletProvider) login()
	// }, [walletProvider])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!user && data?.user) {
			setUser(data.user)
		}
	}, [data])

	const playAsGuest = () => {
		signIn('credentials', { wallet: `0x-guess-${Date.now()}` })
	}

	return (
		<main className="relative flex h-screen w-screen flex-col items-center justify-center">
			<Button onClick={() => setOpenMavisId(true)}>
				<span className="">Login</span>
			</Button>

			<Button onClick={playAsGuest}>
				<span className="">Play as guess</span>
			</Button>
		</main>
	)
}
