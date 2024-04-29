import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { signOut } from 'next-auth/react'
import React from 'react'

export default function LogoutButton() {
	const logout = () => {
		signOut()
		localStorage.removeItem('MAVIS.ID:PROFILE')
	}

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
