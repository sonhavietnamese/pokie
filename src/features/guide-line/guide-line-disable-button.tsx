import { Button } from '@/components/ui/button'
import React from 'react'
import { useGuideLineStore } from './guide-line-store'

export default function GuideLineDisableButton() {
	const [target, setTarget] = useGuideLineStore((s) => [s.target, s.setTarget])

	return (
		<>
			{target && (
				<button className="absolute top-1/2 left-6 z-[3]" type="button" onClick={() => setTarget(null)}>
					<Button>
						<span>Disable</span>
					</Button>
				</button>
			)}
		</>
	)
}
