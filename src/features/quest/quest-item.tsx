import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import { type HTMLMotionProps, type Variants, motion } from 'framer-motion'
import React, { useMemo } from 'react'
import type { Quest } from './type'

const itemVatiants: Variants = {
	hidden: {
		opacity: 0,
		y: 20,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: { ease: [0, 0.71, 0.2, 1.01], duration: 0.3 },
	},
}

type QuestItemProps = {
	quest: Quest
	isCompleted: boolean
} & HTMLMotionProps<'div'>

const QuestItem = React.forwardRef<HTMLDivElement, QuestItemProps>(
	({ className, isCompleted, quest, ...props }, ref) => {
		const current = useMemo(() => {
			if (isCompleted) {
				return 1
			}

			return 0
		}, [isCompleted])

		return (
			<motion.div
				ref={ref}
				className={cn('relative flex items-center px-5 py-4')}
				variants={itemVatiants}
				initial={'hidden'}
				animate={'visible'}
				exit={'hidden'}
				{...props}
			>
				<Sprite
					data={{
						part: '3',
						l: SPRITESHEET_DATA.frames[`box-quest-${!isCompleted ? 'blue' : 'green'}-l.png`].frame,
						m: SPRITESHEET_DATA.frames[`box-quest-${!isCompleted ? 'blue' : 'green'}-m.png`].frame,
						r: SPRITESHEET_DATA.frames[`box-quest-${!isCompleted ? 'blue' : 'green'}-r.png`].frame,
					}}
					className="absolute top-0 left-0 z-[0] h-full w-full"
				/>

				<div className="z-[1]">
					<div className="flex items-center gap-4">
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_DATA.frames[`icon-quest-${!isCompleted ? 'blue' : 'green'}.png`].frame,
							}}
							className="h-[55px] w-[55px]"
						/>
						<div className="flex w-[220px] flex-col gap-1">
							<span className="font-bold text-[#301B0A] text-md tracking-wide">{quest.name}</span>

							<div className="flex w-full items-center gap-1">
								<div className="relative h-5 flex-1">
									<Sprite
										data={{
											part: '3',
											l: SPRITESHEET_DATA.frames['progress-bar-01-l.png'].frame,
											m: SPRITESHEET_DATA.frames['progress-bar-01-m.png'].frame,
											r: SPRITESHEET_DATA.frames['progress-bar-01-r.png'].frame,
										}}
										className="top-0 left-0 z-[0] h-full w-full"
									/>

									{/* Because the sprite always have default width */}
									{current > 0 && (
										<div
											className={cn('absolute inset-0 z-[2] h-full p-1 px-[5px]')}
											style={{ width: `${Math.min((current / 1) * 100, 100)}%` }}
										>
											<Sprite
												data={{
													part: '3',
													l: SPRITESHEET_DATA.frames['progress-bar-02-l.png'].frame,
													m: SPRITESHEET_DATA.frames['progress-bar-02-m.png'].frame,
													r: SPRITESHEET_DATA.frames['progress-bar-02-r.png'].frame,
												}}
												className="h-full w-full"
											/>
										</div>
									)}
								</div>

								<span className="w-[30px] text-right text-[#A7782D] leading-none">{current}/1</span>
							</div>

							{isCompleted && (
								<span className="absolute top-2 right-4 text-[#CBAB79] text-sm italic">Click to claim</span>
							)}
						</div>
					</div>
				</div>
			</motion.div>
		)
	},
)

QuestItem.displayName = 'QuestItem'

export { QuestItem }
