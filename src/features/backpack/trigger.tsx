import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_ICON } from '@/configs/spritesheet'
import React from 'react'
import { useBackpackStore } from './store'

export default function BackpackTrigger() {
	const frame = SPRITESHEET_ICON.frames['btn-frame-circle-01.png'].frame
	const icon = SPRITESHEET_ICON.frames['icon-bag-01.png'].frame

	const setOpen = useBackpackStore((s) => s.setOpen)

	return (
		<button type="button" className="relative flex w-[55px] items-center justify-center" onClick={() => setOpen(true)}>
			<Sprite data={{ part: '1', m: frame }} className="h-full w-full" />
			<Sprite data={{ part: '1', m: icon }} className="absolute h-[40px] w-[40px]" />
		</button>
	)
}
