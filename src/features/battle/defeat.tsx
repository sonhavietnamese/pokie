import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'

export default function Defeat() {
	return (
		<div className="pointer-events-none absolute inset-0 z-50 flex h-screen w-screen items-center justify-center">
			<Sprite
				data={{
					part: '1',
					m: SPRITESHEET_DATA.frames['battle-defeat.png'].frame,
				}}
				className="w-full"
			/>
		</div>
	)
}
