import { abi } from '@/contracts/abis/poxie-marketplace'
import useContract from '@/hooks/use-contract'
import { BALLS, POKIEBALL_ADDRESS, POKIEMARKETPLACE_ADDRESS } from '@/libs/constants'
import { ethers } from 'ethers'
import { capitalize } from 'lodash-es'

export function usePoxieMarketplaceContract() {
	const { loadContract } = useContract()

	const createMarketItem = async (tokenId: number) => {
		const contract = loadContract(POKIEMARKETPLACE_ADDRESS, abi)

		const transaction = await contract.createMarketItem(
			POKIEBALL_ADDRESS,
			tokenId,
			ethers.utils.parseUnits('5', 'ether'),
		)

		return transaction
	}

	const fetchMarketItems = async () => {
		const contract = loadContract(POKIEMARKETPLACE_ADDRESS, abi)
		const data = await contract.fetchMarketItems()

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const result = data.map((item: any) => {
			const price = ethers.utils.formatUnits(item.price.toString(), 'ether')
			const tokenId = item.tokenId.toNumber()
			const seller = item.seller
			const sold = item.sold
			const id = `balls-${item[0].toNumber()}`
			const name = capitalize(BALLS[Number(tokenId)])

			return { price, tokenId, seller, sold, id, name }
		})

		return result
	}

	const createMarketSale = async (itemId: number) => {
		console.log('itemId', Number(itemId))
		const contract = loadContract(POKIEMARKETPLACE_ADDRESS, abi)
		const transaction = await contract.createMarketSale(POKIEBALL_ADDRESS, Number(itemId))

		return transaction
	}

	return { createMarketItem, createMarketSale, fetchMarketItems }
}

// 0x58eb2df5000000000000000000000000833413e1c5e11c91f5e4bc3e426b082b7128406f00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000004563918244f40000
// 0x58eb2df5000000000000000000000000833413e1c5e11c91f5e4bc3e426b082b7128406f00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000004563918244f40000
