import type { SearchAxieResponse } from '@/features/axie/type'
import { AXIE_ADDRESS, POKIEAXIE_ADDRESS } from '@/libs/constants'
import useSWR, { type Fetcher } from 'swr'

const fetcher: Fetcher<SearchAxieResponse, string> = (url: string) =>
	fetch(url, {
		method: 'POST',
		body: JSON.stringify({
			ownerAddress: POKIEAXIE_ADDRESS,
			contractAddresses: [AXIE_ADDRESS],
		}),
	}).then((res) => res.json())

export function usePokieAxie() {
	const { data, isLoading } = useSWR('https://skynet-test.skymavis.one/ronin/nfts/search', fetcher)

	return { data: data?.result.items, isLoading }
}
