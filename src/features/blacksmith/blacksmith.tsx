// @ts-nocheck
// @ts-ignore

import { Button } from '@/components/ui/button'
import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import useBackpack from '@/features/backpack/use-backpack'
import { useNotificationStore } from '@/features/notification/notification-store'
import { useNpcStore } from '@/features/npc/npc-store'
import { useToastStore } from '@/features/toast/store'
import { usePoxieBallContract } from '@/hooks/use-pokie-ball-contract'
import { BALLS } from '@/libs/constants'
import { cn } from '@/libs/utils'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useQuest from '../quest/use-quest'
import { useBlacksmithStore } from './store'
import { useBlacksmith } from './use-blacksmith'

const containerVariants: Variants = {
	hide: {
		opacity: 0,
		x: 100,
	},
	show: {
		opacity: 1,
		x: 0,
		transition: {
			ease: [0, 0.71, 0.2, 1.01],
		},
	},
}

const BALL_DATA = [
	{
		id: 1,
		slug: 'beast',
		tokenId: BALLS.BEAST,
		name: 'Beast Ball',
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'milk', plural: 'milks', name: 'Milk', amount: 10 },
		],
	},
	{
		id: 2,
		slug: 'aquatic',
		tokenId: BALLS.AQUATIC,
		name: 'Aquatic Ball',
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'fish', plural: 'fishes', name: 'Fish', amount: 10 },
		],
	},
	{
		id: 3,
		tokenId: BALLS.PLANT,
		slug: 'plant',
		name: 'Plant Ball',
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'plant', plural: 'plants', name: 'Plant', amount: 10 },
		],
	},

	{
		id: 4,
		tokenId: BALLS.BUG,
		slug: 'bug',
		name: 'Bug Ball',
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'bug', plural: 'bugs', name: 'Bug', amount: 10 },
		],
	},
	{
		id: 5,
		slug: 'bird',
		tokenId: BALLS.BIRD,
		name: 'Bird Ball',
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'feather', plural: 'feathers', name: 'Feather', amount: 10 },
		],
	},
	{
		id: 6,
		slug: 'reptile',
		tokenId: BALLS.REPTILE,
		name: 'Reptile Ball',
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'bug', plural: 'bugs', name: 'Bug', amount: 10 },
		],
	},
	{
		id: 7,
		slug: 'mech',
		tokenId: BALLS.MECH,
		name: 'Mech Ball',
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'star', plural: 'stars', name: 'Dusk', amount: 10 },
		],
	},
	{
		id: 8,
		slug: 'dawn',
		tokenId: BALLS.DAWN,
		name: 'Dawn Ball',
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'star', plural: 'stars', name: 'Dawn', amount: 10 },
		],
	},

	{
		id: 9,
		slug: 'dusk',
		tokenId: BALLS.DUSK,
		name: 'Dusk Ball',
		ingredients: [
			{ id: 'ingredient-1', slug: 'rock', plural: 'rocks', name: 'Ore', amount: 10 },
			{ id: 'ingredient-3', slug: 'nut', plural: 'nuts', name: 'Nuts', amount: 10 },
			{ id: 'ingredient-4', slug: 'moon', plural: 'moons', name: 'Dusk', amount: 10 },
		],
	},
]

export default function Blacksmith() {
	const store = useBlacksmithStore()
	const { backpack, fetchBackpack } = useBackpack()
	const { craft: craftBallServer } = useBlacksmith()
	const [selectedBall, setSelectedBall] = useState(0)
	const [status, setStatus] = useState('')
	const showToast = useToastStore((s) => s.showToast)
	const showNotification = useNotificationStore((s) => s.showNotification)
	const setIsNpcTalking = useNpcStore((s) => s.setIsTalking)
	const { onGoingQuest, switchToCompletedQuest } = useQuest()

	const { craft } = usePoxieBallContract()

	useEffect(() => {
		if (!store.isOpenUI) setIsNpcTalking(false)
	}, [store.isOpenUI])

	const craftBall = async (info) => {
		try {
			setStatus('crafting')
			setSelectedBall(info.tokenId)

			const tx = await craft(info.tokenId)

			await tx.wait()

			await craftBallServer(BALLS[info.tokenId].toLowerCase())
			await fetchBackpack()
			showNotification('Ball crafted successfully!')
			store.setIsOpenUI(false)
			onGoingQuest?.questId === 'quest_02' && switchToCompletedQuest('quest_02')
		} catch (error) {
			console.error('Failed to craft ball:', error)
			showToast("Blacksmith's hammer broke! Try again later.")
		} finally {
			setStatus('')
		}
	}

	return (
		<AnimatePresence>
			{store.isOpenUI && (
				<motion.section
					variants={containerVariants}
					initial="hide"
					animate={store.isOpenUI ? 'show' : 'hide'}
					exit="hide"
					className="absolute inset-0 z-[5] h-screen w-screen"
				>
					<div className="absolute top-[50%] right-[10%] h-[85%] translate-y-[-50%] rounded-[32px] border-[#A7835E] border-[4px] bg-[#F8DFB3] p-4 backdrop-blur-xl">
						<button
							className="-top-7 -right-7 absolute z-[7] h-20 w-20 p-4"
							type="button"
							onClick={() => {
								store.setIsOpenUI(false)
							}}
						>
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['btn-close-02.png'].frame,
								}}
								className="w-full"
							/>
						</button>

						<div className="relative h-full w-full space-y-2 overflow-auto rounded-3xl">
							{BALL_DATA.map((info) => (
								<div
									key={info.id}
									className="flex gap-3 rounded-3xl border-[#EAE3CB] border-[2px] bg-[#FFF0C7] p-2 shadow-sm"
								>
									<div className="flex aspect-square w-[9cqw] flex-col items-center">
										<span className="text-[#A7792E] text-[1.25cqw]">{info.name}</span>

										<div className="relative flex h-fit w-[80%] items-center justify-center">
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames[
														`icon-ball-${info.slug}.png` as keyof typeof SPRITESHEET_DATA.frames
													].frame,
												}}
												className="absolute z-[1] mb-4 w-[80%] scale-[.9]"
											/>

											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['frame-blacksmith-item.png'].frame,
												}}
												className="w-full scale-[.8]"
											/>
										</div>
									</div>

									<div className="flex flex-col gap-2">
										<div className="flex justify-around gap-2">
											{info.ingredients.map((ing, index) => (
												<div
													key={`${info.id} ${ing.id} ${index}`}
													className="relative flex aspect-square w-[5cqw] justify-center rounded-2xl border-[#EDDEC0] border-[4px] bg-[#FFF8E4] p-2"
												>
													<Sprite
														data={{
															part: '1',
															m: SPRITESHEET_DATA.frames[
																`icon-item-${ing.slug}.png` as keyof typeof SPRITESHEET_DATA.frames
															].frame,
														}}
														className="h-[70%] w-[70%]"
													/>

													<div className="absolute bottom-0 left-0 flex w-full items-center justify-center">
														<span className="text-[#CBAB79] text-[1.1cqw]">
															<span
																className={cn(
																	'text-[1.3cqw]',
																	(backpack?.[ing.plural] ? backpack[ing.plural] : 0) < ing.amount
																		? 'text-[#FF5A2E]'
																		: 'text-[#735427]',
																)}
															>
																{backpack?.[ing.plural] ? backpack[ing.plural] : 0}
															</span>
															/{ing.amount}
														</span>
													</div>
												</div>
											))}
										</div>

										<button
											type="button"
											className={cn(
												'flex justify-end',
												status !== '' ||
													info.ingredients.some(
														(ing) => (backpack?.[ing.plural] ? backpack[ing.plural] : 0) < ing.amount,
													)
													? 'grayscale'
													: '',
											)}
											disabled={
												status !== '' ||
												info.ingredients.some((ing) => (backpack?.[ing.plural] ? backpack[ing.plural] : 0) < ing.amount)
											}
											onClick={() => craftBall(info)}
										>
											<Button className="w-full" color="green">
												<span className="font-extrabold text-2xl text-[#FFF0C7] tracking-wide">
													{status === 'crafting' && selectedBall === info.tokenId ? 'Crafting...' : 'Craft'}
												</span>
											</Button>
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</motion.section>
			)}
		</AnimatePresence>
	)
}
