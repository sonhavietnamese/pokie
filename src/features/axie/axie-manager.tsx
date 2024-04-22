import { Mixer } from '@/components/axie-mixer'
import {
	AXIE_COLORS_MAP,
	AXIE_PARTS_MAP,
} from '@/components/axie-mixer/constants'
import type { BodyShape } from '@/components/axie-mixer/types'
import { useEffect, useState } from 'react'
import { useAxie } from './use-axie'

export default function AxieManager() {
	const { data } = useAxie()

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

		const selectedAxies = [data[0]]

		if (!selectedAxies) return

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

		for (const axie of selectedAxies) {
			const parts = {
				bodyShape: axie.rawMetadata.properties.bodyshape as BodyShape,
				parts: {
					mouth:
						AXIE_PARTS_MAP[
							axie.rawMetadata.properties.ears_id.split('-').slice(1).join('-')
						],
					tail: AXIE_PARTS_MAP[
						axie.rawMetadata.properties.tail_id.split('-').slice(1).join('-')
					],
					eyes: AXIE_PARTS_MAP[
						axie.rawMetadata.properties.eyes_id.split('-').slice(1).join('-')
					],
					horn: AXIE_PARTS_MAP[
						axie.rawMetadata.properties.horn_id.split('-').slice(1).join('-')
					],
					ear: AXIE_PARTS_MAP[
						axie.rawMetadata.properties.ears_id.split('-').slice(1).join('-')
					],
					back: AXIE_PARTS_MAP[
						axie.rawMetadata.properties.back_id.split('-').slice(1).join('-')
					],
				},
				primaryColor:
					AXIE_COLORS_MAP[axie.rawMetadata.properties.primary_color],
			}

			selectedAxieParts.push(parts)
		}
		setParts(selectedAxieParts)
	}, [data])

	return (
		<>
			{parts?.length > 0 && (
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
					animation={'idle'}
				/>
			)}
		</>
	)
}
