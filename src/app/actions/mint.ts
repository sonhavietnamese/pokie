// @ts-ignore
// @ts-nocheck

'use server'

import { abi as poxieAxieAbi } from '@/contracts/abis/poxie-axie'
import { abi as poxiecoinAbi } from '@/contracts/abis/poxie-coin'
import { POKIEAXIE_ADDRESS, POKIECOIN_ADDRESS } from '@/libs/constants'
import { http, createWalletClient } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { saigon } from 'viem/chains'

export async function catchAxie(to: string, axieId: number) {
	const canCatch = true

	if (!canCatch) {
		return false
	}

	const client = createWalletClient({
		chain: saigon,
		transport: http(),
	})

	const account = privateKeyToAccount(process.env.POKIE_ADMIN_PRIVATE_KEY as `0x${string}`)

	try {
		const tx = await client.writeContract({
			account,
			address: POKIEAXIE_ADDRESS,
			abi: poxieAxieAbi,
			functionName: 'captureAxie',
			args: [to as `0x${string}`, axieId],
		})

		return tx
	} catch (error) {
		return false
	}
}

export async function mintPoxieCoin(to: string, amount: number) {
	const client = createWalletClient({
		chain: saigon,
		transport: http(),
	})

	const account = privateKeyToAccount(process.env.POKIE_ADMIN_PRIVATE_KEY as `0x${string}`)

	const tx = await client.writeContract({
		account,
		address: POKIECOIN_ADDRESS,
		abi: poxiecoinAbi,
		functionName: 'mint',
		args: [to as `0x${string}`, amount * 10 ** 18],
	})

	return tx
}
