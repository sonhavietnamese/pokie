'use client'

import PhoneButton from '@/features/phone/phone-button'
import PhoneCase from '@/features/phone/phone-case'

export default function Page() {
	return (
		<main className="relative h-screen w-screen">
			<PhoneButton />

			<PhoneCase />
		</main>
	)
}
