import { useKeyboardControls } from '@react-three/drei'
import { useEffect } from 'react'
import { useBackpackStore } from '../backpack/store'
import { useCatchAxieStore } from '../catch-axie/catch-axie-store'
import { usePokiedexStore } from '../pokiedex/pokiedex-store'

export default function ShortcutManager() {
	// TODO: change name of setter function for consistency
	const [isBackpackOpen, setOpenBackpack] = useBackpackStore((s) => [s.isOpen, s.setOpen])
	const [isPokiedexOpen, setOpenPokiedex] = usePokiedexStore((s) => [s.isOpen, s.setIsOpen])
	const [isCatchAxieOpen, setOpenCatchAxie] = useCatchAxieStore((s) => [s.isOpen, s.setOpenUI])
	const isBackpackPressed = useKeyboardControls((s) => s.backpack)
	const isPokiedexPressed = useKeyboardControls((s) => s.pokiedex)
	const iscatchAxiePressed = useKeyboardControls((s) => s['catch-axie'])
	const isExitPressed = useKeyboardControls((s) => s.exit)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isBackpackPressed) {
			setOpenBackpack(!isBackpackOpen)
		}
	}, [isBackpackPressed])

	useEffect(() => {
		if (isPokiedexPressed) {
			setOpenPokiedex(!isPokiedexOpen)
		}
	}, [isPokiedexPressed])

	useEffect(() => {
		if (iscatchAxiePressed) {
			setOpenCatchAxie(!isCatchAxieOpen)
		}
	}, [iscatchAxiePressed])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (isExitPressed) {
			setOpenBackpack(false)
			setOpenPokiedex(false)
			setOpenCatchAxie(false)
		}
	}, [isExitPressed])

	return null
}
