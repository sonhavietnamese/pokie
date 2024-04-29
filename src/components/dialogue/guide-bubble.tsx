import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { type HTMLMotionProps, type Variants, motion } from 'framer-motion'
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
} & HTMLMotionProps<'div'>

export default function GuideBubble({ message, ...props }: TopBubbleProps) {
	return (
		<motion.div
			variants={variant}
			initial={'hidden'}
			animate={'visible'}
			exit={'hidden'}
			className="origin-top-left"
			{...props}
		>
			<div role="button" className="relative flex min-h-[200px] w-full min-w-[450px] p-10 pr-16 pb-12 pl-14">
				<div className="absolute top-16 left-[5.1px] z-[4] flex items-center justify-center gap-1 text-[#F3A84B] text-[14px] tracking-wide">
					<figure className="h-5 w-5">
						<Sprite
							data={{
								part: '1',
								m: SPRITESHEET_DATA.frames['chatbox-02-tip.png'].frame,
							}}
							className="h-full w-full"
						/>
					</figure>
				</div>

				<Sprite
					data={{
						part: '9',
						tl: SPRITESHEET_DATA.frames['chatbox-02-tl.png'].frame,
						tm: SPRITESHEET_DATA.frames['chatbox-02-tm.png'].frame,
						tr: SPRITESHEET_DATA.frames['chatbox-02-tr.png'].frame,
						ml: SPRITESHEET_DATA.frames['chatbox-02-ml.png'].frame,
						mm: SPRITESHEET_DATA.frames['chatbox-02-mm.png'].frame,
						mr: SPRITESHEET_DATA.frames['chatbox-02-mr.png'].frame,
						bl: SPRITESHEET_DATA.frames['chatbox-02-bl.png'].frame,
						bm: SPRITESHEET_DATA.frames['chatbox-02-bm.png'].frame,
						br: SPRITESHEET_DATA.frames['chatbox-02-br.png'].frame,
					}}
					className="absolute top-0 left-0 h-full w-full"
				/>

				<span className="z-[3] font-bold text-[#A7782D] text-[20px] leading-none tracking-wide">{message}</span>

				<div className="absolute right-[44px] bottom-6 z-[4] flex items-center justify-center gap-1 text-[#F3A84B] text-[14px] tracking-wide">
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
