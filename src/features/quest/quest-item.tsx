import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { cn } from '@/libs/utils'
import { type Variants, motion } from 'framer-motion'
import React, { type HTMLAttributes, type ReactNode } from 'react'

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
	children: ReactNode
} & HTMLAttributes<HTMLDivElement>

const QuestItem = React.forwardRef<HTMLDivElement, QuestItemProps>(({ children, className, ...props }, ref) => {
	return (
		<motion.div
			ref={ref}
			className={cn('relative flex items-center px-5 py-4')}
			variants={itemVatiants}
			initial={'hidden'}
			animate={'visible'}
			exit={'hidden'}
		>
			<Sprite
				data={{
					part: '3',
					l: SPRITESHEET_DATA.frames['box-02-l.png'].frame,
					m: SPRITESHEET_DATA.frames['box-02-m.png'].frame,
					r: SPRITESHEET_DATA.frames['box-02-r.png'].frame,
				}}
				className="absolute top-0 left-0 z-[0] h-full w-full"
			/>

			<div className="z-[1]">{children}</div>
		</motion.div>
	)
})

QuestItem.displayName = 'Notification'

export { QuestItem }
