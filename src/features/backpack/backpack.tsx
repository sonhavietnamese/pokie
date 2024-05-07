'use client'

import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Divider } from '@/components/ui/divider'
import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA, SPRITESHEET_ICON } from '@/configs/spritesheet'
import { useEffect } from 'react'
import Item from './item'
import useBackpack from './use-backpack'

export default function Backpack() {
	const { backpack, isOpen, setOpen, fetchBackpack } = useBackpack()

	useEffect(() => {
		if (!isOpen) return

		fetchBackpack()
	}, [isOpen])

	console.log(backpack)

	return (
		<Dialog open={isOpen}>
			<DialogContent className={'h-screen w-screen'}>
				<section className="relative z-[4] h-full w-full">
					<div className="pointer-events-auto absolute top-[50%] left-[50%] z-[4] w-[95%] translate-x-[-50%] translate-y-[-50%]">
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_DATA.frames['frame-backpack.png'].frame,
							}}
							className="h-full w-full"
						/>

						<section className="absolute top-0 z-[5] h-full w-full p-[2.5cqw] px-[5.5cqw] pb-[5.5cqw]">
							{/* {!backpack ? (
								<span className="absolute text-white text-xl outline-2 left-[50%] translate-x-[-50%] top-[40%] translate-y-[-50%]">
									Opening the backpack...
								</span>
							) : ( */}
							<>
								{/* {size(backpack) > 0 ? ( */}
								<div className="flex h-full w-full gap-[2cqw]">
									<div className="h-full w-fit flex-[1.9] p-[1cqw]">
										<div className="grid h-full w-full auto-rows-min grid-cols-5 gap-[.5cqw] overflow-auto">
											{/* {Object.values({
                              
                            }).map((item, index) => (
                              <Item
                                type="stuff"
                                // onClick={() => setSelectedItem({ slug: `item_${item.slug}`, quantity: item.quantity })}
                                key={index}
                                item={{
                                  slug: `item_${item.slug}`,
                                  quantity: item.quantity,
                                  description: item.description,
                                }}
                                selected={selectedItem?.slug === `item_${item.slug}`}
                              />
                            ))} */}

											<Item
												type="stuff"
												item={{
													id: '1',
													name: 'Milk',
													slug: 'milk',
													description: 'Pokie Ball',
													quantity: 1,
												}}
												selected={true}
											/>

											<Item
												type="stuff"
												item={{
													id: '1',
													name: 'Milk',
													slug: 'milk',
													description: 'Pokie Ball',
													quantity: 1,
												}}
												selected={false}
											/>

											<Item
												type="stuff"
												item={{
													id: '1',
													name: 'Milk',
													slug: 'milk',
													description: 'Pokie Ball',
													quantity: 1,
												}}
												selected={false}
											/>

											<Item
												type="stuff"
												item={{
													id: '1',
													name: 'Milk',
													slug: 'milk',
													description: 'Pokie Ball',
													quantity: 1,
												}}
												selected={false}
											/>

											<Item
												type="stuff"
												item={{
													id: '1',
													name: 'Milk',
													slug: 'milk',
													description: 'Pokie Ball',
													quantity: 1,
												}}
												selected={false}
											/>

											{Array.from({ length: 20 }).map((_, index) => (
												<Item
													// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
													key={index}
													type="stuff"
													item={{
														id: '1',
														name: 'Milk',
														slug: 'milk',
														description: 'Pokie Ball',
														quantity: 1,
													}}
													selected={false}
												/>
											))}

											{/* {Object.entries(balls).map(([ball, quantity]) => (
                              <Item
                                type="ball"
                                onClick={() => setSelectedItem({ slug: `ball_${ball}`, quantity })}
                                key={ball}
                                item={{
                                  slug: `ball_${ball}`,
                                  quantity,
                                  description: 'Pokie Ball',
                                }}
                                selected={selectedItem?.slug === `ball_${ball}`}
                              />
                            ))}

                            {Object.entries(tools).map(([tool, quantity]) => (
                              <Item
                                type="props"
                                onClick={() => setSelectedItem({ slug: tool as string, quantity })}
                                key={tool}
                                item={{
                                  slug: tool as string,
                                  quantity,
                                  description: 'Pokie Tool',
                                }}
                                selected={selectedItem?.slug === tool}
                              />
                            ))} */}
										</div>
									</div>

									<div className="flex h-full w-fit flex-1 items-center justify-center p-2">
										{/* {selectedItem && ( */}
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
														<Sprite
															data={{
																part: '1',
																m: SPRITESHEET_DATA.frames['icon-item-fish.png'].frame,
															}}
															className="h-full w-full"
														/>
														{/* <img
                                      draggable="false"
                                      src={`/sprites/${
                                        selectedItem?.slug.toLowerCase().includes('ball')
                                          ? 'balls'
                                          : selectedItem?.slug.toLowerCase().includes('tool')
                                            ? 'tool'
                                            : 'icons'
                                      }/${selectedItem?.slug.split('_')[1]}.png`}
                                      alt={'Item frame'}
                                      className=" w-full h-full"
                                    /> */}
													</figure>

													<span className="font-extrabold text-[#735427] text-[3cqw] tracking-wide">
														Fish
														{/* {capitalize(selectedItem?.slug.split('_').join(' '))} */}
													</span>

													<figure className="-mt-[.5cqw] w-[100%]">
														<Divider className="w-full" />
													</figure>

													{/* {selectedItem?.slug.includes('ball') && (
                                    <div className="flex flex-1 w-full mb-[1cqw] items-end justify-center">
                                      <button
                                        onMouseEnter={() => SOUNDS.BUTTON_HOVER.play()}
                                        onMouseDown={() => SOUNDS.BUTTON_CLICK.play()}
                                        className="h-[3cqw]"
                                        onClick={sell}
                                      >
                                        <img src="/sprites/button/sell.png" className="w-full h-full" />
                                      </button>
                                    </div>
                                  )} */}
												</div>
											</div>
										</div>
										{/* )} */}
									</div>
								</div>
								{/* ) : (
										<figure className="w-[50%] absolute left-[50%] translate-x-[-50%] top-[40%] translate-y-[-50%]">
											<img draggable={false} src={'/sprites/backpack/empty.webp'} alt={'Empty'} />
										</figure>
									)} */}
							</>
							{/* )} */}
						</section>
					</div>
				</section>
			</DialogContent>
		</Dialog>
	)
}
