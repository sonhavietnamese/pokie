'use client'

import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_ICON } from '@/configs/spritesheet'
import { useEffect } from 'react'
import useBackpack from './use-backpack'

export default function Backpack() {
	const { backpack, isOpen, setOpen, fetchBackpack } = useBackpack()

	useEffect(() => {
		if (!isOpen) return

		fetchBackpack()
	}, [isOpen])

	console.log(backpack)

	return (
		<Dialog open={isOpen}>
			<DialogContent className="h-[700px] w-[1200px]">
				<div className="relative flex h-full items-center bg-red-100">
					<span>wau</span>
				</div>
				<DialogClose asChild>
					<button type="button" className="-top-4 -right-4 absolute" onClick={() => setOpen(false)}>
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_ICON.frames['btn-close-02.png'].frame,
							}}
							className="h-[60px] w-[60px]"
						/>
					</button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	)
}
