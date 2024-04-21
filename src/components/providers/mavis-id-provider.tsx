'use client'

import { idConnectorImpl } from '@/features/mavis-id/connector'
import { useMavisIdStore } from '@/features/mavis-id/store'
import {
	SupportedChainIds,
	WalletWidget,
	WalletgoProvider,
	createRoninWallets,
} from '@roninnetwork/walletgo'
import type { ReactNode } from 'react'

export const EXPLORER_DOMAIN: string = 'https://app.roninchain.com'
export const EXPLORER_CDN_URL: string = 'https://cdn.skymavis.com/explorer-cdn'
const WC_PROJECT_ID: string = '2c8ad7fba00df7c63cea61ced996e4d3'

const DEFAULT_WALLETS = createRoninWallets({
	projectId: WC_PROJECT_ID,
	noGnosisSafe: true,
	clientMeta: {
		name: 'App.Ronin',
		description: 'App.Ronin',
		icons: [`${EXPLORER_CDN_URL}/asset/favicon/apple-touch-icon.png`],
		url: EXPLORER_DOMAIN,
		redirect: {
			universal: EXPLORER_DOMAIN,
		},
	},
	ethereumWallets: true,
	noInjected: false,
})

const WITH_ID_WALLETS = [idConnectorImpl, ...DEFAULT_WALLETS]

interface IProviderProps {
	children: ReactNode
}

export function MavisIdProvider({ children }: IProviderProps) {
	const { open, setOpen } = useMavisIdStore()

	return (
		<WalletgoProvider defaultChainId={SupportedChainIds.RoninTestnet}>
			<WalletWidget
				wallets={WITH_ID_WALLETS}
				isOpen={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
			/>
			{children}
		</WalletgoProvider>
	)
}
