import { MavisIdProvider } from '@/components/providers/mavis-id-provider'
import NextAuthSessionProvider from '@/components/providers/nextauth-session-provider'
import { SquircleNoScript } from '@squircle-js/react'
import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import './globals.css'

const prompt = Prompt({
	subsets: ['latin'],
	weight: ['700', '800', '900'],
})

export const metadata: Metadata = {
	title: 'Poxie',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={prompt.className}>
				<NextAuthSessionProvider>
					<MavisIdProvider>{children}</MavisIdProvider>
				</NextAuthSessionProvider>
				<SquircleNoScript />
			</body>
		</html>
	)
}
