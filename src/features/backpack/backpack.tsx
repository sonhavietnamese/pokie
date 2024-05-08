'use client'

import LoadingText from '@/components/loading-text'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { useCatchAxieStore } from '@/features/catch-axie/catch-axie-store'
import { useCustomAvatarStore } from '@/features/custom-avatar/custom-avatar-store'
import { usePoxieMarketplaceContract } from '@/features/marketplace/poxie-marketplace-contract'
import { useToastStore } from '@/features/toast/store'
import { usePoxieBallContract } from '@/hooks/use-pokie-ball-contract'
import { usePoxiePropsContract } from '@/hooks/use-poxie-props-contract'
import { BALLS, SKINS, STUFFS_DATA, TOOLS } from '@/libs/constants'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import { capitalize, upperCase } from 'lodash-es'
import { useEffect, useState } from 'react'
import Item from './item'
import useBackpack from './use-backpack'

const overlayVariants: Variants = {
	hide: {
		opacity: 0,
	},
	show: {
		opacity: 1,
	},
}

const backgroundVariants: Variants = {
	hide: {
		y: 100,
		opacity: 0,
	},
	show: {
		y: 0,
		opacity: 1,
		transition: {
			delay: 0.2,
			ease: 'easeOut',
		},
	},
}

export type ItemType = {
	quantity: number
	id: string
	name: string
	description: string
	type: 'skins' | 'balls' | 'tools' | 'stuffs'
	tokenId: null | number
}

export const SKIN_MAP: Record<string, string> = {
	blue: 'Summer Sky',
	green: 'Green Forest',
	red: 'Mystic Patina',
	yellow: 'Sunshine',
}

export default function Backpack() {
	const { backpack, isOpen, setOpen: setOpenBackpack } = useBackpack()
	const setOpenCatchAxieUI = useCatchAxieStore((state) => state.setOpenUI)
	const setOpenCustomAvatar = useCustomAvatarStore((state) => state.setOpenUI)

	const [items, setItems] = useState<ItemType[]>([])
	const [selectedItem, setSelectedItem] = useState<ItemType | null>(null)
	const [loading, setLoading] = useState(true)

	const { getBalances } = usePoxieBallContract()
	const { getBalances: getPropsBalances } = usePoxiePropsContract()
	const { createMarketItem } = usePoxieMarketplaceContract()

	const showToast = useToastStore((state) => state.showToast)

	useEffect(() => {
		if (!isOpen) return

		const handle = async () => {
			try {
				setLoading(true)
				const items = []

				if (backpack)
					for (const [item, quantity] of Object.entries(backpack)) {
						if (item !== 'id' && item !== 'userId' && typeof quantity === 'number' && quantity > 0)
							items.push({
								id: `stuffs-${item}`,
								name: capitalize(STUFFS_DATA[item].name),
								description: item,
								quantity,
								type: 'stuffs',
								tokenId: null,
							} as ItemType)
					}

				const balls = await getBalances()

				for (const [item, quantity] of Object.entries(balls)) {
					items.push({
						id: `balls-${item}`,
						name: `Ball ${item}`,
						description: item,
						quantity,
						type: 'balls',
						tokenId: BALLS[upperCase(item) as keyof typeof BALLS] as number,
					} as ItemType)
				}

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

				const tools = await getPropsBalances('tools')

				for (const [item, quantity] of Object.entries(tools)) {
					items.push({
						id: `tools-${item}`,
						name: `${item}`,
						description: item,
						quantity,
						type: 'tools',
						tokenId: TOOLS[upperCase(item) as keyof typeof TOOLS] as number,
					} as ItemType)
				}

				setItems(items)
			} catch (error) {
				showToast('The backpack is locked too tight and cannot be opened!')
				console.error(error)
			} finally {
				setLoading(false)
			}
		}

		handle()

		return () => {
			setSelectedItem(null)
		}
	}, [isOpen, backpack])

	const useBall = () => {
		setOpenBackpack(false)
		setOpenCatchAxieUI(true)
	}

	const sellBall = async () => {
		try {
			if (!selectedItem) return

			await createMarketItem(selectedItem.tokenId as number)

			setOpenBackpack(false)
		} catch (error) {
			console.error(error)
		}
	}

	const useSkin = () => {
		setOpenBackpack(false)
		setOpenCustomAvatar(true)
	}

	const equipTool = () => {}

	return (
		<AnimatePresence>
			{isOpen && (
				<section className="absolute top-0 left-0 z-[3] h-screen w-screen select-none">
					<motion.div
						variants={overlayVariants}
						initial={'hide'}
						animate={isOpen ? 'show' : 'hide'}
						exit={'hide'}
						className="pointer-events-none absolute z-[3] h-full w-full bg-[#200C04]/70"
					/>

					<motion.section
						variants={backgroundVariants}
						initial={'hide'}
						animate={isOpen ? 'show' : 'hide'}
						exit={'hide'}
						className="relative z-[4] h-full w-full"
					>
						<div className="absolute top-[50%] left-[50%] z-[4] w-[95%] translate-x-[-50%] translate-y-[-50%]">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['frame-backpack.png'].frame,
								}}
								className="h-full w-full"
							/>

							<section className="absolute top-0 z-[5] h-full w-full p-[2.5cqw] px-[5.5cqw] pb-[5.5cqw]">
								{loading && (
									<div className="absolute bottom-20 left-20">
										<LoadingText text="Rummaging in backpack" />
									</div>
								)}

								<>
									{items.length > 0 ? (
										<div className="flex h-full w-full gap-[2cqw]">
											<div className="h-full w-fit flex-[1.9] p-[1cqw]">
												<div className="grid h-full w-full auto-rows-min grid-cols-5 gap-[.5cqw] overflow-auto">
													{items.map((item) => (
														<Item
															type={item.type}
															onClick={() => setSelectedItem(item)}
															key={item.id}
															item={item}
															selected={selectedItem?.id === item.id}
														/>
													))}
												</div>
											</div>

											<div className="flex h-full w-fit flex-1 items-center justify-center p-2">
												{selectedItem && (
													<div className="relative h-full w-full">
														<figure className="h-full w-auto">
															<Sprite
																data={{
																	part: '3',
																	l: SPRITESHEET_DATA.frames['panel-01-l.png'].frame,
																	m: SPRITESHEET_DATA.frames['panel-01-m.png'].frame,
																	r: SPRITESHEET_DATA.frames['panel-01-r.png'].frame,
																}}
																className="h-full w-full"
															/>
														</figure>

														<div className="absolute inset-0 h-full w-full p-[1cqw] px-[3cqw] pt-[2cqw]">
															<div className="flex h-full w-full flex-col items-center">
																<figure className="aspect-square w-[50%]">
																	{selectedItem.id.split('-')[0] === 'stuffs' && (
																		<Sprite
																			className={'h-full w-full'}
																			data={{
																				part: '1',
																				m: SPRITESHEET_DATA.frames[
																					`icon-item-${
																						STUFFS_DATA[selectedItem.id.split('-')[1]].slug
																					}.png` as keyof typeof SPRITESHEET_DATA.frames
																				].frame,
																			}}
																		/>
																	)}

																	{selectedItem.id.split('-')[0] === 'balls' && (
																		<Sprite
																			className={'h-full w-full'}
																			data={{
																				part: '1',
																				m: SPRITESHEET_DATA.frames[
																					`icon-ball-${
																						selectedItem.id.split('-')[1]
																					}.png` as keyof typeof SPRITESHEET_DATA.frames
																				].frame,
																			}}
																		/>
																	)}

																	{selectedItem.id.split('-')[0] === 'skins' && (
																		<Sprite
																			className={'h-full w-full'}
																			data={{
																				part: '1',
																				m: SPRITESHEET_DATA.frames[
																					`icon-skin-${
																						selectedItem.id.split('-')[1]
																					}.png` as keyof typeof SPRITESHEET_DATA.frames
																				].frame,
																			}}
																		/>
																	)}

																	{selectedItem.id.split('-')[0] === 'tools' && (
																		<Sprite
																			className={'h-full w-full'}
																			data={{
																				part: '1',
																				m: SPRITESHEET_DATA.frames[
																					`icon-tool-${
																						selectedItem.id.split('-')[1]
																					}.png` as keyof typeof SPRITESHEET_DATA.frames
																				].frame,
																			}}
																		/>
																	)}
																</figure>

																<span className="font-extrabold text-[#735427] text-[3cqw] tracking-wide">
																	{capitalize(selectedItem.name)}
																</span>

																<figure className="-mt-[.5cqw] w-[100%]">
																	<Divider className="w-full" />
																</figure>

																{selectedItem.type === 'balls' && (
																	<div className="mb-[1cqw] flex w-full flex-1 items-end justify-center gap-8">
																		<Button className="flex-1" color="pink" onClick={useBall}>
																			<span className="text-2xl">Use</span>
																		</Button>

																		<Button className="flex-1" color="red" onClick={sellBall}>
																			<span className="text-2xl">Sell</span>
																		</Button>
																	</div>
																)}

																{selectedItem.type === 'skins' && (
																	<div className="mb-[1cqw] flex w-full flex-1 items-end justify-center gap-8">
																		<Button className="flex-1" color="pink" onClick={useSkin}>
																			<span className="text-2xl">Put on</span>
																		</Button>
																	</div>
																)}

																{selectedItem.type === 'tools' && (
																	<div className="mb-[1cqw] flex w-full flex-1 items-end justify-center gap-8">
																		<Button className="flex-1" color="green">
																			<span className="text-2xl">Equip</span>
																		</Button>
																	</div>
																)}
															</div>
														</div>
													</div>
												)}
											</div>
										</div>
									) : (
										<figure className="absolute top-[40%] left-[50%] w-[50%] translate-x-[-50%] translate-y-[-50%]">
											<img draggable={false} src={'/sprites/backpack/empty.webp'} alt={'Empty'} />
										</figure>
									)}
								</>
							</section>
						</div>
					</motion.section>
				</section>
			)}
		</AnimatePresence>
	)
}
