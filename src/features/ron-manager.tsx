import { RON_DECIMALS } from '@/libs/constants'
import { useStageStore } from '@/stores/stage'
import { useWalletgo } from '@roninnetwork/walletgo'
import { useEffect } from 'react'
import { useDialogueStore } from './dialogue/store'
import { useToastStore } from './toast/store'

export default function RonManager() {
	const [showDialogue, selectedDialogue, clear] = useDialogueStore((s) => [s.showDialogue, s.selectedDialogue, s.clear])
	const stage = useStageStore((s) => s.stage)
	const showToast = useToastStore((s) => s.showToast)
	const { walletProvider, account } = useWalletgo()

	useEffect(() => {
		const fetchRonBalance = async () => {
			if (document.visibilityState !== 'visible') return

			try {
				const balance = await walletProvider.getBalance(account)

				if (Number(balance) / RON_DECIMALS < 1e-2) {
					selectedDialogue !== 'ron_insufficient' && showDialogue('ron_insufficient', 'bottom')
				} else {
					selectedDialogue === 'ron_insufficient' && clear()
				}
			} catch (error) {
				showToast("Can't fetch RON balance.")
			}
		}

		stage === 'home' && walletProvider && fetchRonBalance()

		document.addEventListener('visibilitychange', fetchRonBalance)

		return () => {
			document.removeEventListener('visibilitychange', fetchRonBalance)
		}
	}, [account, walletProvider, stage, selectedDialogue])

	return null
}
