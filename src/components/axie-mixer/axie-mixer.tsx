'use client'

import { type AxieParts, useAxieStore } from '@/features/axie/axie-store'
import { useEffect, useState } from 'react'
import { AXIE_COLORS_MAP, AXIE_PARTS_MAP } from './constants'
import Mixer from './mixer'
import type { AxieAnimation, BodyShape } from './types'

interface AxieMixerProps {
	axieId?: string
	animation: AxieAnimation
}

export const fetcher = (url: string, axieId: string) =>
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-API-Key': process.env.NEXT_PUBLIC_DEV_PORTAL_API_KEY as string,
		},
		body: JSON.stringify({
			query: `query AxieQuery {
              axie(axieId: "${axieId}") {
                bodyShape
                primaryColor
                parts {
                  id
                }
                class
                id
              }
            }`,
		}),
	}).then((res) => res.json())

export default function AxieMixer({ axieId = '123', animation }: AxieMixerProps) {
	const addAxie = useAxieStore((s) => s.addAxie)

	const [parts, setParts] = useState<AxieParts[]>([])

	console.log('parts', axieId)

	useEffect(() => {
		const handle = async () => {
			const res = await fetch('https://api-gateway.skymavis.com/graphql/marketplace', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-API-Key': process.env.NEXT_PUBLIC_DEV_PORTAL_API_KEY as string,
				},
				body: JSON.stringify({
					query: `query AxieQuery {
                  axie(axieId: "${axieId}") {
                    bodyShape
                    primaryColor
                    parts {
                      id
                    }
                    class
                    id
                  }
                }`,
				}),
			})

			const data = await res.json()

			if (!data) return

			const axie = data.data.axie

			const selectedAxieParts: AxieParts[] = []

			const parts = {
				bodyShape: axie.bodyShape.toLowerCase() as BodyShape,
				parts: {
					eyes: {
						id: AXIE_PARTS_MAP[axie.parts[0].id.split('-').slice(1).join('-')],
						name: axie.parts[0].id.split('-').slice(1).join('-'),
					},
					ears: {
						id: AXIE_PARTS_MAP[axie.parts[1].id.split('-').slice(1).join('-')],
						name: axie.parts[1].id.split('-').slice(1).join('-'),
					},
					back: {
						id: AXIE_PARTS_MAP[axie.parts[2].id.split('-').slice(1).join('-')],
						name: axie.parts[2].id.split('-').slice(1).join('-'),
					},
					mouth: {
						id: AXIE_PARTS_MAP[axie.parts[3].id.split('-').slice(1).join('-')],
						name: axie.parts[3].id.split('-').slice(1).join('-'),
					},
					horn: {
						id: AXIE_PARTS_MAP[axie.parts[4].id.split('-').slice(1).join('-')],
						name: axie.parts[4].id.split('-').slice(1).join('-'),
					},
					tail: {
						id: AXIE_PARTS_MAP[axie.parts[5].id.split('-').slice(1).join('-')],
						name: axie.parts[5].id.split('-').slice(1).join('-'),
					},
				},
				primaryColor: AXIE_COLORS_MAP[axie.primaryColor],
				class: axie.class.toLowerCase(),
			}

			selectedAxieParts.push(parts)
			setParts(selectedAxieParts)
			addAxie(axieId, parts)
		}

		handle()
		// }, [data])
	}, [axieId])

	return (
		<>
			{parts.length > 0 && (
				<Mixer
					body={parts[0].bodyShape}
					parts={{
						mouth: parts[0].parts.mouth.id,
						tail: parts[0].parts.tail.id,
						eyes: parts[0].parts.eyes.id,
						horn: parts[0].parts.horn.id,
						ear: parts[0].parts.ears.id,
						back: parts[0].parts.back.id,
					}}
					primaryColor={parts[0].primaryColor}
					animation={animation}
				/>
			)}
		</>
	)
}
