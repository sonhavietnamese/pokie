import { useCatchAxieStore } from '@/features/catch-axie/catch-axie-store'
import { useCustomAvatarStore } from '@/features/custom-avatar/custom-avatar-store'
import { useNpcStore } from '@/features/npc/npc-store'
import { usePhoneStore } from '@/features/phone/phone-store'
import { usePokiedexStore } from '@/features/pokiedex/pokiedex-store'
import dynamic from 'next/dynamic'

const CharacterController = dynamic(() => import('@/features/movement/character-controller'))
const Sapidae = dynamic(() => import('@/features/movement/character'))

export default function Local() {
	const isPokiedexOpen = usePokiedexStore((s) => s.isOpen)
	const isCatchAxieOpen = useCatchAxieStore((s) => s.isOpen)
	const isCustomAvatarOpen = useCustomAvatarStore((s) => s.isOpenUI)
	const isPhoneOpen = usePhoneStore((s) => s.isOpen)
	const isTalking = useNpcStore((s) => s.isTalking)

	return (
		<CharacterController
			isTalkingToNpc={!!isTalking}
			camMaxDis={-10}
			camInitDis={isCustomAvatarOpen || isPhoneOpen ? -5 : isPokiedexOpen || isCatchAxieOpen ? -2 : -10}
			camInitDir={{ x: 0, y: Math.PI, z: 0 }}
			springK={2}
			dampingC={0.2}
			position={[-5, 5, -5]}
			autoBalanceSpringK={1.2}
			autoBalanceDampingC={0.04}
			autoBalanceSpringOnY={0.7}
			autoBalanceDampingOnY={0.05}
		>
			<Sapidae position={[0, -0.9, 0]} />
		</CharacterController>
	)
}
