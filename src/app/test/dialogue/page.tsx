'use client'

import ScreenSizeBreakpoint from '@/components/screen-size-breakpoint'
import { Button } from '@/components/ui/button'
import AnimationManager from '@/features/axie/animation-manager'
import { Billboard, useTexture } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { AnimatePresence, type Variants, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

import { size } from 'lodash-es'
import { z } from 'zod'
import dialogues from './dialogues.json'

// const onboarding: Dialogue = dialogues.onboarding as Dialogue
const onboarding: Dialogue = {}

onboarding._entry = '1'
onboarding['1'] = {
	id: '1',
	isSpeak: true,
	bubbles: ['Hello there!'],
	next: [
		{
			action: 'GOTO',
			node: '2',
		},
	],
}

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

	const onChoiceClick = (choice) => {
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
		<main className="relative flex h-screen w-screen flex-col items-center justify-center bg-slate-200">
			<AnimationManager />

			<div className="absolute z-[1] top-20 ">
				<AnimatePresence mode="wait">
					<motion.div
						key={bubbleIndex}
						variants={variant}
						initial={'hidden'}
						animate={'visible'}
						onClick={onBubbleClick}
						exit={'hidden'}
						className="w-[200px] h-[50px] bg-red-300 origin-left"
					>
						<span>{bubble}</span>
					</motion.div>
				</AnimatePresence>
			</div>

			<div className="pointer-events-none absolute top-0 left-0 z-[10] h-screen w-screen bg-vignette" />

			<div className="absolute z-[1] bottom-10 flex">
				{size(choices) > 0 && (
					<div className="flex gap-4">
						{Object.entries(choices).map(([key, value]) => (
							<Button key={key} onClick={() => onChoiceClick(value)}>
								{value.value}
							</Button>
						))}
					</div>
				)}
				{/* <Button onMouseUp={() => setDialog(dialog + 1)}>Change</Button> */}
			</div>

			{/* <Canvas>
				<directionalLight
					castShadow
					rotation={[42.2, -30.65, -24]}
					position={[2, 3, 0]}
					intensity={2}
					color={'#FFE396'}
					shadow-mapSize={[1024, 1024]}
					shadow-camera-near={1}
					shadow-camera-far={50}
					shadow-camera-top={50}
					shadow-camera-right={50}
					shadow-camera-bottom={-50}
					shadow-camera-left={-50}
				/>

				<OrbitControls />
				<ambientLight intensity={2} />

				<Environment
					background
					blur={0.05}
					files={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']}
					path="/sky/"
				/>

				<axesHelper />

				<BackDrop />

				<Sapidae />
			</Canvas> */}

			<ScreenSizeBreakpoint />
		</main>
	)
}

const variant: Variants = {
	hidden: {
		opacity: 0,
		rotate: -15,
		transition: {
			duration: 0.1,
		},
	},
	visible: {
		opacity: 1,
		rotate: 0,
	},
}

const Dialogue = ({ text }) => {
	return (
		<motion.div
			variants={variant}
			initial={'hidden'}
			animate={'visible'}
			exit={'hidden'}
			className="w-[200px] h-[50px] bg-red-300 origin-left"
		>
			<span>{text}</span>
		</motion.div>
	)
}

const BackDrop = () => {
	const ref = useRef<THREE.Mesh>(null)

	const backdrop = useTexture('/backdrop.png')

	backdrop.wrapS = THREE.RepeatWrapping
	backdrop.wrapT = THREE.RepeatWrapping
	backdrop.repeat.set(100, 100)

	useFrame((state, delta) => {
		if (!ref.current) return

		ref.current.material.map.offset.x += delta / 2
		ref.current.material.map.offset.y += delta / 2
	})

	return (
		<Billboard>
			<mesh ref={ref} position={[0, 0, -10]}>
				<planeGeometry args={[100, 100]} />
				<meshBasicMaterial map={backdrop} />
			</mesh>
		</Billboard>
	)
}
