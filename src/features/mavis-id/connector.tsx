import { MavisIdProvider } from '@axieinfinity/mavis-id-sdk'
import {
	AutoConnectPriority,
	BaseConnector,
	ConnectorError,
} from '@roninnetwork/walletgo'
import type { ReactNode } from 'react'

const ID_URL = 'https://id.skymavis.com'
const STORAGE_KEY = 'MAVIS.ID:PROFILE'

class IdConnector extends BaseConnector<MavisIdProvider> {
	switchable = false
	scannable = false
	autoPriority = AutoConnectPriority.WalletConnect

	hidden = false

	provider?: MavisIdProvider

	constructor(logo: ReactNode) {
		super(
			'MAVIS_ID_CONNECTOR',
			'Mavis ID',
			{ default: ID_URL, external: ID_URL },
			logo,
			false,
		)
	}

	async shouldAutoConnect(): Promise<boolean> {
		return localStorage.getItem(STORAGE_KEY) !== null
	}

	async connect(chainId: number) {
		const newProvider = MavisIdProvider.create({
			clientId: 'pokie',
			chainId: chainId,
		})

		const accounts = await newProvider.request({
			method: 'eth_requestAccounts',
		})

		if (accounts.length) {
			this.provider = newProvider

			return {
				account: accounts[0],
				chainId: chainId,
				provider: newProvider,
			}
		}

		throw new ConnectorError('ConnectFail', 'Could not connect to ID')
	}

	async disconnect(): Promise<boolean> {
		if (this.provider) {
			this.provider.disconnect()
		}

		return true
	}

	switchChain(): Promise<boolean> {
		throw new Error('Method not implemented.')
	}
}

export const idConnectorImpl = new IdConnector(
	<svg viewBox="0 0 177 180" fill="none" aria-label="mavis" role="img">
		<path
			fill="#2065EE"
			d="M124.367 21.078c-3.423 0-6.169-2.667-6.169-6.05 0-3.384 2.786-6.17 6.169-6.17 3.383 0 6.17 2.786 6.17 6.17 0 3.383-2.787 6.05-6.17 6.05Zm-21.613 0c-3.264 0-6.05-2.667-6.05-6.05 0-3.384 2.786-6.17 6.05-6.17 3.542 0 6.329 2.786 6.329 6.17 0 3.383-2.787 6.05-6.329 6.05ZM124.725.38c-4.657 0-8.717 2.388-11.105 5.174C110.953 2.65 107.172.38 102.396.38c-8.2 0-14.768 6.567-14.768 14.648 0 8.08 6.807 14.647 14.768 14.647 2.149 0 4.537-.398 6.328-1.273v11.861h9.712V28.402c2.15.995 4.538 1.273 6.329 1.273 8.2 0 14.887-6.687 14.887-14.647 0-7.961-6.687-14.648-14.887-14.648h-.04ZM.1 179.695h11.265c9.433 0 15.841-2.149 20.1-8.558l38.53-59.506c2.15 3.423 1.553 8.558-3.144 15.842l-33.793 52.222h10.349c9.433 0 15.841-2.149 20.1-8.558l38.53-59.506c2.15 3.423 1.553 8.558-3.144 15.842l-33.475 51.705h9.95c9.594 0 15.922-2.269 20.062-8.837l6.687-10.11h.239c25.275 0 47.247-15.802 47.247-48.759V91.411c0-15.166 26.787-13.494 26.787-26.788h-26.151c-2.03 0-2.268-.239-4.059-2.15-8.837-10.23-20.221-15.802-32.719-15.802-20.579 0-32.6 9.474-44.222 26.629L.021 179.655l.08.04Z"
		/>
	</svg>,
)
