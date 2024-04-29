'use client'

import TopBubble from '@/components/dialogue/top-bubble'
import ScreenSizeBreakpoint from '@/components/screen-size-breakpoint'
import { Button } from '@/components/ui/button'
import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import AnimationManager from '@/features/axie/animation-manager'
import { KEYBOARD_MAP } from '@/libs/constants'
import { KeyboardControls, View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import { size } from 'lodash-es'
import dynamic from 'next/dynamic'
import { Perf } from 'r3f-perf'
import { type MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import dialogues from './dialogues.json'

const Home = dynamic(() => import('@/scenes/home'))
const Avatar = dynamic(() => import('@/components/avatar'))
const BottomDialogue = dynamic(() => import('@/components/dialogue/bottom-dialogue'))

const onboarding: Dialogue = dialogues.onboarding as Dialogue

type Dialogue = {
	[key: string]: DialogueNode
} & {
	_entry: string
}

interface DialogueNode {
	isSpeak?: boolean
	isPrompt?: boolean
	id: string
	before?: Action[]
	bubbles?: string[]
	next?: NextNode[]
	choices?: Choices
}

interface Action {
	action: string
	opts?: string[]
}

interface NextNode {
	action: string
	node?: string
}

interface Choices {
	[key: string]: Choice
}

interface Choice {
	id: string
	value: string
	next?: NextNode[]
}

export default function Page() {
	const [dialog, setDialog] = useState(onboarding[onboarding._entry])
	const [bubbleIndex, setBubbleIndex] = useState(0)
	const [bubbles, setBubbles] = useState(dialog.bubbles ?? [])
	const [choices, setChoices] = useState(dialog.choices ?? {})
	const bubble = useMemo(() => bubbles[Math.min(bubbleIndex, bubbles.length)], [bubbleIndex, bubbles])

	const ref = useRef<HTMLDivElement>(null)

	const onBubbleClick = useCallback(() => {
		if (size(choices) > 0) return

		if (bubbleIndex === bubbles.length - 1) {
			check(dialog.next ? dialog.next[0] : undefined)

			return
		}

		setBubbleIndex((prev) => prev + 1)
	}, [bubbleIndex, bubbles.length, choices, dialog.next])

	const check = (next: NextNode | undefined) => {
		if (!next) return

		const { action, node } = next

		if (!node) return

		if (action === 'GOTO') {
			setDialog(onboarding[node])

			if (onboarding[node].bubbles) {
				setBubbles(onboarding[node].bubbles)
				setChoices({})
				setBubbleIndex(0)
			}
			if (onboarding[node].choices) {
				setChoices(onboarding[node].choices)
			}

			return
		}

		if (action === 'END') {
			console.log('END')
		}
	}

	const onChoiceClick = (choice: Choice) => {
		if (!choice.next) return

		check(choice.next[0])
	}

	useEffect(() => {
		if (bubbleIndex === bubbles.length - 1) {
			if (dialog.next[0].action === 'GOTO' && onboarding[dialog.next[0].node].choices) {
				setChoices(onboarding[dialog.next[0].node].choices)
			}
		}
	}, [bubbleIndex])

	return (
		<main
			ref={ref}
			className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden bg-slate-200"
		>
			<AnimationManager />

			<div className="absolute top-20 z-[2]">
				<AnimatePresence mode="wait">
					<TopBubble message={bubble} author="bino" onMouseUp={onBubbleClick} key={bubble} />
				</AnimatePresence>
			</div>

			<div className="absolute bottom-10 z-[2] flex">
				{size(choices) > 0 && (
					<div className="flex gap-4">
						{Object.entries(choices).map(([key, value]) => (
							<Button key={key} onClick={() => onChoiceClick(value)}>
								{value.value}
							</Button>
						))}
					</div>
				)}
			</div>

			<KeyboardControls map={KEYBOARD_MAP}>
				<Canvas
					dpr={0.75}
					shadows={{
						enabled: true,
						type: THREE.PCFShadowMap,
					}}
					gl={{
						outputColorSpace: THREE.SRGBColorSpace,
						toneMapping: THREE.ACESFilmicToneMapping,
					}}
					camera={{
						fov: 40,
						near: 0.1,
						far: 200,
						position: [0, 20, 40],
					}}
					eventSource={ref as MutableRefObject<HTMLElement>}
				>
					<View.Port />
				</Canvas>
			</KeyboardControls>

			<View index={1} className="absolute z-[1] h-screen w-screen">
				<Perf />
				<Home />
			</View>

			<Avatar />
			<BottomDialogue />

			<ScreenSizeBreakpoint />
		</main>
	)
}
