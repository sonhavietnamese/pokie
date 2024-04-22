'use client'

import ScreenSizeBreakpoint from '@/components/screen-size-breakpoint'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog'
import { useWalletgo } from '@roninnetwork/walletgo'
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
		<main className="relative flex h-screen w-screen flex-col items-center justify-center bg-slate-200">
			<Dialog>
				<DialogTrigger asChild>
					<Button>Open</Button>
				</DialogTrigger>
				<DialogContent className="h-[800px] w-[800px]">
					<div className="flex h-full items-center  bg-red-100">
						<span>wau</span>
						<DialogClose asChild>
							<Button>Closasdasdase</Button>
						</DialogClose>
					</div>
				</DialogContent>
			</Dialog>

			<ScreenSizeBreakpoint />
			{/* <Dialog /> */}

			{/* <Avatar /> */}

			{/* <Energy /> */}
			{/* {!loading ? <PokieCoinBalance /> : <div>Loading...</div>}


			<Login /> */}
		</main>
	)
}
