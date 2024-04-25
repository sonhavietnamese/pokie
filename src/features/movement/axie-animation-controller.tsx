import { useEffect } from 'react'
import MonsterFollow from './auto-move'

export default function AxieAnimationController() {
	useEffect(() => {}, [])

	return (
		<>
			<MonsterFollow
				followCharacter={false}
				springK={2}
				dampingC={0.2}
				autoBalanceSpringK={1.2}
				autoBalanceDampingC={0.04}
				autoBalanceSpringOnY={0.7}
				autoBalanceDampingOnY={0.05}
			/>
		</>
	)
}
