import { Button } from '@/components/ui/button'
import { useDialogueStore } from '@/features/dialogue/store'
import useQuest from '@/features/quest/use-quest'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import { useMemo } from 'react'
import { useNpcStore } from './npc-store'

const buttonVariants: Variants = {
	hidden: {
		opacity: 0,
		y: 100,
		x: '-50%',
	},
	visible: {
		opacity: 1,
		y: 0,
		x: '-50%',
	},
}

export default function NpcOpenChatButton() {
	const [npc, setIsTalking, isTalking] = useNpcStore((s) => [s.npc, s.setIsTalking, s.isTalking])
	// const [showButton, setShowButton] = useState(false)
	const { onGoingQuest, switchToCompletedQuest } = useQuest()
	const showDialogue = useDialogueStore((s) => s.showDialogue)

	const shouldShowButton = useMemo(() => {
		if (isTalking) return false
		if (npc) return true
	}, [npc, isTalking])

	const onClick = () => {
		setIsTalking(true)

		if (onGoingQuest) {
			showDialogue('bimy_01', 'top')
		} else showDialogue('bimy_02', 'top')
	}

	return (
		<AnimatePresence>
			{shouldShowButton && (
				<motion.div
					variants={buttonVariants}
					initial="hidden"
					animate={shouldShowButton ? 'visible' : 'hidden'}
					exit={'hidden'}
					className="absolute bottom-6 left-1/2 z-[5] h-[70px] w-[200px]"
				>
					<Button color="green" className="h-full w-full" onClick={onClick}>
						<span className="font-extrabold text-2xl">Ask Bimy</span>
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
