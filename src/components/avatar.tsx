'use client'

import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { useToastStore } from '@/features/toast/store'
import { trimWallet } from '@/libs/utils'
import { OrthographicCamera, View } from '@react-three/drei'
import { useWalletgo } from '@roninnetwork/walletgo'
import { Squircle } from '@squircle-js/react'
import dynamic from 'next/dynamic'
import { useCopyToClipboard } from 'react-use'
import Sapidae from './sapidae/sapidae'
import { Sprite } from './ui/sprite'

const Backdrop = dynamic(() => import('@/components/backdrop'))

export default function Avatar() {
	const { account } = useWalletgo()
	const [state, copy] = useCopyToClipboard()

	const showToast = useToastStore((s) => s.showToast)

	const handleCopy = () => {
		copy(account ?? '')
		showToast('Copied address!')
	}

	return (
		<>
			<div className="absolute top-[90px] left-[90px] z-[2]">
				<div className="relative flex h-full w-fit items-center justify-center">
					<Squircle
						className="absolute h-[120px] w-[120px] border-[#719BDE] border-[10px] shadow-md"
						cornerRadius={32}
						cornerSmoothing={1}
					/>

					<div className="absolute bottom-[-70px]">
						<div role="button" className={'relative flex items-center justify-center p-1 px-7'}>
							<Sprite
								data={{
									part: '3',
									l: SPRITESHEET_DATA.frames['badge-01-l.png'].frame,
									m: SPRITESHEET_DATA.frames['badge-01-m.png'].frame,
									r: SPRITESHEET_DATA.frames['badge-01-r.png'].frame,
								}}
								className="absolute top-0 left-0 z-[0] h-full w-full"
							/>

							<span className="z-[1]">{trimWallet(account ?? '', 3)}</span>
						</div>
					</div>

					<button type="button" className="-right-[70px] -top-[50px] absolute rounded-full" onMouseUp={handleCopy}>
						<Sprite
							data={{ part: '1', m: SPRITESHEET_DATA.frames['btn-copy-01.png'].frame }}
							className="h-[30px] w-[30px]"
						/>
					</button>
				</div>
			</div>

			<View index={2} className="absolute top-10 left-10 z-[2] h-[100px] w-[100px] overflow-hidden">
				<OrthographicCamera makeDefault position={[0, 0, 5]} zoom={64} />
				<ambientLight intensity={4} />

				<Sapidae animation="idle-00" position={[0.02, -1.6, 0]} rotation={[0, 0.5, 0]} />
				<Backdrop position={[0, 0, -20]} />
			</View>
		</>
	)
}
