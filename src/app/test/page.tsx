'use client'

import Avatar from '@/components/avatar'
import Energy from '@/features/energy-system/energy'
import { useMavisIdStore } from '@/features/mavis-id/store'
import PokieCoinBalance from '@/features/pokie-coin/balance'
import Home from '@/scenes/home'
import Login from '@/scenes/login'
import { useWalletgo } from '@roninnetwork/walletgo'
// import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function Page() {
	const [loading, setLoading] = useState(true)

	const { walletProvider } = useWalletgo()

	useEffect(() => {
		setLoading(true)

		if (walletProvider) {
			setLoading(false)
		}
	}, [walletProvider])

	return (
		<main className="relative flex h-screen w-screen flex-col items-center justify-center">
			<Avatar />

			{/* <Energy /> */}
			{/* {!loading ? <PokieCoinBalance /> : <div>Loading...</div>}


			<Login /> */}
		</main>
	)
}
