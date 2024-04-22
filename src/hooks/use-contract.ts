import { useWalletgo } from '@roninnetwork/walletgo'
import { type ContractInterface, ethers } from 'ethers'

export default function useContract() {
	const { walletProvider } = useWalletgo()

	const loadContract = (address: string, abi: ContractInterface) => {
		const contract = new ethers.Contract(address, abi, walletProvider?.getSigner())

		return contract
	}

	return {
		loadContract,
	}
}
