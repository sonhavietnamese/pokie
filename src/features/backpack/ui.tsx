'use client'

import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog'
import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_ICON } from '@/configs/spritesheet'
import { useBackpackStore } from './store'

export default function Backpack() {
	const [isOpen, setOpen] = useBackpackStore((s) => [s.isOpen, s.setOpen])

	return (
		<Dialog open={isOpen}>
			<DialogContent className="h-[700px] w-[1200px]">
				<div className="flex h-full items-center bg-red-100 relative">
					<span>wau</span>
				</div>
				<DialogClose asChild>
					<button type="button" className="absolute -top-4 -right-4" onClick={() => setOpen(false)}>
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
