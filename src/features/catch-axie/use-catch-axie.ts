import { catchAxie } from '@/app/actions/mint'

export default function useCatchAxie() {
	const capture = async (address: string, axieId: number) => {
		const tx = await catchAxie(address, axieId)

		console.log(tx)

		return tx
	}

	return { capture }
}
