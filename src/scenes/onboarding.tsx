import type { SapidaeAnimation } from '@/components/sapidae/type'
import { useDialogueStore } from '@/features/dialogue/store'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { useWalletgo } from '@roninnetwork/walletgo'
import { signIn } from 'next-auth/react'
import dynamic from 'next/dynamic'
import React, { useEffect, useMemo } from 'react'

const Sapidae = dynamic(() => import('@/components/sapidae/sapidae'), { ssr: false })
const Backdrop = dynamic(() => import('@/components/backdrop'), { ssr: false })

export default function Onboarding() {
	const [showDialogue, subDialogue, setSubDialogue, topDialogues] = useDialogueStore((s) => [
		s.showDialogue,
		s.subDialogue,
		s.setSubDialogue,
		s.topDialogues,
	])
	const { walletProvider, account } = useWalletgo()
	const animation = useMemo<SapidaeAnimation>(() => {
		if (!subDialogue?.before) return 'idle-00'

		if (subDialogue.before[0].action === 'EMOTE')
			return subDialogue.before[0].opts ? (subDialogue.before[0].opts[0] as SapidaeAnimation) : 'idle-00'

		return 'idle-00'
	}, [subDialogue])

	useEffect(() => {
		showDialogue('onboarding', 'top')
	}, [])

	useEffect(() => {
		const login = async () => {
			try {
				await signIn('credentials', {
					wallet: account,
					redirect: false,
				})
			} catch (error) {
				console.log(error)
				throw error
			}
		}

		if (walletProvider) {
			login()
			setSubDialogue(topDialogues.hello_06)
		}
	}, [walletProvider])

	return (
		<>
			<PerspectiveCamera makeDefault position={[0, 1.4, 5]} />
			<directionalLight
				castShadow
				rotation={[42.2, -30.65, -24]}
				position={[2, 3, 0]}
				intensity={2}
				color={'#FFE396'}
				shadow-mapSize={[1024, 1024]}
				shadow-camera-near={1}
				shadow-camera-far={50}
				shadow-camera-top={50}
				shadow-camera-right={50}
				shadow-camera-bottom={-50}
				shadow-camera-left={-50}
			/>
			<ambientLight intensity={2.5} />

			<Environment
				background
				blur={0.05}
				files={['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']}
				path="/sky/"
			/>

			<Sapidae animation={animation} />
			<Backdrop position={[0, 0, -2]} />
		</>
	)
}
