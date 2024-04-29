import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { size } from 'lodash-es'
import React from 'react'
import type { Choice, Choices } from './type'

type BottomActionsProps = {
	choices: Choices
	onYes: (choice: Choice) => void
	onNo: (choice: Choice) => void
}

export default function BottomActions({ onYes, onNo, choices }: BottomActionsProps) {
	return (
		<motion.div className="absolute bottom-10 z-[10] flex">
			{size(choices) > 0 && (
				<div className="flex gap-4">
					{choices.no && (
						<Button onClick={() => onNo(choices.no)} className="hover:-translate-y-1 transition-transform" color="red">
							{choices.no.value}
						</Button>
					)}
					{choices.yes && (
						<Button
							onClick={() => onYes(choices.no)}
							className="hover:-translate-y-1 transition-transform"
							color="blue"
						>
							{choices.yes.value}
						</Button>
					)}
				</div>
			)}
		</motion.div>
	)
}
