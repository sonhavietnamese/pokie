import type { HardhatRuntimeEnvironment } from 'hardhat/types'
import { OWNER_ADDRESS } from '../utils'

const deploy = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()

	const coinContract = await deployments.get('PoxieCoin')
	const idContract = await deployments.get('PoxieID')

	await deploy('PoxieProps', {
		from: deployer,
		log: true,
		args: [OWNER_ADDRESS, coinContract.address, idContract.address],
	})
}

deploy.tags = ['PoxieProps']
deploy.dependencies = ['VerifyContracts', 'PoxieCoin', 'PoxieID']

export default deploy
