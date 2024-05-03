import { Button } from '@/components/ui/button'
import { usePhoneStore } from './phone-store'

export default function PhoneButton() {
	const setIsOpen = usePhoneStore((s) => s.setIsOpen)

	return <Button onClick={() => setIsOpen(true)}>Phone</Button>
}
