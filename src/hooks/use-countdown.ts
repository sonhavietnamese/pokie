// @ts-nocheck

import { useCallback, useEffect, useRef, useState } from 'react'

interface Timer {
	started: number | null
	lastInterval: number | null
	timeLeft: number | null
	timeToCount: number | null
	requestId: number | null
}

export const useCountDown = (timeToCount = 60 * 1000, interval = 1000) => {
	const [timeLeft, setTimeLeft] = useState(0)
	const timer = useRef<Timer>({
		started: null,
		lastInterval: null,
		timeLeft: null,
		timeToCount: null,
		requestId: null,
	})
	const isRunning = useRef(false)
	const isEnd = useRef(false)

	const run = (ts: number) => {
		// if (!timer.current.lastInterval || !timer.current.timeToCount) return

		isRunning.current = true
		if (!timer.current.started) {
			timer.current.started = ts
			timer.current.lastInterval = ts
		}

		const localInterval = Math.min(interval, timer.current.timeLeft || Number.POSITIVE_INFINITY)

		if (ts - timer.current.lastInterval >= localInterval) {
			timer.current.lastInterval += localInterval
			setTimeLeft((timeLeft) => {
				timer.current.timeLeft = timeLeft - localInterval

				return timer.current.timeLeft
			})
		}

		if (ts - timer.current.started < timer.current.timeToCount) {
			timer.current.requestId = window.requestAnimationFrame(run)
		} else {
			timer.current = {
				started: null,
				lastInterval: null,
				timeLeft: null,
				timeToCount: null,
				requestId: null,
			}
			setTimeLeft(0)
			isEnd.current = true
			isRunning.current = false
		}
	}

	const start = useCallback((ttc: number) => {
		// if (!timer.current.requestId) return

		isEnd.current = false
		window.cancelAnimationFrame(timer.current.requestId)

		const newTimeToCount = ttc !== undefined ? ttc : timeToCount

		timer.current.started = null
		timer.current.lastInterval = null
		timer.current.timeToCount = newTimeToCount
		timer.current.requestId = window.requestAnimationFrame(run)

		setTimeLeft(newTimeToCount)
	}, [])

	const pause = useCallback(() => {
		if (!timer.current.requestId) return

		window.cancelAnimationFrame(timer.current.requestId)
		timer.current.started = null
		timer.current.lastInterval = null
		timer.current.timeToCount = timer.current.timeLeft

		isRunning.current = false
	}, [])

	const resume = useCallback(() => {
		if (!timer.current.started && timer.current.timeLeft > 0) {
			window.cancelAnimationFrame(timer.current.requestId)
			timer.current.requestId = window.requestAnimationFrame(run)
		}
	}, [])

	const reset = useCallback(() => {
		if (timer.current.timeLeft && timer.current.requestId) {
			window.cancelAnimationFrame(timer.current.requestId)
			timer.current = {
				started: null,
				lastInterval: null,
				timeLeft: null,
				timeToCount: null,
				requestId: null,
			}
			setTimeLeft(0)
		}
		isRunning.current = false
		isEnd.current = true
	}, [])

	useEffect(() => {
		return () => window.cancelAnimationFrame(timer.current.requestId)
	}, [])

	return [timeLeft, { start, pause, resume, reset, isRunning: isRunning.current, isEnd: isEnd.current }] as const
}
