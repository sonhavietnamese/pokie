import { Sprite } from '@/components/ui/sprite'
import { SPRITESHEET_DATA } from '@/configs/spritesheet'
import { motion } from 'framer-motion'
import { useBattle } from './use-battle'

type BattleHeaderProps = {
	timer: string
	round: number
}

export default function BattleHeader({ timer, round }: BattleHeaderProps) {
	const { players } = useBattle()

	return (
		<motion.div className="absolute top-0 left-0 z-[2] flex w-full items-center justify-between p-4 px-8">
			<div className="flex h-full w-full items-center justify-between">
				<div className="flex items-center gap-4">
					<div className="flex flex-col items-start gap-1">
						<div>
							<span className="ml-2 font-extrabold text-3xl text-[#FFF0C7] outline-green">You</span>
						</div>
						<div className="relative h-9 w-[450px]">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['battle-health-frame.png'].frame,
								}}
								className="h-full w-full origin-left object-contain"
							/>
							<div className="absolute inset-0 z-[11] h-full w-full origin-left overflow-hidden p-1.5 px-2">
								{players && (
									<>
										{players?.player.health > 75 ? (
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['battle-health-100.png'].frame,
												}}
												className="h-full w-[100%]"
											/>
										) : players?.player.health > 50 ? (
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['battle-health-75.png'].frame,
												}}
												className="h-full w-[70%]"
											/>
										) : players?.player.health > 25 ? (
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['battle-health-50.png'].frame,
												}}
												className="h-full w-[50%]"
											/>
										) : players?.player.health > 10 ? (
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['battle-health-25.png'].frame,
												}}
												className="h-full w-[25%]"
											/>
										) : (
											<></>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</div>

				<div className="relative mt-5 w-auto">
					<div className="absolute top-0 left-0 z-10 flex h-full w-full flex-col items-center">
						<span className="mt-4 font-black text-2xl text-[#FEF1C6]">Round {round}</span>
						<div className="-mt-3 flex items-center justify-center gap-1">
							{timer !== '-' && (
								<Sprite
									data={{
										part: '1',
										m: SPRITESHEET_DATA.frames['icon-clock.png'].frame,
									}}
									className="mt-1 h-8 w-8"
								/>
							)}

							<span className="w-16 text-center text-[46px] text-white outline-primary-medium">{timer}</span>
						</div>
					</div>

					<div className="h-28 w-[250px]">
						<Sprite
							data={{
								part: '3',
								l: SPRITESHEET_DATA.frames['badge-02-l.png'].frame,
								m: SPRITESHEET_DATA.frames['badge-02-m.png'].frame,
								r: SPRITESHEET_DATA.frames['badge-02-r.png'].frame,
							}}
							className="h-full w-full"
						/>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<div className="flex flex-col items-end gap-1">
						<div>
							<span className="mr-2 font-extrabold text-3xl text-[#FFF0C7] outline-green">Bimy</span>
						</div>

						<div className="relative h-9 w-[450px] scale-x-[-1]">
							<Sprite
								data={{
									part: '1',
									m: SPRITESHEET_DATA.frames['battle-health-frame.png'].frame,
								}}
								className="h-full w-full origin-left object-contain"
							/>
							<div className="absolute inset-0 z-[11] h-full w-full origin-left overflow-hidden p-1.5 px-2">
								{players && (
									<>
										{players?.bot.health > 75 ? (
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['battle-health-100.png'].frame,
												}}
												className="h-full w-[100%]"
											/>
										) : players?.bot.health > 50 ? (
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['battle-health-75.png'].frame,
												}}
												className="h-full w-[70%]"
											/>
										) : players?.bot.health > 25 ? (
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['battle-health-50.png'].frame,
												}}
												className="h-full w-[50%]"
											/>
										) : players?.bot.health > 10 ? (
											<Sprite
												data={{
													part: '1',
													m: SPRITESHEET_DATA.frames['battle-health-25.png'].frame,
												}}
												className="h-full w-[25%]"
											/>
										) : (
											<></>
										)}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	)
}
