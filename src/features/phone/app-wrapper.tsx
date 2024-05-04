import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import type { ReactNode } from 'react'
import { usePhoneStore } from './phone-store'

type AppWrapperProps = {
	children: ReactNode
}

export default function AppWrapper({ children }: AppWrapperProps) {
	const [setSelectedApp, setOpeningApp] = usePhoneStore((s) => [s.setSelectedApp, s.setOpeningApp])

	const back = () => {
		setOpeningApp(undefined)
		setSelectedApp(undefined)
	}

	return (
		<section className="relative h-full w-full">
			<button type="button" className="absolute top-4 left-4 z-[3]" onMouseUp={back}>
				<Sprite
					data={{
						part: '1',
						m: SPRITESHEET_DATA.frames['icon-arrow-02.png'].frame,
					}}
					className="h-6 w-6"
				/>
			</button>

			{children}
		</section>
	)
}
