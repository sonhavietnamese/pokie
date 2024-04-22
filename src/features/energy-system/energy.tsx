'use client'

import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_ELEMENT, SPRITESHEET_ICON } from '@/configs/spritesheet'
import { useEffect } from 'react'
import useEnergy from './use-energy'

export default function Energy() {
	const l = SPRITESHEET_ELEMENT.frames['tag-l.png'].frame
	const m = SPRITESHEET_ELEMENT.frames['tag-m.png'].frame
	const r = SPRITESHEET_ELEMENT.frames['tag-r.png'].frame

	const mIcon = SPRITESHEET_ICON.frames['icon-energy.png'].frame

	const { fetchEnergy, energy } = useEnergy()

	useEffect(() => {
		fetchEnergy()
	}, [])

	return (
		<div className="relative flex items-center p-2 px-7">
			<Sprite
				data={{ part: '3', l, m, r }}
				className="absolute top-0 left-0 z-[0] h-full w-full"
			/>

			<Sprite
				id="logo"
				data={{ part: '1', m: mIcon }}
				className="-left-4 absolute z-[1] h-[54px] w-[54px] rotate-[-10deg]"
			/>

			<div className="z-[1] ml-4 font-extrabold text-xl tracking-wider">
				{energy}
			</div>
		</div>
	)
}
