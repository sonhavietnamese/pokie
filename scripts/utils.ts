export const OWNER_ADDRESS = '0xa4ffee15dc0930eca8e0bac4ed0087db149a682a'
export const AXIE_ADDRESS = '0xcaca1c072d26e46686d932686015207fbe08fdb8'
export enum Network {
	Hardhat = 'hardhat',
	Testnet = 'ronin-testnet',
	Mainnet = 'ronin-mainnet',
}

export type LiteralNetwork = Network | string
