'use client'

import { useMavisIdStore } from '@/features/mavis-id/store'
import Home from '@/scenes/home'
import Login from '@/scenes/login'

export default function Page() {
	const connected = useMavisIdStore((s) => s.connected)

	console.log('rerender')

	return (
		<main className="relative flex h-screen w-screen flex-col items-center justify-center">
			{connected ? <Home /> : <Login />}
		</main>
	)
}
