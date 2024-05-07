import { abi } from '@/contracts/abis/poxie-coin'
import useContract from '@/hooks/use-contract'
import { POKIECOIN_ADDRESS, POKIECOIN_DECIMALS } from '@/libs/constants'
import { useWalletgo } from '@roninnetwork/walletgo'
import { utils } from 'ethers'
import { usePokieCoinBalanceStore } from './poxie-coin-store'

export default function usePokieCoin() {
	const { loadContract } = useContract()
	const { walletProvider } = useWalletgo()
	const setBalance = usePokieCoinBalanceStore((s) => s.setBalance)

	const fetchBalances = async () => {
		if (!walletProvider) return

		const address = await walletProvider.getSigner().getAddress()
		const contract = loadContract(POKIECOIN_ADDRESS, abi)
		const balance = await contract.balanceOf(address)

		setBalance(balance / POKIECOIN_DECIMALS)

		return balance
	}

	const approve = async (address: string, amount: number) => {
		const contract = await loadContract(POKIECOIN_ADDRESS, abi)
		const tx = await contract.approve(address, utils.parseEther(amount.toString()))

		return tx
	}

	return { fetchBalances, approve }
}
