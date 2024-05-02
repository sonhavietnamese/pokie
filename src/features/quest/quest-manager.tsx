'use client'

import { Notification } from '@/components/ui/notification'
import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
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

	useEffect(() => {
		newQuest({
			id: '1',
			isFinished: false,
			name: 'Find Bano',
		})
	}, [])

	return (
		<section className="absolute bottom-[10%] left-5 z-[4]">
			<AnimatePresence>
				{quests && (
					<QuestItem key={quests.id}>
						<div className="flex gap-4 items-center pr-5">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['icon-quest-01.png'].frame,
								}}
								className="h-[60px] w-[60px]"
							/>
							<div className="flex flex-col">
								<span className="font-bold text-[#301B0A] tracking-wide">{quests.name}</span>
							</div>
						</div>
					</QuestItem>
				)}
			</AnimatePresence>
		</section>
	)
}
