'use client'

import { Button } from '@/components/ui/button'
import NotificationManager from '@/features/notification/notification-manager'
import { useNotificationStore } from '@/features/notification/store'
import { useTipStore } from '@/features/tip/store'
import TipManager from '@/features/tip/tip-manager'
import { useToastStore } from '@/features/toast/store'
import ToastManager from '@/features/toast/toast-manager'

export default function Home() {
	const showTip = useTipStore((s) => s.showTip)
	const showNotification = useNotificationStore((s) => s.showNotification)
	const showToast = useToastStore((s) => s.showToast)

	return (
		<main className="relative flex h-screen w-screen items-center justify-center">
			<TipManager />
			<NotificationManager />
			<ToastManager />

			<Button onClick={() => showToast(`hello${Date.now()}`)}>
				<span className="">Showadasdasdaasd</span>
			</Button>
		</main>
	)
}
