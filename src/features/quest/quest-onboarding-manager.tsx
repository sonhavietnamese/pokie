import { useDialogueStore } from '@/features/dialogue/store'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function QuestOnboardingManager() {
	const [showDialogue, selectedDialogue] = useDialogueStore((s) => [s.showDialogue, s.selectedDialogue])

	const { data, status } = useSession()

	useEffect(() => {
		if (selectedDialogue === 'ron_insufficient') return

		if (status === 'authenticated' && !data?.user.isBoarded) {
			showDialogue('quest_01', 'bottom')
		}
	}, [showDialogue, selectedDialogue, data])

	return null
}
