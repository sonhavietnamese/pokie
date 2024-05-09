import { usePokieAxie } from '@/features/pokie-axie/use-pokie-axie'
import { randFloat, randInt } from 'three/src/math/MathUtils'
import AxieAutoMove from './axie-auto-move'

export default function AxieManager() {
	const { data } = usePokieAxie()

	return (
		<>
			{data?.slice(0, 5).map((axie, index) => (
				<AxieAutoMove
					key={axie.tokenId}
					autoMove={randInt(0, 1) === 1}
					sprintMult={randFloat(1.5, 2.2)}
					position={[randInt(-20, 20), 3, randInt(-20, 20)]}
					axieId={axie.tokenId}
				/>
			))}
		</>
	)
}
