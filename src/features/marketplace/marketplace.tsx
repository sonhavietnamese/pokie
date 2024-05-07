import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { BALLS, POKIEMARKETPLACE_ADDRESS, SKINS as SKIN_ENUM, TOOLS as TOOL_ENUM } from '@/libs/constants'
import { cn } from '@/libs/utils'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import { lowerCase, round } from 'lodash-es'
import { useEffect, useState } from 'react'
import { useToastStore } from '../toast/store'
// import { usePokieMarketplaceContract } from '../backpack/use-pokie-marketplace-contract'
// import { usePokieCoinBalance, usePokieCoinContract } from '../pokie-coin'
import Item from './item'
import { useMarketplaceStore } from './marketplace-store'
import { usePoxieMarketplaceContract } from './poxie-marketplace-contract'

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

type Tab = 'balls' | 'skins' | 'tools'
const tabs: { name: Tab; icon: keyof typeof SPRITESHEET_DATA.frames }[] = [
	{
		name: 'balls',
		icon: 'icon-ball-bird.png',
	},
	{
		name: 'skins',
		icon: 'icon-skin-blue.png',
	},
	{
		name: 'tools',
		icon: 'icon-net-01.png',
	},
]

export type MarketplaceItem = {
	tokenId: number
	seller: string
	price: string
	id: string
	name: string
}

const SKINS: MarketplaceItem[] = [
	{
		id: 'skins-1',
		tokenId: SKIN_ENUM.BLUE,
		seller: 'Poxie',
		name: 'Summer Sky',
		price: '10',
	},
	{
		id: 'skins-2',
		tokenId: SKIN_ENUM.GREEN,
		seller: 'Poxie',
		name: 'Green Forest',
		price: '15',
	},
	{
		id: 'skins-3',
		tokenId: SKIN_ENUM.RED,
		seller: 'Poxie',
		name: 'Mystic Patina',
		price: '20',
	},
	{
		id: 'skins-4',
		tokenId: SKIN_ENUM.YELLOW,
		seller: 'Poxie',
		name: 'Sunshine',
		price: '25',
	},
]

const TOOLS: MarketplaceItem[] = [
	{
		tokenId: TOOL_ENUM.HAMMER,
		id: 'tools-1',
		name: 'Hammer',
		price: '15',
		seller: 'Poxie',
	},
	{
		tokenId: TOOL_ENUM.NET,
		id: 'tools-2',
		name: 'Net',
		price: '10',
		seller: 'Poxie',
	},
]

export default function Marketplace() {
	const store = useMarketplaceStore()
	const [items, setItems] = useState<MarketplaceItem[]>([])
	const [page, setPage] = useState<number>(0)
	const [stage, setStage] = useState<string>('')
	const [selected, setSelected] = useState<{
		tokenId: number
		id: string
	} | null>(null)
	const [loading, setLoading] = useState(false)
	const [activeTab, setActiveTab] = useState<Tab>('balls')
	const showToast = useToastStore((s) => s.showToast)

	const { fetchMarketItems, createMarketSale } = usePoxieMarketplaceContract()
	// const setBalance = usePokieCoinBalance((s) => s.setBalance)
	// const { getBalances, approve } = usePokieCoinContract()

	useEffect(() => {
		const fetchItem = async () => {
			setSelected(null)
			let data = []

			try {
				setLoading(true)
				if (activeTab === 'balls') {
					data = await fetchMarketItems()
				} else if (activeTab === 'skins') {
					data = SKINS
				} else if (activeTab === 'tools') {
					data = TOOLS
				}
				setItems(data)
			} catch (error) {
				showToast('Marketplace is not available at the moment')
			} finally {
				setLoading(false)
			}
		}

		store.isOpenUI && fetchItem()
	}, [store.isOpenUI, activeTab])

	const buyBall = async () => {
		// if (!selected) return
		// try {
		// 	setStage('approving')
		// 	const approveTx = await approve(POKIEMARKETPLACE_ADDRESS, 10)
		// 	await approveTx.wait()
		// 	setStage('minting')
		// 	await createMarketSale(selected.id)
		// 	setStage('done')
		// 	store.setIsOpenUI(false)
		// } catch (error) {
		// 	console.log(error)
		// } finally {
		// 	setSelected(null)
		// 	setStage('')
		// }
		// const balance = await getBalances()
		// setBalance(round(Number(balance) / 1e18, 3))
	}

	return (
		<AnimatePresence>
			{store.isOpenUI && (
				<main className="pointer-events-auto absolute top-0 left-0 z-[3] h-screen w-screen select-none">
					<motion.div
						variants={overlayVariants}
						initial={'hide'}
						animate={store.isOpenUI ? 'show' : 'hide'}
						exit={'hide'}
						className="pointer-events-none absolute z-[3] h-full w-full bg-[#200C04]/70"
					/>

					<motion.section
						variants={backgroundVariants}
						initial={'hide'}
						animate={store.isOpenUI ? 'show' : 'hide'}
						exit={'hide'}
						className="relative z-[4] h-full w-full"
					>
						<div className="pointer-events-auto absolute top-[50%] left-[50%] z-[4] flex w-[1200px] translate-x-[-50%] translate-y-[-50%] items-center">
							<div className="-left-20 absolute top-10 z-1">
								{tabs.map((t) => (
									<div key={t.name} className="relative w-[100px]" onMouseUp={() => setActiveTab(t.name)}>
										<Sprite
											data={{
												part: '1',
												m: SPRITESHEET_DATA.frames[
													`marketplace-frame-tab-${activeTab === t.name ? 'active' : 'inactive'}.png`
												].frame,
											}}
											className="w-full"
										/>

										<div className="-translate-y-1/2 -translate-x-1/2 absolute inset-0 top-1/2 left-1/2 flex items-center justify-center">
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames[t.icon].frame,
												}}
												className="w-[50px]"
											/>
										</div>
									</div>
								))}
							</div>

							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['frame-marketplace.png'].frame,
								}}
								className="h-full w-full"
							/>

							{page < Math.ceil(items.length / 6) - 1 && (
								<button
									type="button"
									className="absolute top-[50%] right-[7%] z-[10] w-[2cqw] translate-y-[-20%] hover:translate-x-1 active:scale-90"
									onClick={() => setPage(Math.min(page + 1, Math.ceil(items.length / 6)))}
								>
									<Sprite
										data={{
											part: '1',
											m: SPRITESHEET_DATA.frames['icon-arrow-02.png'].frame,
										}}
										className="h-full w-full scale-x-[-1]"
									/>
								</button>
							)}

							{page > 0 && (
								<button
									type="button"
									className="hover:-translate-x-1 absolute top-[50%] left-[7%] z-[10] w-[2cqw] translate-y-[-20%] active:scale-90"
									onClick={() => setPage(Math.max(page - 1, 0))}
								>
									<Sprite
										data={{
											part: '1',
											m: SPRITESHEET_DATA.frames['icon-arrow-02.png'].frame,
										}}
										className="h-full w-full"
									/>
								</button>
							)}

							<button
								type="button"
								className="absolute top-0 right-0 z-[7] h-24 w-24 p-4"
								onClick={() => {
									stage === '' && store.setIsOpenUI(false)
								}}
							>
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames['btn-close-02.png'].frame,
									}}
									className="h-full w-full"
								/>
							</button>

							<section className="absolute top-0 z-[5] h-full w-full p-[70px] px-[80px] pt-[105px] pb-[110px]">
								{loading ? (
									<div className="flex h-full w-full items-center justify-center">
										<Sprite
											data={{
												part: '1',
												m: SPRITESHEET_DATA.frames['icon-puff-loading.png'].frame,
											}}
											className="h-[150px] w-[150px] animate-spin"
										/>
									</div>
								) : (
									<div className="grid h-full w-full grid-rows-2 gap-4">
										<span className="absolute right-[68px] bottom-16 text-[#FFECAF]">
											{page + 1}/{Math.ceil(items.length / 6)}
										</span>

										<div className="row-span-1 flex w-full flex-1 justify-center space-x-5">
											{items.slice(page * 6, page * 6 + 3).map((item) => (
												<Item
													key={item.id}
													onClick={() => {
														setSelected({ tokenId: item.tokenId, id: item.id })
													}}
													selected={selected?.id === item.id}
													item={item}
												/>
											))}
										</div>

										<div className="row-span-1 flex w-full flex-1 justify-center space-x-5">
											{items.slice(page * 6 + 3, page * 6 + 3 + 3).map((item) => (
												<Item
													key={item.id}
													onClick={() => {
														setSelected({ tokenId: item.tokenId, id: item.id })
													}}
													selected={selected?.id === item.id}
													item={item}
												/>
											))}
										</div>
									</div>
								)}
							</section>

							{/* {selected && (
								<>
									{
										{
											'': (
												<>
													<div
														className={
															'w-[150px] hover:scale-105 z-[6] transition-transform absolute bottom-10 left-[50%] translate-x-[-50%] select-none'
														}
														onMouseEnter={() => SOUNDS.BUTTON_HOVER.play()}
														onClick={() => {
															SOUNDS.CLICK.play()
															buyBall()
														}}
													>
														<img
															draggable="false"
															src={'/sprites/button/buy.png'}
															alt={''}
															className={'w-full h-full no-select'}
														/>
													</div>
												</>
											),
											approving: (
												<div
													className={
														'hover:scale-105 z-[6] transition-transform absolute bottom-10 left-[50%] translate-x-[-50%] select-none'
													}
												>
													<span className="text-xl text-[#A7792E]">Request Bing to show this ...</span>
												</div>
											),
											minting: (
												<div
													className={
														'hover:scale-105 z-[6] transition-transform absolute bottom-10 left-[50%] translate-x-[-50%] select-none'
													}
												>
													<span className="text-xl text-[#A7792E]">Bing is wrapping ...</span>
												</div>
											),
											done: (
												<div
													className={
														'hover:scale-105 z-[6] transition-transform absolute bottom-10 left-[50%] translate-x-[-50%] select-none'
													}
												>
													<span className="text-xl text-[#A7792E]">Your Ball is ready!</span>
												</div>
											),
										}[stage]
									}
								</>
							)} */}
						</div>
					</motion.section>
				</main>
			)}
		</AnimatePresence>
	)
}
