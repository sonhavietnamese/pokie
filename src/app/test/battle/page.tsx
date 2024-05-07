'use client'

import dynamic from 'next/dynamic'

const BattleScene = dynamic(() => import('@/scenes/battle'))

export default function Page() {
	return <BattleScene />
}
