import { SPRITESHEET_ELEMENT } from '@/configs/spritesheet'
import { getSpriteStyles } from '@/libs/utils'

const meta = SPRITESHEET_ELEMENT.meta.size

export default function Dialog() {
	const tl = SPRITESHEET_ELEMENT.frames['dialog-tl.png'].frame
	const tm = SPRITESHEET_ELEMENT.frames['dialog-tm.png'].frame
	const tr = SPRITESHEET_ELEMENT.frames['dialog-tr.png'].frame
	const ml = SPRITESHEET_ELEMENT.frames['dialog-ml.png'].frame
	const mm = SPRITESHEET_ELEMENT.frames['dialog-mm.png'].frame
	const mr = SPRITESHEET_ELEMENT.frames['dialog-mr.png'].frame
	const bl = SPRITESHEET_ELEMENT.frames['dialog-bl.png'].frame
	const bm = SPRITESHEET_ELEMENT.frames['dialog-bm.png'].frame
	const br = SPRITESHEET_ELEMENT.frames['dialog-br.png'].frame

	return (
		<div className="grid h-[500px] w-[1200px] grid-cols-[5cqw_minmax(0px,1fr)_5cqw] grid-rows-[_min-content_minmax(0px,1fr)_min-content] lg:grid-cols-[3cqw_minmax(0px,1fr)_3cqw]">
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
		</div>
	)
}
