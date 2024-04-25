'use client'

import { Capsule } from '@react-three/drei'
import { useEffect, useState } from 'react'
import useSWRImmutable from 'swr'
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
			'X-API-Key': 'tkHTIdbKZApvgfCT2xktz9njf0xlkb69',
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

export default function AxieMixer({ axieId, animation }: AxieMixerProps) {
	const { data, isLoading } = useSWRImmutable(
		axieId ? 'https://api-gateway.skymavis.com/graphql/marketplace' : null,
		(url) => fetcher(url, axieId || '123'),
		{
			refreshWhenHidden: false,
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	)

	const [parts, setParts] = useState<
		{
			bodyShape: BodyShape
			parts: {
				mouth: string
				tail: string
				eyes: string
				horn: string
				ear: string
				back: string
			}
			primaryColor: string
		}[]
	>([])

	useEffect(() => {
		if (!data) return

		const axie = data.data.axie

		const selectedAxieParts: {
			bodyShape: BodyShape
			parts: {
				mouth: string
				tail: string
				eyes: string
				horn: string
				ear: string
				back: string
			}
			primaryColor: string
		}[] = []

		const parts = {
			bodyShape: axie.bodyShape.toLowerCase() as BodyShape,
			parts: {
				eyes: AXIE_PARTS_MAP[axie.parts[0].id.split('-').slice(1).join('-')],
				ear: AXIE_PARTS_MAP[axie.parts[1].id.split('-').slice(1).join('-')],
				back: AXIE_PARTS_MAP[axie.parts[2].id.split('-').slice(1).join('-')],
				mouth: AXIE_PARTS_MAP[axie.parts[3].id.split('-').slice(1).join('-')],
				horn: AXIE_PARTS_MAP[axie.parts[4].id.split('-').slice(1).join('-')],
				tail: AXIE_PARTS_MAP[axie.parts[5].id.split('-').slice(1).join('-')],
			},
			primaryColor: AXIE_COLORS_MAP[axie.primaryColor],
		}

		selectedAxieParts.push(parts)
		setParts(selectedAxieParts)
	}, [data])

	return (
		<>
			{isLoading ? (
				<Capsule args={[0.3, 0.7]} />
			) : (
				<>
					{parts.length > 0 && (
						<Mixer
							body={parts[0].bodyShape}
							parts={{
								mouth: parts[0].parts.mouth,
								tail: parts[0].parts.tail,
								eyes: parts[0].parts.eyes,
								horn: parts[0].parts.horn,
								ear: parts[0].parts.ear,
								back: parts[0].parts.back,
							}}
							primaryColor={parts[0].primaryColor}
							animation={animation}
						/>
					)}
				</>
			)}
		</>
	)
}
