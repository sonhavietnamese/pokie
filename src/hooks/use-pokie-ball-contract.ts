import { abi } from '@/contracts/abis/poxie-ball'
import { BALLS, POKIEBALL_ADDRESS } from '@/libs/constants'
import { useWalletgo } from '@roninnetwork/walletgo'
import type { ethers } from 'ethers'
import useContract from './use-contract'

export function usePoxieBallContract() {
	const { account } = useWalletgo()
	const { loadContract } = useContract()

	const getBalances = async () => {
		const contract = loadContract(POKIEBALL_ADDRESS, abi)

		const addresses = Array(9)
			.fill(account)
			.map((add) => add)

		const ids = Array(9)
			.fill(0)
			.map((_, i) => i + 1)

		const balance = await contract.balanceOfBatch(addresses, ids)
		const formattedBalance = balance.map((b: ethers.BigNumber) => b.toNumber())

		console.log('formattedBalance', formattedBalance)
		const mappedBall: Record<string, number> = {}

		formattedBalance.forEach((ball: number, index: number) => {
			if (ball === 0) return

			mappedBall[BALLS[index + 1].toLowerCase()] = ball
		})

		return mappedBall
	}

	const craft = async (id: number) => {
		const contract = loadContract(POKIEBALL_ADDRESS, abi)
		const tx = await contract.craft(id)

		return tx
	}

	const burn = async (id: number) => {
		const contract = loadContract(POKIEBALL_ADDRESS, abi)
		const tx = await contract['burn(uint256)'](id)

		return tx
	}

	return { getBalances, craft, burn }
}
