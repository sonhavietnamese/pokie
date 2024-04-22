import '@nomicfoundation/hardhat-foundry'
import '@nomiclabs/hardhat-waffle'
import '@typechain/hardhat'
import 'hardhat-deploy'
import type { HardhatUserConfig } from 'hardhat/config'
import type { NetworkUserConfig } from 'hardhat/types'

// import example from './scripts/tasks/example'

// task('example', 'Example task').setAction(example)

const testnet: NetworkUserConfig = {
	chainId: 2021,
	url: 'https://saigon-testnet.roninchain.com/rpc',
	accounts: [
		'0x7bd8d28613ace75552b8410a9c525938ced766e4e6cd12573cc4acce05781904',
	],
	blockGasLimit: 100000000,
}

const config: HardhatUserConfig = {
	solidity: {
		version: '0.8.20',
	},
	typechain: {
		outDir: './scripts/typechain-types',
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
