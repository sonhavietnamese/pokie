import { craftBall } from '@/app/actions/craft-ball'
import { useSession } from 'next-auth/react'

export function useBlacksmith() {
	const { data } = useSession()

	const craft = async (ball: string) => {
		if (!data) return
		await craftBall(data.user.id, ball)
	}

	return { craft }
}
