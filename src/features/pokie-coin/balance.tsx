import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { useEffect } from 'react'
import { usePokieCoinBalanceStore } from './store'
import usePokieCoin from './use-pokie-coin'

export default function PokieCoinBalance() {
	const l = SPRITESHEET_DATA.frames['badge-02-l.png'].frame
	const m = SPRITESHEET_DATA.frames['badge-02-m.png'].frame
	const r = SPRITESHEET_DATA.frames['badge-02-r.png'].frame

	const mIcon = SPRITESHEET_DATA.frames['icon-pokie-coin.png'].frame

	const balance = usePokieCoinBalanceStore((s) => s.balance)

	const { fetchBalances } = usePokieCoin()

	useEffect(() => {
		fetchBalances()
	}, [])

	return (
		<div className="relative flex items-center p-2 px-7">
			<Sprite data={{ part: '3', l, m, r }} className="absolute top-0 left-0 z-[0] h-full w-full" />

			<Sprite
				id="logo"
				data={{ part: '1', m: mIcon }}
				className="-left-4 absolute z-[1] h-[54px] w-[54px] rotate-[-10deg]"
			/>

			<div className="z-[1] ml-4 font-extrabold text-xl tracking-wider">{balance}</div>
		</div>
	)
}
