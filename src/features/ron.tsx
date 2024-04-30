import { RON_DECIMALS } from '@/libs/constants'
import { useWalletgo } from '@roninnetwork/walletgo'
import { useEffect } from 'react'
import { useDialogueStore } from './dialogue/store'
import type { Dialogue, DialogueNode } from './dialogue/type'
import { useToastStore } from './toast/store'

export default function RonManager() {
	const [setBottomDialogues, setSubDialogue, data] = useDialogueStore((s) => [
		s.setBottomDialogues,
		s.setSubDialogue,
		s.data,
	])
	const showToast = useToastStore((s) => s.showToast)
	const { walletProvider, account } = useWalletgo()

	useEffect(() => {
		const fetchRonBalance = async () => {
			if (!account) {
				// showToast("Wallet not connected. Can't fetch RON balance.")

				return
			}

			try {
				const balance = await walletProvider.getBalance(account)

				if (Number(balance) / RON_DECIMALS < 1e-3) {
					setBottomDialogues(data.ron_insufficient as unknown as Dialogue)
					setSubDialogue(
						(data.ron_insufficient as unknown as Dialogue)[data.ron_insufficient._entry] as unknown as DialogueNode,
					)
				}
			} catch (error) {
				showToast("Can't fetch RON balance.")
			}
		}

		fetchRonBalance()
	}, [account, walletProvider])

	return null
}
