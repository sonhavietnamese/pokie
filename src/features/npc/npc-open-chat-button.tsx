import { Button } from '@/components/ui/button'
import { useDialogueStore } from '@/features/dialogue/store'
import useQuest from '@/features/quest/use-quest'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import { capitalize, sample } from 'lodash-es'
import { useMemo } from 'react'
import { useBlacksmithStore } from '../blacksmith/store'
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
	const [npc, setIsTalking, isTalking, setCameraPosition] = useNpcStore((s) => [
		s.npc,
		s.setIsTalking,
		s.isTalking,
		s.setCameraPosition,
	])
	const { onGoingQuest, switchToCompletedQuest } = useQuest()
	const showDialogue = useDialogueStore((s) => s.showDialogue)
	const setOpenBlacksmith = useBlacksmithStore((s) => s.setIsOpenUI)

	const shouldShowButton = useMemo(() => {
		if (isTalking) return false
		if (npc) return true
	}, [npc, isTalking])

	const onClick = () => {
		setIsTalking(true)

		if (npc?.id === 'bimy') {
			setCameraPosition([2, 1.2, -5])
			if (onGoingQuest?.questId === 'quest_01') showDialogue('bimy_01', 'top')
			else showDialogue('bimy_02', 'top')
		}

		if (npc?.id === 'ooap') {
			setCameraPosition([8, 1.2, -3])
			if (onGoingQuest?.questId === 'quest_02') showDialogue('ooap_01', 'top')
			else {
				setOpenBlacksmith(true)
				setCameraPosition([9, 1.2, -3])
			}
		}
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
						<span className="font-extrabold text-2xl">
							{capitalize(sample(['ask', 'hello', 'sup']))} {npc?.name}
						</span>
					</Button>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
