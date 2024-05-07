import { useBackpackStore } from '@/features/backpack/backpack-store'
import { useCatchAxieStore } from '@/features/catch-axie/catch-axie-store'
import { useCustomAvatarStore } from '@/features/custom-avatar/custom-avatar-store'
import { useMarketplaceStore } from '@/features/marketplace/marketplace-store'
import { usePhoneStore } from '@/features/phone/phone-store'
import { usePokiedexStore } from '@/features/pokiedex/pokiedex-store'
import { useKeyboardControls } from '@react-three/drei'
import { useEffect } from 'react'

export default function ShortcutManager() {
	// TODO: change name of setter function for consistency
	const [isBackpackOpen, setOpenBackpack] = useBackpackStore((s) => [s.isOpen, s.setOpen])
	const [isPokiedexOpen, setOpenPokiedex] = usePokiedexStore((s) => [s.isOpen, s.setIsOpen])
	const [isCatchAxieOpen, setOpenCatchAxie] = useCatchAxieStore((s) => [s.isOpen, s.setOpenUI])
	const [isPhoneOpen, setOpenPhone] = usePhoneStore((s) => [s.isOpen, s.setIsOpen])
	const [isMarketplaceOpen, setOpenMarketplace] = useMarketplaceStore((s) => [s.isOpenUI, s.setIsOpenUI])
	const [isCustomAvatarOpen, setOpenCustomAvatar] = useCustomAvatarStore((s) => [s.isOpenUI, s.setOpenUI])
	const isBackpackPressed = useKeyboardControls((s) => s.backpack)
	const isPokiedexPressed = useKeyboardControls((s) => s.pokiedex)
	const isCatchAxiePressed = useKeyboardControls((s) => s['catch-axie'])
	const isCustomAvatarPressed = useKeyboardControls((s) => s['custom-avatar'])
	const isMarketplacePressed = useKeyboardControls((s) => s.marketplace)
	const isPhonePressed = useKeyboardControls((s) => s.phone)
	const isExitPressed = useKeyboardControls((s) => s.exit)

	useEffect(() => {
		if (isBackpackPressed) {
			setOpenBackpack(!isBackpackOpen)
		}

		if (isPokiedexPressed) {
			setOpenPokiedex(!isPokiedexOpen)
		}

		if (isCatchAxiePressed) {
			setOpenCatchAxie(!isCatchAxieOpen)
		}

		if (isCustomAvatarPressed) {
			setOpenCustomAvatar(!isCustomAvatarOpen)
		}

		if (isPhonePressed) {
			setOpenPhone(!isPhoneOpen)
		}

		if (isMarketplacePressed) {
			setOpenMarketplace(!isMarketplaceOpen)
		}
	}, [
		isBackpackPressed,
		isPokiedexPressed,
		isCatchAxiePressed,
		isCustomAvatarPressed,
		isPhonePressed,
		isMarketplacePressed,
	])

	useEffect(() => {
		if (isExitPressed) {
			setOpenBackpack(false)
			setOpenPokiedex(false)
			setOpenCatchAxie(false)
			setOpenCustomAvatar(false)
			setOpenPhone(false)
			setOpenMarketplace(false)
		}
	}, [isExitPressed])

	return null
}
