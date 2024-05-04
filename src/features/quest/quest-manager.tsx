'use client'

import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { QuestItem } from './quest-item'
import { useQuestStore } from './quest-store'

export default function QuestManager() {
	const [quests, newQuest] = useQuestStore((state) => [state.quests, state.newQuest])
	const timeout = useRef<NodeJS.Timeout>()

	// useEffect(() => {
	// 	if (quests) {
	// 		timeout.current = setTimeout(() => {
	// 			useQuestStore.setState({ quests: null })

	// 			clearTimeout(timeout.current)
	// 		}, 3000)
	// 	}

	// 	return () => {
	// 		clearTimeout(timeout.current)
	// 	}
	// }, [quests])

	// useEffect(() => {
	// 	newQuest({
	// 		id: '1',
	// 		isFinished: false,
	// 		name: 'Find Bano',
	// 	})
	// }, [])

	return (
		<section className="absolute bottom-[20%] left-5 z-[4]">
			<AnimatePresence>{quests && <QuestItem key={quests.id} quest={quests} />}</AnimatePresence>
		</section>
	)
}
