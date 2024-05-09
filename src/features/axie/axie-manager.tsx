import { usePokieAxie } from '@/features/pokie-axie/use-pokie-axie'
import AxieAutoMove from './axie-auto-move'

export default function AxieManager() {
	const { data } = usePokieAxie()

	return (
		<>
			{data?.map((axie, index) => (
				<AxieAutoMove
					key={axie.tokenId}
					autoMove={false}
					sprintMult={2.2}
					position={[5 + index, 3, 0]}
					axieId={axie.tokenId}
				/>
			))}
		</>
	)
}
