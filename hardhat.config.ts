// @ts-nocheck

import '@nomicfoundation/hardhat-foundry'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-deploy'

import type { HardhatUserConfig } from 'hardhat/config'
import type { NetworkUserConfig } from 'hardhat/types'
import 'typechain'

const testnet: NetworkUserConfig = {
	chainId: 2021,
	url: 'https://saigon-testnet.roninchain.com/rpc',
	accounts: [''],
	blockGasLimit: 100000000,
}

const config: HardhatUserConfig = {
	solidity: {
		version: '0.8.20',
	},
	typechain: {
		outDir: './src/contracts/typechain',
	},
	paths: {
		sources: './src/contracts',
		cache: './cache/hardhat',
		deploy: ['./scripts/deploy-contract'],
		deployments: './src/contracts/deployments',
	},
	namedAccounts: {
		deployer: 0,
	},
	networks: {
		hardhat: {
			hardfork: 'istanbul',
		},
		'ronin-testnet': testnet,
	},
}

export default config
