import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const TopBubble = dynamic(() => import('./top-bubble'))

type TopDialogueProps = {
	content: string

	onBubbleClick: () => void
}

export default function TopDialogue({ content, onBubbleClick }: TopDialogueProps) {
	return (
		<AnimatePresence mode="wait">
			<TopBubble message={content} author="bano" onMouseUp={onBubbleClick} key={content} />
		</AnimatePresence>
	)
}
