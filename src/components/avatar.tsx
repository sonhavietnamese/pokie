import { SPRITESHEET_ELEMENT, SPRITESHEET_ICON } from '@/configs/spritesheet'
import React from 'react'
import { Sprite } from './ui/sprite'

export default function Avatar() {
	const avatarImg = SPRITESHEET_ICON.frames['avatar-default.png'].frame
	const copyIcon = SPRITESHEET_ELEMENT.frames['btn-copy-01.png'].frame

	return (
		<div className="relative flex items-center justify-center rounded-full">
			<div className="aspect-square w-[90px] overflow-hidden rounded-full border-[4px]">
				<Sprite data={{ part: '1', m: avatarImg }} className="h-full w-full" />
			</div>
			<button type="button" className="-right-2 absolute top-1 rounded-full">
				<Sprite
					data={{ part: '1', m: copyIcon }}
					className="h-[30px] w-[30px]"
				/>
			</button>
		</div>
	)
}
