import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { BALLS, SKINS, TOOLS } from '@/libs/constants'
import { cn, trimWallet } from '@/libs/utils'
import { useWalletgo } from '@roninnetwork/walletgo'
import { type HTMLMotionProps, type Variants, motion } from 'framer-motion'
import { lowerCase } from 'lodash-es'
import type { MarketplaceItem } from './marketplace'

type Props = {
	selected: boolean
	item: MarketplaceItem
} & HTMLMotionProps<'div'>

const itemVariants: Variants = {
	normal: {
		rotate: 0,
	},
	hover: {
		rotate: 5,
	},
}

export default function Item({ selected, item, className, ...props }: Props) {
	const { account } = useWalletgo()

	return (
		<motion.div
			initial={'normal'}
			whileHover={'hover'}
			variants={itemVariants}
			className={cn('relative w-[280px] origin-top', className)}
			{...props}
		>
			<Sprite
				data={{
					part: '1',
					m: SPRITESHEET_DATA.frames['frame-shop-item.png'].frame,
				}}
				className="h-full w-full"
			/>

			<div className="absolute top-0 h-full w-full p-[30px] pt-[40px] pb-[24px]">
				{selected && (
					<figure className="-mt-4 absolute top-12 right-0 h-auto w-[60px]">
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_DATA.frames['icon-tick.png'].frame,
							}}
							className="h-full w-full"
						/>
					</figure>
				)}

				<div className="flex h-full w-full flex-col items-center justify-between">
					<span className="text-[#735427] text-xl">{item.name}</span>

					<figure className="h-fit w-[90px]">
						{item.id.split('-')[0] === 'balls' && (
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames[
										`icon-ball-${lowerCase(BALLS[Number(item.tokenId)])}.png` as keyof typeof SPRITESHEET_DATA.frames
									].frame,
								}}
								className="h-full w-full"
							/>
						)}

						{item.id.split('-')[0] === 'skins' && (
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames[
										`icon-skin-${lowerCase(SKINS[Number(item.tokenId)])}.png` as keyof typeof SPRITESHEET_DATA.frames
									].frame,
								}}
								className="h-full w-full"
							/>
						)}

						{item.id.split('-')[0] === 'tools' && (
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames[
										`icon-tool-${lowerCase(TOOLS[Number(item.tokenId)])}.png` as keyof typeof SPRITESHEET_DATA.frames
									].frame,
								}}
								className="h-full w-full"
							/>
						)}
					</figure>

					<span className="scale-90 rounded-2xl bg-[#735427] p-.5 px-3 pb-1 text-[#FEF1C6] text-lg">
						{item.seller.toLocaleLowerCase() === account?.toLowerCase()
							? 'You'
							: item.seller.startsWith('0x')
								? trimWallet(item.seller, 4)
								: item.seller}
					</span>

					<div className="mt-1 flex items-center gap-1">
						<figure className="w-10">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['icon-pokie-coin.png'].frame,
								}}
								className="h-full w-full"
							/>
						</figure>
						<span className="text-3xl text-[#301B0A]">{Number(item.price)}</span>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
