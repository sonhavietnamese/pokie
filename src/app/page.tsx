'use client'

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
const PhoneCase = dynamic(() => import('@/features/phone/phone-case'), { ssr: false })
const RonManager = dynamic(() => import('@/features/ron-manager'), { ssr: false })
const TipManager = dynamic(() => import('@/features/tip/tip-manager'), { ssr: false })
const Onboarding = dynamic(() => import('@/scenes/onboarding'), { ssr: false })
const BattleScene = dynamic(() => import('@/scenes/battle'), { ssr: false })
const LogoutButton = dynamic(() => import('@/features/user/logout-button'), { ssr: false })
const ToastManager = dynamic(() => import('@/features/toast/toast-manager'), { ssr: false })
const QuestManager = dynamic(() => import('@/features/quest/quest-manager'), { ssr: false })
const CatchAxieAim = dynamic(() => import('@/features/catch-axie/catch-axie-aim'), { ssr: false })
const DialogueSystem = dynamic(() => import('@/features/dialogue/dialogue-system'), { ssr: false })
const ShortcutManager = dynamic(() => import('@/features/shortcut/shortcut-manager'), { ssr: false })
const PokieCoinBalance = dynamic(() => import('@/features/poxie-coin/balance'), { ssr: false })
const AnimationManager = dynamic(() => import('@/features/axie/animation-manager'), { ssr: false })
const OnboardingManager = dynamic(() => import('@/features/onboarding/onboarding-manager'), { ssr: false })
const MovementInstructions = dynamic(() => import('@/components/movement-instructions'), { ssr: false })
const CustomAvatarSelectSkin = dynamic(() => import('@/features/custom-avatar/select-skin'), { ssr: false })
const BattleSystem = dynamic(() => import('@/features/battle/battle-system'), { ssr: false })
const NotificationManager = dynamic(() => import('@/features/notification/notification-manager'), { ssr: false })

const PhoneOpenButton = dynamic(() => import('@/features/phone/phone-open-button'))
const NpcOpenChatButton = dynamic(() => import('@/features/npc/npc-open-chat-button'))
const PokiedexOpenButton = dynamic(() => import('@/features/pokiedex/pokiedex-open-button'))
const CatchAxieOpenButton = dynamic(() => import('@/features/catch-axie/catch-axie-open-button'))
const CustomAvatarOpenButton = dynamic(() => import('@/features/custom-avatar/custom-avatar-open-button'))
const GuideLineDisableButton = dynamic(() => import('@/features/guide-line/guide-line-disable-button'))
const BackpackOpenButton = dynamic(() => import('@/features/backpack/backpack-open-button'))
const MarketplaceOpenButton = dynamic(() => import('@/features/marketplace/marketplace-open-button'))

const Backpack = dynamic(() => import('@/features/backpack/backpack'))
const Marketplace = dynamic(() => import('@/features/marketplace/marketplace'))
const Blacksmith = dynamic(() => import('@/features/blacksmith/blacksmith'))

export default function Page() {
	const ref = useRef<HTMLDivElement>(null)
	const stage = useStageStore((s) => s.stage)

	return (
		<>
			<main ref={ref} className="relative h-screen w-screen items-center justify-center overflow-hidden">
				<Suspense fallback={<span>Loading...</span>}>
					<OnboardingManager />
					<AnimationManager />

					<DialogueSystem />
					<ToastManager />
					<NotificationManager />

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
								<Suspense fallback={null}>
									<View.Port />
								</Suspense>
							</Canvas>
							{stage === 'home' && (
								<View index={1} className="absolute inset-0 z-0 h-screen w-screen overflow-hidden">
									<Home />
								</View>
							)}
							{stage === 'onboarding' && (
								<View index={5} className="absolute inset-0 z-0 h-screen w-screen overflow-hidden">
									<Onboarding />
								</View>
							)}

							{stage === 'battle' && (
								<View index={4} className="absolute inset-0 z-0 h-screen w-screen overflow-hidden">
									<BattleScene />
								</View>
							)}

							{stage === 'home' && (
								<>
									<aside className="absolute top-8 right-6 flex gap-4">
										<Energy />
										<PokieCoinBalance />
									</aside>

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
									<Backpack />
									<Marketplace />
									<Blacksmith />

									<aside className="-translate-y-1/2 absolute top-1/2 right-6 flex flex-col gap-2">
										<BackpackOpenButton />
										<CustomAvatarOpenButton />
										<CatchAxieOpenButton />
										<PokiedexOpenButton />
										<PhoneOpenButton />
										<MarketplaceOpenButton />
									</aside>

									<NpcOpenChatButton />
								</>
							)}

							{stage === 'onboarding' && (
								<div className="absolute bottom-0 h-[300px] w-screen bg-gradient-to-b from-[#f6f6f600] to-[#A9BAD2]" />
							)}
						</Pokiedex>
					</KeyboardControls>
					{stage === 'battle' && <BattleSystem />}
				</Suspense>
			</main>
		</>
	)
}
