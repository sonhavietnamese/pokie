import { abi } from '@/contracts/abis/poxie-marketplace'
import { POKIEBALL_ADDRESS, POKIEMARKETPLACE_ADDRESS } from '@/libs/constants'
import { useWalletgo } from '@roninnetwork/walletgo'
import { ethers } from 'ethers'

export function usePokieMarketplaceContract() {
	const { walletProvider } = useWalletgo()

	const loadContract = async (address: string, abi: any) => {
		if (!walletProvider) {
			throw new Error('Walletgo provider not found')
		}

		const contract = new ethers.Contract(address, abi, walletProvider.getSigner() as any)

		return contract
	}

	const createMarketItem = async (tokenId: string) => {
		const contract = await loadContract(POKIEMARKETPLACE_ADDRESS, abi)
		const transaction = await contract.createMarketItem(
			POKIEBALL_ADDRESS,
			tokenId,
			ethers.utils.parseUnits('5', 'ether'),
		)

		return transaction
	}

	const fetchMarketItems = async () => {
		const contract = await loadContract(POKIEMARKETPLACE_ADDRESS, abi)
		const data = await contract.fetchMarketItems()

		const result = data.map((item: any) => {
			const price = ethers.utils.formatUnits(item.price.toString(), 'ether')
			const tokenId = item.tokenId.toNumber()
			const seller = item.seller
			const sold = item.sold
			const id = item[0].toNumber()

			return { price, tokenId, seller, sold, id }
		})

		return result

		// return null
	}

	const createMarketSale = async (itemId: any) => {
		const contract = await loadContract(POKIEMARKETPLACE_ADDRESS, abi)

		const transaction = await contract.createMarketSale(POKIEBALL_ADDRESS, itemId, {})

		return transaction
	}

	return { createMarketItem, createMarketSale, fetchMarketItems }
}
