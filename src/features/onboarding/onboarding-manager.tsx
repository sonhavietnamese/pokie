import { useStageStore } from '@/stores/stage'
import { useWalletgo } from '@roninnetwork/walletgo'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function OnboardingManager() {
	const { data, status } = useSession()
	const setStage = useStageStore((s) => s.setStage)
	const { walletProvider } = useWalletgo()

	useEffect(() => {
		if (status === 'loading') return

		if (data && walletProvider) {
			setStage('home')
		} else {
			setStage('onboarding')
		}
	}, [data, status, walletProvider])

	return null
}
