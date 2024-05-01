import { useKeyboardControls } from '@react-three/drei'
import { useEffect } from 'react'
import { useBackpackStore } from '../backpack/store'
import { usePokiedexStore } from '../pokiedex/pokiedex-store'

export default function ShortcutManager() {
	const [isBackpackOpen, setOpenBackpack] = useBackpackStore((s) => [s.isOpen, s.setOpen])
	const [isPokiedexOpen, setOpenPokiedex] = usePokiedexStore((s) => [s.isOpen, s.setIsOpen])
	const isBackpackPressed = useKeyboardControls((s) => s.backpack)
	const isPokiedexPressed = useKeyboardControls((s) => s.pokiedex)
	const isExitPressed = useKeyboardControls((s) => s.exit)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isBackpackPressed) {
			setOpenBackpack(!isBackpackOpen)
		}
	}, [isBackpackPressed])

	useEffect(() => {
		if (isPokiedexPressed) {
			console.log('isPokiedexPressed', isPokiedexOpen)
			setOpenPokiedex(!isPokiedexOpen)
		}
	}, [isPokiedexPressed])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isExitPressed) {
			setOpenBackpack(false)
			setOpenPokiedex(false)
		}
	}, [isExitPressed])

	return null
}
