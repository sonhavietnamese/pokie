import Sapidae from '@/components/sapidae/sapidae'
import { animated, useSpring } from '@react-spring/three'
import { OrthographicCamera, View } from '@react-three/drei'
import { AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import GuideBubble from './guide-bubble'
import { useDialogueStore } from './store'
import type { NextNode } from './type'

export default function BottomDialogue() {
	const [bottomDialogues, subDialogue, setSubDialogue] = useDialogueStore((s) => [
		s.bottomDialogues,
		s.subDialogue,
		s.setSubDialogue,
	])

	const [bubbleIndex, setBubbleIndex] = useState(0)
	const [bubbles, setBubbles] = useState(subDialogue.bubbles ?? [])
	const bubble = useMemo(() => bubbles[Math.min(bubbleIndex, bubbles.length)], [bubbleIndex, bubbles])

	const springs = useSpring<{ position: [number, number, number] }>({
		position: bottomDialogues ? [0, -2.3, 0] : [0, -10, 0],
	})

	const onBubbleClick = () => {
		if (bubbleIndex === bubbles.length - 1) {
			check(subDialogue.next ? subDialogue.next[0] : undefined)

			return
		}

		setBubbleIndex((prev) => prev + 1)
	}

	const check = (next: NextNode | undefined) => {
		if (!next) return
		if (!bottomDialogues) return

		const { action, node } = next

		switch (action) {
			case 'GOTO':
				if (!node) return
				setSubDialogue(bottomDialogues[node])
				setBubbles(bottomDialogues[node].bubbles ?? [])
				setBubbleIndex(0)

				return

			case 'OPEN_NEW_TAB':
				window.open('https://faucet.roninchain.com/', '_blank')

				return

			default:
				console.log('default')
		}
	}

	return (
		<>
			{bottomDialogues && (
				<div className="-bottom-24 fixed z-[4] flex w-screen items-center justify-center">
					<View index={3} className="z-[4] h-[400px] w-[250px]">
						<OrthographicCamera makeDefault position={[0, 0, 5]} zoom={90} />
						<ambientLight intensity={4} />
						<animated.group position={springs.position}>
							<Sapidae animation="talk-01" scale={2} rotation={[0, 0.2, 0]} />
						</animated.group>
					</View>

					<div className="z-[4] w-[400px]">
						<AnimatePresence mode="wait">
							<GuideBubble key={bubble} message={bubble} onClick={onBubbleClick} />
						</AnimatePresence>
					</div>
				</div>
			)}
		</>
	)
}
