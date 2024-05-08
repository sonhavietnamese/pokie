'use client'

import { Notification } from '@/components/ui/notification'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useNotificationStore } from './notification-store'

export default function NotificationManager() {
	const notifications = useNotificationStore((state) => state.notifications)
	const timeout = useRef<NodeJS.Timeout>()

	useEffect(() => {
		if (notifications) {
			timeout.current = setTimeout(() => {
				useNotificationStore.setState({ notifications: null })

				clearTimeout(timeout.current)
			}, 3000)
		}

		return () => {
			clearTimeout(timeout.current)
		}
	}, [notifications])

	return (
		<section className="absolute top-16 z-10 flex w-full items-center justify-center">
			<AnimatePresence>
				{notifications && (
					<Notification key={notifications.id}>
						<span className="font-extrabold text-2xl text-[#ffffff] tracking-wide">{notifications.content}</span>
					</Notification>
				)}
			</AnimatePresence>
		</section>
	)
}
