import type { HardhatRuntimeEnvironment } from 'hardhat/types'

const deploy = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()

	const coinContract = await deployments.get('PokieCoin')
	const idContract = await deployments.get('PokieID')

	await deploy('PokieMarketplace', {
		from: deployer,
		log: true,
		args: ['0xa4ffee15dc0930eca8e0bac4ed0087db149a682a', coinContract.address, idContract.address],
	})
}

deploy.tags = ['PokieMarketplace']
deploy.dependencies = ['VerifyContracts', 'PokieCoin', 'PokieID']

export default deploy
