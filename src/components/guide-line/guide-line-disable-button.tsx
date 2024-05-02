import React from 'react'
import { useGuideLineStore } from './guide-line-store'

export default function GuideLineDisableButton() {
	const setEnable = useGuideLineStore((s) => s.setEnable)

	return (
		<button type="button" onClick={() => setEnable(false)}>
			<span>Disable</span>
		</button>
	)
}
