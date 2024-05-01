import { useStageStore } from '@/stores/stage'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function OnboardingManager() {
	const { data, status } = useSession()
	const setStage = useStageStore((s) => s.setStage)

	useEffect(() => {
		if (status === 'loading') return

		if (data) {
			setStage('home')
		} else {
			setStage('onboarding')
		}
	}, [status])

	return null
}
