import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { AnimatePresence, type Variants, animate, motion } from 'framer-motion'
import { useEffect } from 'react'
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
		translateX: '-45%',
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
	const [isOpen] = usePokiedexStore((s) => [s.isOpen])

	useEffect(() => {
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
										<div className="container flex h-full w-full flex-col items-center">
											<figure className="relative mr-2 flex h-fit w-full flex-col items-center justify-center">
												<img
													id="axie-preview"
													src={'https://axiecdn.axieinfinity.com/axies/123123/axie/axie-full-transparent.png'}
													alt={'Axie'}
													className="scale-x-[-1] w-full h-full object-cover z-[1]"
												/>

												<img
													src={'https://axiecdn.axieinfinity.com/mixer-stuffs/v4/body-normal/shadow.png'}
													alt={'Axie'}
													className="absolute w-[60%] translate-x-[-50%] left-[55%] top-[75%] translate-y-[-50%] z-[0]"
												/>
											</figure>

											<span id="axie-id" className="text-[1cqw] -mt-[10%] outline-2 text-[#F1DDA8]">
												{'<axie-id>'}
											</span>
											<div className="flex w-full relative mt-3 h-fit items-center">
												<figure className="w-[2cqw] aspect-square bg-[#462D17] p-[.25cqw] border-[.2cqw] border-[#7D5432] z-[1] rounded-full flex items-center justify-center">
													<img
														id={'pokiedex-axie-info-class-image'}
														src="https://cdn.axieinfinity.com/marketplace-website/asset-icon/class/plant.png"
														alt=""
													/>
												</figure>
												<div className="absolute flex h-full w-full items-center justify-center rounded-full bg-[#301B0A]">
													<span
														id={'pokiedex-axie-info-class'}
														className="ml-[1cqw] text-[#FFC45D] text-[1.2cqw] outline-2"
													>
														{'<axie-class>'}
													</span>
												</div>
											</div>
											<div className="mt-[2cqw] grid h-fit w-full grid-cols-3 grid-rows-2 gap-1.5">
												<div className="relative flex h-[100%] w-[100%] items-center justify-center rounded-[.8cqw]">
													<figure className="flex aspect-square w-[100%] items-center justify-center rounded-[.8cqw] bg-[#FEF1C6]">
														<img
															id={'pokiedex-axie-info-eye'}
															src="https://cdn.axieinfinity.com/marketplace-website/asset-icon/parts/eyes-puppy.png"
															alt=""
															className="w-[70%]"
														/>
													</figure>
												</div>

												<div className="relative flex h-[100%] w-[100%] items-center justify-center rounded-[.8cqw]">
													<figure className="flex aspect-square w-[100%] items-center justify-center rounded-[.8cqw] bg-[#FEF1C6]">
														<img
															id={'pokiedex-axie-info-ear'}
															src="https://cdn.axieinfinity.com/marketplace-website/asset-icon/parts/eyes-puppy.png"
															alt=""
															className="w-[70%]"
														/>
													</figure>
												</div>

												<div className="relative flex h-[100%] w-[100%] items-center justify-center rounded-[.8cqw]">
													<figure className="flex aspect-square w-[100%] items-center justify-center rounded-[.8cqw] bg-[#FEF1C6]">
														<img
															id={'pokiedex-axie-info-back'}
															src="https://cdn.axieinfinity.com/marketplace-website/asset-icon/parts/eyes-puppy.png"
															alt=""
															className="w-[70%]"
														/>
													</figure>
												</div>

												<div className="w-[100%] h-[100%] relative rounded-[.8cqw] flex items-center justify-center">
													<figure className=" rounded-[.8cqw] w-[100%] aspect-square flex items-center bg-[#FEF1C6] justify-center">
														<img
															id={'pokiedex-axie-info-mouth'}
															src="https://cdn.axieinfinity.com/marketplace-website/asset-icon/parts/eyes-puppy.png"
															alt=""
															className="w-[70%]"
														/>
													</figure>
												</div>

												<div className="w-[100%] h-[100%] relative rounded-[.8cqw] flex items-center justify-center">
													<figure className=" rounded-[.8cqw] w-[100%] aspect-square flex items-center bg-[#FEF1C6] justify-center">
														<img
															id={'pokiedex-axie-info-horn'}
															src="https://cdn.axieinfinity.com/marketplace-website/asset-icon/parts/eyes-puppy.png"
															alt=""
															className="w-[70%]"
														/>
													</figure>
												</div>

												<div className="w-[100%] h-[100%] relative rounded-[.8cqw] flex items-center justify-center">
													<figure className=" rounded-[.8cqw] w-[100%] aspect-square flex items-center bg-[#FEF1C6] justify-center">
														<img
															id={'pokiedex-axie-info-tail'}
															src="https://cdn.axieinfinity.com/marketplace-website/asset-icon/parts/eyes-puppy.png"
															alt=""
															className="w-[70%]"
														/>
													</figure>
												</div>
											</div>
										</div>
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
