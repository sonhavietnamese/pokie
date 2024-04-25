import { Button } from '@/components/ui/button'
import { cn } from '@/libs/utils'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import React from 'react'
import { usePhoneStore } from './store'

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

export default function PhoneScreen() {
	const { isOpen, setIsOpen } = usePhoneStore()

	return (
		<Dialog open={isOpen}>
			<DialogPortal>
				<DialogOverlay />
				<DialogPrimitive.Content
					className={cn(
						'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 fixed top-[50%] left-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 bg-background p-[30px] px-[40px] pb-[40px] outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
						'w-[300px] h-[300px]',
					)}
				>
					<Button onClick={() => setIsOpen(false)}>asdasdasds</Button>
				</DialogPrimitive.Content>
			</DialogPortal>
		</Dialog>
	)
}
