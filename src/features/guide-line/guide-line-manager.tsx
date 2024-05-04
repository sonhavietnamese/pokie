import GuideLine from './guide-line'
import { useGuideLineStore } from './guide-line-store'

export default function GuideLineManager() {
	const target = useGuideLineStore((s) => s.target)

	return target && <GuideLine />
}
