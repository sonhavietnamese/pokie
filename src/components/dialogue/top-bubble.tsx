import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { type HTMLMotionProps, type Variants, motion } from 'framer-motion'
import { capitalize } from 'lodash-es'
import { Sprite } from '../ui/sprite'

const variant: Variants = {
	hidden: {
		opacity: 0,
		rotate: 15,
		transition: {
			duration: 0.1,
		},
	},
	visible: {
		opacity: 1,
		rotate: 0,
	},
}

type TopBubbleProps = {
	message: string
	author: string
} & HTMLMotionProps<'div'>

export default function TopBubble({ message, author, ...props }: TopBubbleProps) {
	return (
		<motion.div
			variants={variant}
			initial={'hidden'}
			animate={'visible'}
			exit={'hidden'}
			className="origin-bottom-left"
			{...props}
		>
			<div role="button" className={'relative flex items-center justify-center p-9 px-20 pb-12 pl-12'}>
				<Sprite
					data={{
						part: '9',
						tl: SPRITESHEET_DATA.frames['chatbox-01-tl.png'].frame,
						tm: SPRITESHEET_DATA.frames['chatbox-01-tm.png'].frame,
						tr: SPRITESHEET_DATA.frames['chatbox-01-tr.png'].frame,
						ml: SPRITESHEET_DATA.frames['chatbox-01-ml.png'].frame,
						mm: SPRITESHEET_DATA.frames['chatbox-01-mm.png'].frame,
						mr: SPRITESHEET_DATA.frames['chatbox-01-mr.png'].frame,
						bl: SPRITESHEET_DATA.frames['chatbox-01-bl.png'].frame,
						bm: SPRITESHEET_DATA.frames['chatbox-01-bm.png'].frame,
						br: SPRITESHEET_DATA.frames['chatbox-01-br.png'].frame,
					}}
					className="absolute top-0 left-0 h-full w-full"
				/>
				<span className="-top-1 absolute left-6 z-[2] rounded-full bg-[#CBAB79] p-0.5 px-3 font-bold text-[#ffffff] text-[18px] tracking-wide">
					{capitalize(author)}
				</span>

				<span className="z-[2] font-extrabold text-[#735427] text-[20px] tracking-wide">{message}</span>

				<div className="absolute right-[58px] bottom-5 z-[2] flex items-center justify-center gap-1 text-[#F3A84B] text-[14px] tracking-wide">
					<span className="">Next</span>
					<figure className="h-3 w-3 animate-shake">
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_DATA.frames['icon-arrow-01.png'].frame,
							}}
							className="-rotate-90 h-full w-full"
						/>
					</figure>
				</div>
			</div>
		</motion.div>
	)
}
