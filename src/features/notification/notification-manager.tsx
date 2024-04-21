'use client'

import { Notification } from '@/components/ui/notification'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useNotificationStore } from './store'

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
		<section className="absolute top-10">
			<AnimatePresence mode="wait">
				{notifications && (
					<Notification key={notifications.id}>
						<span>{notifications.content}</span>
					</Notification>
				)}
			</AnimatePresence>
		</section>
	)
}
