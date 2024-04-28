import { useKeyboardControls } from '@react-three/drei'
import { useEffect } from 'react'
import { useBackpackStore } from '../backpack/store'

export default function ShortcutManager() {
	const [isBackpackOpen, setOpenBackpack] = useBackpackStore((s) => [s.isOpen, s.setOpen])
	const isBackpackPressed = useKeyboardControls((s) => s.backpack)
	const isExitPressed = useKeyboardControls((s) => s.exit)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isBackpackPressed) {
			setOpenBackpack(!isBackpackOpen)
		}
	}, [isBackpackPressed])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isExitPressed) {
			setOpenBackpack(false)
		}
	}, [isExitPressed])

	return null
}
