'use client'

import { SPRITESHEET_ELEMENT } from '@/configs/spritesheet'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as React from 'react'
import { Sprite } from './sprite'

import { cn } from '@/libs/utils'

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Overlay>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Overlay
		ref={ref}
		className={cn(
			'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-[#200C04B2] data-[state=closed]:animate-out data-[state=open]:animate-in',
			className,
		)}
		{...props}
	/>
))

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
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
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 bg-background p-[30px] px-[40px] pb-[40px] shadow-lg outline-none duration-1000 data-[state=closed]:animate-out data-[state=open]:animate-in',
					className,
				)}
				{...props}
			>
				<Sprite
					data={{
						part: '9',
						tl,
						tm,
						tr,
						ml,
						mm,
						mr,
						bl,
						bm,
						br,
					}}
					className="absolute top-0 left-0 z-[0] h-full w-full"
				/>

				<div className="z-[1]">{children}</div>
			</DialogPrimitive.Content>
		</DialogPortal>
	)
})

DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)

DialogHeader.displayName = 'DialogHeader'

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)

DialogFooter.displayName = 'DialogFooter'

const DialogTitle = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Title>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Title
		ref={ref}
		className={cn('font-semibold text-ld leading-none tracking-tight', className)}
		{...props}
	/>
))

DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Description>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description ref={ref} className={cn('text-sm', className)} {...props} />
))

DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
}
