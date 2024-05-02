import { useKeyboardControls } from '@react-three/drei'
import { useEffect } from 'react'
import { useBackpackStore } from '../backpack/store'
import { useCatchAxieStore } from '../catch-axie/catch-axie-store'
import { useCustomAvatarStore } from '../custom-avatar/custom-avatar-store'
import { usePokiedexStore } from '../pokiedex/pokiedex-store'

export default function ShortcutManager() {
	// TODO: change name of setter function for consistency
	const [isBackpackOpen, setOpenBackpack] = useBackpackStore((s) => [s.isOpen, s.setOpen])
	const [isPokiedexOpen, setOpenPokiedex] = usePokiedexStore((s) => [s.isOpen, s.setIsOpen])
	const [isCatchAxieOpen, setOpenCatchAxie] = useCatchAxieStore((s) => [s.isOpen, s.setOpenUI])
	const [isCustomAvatarOpen, setOpenCustomAvatar] = useCustomAvatarStore((s) => [s.isOpenUI, s.setOpenUI])
	const isBackpackPressed = useKeyboardControls((s) => s.backpack)
	const isPokiedexPressed = useKeyboardControls((s) => s.pokiedex)
	const isCatchAxiePressed = useKeyboardControls((s) => s['catch-axie'])
	const isCustomAvatarPressed = useKeyboardControls((s) => s['custom-avatar'])
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
	}, [isBackpackPressed, isPokiedexPressed, isCatchAxiePressed, isCustomAvatarPressed])

	useEffect(() => {
		if (isExitPressed) {
			setOpenBackpack(false)
			setOpenPokiedex(false)
			setOpenCatchAxie(false)
			setOpenCustomAvatar(false)
		}
	}, [isExitPressed])

	return null
}
