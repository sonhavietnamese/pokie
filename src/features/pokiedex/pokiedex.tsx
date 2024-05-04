import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { useAxieStore } from '@/features/axie/axie-store'
import { AnimatePresence, type Variants, animate, motion } from 'framer-motion'
import { capitalize } from 'lodash-es'
import { useLayoutEffect } from 'react'
import { usePokiedexStore } from './pokiedex-store'

const pokiedexVariants: Variants = {
	hide: {
		scale: 5,
		opacity: 0,
		translateX: '-50%',
		translateY: '-50%',
		transition: {
			ease: 'linear',
			duration: 0.3,
			delay: 0.2,
		},
	},
	show: {
		scale: 1,
		opacity: 1,
		translateX: '-50%',
		translateY: '-50%',
		transition: {
			ease: 'easeOut',
			duration: 0.3,
		},
	},
}

const partSecondVariants: Variants = {
	hide: {
		opacity: 0,
		translateX: '-40%',
		translateY: '-50%',
	},
	show: {
		opacity: 1,
		translateX: '-50%',
		translateY: '-50%',
		transition: {
			ease: 'easeOut',
			delay: 0.4,
			duration: 0.2,
		},
	},
	exit: {
		opacity: 0,
		translateX: '-50%',
		translateY: '-50%',
	},
}

type Props = {
	children: React.ReactNode
}

export default function Pokiedex({ children }: Props) {
	const [isOpen, foundedAxieId, setFoundedAxieId] = usePokiedexStore((s) => [
		s.isOpen,
		s.foundedAxieId,
		s.setFoundedAxieId,
	])
	const axies = useAxieStore((s) => s.axies)

	useLayoutEffect(() => {
		if (isOpen) open()
		else close()
	}, [isOpen])

	const open = () => {
		animate(
			'#mask',
			{
				maskImage: [
					'radial-gradient(circle, black 100vw, rgba(32, 12, 4, 0.7) 100vw)',
					'radial-gradient(circle, black 17vw, rgba(32, 12, 4, 0.7) 17vw)',
				],
			},
			{ ease: 'easeOut' },
		)
	}

	const close = () => {
		setFoundedAxieId('')
		animate(
			'#mask',
			{
				maskImage: [
					'radial-gradient(circle, black 17vw, rgba(32, 12, 4, 0.7) 17vw)',
					'radial-gradient(circle, black 100vw, rgba(32, 12, 4, 0.7) 100vw)',
				],
			},
			{ ease: 'easeOut', delay: 0.2 },
		)
	}

	return (
		<>
			<AnimatePresence>
				{isOpen && (
					<>
						<section className="absolute inset-0 z-10 h-screen w-screen">
							<div className="relative h-full w-full">
								<motion.div
									variants={pokiedexVariants}
									initial={'hide'}
									animate={isOpen ? 'show' : 'hide'}
									exit={'hide'}
									className={'absolute top-[50.5%] left-[50%] z-[10] w-[45%] translate-x-[-45.5%] translate-y-[-50%]'}
								>
									<Sprite
										data={{
											part: '1',
											m: SPRITESHEET_DATA.frames['pokiedex-part-02.png'].frame,
										}}
										className={'h-full w-full'}
									/>
								</motion.div>

								<motion.div
									variants={partSecondVariants}
									initial={'hide'}
									animate={isOpen ? 'show' : 'hide'}
									exit={'hide'}
									className="absolute top-[50%] left-[23%] z-[1] h-auto w-[20%] translate-x-[-50%] translate-y-[-50%] opacity-0"
								>
									<Sprite
										data={{
											part: '1',
											m: SPRITESHEET_DATA.frames['pokiedex-part-01.png'].frame,
										}}
										className="h-full w-full"
									/>
									<div
										id="pokiedex-axie-info"
										className="absolute inset-0 h-full w-full p-[12%] px-[18%] py-[15%] pr-[30%]"
									>
										{foundedAxieId && axies[foundedAxieId] && (
											<div className="container flex h-full w-full flex-col items-center">
												<figure className="relative mr-2 flex h-fit w-full flex-col items-center justify-center">
													<img
														id="axie-preview"
														src={`https://axiecdn.axieinfinity.com/axies/${foundedAxieId}/axie/axie-full-transparent.png`}
														alt={'Axie'}
														className="scale-x-[-1] w-full h-full object-cover z-[1]"
													/>

													<img
														src={'https://axiecdn.axieinfinity.com/mixer-stuffs/v4/body-normal/shadow.png'}
														alt={'Axie'}
														className="absolute w-[60%] translate-x-[-50%] left-[55%] top-[75%] translate-y-[-50%] z-[0]"
													/>
												</figure>

												<span id="axie-id" className="-mt-[10%] text-[#F1DDA8] text-[1cqw] outline-2">
													#{foundedAxieId}
												</span>
												<div className="relative mt-3 flex h-fit w-full items-center">
													<figure className="z-[1] flex aspect-square w-[2cqw] items-center justify-center rounded-full border-[#7D5432] border-[.2cqw] bg-[#462D17] p-[.25cqw]">
														<img
															id={'pokiedex-axie-info-class-image'}
															src={`https://cdn.axieinfinity.com/marketplace-website/asset-icon/class/${axies[foundedAxieId].class}.png`}
															alt=""
														/>
													</figure>
													<div className="absolute flex h-full w-full items-center justify-center rounded-full bg-[#301B0A]">
														<span
															id={'pokiedex-axie-info-class'}
															className="ml-[1cqw] text-[#FFC45D] text-[1.2cqw] outline-2"
														>
															{capitalize(axies[foundedAxieId].class)}
														</span>
													</div>
												</div>
												<div className="mt-[2cqw] grid h-fit w-full grid-cols-3 grid-rows-2 gap-1.5">
													{Object.keys(axies[foundedAxieId].parts).map((part) => (
														<div
															key={part}
															className="relative flex h-[100%] w-[100%] items-center justify-center rounded-[.8cqw]"
														>
															<figure className="flex aspect-square w-[100%] items-center justify-center rounded-[.8cqw] bg-[#FEF1C6]">
																<img
																	id={`pokiedex-axie-info-${part}`}
																	src={`https://cdn.axieinfinity.com/marketplace-website/asset-icon/parts/${part}-${axies[foundedAxieId].parts[part].name}.png`}
																	alt=""
																	className="w-[70%]"
																/>
															</figure>
														</div>
													))}
												</div>
											</div>
										)}
									</div>
								</motion.div>
							</div>
						</section>
					</>
				)}
			</AnimatePresence>
			<motion.section id={'mask'} className="relative h-screen w-screen">
				{children}
			</motion.section>
		</>
	)
}
