'use client'

import { SPRITESHEET_ICON } from '@/configs/spritesheet'
import { Sapidae } from '@/features/movement/character'
import { OrthographicCamera, View } from '@react-three/drei'
import { Squircle } from '@squircle-js/react'
import dynamic from 'next/dynamic'
import React from 'react'
import { Sprite } from './ui/sprite'

const Backdrop = dynamic(() => import('@/components/backdrop'))

export default function Avatar() {
	return (
		<>
			<div className="absolute top-[90px] left-[90px] z-[2]">
				<div className="relative flex h-full w-fit items-center justify-center">
					<Squircle
						className="absolute h-[120px] w-[120px] border-[#719BDE] border-[10px] shadow-md"
						cornerRadius={32}
						cornerSmoothing={1}
					/>

					<Squircle className="-bottom-[70px] absolute" cornerRadius={32} cornerSmoothing={1}>
						<div className="bg-red-400 px-2">
							<span>HHHHHHHHHH</span>
						</div>
					</Squircle>

					<button type="button" className="-right-[70px] -top-[50px] absolute rounded-full" onClick={() => {}}>
						<Sprite
							data={{ part: '1', m: SPRITESHEET_ICON.frames['btn-copy-01.png'].frame }}
							className="h-[30px] w-[30px]"
						/>
					</button>
				</div>
			</div>

			<View index={2} className="absolute top-10 left-10 z-[2] h-[100px] w-[100px] overflow-hidden">
				<OrthographicCamera makeDefault position={[0, 0, 5]} zoom={64} />
				<ambientLight intensity={4} />

				<Sapidae position={[0.02, -1.6, 0]} rotation={[0, 0.5, 0]} />
				<Backdrop position={[0, 0, -20]} />
			</View>
		</>
	)
}
