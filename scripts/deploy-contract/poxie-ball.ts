import type { HardhatRuntimeEnvironment } from 'hardhat/types'
import { OWNER_ADDRESS } from '../utils'

const deploy = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()

	const idContract = await deployments.get('PoxieID')
	const marketplaceContract = await deployments.get('PoxieMarketplace')

	await deploy('PoxieBall', {
		from: deployer,
		log: true,
		args: [OWNER_ADDRESS, marketplaceContract.address, idContract.address],
	})
}

deploy.tags = ['PoxieBall']
deploy.dependencies = ['VerifyContracts', 'PoxieID', 'PoxieMarketplace']

export default deploy
