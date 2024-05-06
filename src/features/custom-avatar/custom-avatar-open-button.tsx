import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { useCustomAvatarStore } from './custom-avatar-store'

export default function CustomAvatarOpenButton() {
	const setOpenUI = useCustomAvatarStore((state) => state.setOpenUI)

	return (
		<button type="button" className="group relative w-[80px]" onMouseUp={() => setOpenUI(true)}>
			<div className="absolute top-0 right-0 z-[2] flex aspect-square w-6 items-center justify-center rounded-full bg-[#A17C45] text-lg leading-none">
				<span className="mb-1 leading-none">z</span>
			</div>

			<Sprite
				data={{
					part: '1',
					m: SPRITESHEET_DATA.frames['frame-btn-02.png'].frame,
				}}
				className="w-full"
			/>

			<div className="-translate-x-1/2 absolute inset-0 top-3 left-1/2 w-[60px] transition-transform duration-200 ease-[cubic-bezier(0,0.71,0.2,1.01)] group-hover:translate-y-[-20px] group-hover:scale-105">
				<Sprite
					data={{
						part: '1',
						m: SPRITESHEET_DATA.frames['icon-custom-avatar.png'].frame,
					}}
					className="w-full"
				/>
			</div>
			<span className="-translate-x-1/2 absolute bottom-[22px] left-1/2 text-[#CBAB79] text-sm opacity-0 transition-opacity ease-in-out group-hover:opacity-100">
				Avatar
			</span>

			<div className="-left-8 absolute top-[30px] hidden animate-shake-horizontal group-hover:block">
				<Sprite
					data={{
						part: '1',
						m: SPRITESHEET_DATA.frames['icon-arrow-01.png'].frame,
					}}
					className="w-5 rotate-180"
				/>
			</div>
		</button>
	)
}
