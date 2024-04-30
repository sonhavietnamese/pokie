import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const TopBubble = dynamic(() => import('./top-bubble'))

type TopDialogueProps = {
	content: string

	onBubbleClick: () => void
}

export default function TopDialogue({ content, onBubbleClick }: TopDialogueProps) {
	return (
		<>
			<div className="absolute top-20 z-[3] max-w-[700px]">
				<AnimatePresence mode="wait">
					<TopBubble message={content} author="bino" onMouseUp={onBubbleClick} key={content} />
				</AnimatePresence>
			</div>
		</>
	)
}
