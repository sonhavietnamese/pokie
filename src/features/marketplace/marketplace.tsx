import LoadingText from '@/components/loading-text'
import { Button } from '@/components/ui/button'
import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { useNotificationStore } from '@/features/notification/notification-store'
import { usePokieCoin } from '@/features/poxie-coin/use-poxie-coin'
import { useToastStore } from '@/features/toast/store'
import { usePoxiePropsContract } from '@/hooks/use-poxie-props-contract'
import { POKIEMARKETPLACE_ADDRESS, POKIEPROPS_ADDRESS, SKINS as SKIN_ENUM, TOOLS as TOOL_ENUM } from '@/libs/constants'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
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

const STATUS: Record<string, string> = {
	approving: 'Approving',
	approved: 'Hang on',
	minting: 'Buying',
	minted: 'One moment',
	done: 'Done',
}

export default function Marketplace() {
	const store = useMarketplaceStore()
	const [items, setItems] = useState<MarketplaceItem[]>([])
	const [page, setPage] = useState<number>(0)
	const [stage, setStage] = useState<string>('')
	const [selected, setSelected] = useState<MarketplaceItem | null>(null)
	const [loading, setLoading] = useState(false)
	const [activeTab, setActiveTab] = useState<Tab>('balls')
	const showToast = useToastStore((s) => s.showToast)
	const showNotification = useNotificationStore((s) => s.showNotification)
	const { fetchMarketItems, createMarketSale } = usePoxieMarketplaceContract()
	const { approve, fetchBalances } = usePokieCoin()
	const { mint } = usePoxiePropsContract()

	const timeout = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const fetchItem = async () => {
			setSelected(null)
			let data: MarketplaceItem[] = []

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

		return () => {
			timeout.current && clearInterval(timeout.current)
		}
	}, [store.isOpenUI, activeTab])

	const buyProps = async () => {
		if (!selected) return

		try {
			setStage('approving')
			const approveTx = await approve(POKIEPROPS_ADDRESS, Number(selected.price))

			setStage('approved')
			await approveTx.wait()

			setStage('minting')
			const mintTx = await mint(selected.tokenId, Number(selected.price))

			setStage('minted')
			await mintTx.wait()

			setStage('done')

			showNotification('Check your inventory to see your new stuff!')
			store.setIsOpenUI(false)
			fetchBalances()
		} catch (error) {
			if ((error as Error).message !== 'User rejected') showToast('Runout of fabric to make this skin')
		} finally {
			setStage('')
		}
	}

	useEffect(() => {
		const handle = async () => {
			let data = []

			timeout.current = setInterval(async () => {
				data = await fetchMarketItems()

				setItems(data)
			}, 2000)
		}

		if (activeTab === 'balls') {
			handle()
		}
	}, [activeTab])

	const buyBall = async () => {
		if (!selected) return

		try {
			setStage('approving')
			const approveTx = await approve(POKIEMARKETPLACE_ADDRESS, Number(selected.price))

			setStage('approved')
			await approveTx.wait()

			setStage('minting')
			const mintTx = await createMarketSale(Number(selected.id.split('-')[1]))

			setStage('minted')
			await mintTx.wait()

			setStage('done')

			showNotification('Check your inventory to see your new stuff!')
			store.setIsOpenUI(false)
			fetchBalances()
		} catch (error) {
			console.error(error)
			if ((error as Error).message === 'User rejected') showToast('user rejected')
			if ((error as Error).message === 'Failed to open Confirm this transaction') showToast('Allow popup and try again')
		} finally {
			setStage('')
		}
	}

	const buy = async () => {
		if (stage !== '') return

		if (activeTab === 'skins') {
			buyProps()
		}

		if (activeTab === 'tools') {
			buyProps()
		}

		if (activeTab === 'balls') {
			buyBall()
		}
	}

	return (
		<AnimatePresence>
			{store.isOpenUI && (
				<main className="absolute top-0 left-0 z-[3] h-screen w-screen select-none">
					<motion.div
						variants={overlayVariants}
						initial={'hide'}
						animate={store.isOpenUI ? 'show' : 'hide'}
						exit={'hide'}
						className="absolute z-[3] h-full w-full bg-[#200C04]/70"
					/>

					<motion.section
						variants={backgroundVariants}
						initial={'hide'}
						animate={store.isOpenUI ? 'show' : 'hide'}
						exit={'hide'}
						className="relative z-[4] h-full w-full"
					>
						<div className="absolute top-[50%] left-[50%] z-[4] flex w-[1200px] translate-x-[-50%] translate-y-[-50%] items-center">
							<div className="-left-20 absolute top-10 z-1">
								{tabs.map((t) => (
									<div
										key={t.name}
										className="relative w-[100px]"
										onMouseUp={() => stage === '' && setActiveTab(t.name)}
									>
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
													onClick={() => stage === '' && setSelected(item)}
													selected={selected?.id === item.id}
													item={item}
												/>
											))}
										</div>

										<div className="row-span-1 flex w-full flex-1 justify-center space-x-5">
											{items.slice(page * 6 + 3, page * 6 + 3 + 3).map((item) => (
												<Item
													key={item.id}
													onClick={() => stage === '' && setSelected(item)}
													selected={selected?.id === item.id}
													item={item}
												/>
											))}
										</div>
									</div>
								)}

								{stage && (
									<div className="absolute bottom-[65px] left-[65px]">
										<LoadingText text={STATUS[stage]} />
									</div>
								)}
							</section>

							{selected && (
								<div
									className="absolute bottom-5 left-[50%] z-[6] w-[100px] translate-x-[-50%] select-none transition-transform"
									onMouseUp={() => {
										buy()
									}}
								>
									<Button color="pink">Buy</Button>
								</div>
							)}
						</div>
					</motion.section>
				</main>
			)}
		</AnimatePresence>
	)
}
