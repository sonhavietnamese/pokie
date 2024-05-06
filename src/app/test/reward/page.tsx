'use client'

import Reward from '@/components/reward'
import { Sprite } from '@/components/ui/sprite'
import Vignette from '@/components/vignette'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { type Variants, motion } from 'framer-motion'

const itemVariants: Variants = {
	hidden: { opacity: 0, scale: 1.5 },
	visible: { opacity: 1, scale: 1 },
}

const itemTitleVariants: Variants = {
	hidden: { opacity: 0, y: 10 },
	visible: { opacity: 1, y: 0, transition: { delay: 1 } },
}

export default function Page() {
	return <Reward />
}
