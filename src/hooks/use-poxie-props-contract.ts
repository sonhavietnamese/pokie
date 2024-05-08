import { abi } from '@/contracts/abis/poxie-props'
import { POKIEPROPS_ADDRESS, SKINS, TOOLS } from '@/libs/constants'
import { useWalletgo } from '@roninnetwork/walletgo'
import { type ethers, utils } from 'ethers'
import useContract from './use-contract'

export function usePoxiePropsContract() {
	const { account } = useWalletgo()
	const { loadContract } = useContract()

	const getBalances = async (type: 'skins' | 'tools' = 'skins') => {
		const contract = loadContract(POKIEPROPS_ADDRESS, abi)

		const addresses = Array(type === 'skins' ? 4 : 2)
			.fill(account)
			.map((add) => add)
		const ids = Array(type === 'skins' ? 4 : 2)
			.fill(0)
			.map((_, i) => i + 1 + (type === 'skins' ? 0 : 10))
		const balance = await contract.balanceOfBatch(addresses, ids)

		const formattedBalance = balance.map((b: ethers.BigNumber) => b.toNumber())
		const mappedTools: Record<string, number> = {}

		formattedBalance.forEach((tool: number, index: number) => {
			if (tool === 0) return
			if (type === 'skins') {
				mappedTools[SKINS[index + 1].toLowerCase()] = tool
			} else {
				mappedTools[TOOLS[index + 1 + 10].toLowerCase()] = tool
			}
		})

		return mappedTools
	}

	const mint = async (id: number, price: number) => {
		const contract = loadContract(POKIEPROPS_ADDRESS, abi)
		const mintTx = await contract.mint(id, utils.parseEther(price.toString()))

		return mintTx
	}

	return { getBalances, mint }
}
