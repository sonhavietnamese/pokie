import { animated } from '@react-spring/three'
import { OrthographicCamera, View } from '@react-three/drei'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const Sapidae = dynamic(() => import('@/components/sapidae/sapidae'), { ssr: false })
const BottomBubble = dynamic(() => import('./bottom-bubble'))

type BottomDialogueProps = {
	content: string
	onBubbleClick: () => void
}

export default function BottomDialogue({ content, onBubbleClick }: BottomDialogueProps) {
	// const springs = useSpring<{ position: [number, number, number] }>({
	// 	position: content ? [0, -2.3, 0] : [0, -10, 0],
	// })

	return (
		<>
			<div className="-bottom-24 fixed z-[10] flex w-screen items-center justify-center">
				<View index={3} className="z-[10] h-[400px] w-[250px]">
					<OrthographicCamera makeDefault position={[0, 0, 5]} zoom={90} />
					<ambientLight intensity={4} />
					<animated.group position={[0, -2.3, 0]}>
						<Sapidae animation="talk-01" scale={2} rotation={[0, 0.2, 0]} />
					</animated.group>
				</View>

				<div className="z-[10] w-[400px]">
					<AnimatePresence mode="wait">
						<BottomBubble key={content} message={content} onMouseUp={onBubbleClick} />
					</AnimatePresence>
				</div>
			</div>
		</>
	)
}
