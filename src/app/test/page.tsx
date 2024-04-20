'use client'

import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_ELEMENT } from '@/config/spritesheet'

export default function Home() {
	return (
		<main className="flex h-screen w-screen items-center justify-center">
			<Sprite
				data={{
					part: '9',
					tl: SPRITESHEET_ELEMENT.frames['box-01-tl.png'].frame,
					tm: SPRITESHEET_ELEMENT.frames['box-01-tm.png'].frame,
					tr: SPRITESHEET_ELEMENT.frames['box-01-tr.png'].frame,
					ml: SPRITESHEET_ELEMENT.frames['box-01-ml.png'].frame,
					mm: SPRITESHEET_ELEMENT.frames['box-01-mm.png'].frame,
					mr: SPRITESHEET_ELEMENT.frames['box-01-mr.png'].frame,
					bl: SPRITESHEET_ELEMENT.frames['box-01-bl.png'].frame,
					bm: SPRITESHEET_ELEMENT.frames['box-01-bm.png'].frame,
					br: SPRITESHEET_ELEMENT.frames['box-01-br.png'].frame,
				}}
				className={'w-[300px] h-[200px]'}
			/>
		</main>
	)
}
