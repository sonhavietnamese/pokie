import type { HardhatRuntimeEnvironment } from 'hardhat/types'
import { OWNER_ADDRESS } from '../utils'

const deploy = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()

	const coinContract = await deployments.get('PokieCoin')
	const idContract = await deployments.get('PokieID')

	await deploy('PokieProps', {
		from: deployer,
		log: true,
		args: [OWNER_ADDRESS, coinContract.address, idContract.address],
	})
}

deploy.tags = ['PokieProps']
deploy.dependencies = ['VerifyContracts', 'PokieCoin', 'PokieID']

export default deploy
