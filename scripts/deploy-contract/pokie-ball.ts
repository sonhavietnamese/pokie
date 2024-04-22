import type { HardhatRuntimeEnvironment } from 'hardhat/types'
import { OWNER_ADDRESS } from '../utils'

const deploy = async ({
	getNamedAccounts,
	deployments,
}: HardhatRuntimeEnvironment) => {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()

	const idContract = await deployments.get('PokieID')
	const marketplaceContract = await deployments.get('PokieMarketplace')

	await deploy('PokieBall', {
		from: deployer,
		log: true,
		args: [OWNER_ADDRESS, marketplaceContract.address, idContract.address],
	})
}

deploy.tags = ['PokieBall']
deploy.dependencies = ['VerifyContracts', 'PokieID', 'PokieMarketplace']

export default deploy
