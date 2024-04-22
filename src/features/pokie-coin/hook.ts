import { abi } from '@/contracts/abis/pokie-coin'
import useContract from '@/hooks/use-contract'
import { POKIECOIN_ADDRESS, POKIECOIN_DECIMALS } from '@/libs/constants'
import { useWalletgo } from '@roninnetwork/walletgo'
import { ethers } from 'ethers'
import { usePokieCoinBalanceStore } from './store'

export default function usePokieCoin() {
	const { loadContract } = useContract()
	const { walletProvider } = useWalletgo()
	const setBalance = usePokieCoinBalanceStore((s) => s.setBalance)

	const fetchBalances = async () => {
		const address = await walletProvider?.getSigner().getAddress()
		const contract = loadContract(POKIECOIN_ADDRESS, abi)

		const balance = await contract.balanceOf(address)

		console.log('balance', balance.toString())

		setBalance(balance / POKIECOIN_DECIMALS)

		console.log('balance', balance.toString())

		return balance
	}

	return { fetchBalances }
}
