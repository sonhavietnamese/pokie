import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { type ItemType, SKIN_MAP } from '@/features/backpack/backpack'
import { usePoxiePropsContract } from '@/hooks/use-poxie-props-contract'
import { SKINS } from '@/libs/constants'
import { cn } from '@/libs/utils'
import { useCharacterStore } from '@/stores/character'
import { AnimatePresence, motion } from 'framer-motion'
import { upperCase } from 'lodash-es'
import React, { useEffect, useState } from 'react'
import { useCustomAvatarStore } from './custom-avatar-store'

export default function CustomAvatarSelectSkin() {
	const [isOpenUI, setOpenUI, selectedSkin, setSelectedSkin] = useCustomAvatarStore((s) => [
		s.isOpenUI,
		s.setOpenUI,
		s.selectedSkin,
		s.setSelectedSkin,
	])
	const setCanControl = useCharacterStore((s) => s.setCanControl)
	const { getBalances: getPropsBalances } = usePoxiePropsContract()
	const [items, setItems] = useState<ItemType[]>([])

	useEffect(() => {
		setCanControl(!isOpenUI)

		const handle = async () => {
			const items = []
			const skins = await getPropsBalances('skins')

			for (const [item, quantity] of Object.entries(skins)) {
				items.push({
					id: `skins-${item}`,
					name: `${SKIN_MAP[item]}`,
					description: item,
					quantity,
					type: 'skins',
					tokenId: SKINS[upperCase(item) as keyof typeof SKINS] as number,
				} as ItemType)
			}

			items.push({
				id: 'skins-default',
				name: 'Default',
				description: 'default',
				quantity: 1,
				type: 'skins',
				tokenId: 0,
			} as ItemType)

			setItems(items)
		}

		isOpenUI && handle()
	}, [isOpenUI])

	return (
		<AnimatePresence>
			{isOpenUI && (
				<div className="absolute bottom-10 z-[4] flex h-[120px] w-screen items-end justify-center overflow-hidden">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={isOpenUI ? { opacity: 1, y: 0 } : { opacity: 0 }}
						transition={{ ease: [0, 0.71, 0.2, 1.01], duration: 0.3 }}
						exit={{ opacity: 0 }}
						className="flex"
					>
						{items.map((item) => (
							<div
								key={item.id}
								className={cn(
									'group relative flex aspect-square w-[80px] scale-90 justify-center rounded-2xl border-[4px] p-2 transition-transform hover:scale-100',
									item.id.split('-')[1] === selectedSkin
										? 'border-white bg-[#FFF0C7]'
										: 'border-white/50 bg-[#FFF0C7]/50',
								)}
								onMouseUp={() => setSelectedSkin(item.id.split('-')[1])}
							>
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames[
											`icon-skin-${item.id.split('-')[1]}.png` as keyof typeof SPRITESHEET_DATA.frames
										].frame,
									}}
									className="w-full"
								/>
								<div className="-top-8 absolute hidden animate-shake group-hover:block">
									<Sprite
										data={{
											part: '1',
											m: SPRITESHEET_DATA.frames['icon-arrow-01.png'].frame,
										}}
										className="-rotate-90 w-5"
									/>
								</div>
							</div>
						))}

						<div className="ml-1 h-[30px] w-[30px]" onMouseUp={() => setOpenUI(false)}>
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['btn-close-01.png'].frame,
								}}
								className="w-full"
							/>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}
