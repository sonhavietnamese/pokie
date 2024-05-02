import GuideLine from './guide-line'
import { useGuideLineStore } from './guide-line-store'

export default function GuideLineManager() {
	const isEnable = useGuideLineStore((s) => s.isEnable)

	return !isEnable && <GuideLine />
}
