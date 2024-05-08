import type { SapidaeAnimation } from '@/components/sapidae/type'
import { animated } from '@react-spring/three'
import { OrthographicCamera, View } from '@react-three/drei'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { useDialogueStore } from './store'

const Sapidae = dynamic(() => import('@/components/sapidae/sapidae'), { ssr: false })
const BottomBubble = dynamic(() => import('./bottom-bubble'))

type BottomDialogueProps = {
	content: string
	onBubbleClick: () => void
}

export default function BottomDialogue({ content, onBubbleClick }: BottomDialogueProps) {
	const [subDialogue, dialogueType] = useDialogueStore((s) => [s.subDialogue, s.dialogueType])

	const animation = useMemo(() => {
		let a = 'talk-01'

		if (dialogueType === 'bottom' && subDialogue?.bubbles && subDialogue.before?.[0].action === 'EMOTE') {
			a = subDialogue.before?.[0].opts?.[0] ?? 'talk-01'
		}

		return a as SapidaeAnimation
	}, [subDialogue, dialogueType])

	return (
		<>
			<div className="-bottom-24 fixed z-[20] flex w-screen items-center justify-center">
				<View index={3} className="z-[20] h-[400px] w-[400px]">
					<OrthographicCamera makeDefault position={[0, 0, 5]} zoom={90} />
					<ambientLight intensity={4} />
					<animated.group position={[0, -2.3, 0]}>
						<Sapidae animation={animation} scale={2} rotation={[0, 0.2, 0]} />
					</animated.group>
				</View>

				<div className="-ml-20 z-[20] w-[400px]">
					<AnimatePresence mode="wait">
						<BottomBubble key={content} message={content} onMouseUp={onBubbleClick} />
					</AnimatePresence>
				</div>
			</div>
		</>
	)
}
