import { SPRITESHEET_ICON } from '@/configs/spritesheet'
import { useToastStore } from '@/features/toast/store'
import { useSession } from 'next-auth/react'
import { useCopyToClipboard } from 'react-use'
import { Sprite } from './ui/sprite'

export default function Avatar() {
	const { data } = useSession()
	const [_, copyToClipboard] = useCopyToClipboard()

	const showToast = useToastStore((s) => s.showToast)

	const copyAddress = async () => {
		if (data?.user?.wallet) {
			copyToClipboard(data.user.wallet.toLowerCase())

			showToast('Copied wallet address!')

			return
		}
	}

	const avatarImg = SPRITESHEET_ICON.frames['avatar-paladinlll.png'].frame
	const copyIcon = SPRITESHEET_ICON.frames['btn-copy-01.png'].frame

	return (
		<div className="relative flex items-center justify-center rounded-full">
			<div className="aspect-square w-[90px] overflow-hidden rounded-full border-[4px]">
				<Sprite data={{ part: '1', m: avatarImg }} className="h-full w-full" />
			</div>
			<button type="button" className="-right-2 absolute top-1 rounded-full" onClick={copyAddress}>
				<Sprite data={{ part: '1', m: copyIcon }} className="h-[30px] w-[30px]" />
			</button>
		</div>
	)
}
