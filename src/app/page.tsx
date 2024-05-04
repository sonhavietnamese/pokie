'use client'

import GuideLineDisableButton from '@/features/guide-line/guide-line-disable-button'
import { KEYBOARD_MAP } from '@/libs/constants'
import { useStageStore } from '@/stores/stage'
import { KeyboardControls, View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { type MutableRefObject, Suspense, useRef } from 'react'
import * as THREE from 'three'

const Home = dynamic(() => import('@/scenes/home'), { ssr: false })
const Avatar = dynamic(() => import('@/components/avatar'), { ssr: false })
const Energy = dynamic(() => import('@/features/energy-system/energy'), { ssr: false })
const Pokiedex = dynamic(() => import('@/features/pokiedex/pokiedex'), { ssr: false })
const Vignette = dynamic(() => import('@/components/vignette'), { ssr: false })
const RonManager = dynamic(() => import('@/features/ron-manager'), { ssr: false })
const TipManager = dynamic(() => import('@/features/tip/tip-manager'), { ssr: false })
const Onboarding = dynamic(() => import('@/scenes/onboarding'), { ssr: false })
const LogoutButton = dynamic(() => import('@/features/user/logout-button'), { ssr: false })
const ToastManager = dynamic(() => import('@/features/toast/toast-manager'), { ssr: false })
const QuestManager = dynamic(() => import('@/features/quest/quest-manager'), { ssr: false })
const CatchAxieAim = dynamic(() => import('@/features/catch-axie/catch-axie-aim'), { ssr: false })
const DialogueSystem = dynamic(() => import('@/features/dialogue/dialogue-system'), { ssr: false })
const ShortcutManager = dynamic(() => import('@/features/shortcut/shortcut-manager'), { ssr: false })
const PokieCoinBalance = dynamic(() => import('@/features/pokie-coin/balance'), { ssr: false })
const AnimationManager = dynamic(() => import('@/features/axie/animation-manager'), { ssr: false })
const OnboardingManager = dynamic(() => import('@/features/onboarding/onboarding-manager'), { ssr: false })
const MovementInstructions = dynamic(() => import('@/components/movement-instructions'), { ssr: false })
const CustomAvatarSelectSkin = dynamic(() => import('@/features/custom-avatar/select-skin'), { ssr: false })
const PhoneCase = dynamic(() => import('@/features/phone/phone-case'), { ssr: false })

export default function Page() {
	const ref = useRef<HTMLDivElement>(null)
	const stage = useStageStore((s) => s.stage)

	return (
		<>
			<main ref={ref} className="relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden">
				<Suspense fallback={<span className="text-white">loading</span>}>
					<OnboardingManager />
					<AnimationManager />

					{/* <Vignette /> */}
					<DialogueSystem />
					<ToastManager />

					<KeyboardControls map={KEYBOARD_MAP}>
						<ShortcutManager />

						<Pokiedex>
							<Canvas
								className="absolute inset-0 z-0 h-screen w-screen"
								dpr={0.75}
								shadows={{
									enabled: true,
									type: THREE.PCFShadowMap,
								}}
								gl={{
									outputColorSpace: THREE.SRGBColorSpace,
									toneMapping: THREE.ACESFilmicToneMapping,
								}}
								camera={{
									fov: 40,
									near: 0.1,
									far: 200,
								}}
								eventSource={ref as MutableRefObject<HTMLElement>}
							>
								<View.Port />
							</Canvas>

							<View index={1} className="absolute inset-0 z-0 h-screen w-screen">
								{stage === 'home' && <Home />}
								{stage === 'onboarding' && <Onboarding />}
							</View>

							{stage === 'home' && (
								<Suspense fallback={<span>loading...</span>}>
									<div className="absolute top-8 right-6 flex gap-4">
										<Energy />
										<PokieCoinBalance />
									</div>

									<Avatar />
									<LogoutButton />
									<MovementInstructions />
									<CustomAvatarSelectSkin />

									<GuideLineDisableButton />

									<QuestManager />

									<RonManager />
									<TipManager />
									<CatchAxieAim />

									<PhoneCase />
								</Suspense>
							)}

							{stage === 'onboarding' && (
								<div className="absolute bottom-0 h-[300px] w-screen bg-gradient-to-b from-[#f6f6f600] to-[#A9BAD2]" />
							)}
						</Pokiedex>
					</KeyboardControls>
				</Suspense>
			</main>
		</>
	)
}
