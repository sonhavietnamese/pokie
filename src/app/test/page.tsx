'use client'

import { Button } from '@/components/ui/button'
import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_ELEMENT } from '@/configs/spritesheet'
import NotificationManager from '@/features/notification/notification-manager'
import { useNotificationStore } from '@/features/notification/store'
import { useTipStore } from '@/features/tip/store'
import TipManager from '@/features/tip/tip-manager'

export default function Home() {
	const showTip = useTipStore((s) => s.showTip)
	const showNotification = useNotificationStore((s) => s.showNotification)

	return (
		<main className="relative flex h-screen w-screen items-center justify-center">
			<TipManager />
			<NotificationManager />

			<Button onClick={() => showNotification(`hello${Date.now()}`)}>
				<span className="">Showadasdasdaasd</span>
			</Button>
		</main>
	)
}
