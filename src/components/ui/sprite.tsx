import { SPRITESHEET_ELEMENT } from '@/config/spritesheet'
import { cn, getSpriteStyles } from '@/lib/utils'
import { type HTMLAttributes, type ReactNode, forwardRef } from 'react'

type Frame = {
	x: number
	y: number
	w: number
	h: number
}

interface Part<T extends string> {
	part: T
}

interface TwoPart extends Part<'2'> {
	l: Frame
	r: Frame
}
interface ThreePart extends Part<'3'> {
	l: Frame
	m: Frame
	r: Frame
}

interface NinePart extends Part<'9'> {
	tl: Frame
	tm: Frame
	tr: Frame
	ml: Frame
	mm: Frame
	mr: Frame
	bl: Frame
	bm: Frame
	br: Frame
}

const meta = SPRITESHEET_ELEMENT.meta.size

type SpriteTwoPartsProps = { children?: ReactNode } & TwoPart &
	HTMLAttributes<HTMLDivElement>

const SpriteTwoParts = forwardRef<HTMLDivElement, SpriteTwoPartsProps>(
	({ children, className, l, r, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('relative flex w-[300px] items-center', className)}
				{...props}
			>
				<div
					className="relative w-full"
					style={{ aspectRatio: `${l.w}/${l.h}` }}
				>
					<div className="absolute top-0 left-0 w-full">
						<svg
							className="spritesheet-element w-full bg-no-repeat"
							style={getSpriteStyles(l, meta)}
							viewBox={`0 0 1 ${l.h / l.w}`}
						/>
					</div>
				</div>

				<div
					className="relative w-full"
					style={{ aspectRatio: `${r.w}/${r.h}` }}
				>
					<div className="absolute top-0 left-0 w-full">
						<svg
							className="spritesheet-element w-full bg-no-repeat"
							style={getSpriteStyles(r, meta)}
							viewBox={`0 0 1 ${r.h / r.w}`}
						/>
					</div>
				</div>

				<div className="absolute flex h-full w-full items-center justify-center">
					{children}
				</div>
			</div>
		)
	},
)

SpriteTwoParts.displayName = 'SpriteTwoParts'

type SpriteThreePartsProps = {
	children?: ReactNode
} & ThreePart &
	HTMLAttributes<HTMLDivElement>

const SpriteThreeParts = forwardRef<HTMLDivElement, SpriteThreePartsProps>(
	({ children, className, l, m, r, ...props }, ref) => {
		return (
			<div
				ref={ref}
				className={cn('relative flex h-[50px] w-[200px]', className)}
				{...props}
			>
				<div
					className="relative h-full"
					style={{ aspectRatio: `${l.w}/${l.h}` }}
				>
					<div className="absolute top-0 left-0 ml-[.5px] h-full">
						<svg
							className="spritesheet-element h-full bg-no-repeat"
							style={getSpriteStyles(l, meta)}
							viewBox={`0 0 1 ${l.h / l.w}`}
						/>
					</div>
				</div>
				<div className="relative h-full flex-1">
					<div className="absolute top-0 left-0 h-full w-full">
						<svg
							className="spritesheet-element h-full w-full bg-no-repeat"
							style={getSpriteStyles(m, meta)}
							viewBox={`0 0 1 ${m.h / m.w}`}
						/>
					</div>
				</div>
				<div
					className="relative h-full"
					style={{ aspectRatio: `${r.w}/${r.h}` }}
				>
					<div className="-ml-[.5px] absolute top-0 left-0 h-full">
						<svg
							className="spritesheet-element h-full bg-no-repeat"
							style={getSpriteStyles(r, meta)}
							viewBox={`0 0 1 ${r.h / r.w}`}
						/>
					</div>
				</div>

				<div className="absolute flex h-full w-full items-center justify-center">
					{children}
				</div>
			</div>
		)
	},
)

SpriteThreeParts.displayName = 'SpriteThreeParts'

type SpriteNinePartsProps = {
	children?: ReactNode
} & NinePart &
	HTMLAttributes<HTMLDivElement>

const SpriteNineParts = forwardRef<HTMLDivElement, SpriteNinePartsProps>(
	(
		{ className, children, tl, tm, tr, ml, mm, mr, bl, bm, br, ...props },
		ref,
	) => {
		return (
			<div
				ref={ref}
				className={cn(
					'relative grid h-[500px] w-[1200px] grid-cols-[7cqw_minmax(0px,1fr)_7cqw] grid-rows-[_min-content_minmax(0px,1fr)_min-content] lg:grid-cols-[3cqw_minmax(0px,1fr)_3cqw]',
					className,
				)}
				{...props}
			>
				<div className="w-full">
					<svg
						className="spritesheet-element w-full bg-no-repeat"
						style={getSpriteStyles(tl, meta)}
						viewBox={`0 0 1 ${tl.h / tl.w}`}
					/>
				</div>

				<div className="relative h-full w-full">
					<div className="absolute h-full w-full">
						<svg
							className="spritesheet-element h-full w-full bg-no-repeat"
							style={getSpriteStyles(tm, meta)}
							viewBox={`0 0 1 ${tm.w / tm.h}`}
						/>
					</div>
				</div>

				<div className="h-full w-full">
					<svg
						className="spritesheet-element w-full bg-no-repeat"
						style={getSpriteStyles(tr, meta)}
						viewBox={`0 0 1 ${tr.h / tr.w}`}
					/>
				</div>

				<div className="h-full w-full">
					<svg
						className="spritesheet-element h-full w-full bg-no-repeat"
						style={getSpriteStyles(ml, meta)}
						viewBox={`0 0 1 ${ml.h / ml.w}`}
					/>
				</div>

				<div className="h-full w-full">
					<svg
						className="spritesheet-element h-full w-full bg-no-repeat"
						style={getSpriteStyles(mm, meta)}
						viewBox={`0 0 1 ${mm.h / mm.w}`}
					/>
				</div>

				<div className="w-full">
					<svg
						className="spritesheet-element h-full w-full bg-no-repeat"
						style={getSpriteStyles(mr, meta)}
						viewBox={`0 0 1 ${mr.h / mr.w}`}
					/>
				</div>

				<div className="w-full">
					<svg
						className="spritesheet-element w-full bg-no-repeat"
						style={getSpriteStyles(bl, meta)}
						viewBox={`0 0 1 ${bl.h / bl.w}`}
					/>
				</div>

				<div className="relative h-full w-full">
					<div className="absolute h-full w-full">
						<svg
							className="spritesheet-element h-full w-full bg-no-repeat"
							style={getSpriteStyles(bm, meta)}
							viewBox={`0 0 1 ${bm.w / bm.h}`}
						/>
					</div>
				</div>

				<div className="w-full">
					<svg
						className="spritesheet-element w-full bg-no-repeat"
						style={getSpriteStyles(br, meta)}
						viewBox={`0 0 1 ${br.h / br.w}`}
					/>
				</div>

				<div className="absolute flex h-full w-full items-center justify-center">
					{children}
				</div>
			</div>
		)
	},
)

SpriteNineParts.displayName = 'SpriteNineParts'

type SpriteProps = {
	data: TwoPart | ThreePart | NinePart
	children?: ReactNode
} & HTMLAttributes<HTMLDivElement>

const Sprite = forwardRef<HTMLDivElement, SpriteProps>(
	({ data, children, ...props }, ref) => {
		switch (data.part) {
			case '2':
				return (
					<SpriteTwoParts ref={ref} {...data} {...props}>
						{children}
					</SpriteTwoParts>
				)
			case '3':
				return (
					<SpriteThreeParts ref={ref} {...data} {...props}>
						{children}
					</SpriteThreeParts>
				)
			default:
				return (
					<SpriteNineParts ref={ref} {...data} {...props}>
						{children}
					</SpriteNineParts>
				)
		}
	},
)

Sprite.displayName = 'Sprite'

export { Sprite }
