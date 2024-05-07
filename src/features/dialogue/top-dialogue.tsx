import { useNpcStore } from '@/features/npc/npc-store'
import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'

const TopBubble = dynamic(() => import('./top-bubble'))

type TopDialogueProps = {
	content: string

	onBubbleClick: () => void
}

export default function TopDialogue({ content, onBubbleClick }: TopDialogueProps) {
	const npc = useNpcStore((s) => s.npc)

	return (
		<AnimatePresence mode="wait">
			<TopBubble message={content} author={npc ? npc.name : 'bano'} onMouseUp={onBubbleClick} key={content} />
		</AnimatePresence>
	)
}
