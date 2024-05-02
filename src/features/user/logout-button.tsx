import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { useWalletgo } from '@roninnetwork/walletgo'
import { signOut } from 'next-auth/react'
import React, { useEffect } from 'react'

export default function LogoutButton() {
	const { walletProvider } = useWalletgo()

	const logout = () => {
		signOut()
		localStorage.removeItem('MAVIS.ID:PROFILE')
	}

	// Move to stage manager later
	useEffect(() => {
		if (!walletProvider) logout()
	}, [walletProvider])

	return (
		<div role="button" className="absolute right-10 bottom-10 z-[2] h-10 w-10" onMouseUp={logout}>
			<Sprite
				data={{
					part: '1',
					m: SPRITESHEET_DATA.frames['btn-logout-01.png'].frame,
				}}
				className="h-full w-full"
			/>
		</div>
	)
}
