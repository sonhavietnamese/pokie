'use client'

import { Capsule } from '@react-three/drei'
import { useEffect, useState } from 'react'
import { useAxieCacheStore } from './cache'
import Mixer from './mixer'
import type { AxieAnimation, BodyShape, MixerProps } from './types'
import { getParts } from './utils'

interface AxieMixerProps {
	axieId?: string
	animation: AxieAnimation
}

export interface FetchAxieResponse {
	axie: {
		bodyShape: BodyShape
		parts: Array<{ name: string }>
		primaryColor: string
		class: string
	}
}

export default function AxieMixer({ axieId, animation }: AxieMixerProps) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [parts, setParts] = useState<MixerProps>()

	const [axies, addAxie] = useAxieCacheStore((state) => [
		state.axies,
		state.addAxie,
	])

	useEffect(() => {
		if (!axieId) return

		const fetchAxie = async () => {
			setLoading(true)
			if (axies[axieId]) {
				setParts(axies[axieId])
				setLoading(false)

				return
			}

			try {
				const resp = await fetch(
					'https://api-gateway.skymavis.com/graphql/marketplace',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'X-API-Key': 'tkHTIdbKZApvgfCT2xktz9njf0xlkb69',
						},
						body: JSON.stringify({
							query: `query MyQuery {
                      axie(axieId: "${axieId}") {
                        bodyShape
                        primaryColor
                        parts {
                          name
                        }
                        class
                      }
                    }`,
						}),
					},
				)

				const {
					data: { axie },
				} = (await resp.json()) as { data: FetchAxieResponse }

				const parts = getParts({
					bodyShape: axie.bodyShape,
					primaryColor: axie.primaryColor,
					parts: {
						eyes: axie.parts[0].name,
						ear: axie.parts[1].name,
						back: axie.parts[2].name,
						mouth: axie.parts[3].name,
						horn: axie.parts[4].name,
						tail: axie.parts[5].name,
					},
				})

				setParts(parts)
				addAxie(axieId, parts)
			} catch (error) {
				setError(JSON.stringify(error))
			} finally {
				setLoading(false)
			}
		}

		fetchAxie()
	}, [axieId])

	return (
		<>
			{loading ? (
				<Capsule args={[0.3, 0.7]} />
			) : (
				<>
					{parts && !error && (
						<Mixer
							body={parts.bodyShape}
							parts={{
								mouth: parts.parts.mouth,
								tail: parts.parts.tail,
								eyes: parts.parts.eyes,
								horn: parts.parts.horn,
								ear: parts.parts.ear,
								back: parts.parts.back,
							}}
							primaryColor={parts.primaryColor}
							animation={animation}
						/>
					)}
				</>
			)}
		</>
	)
}
