import type { HardhatRuntimeEnvironment } from 'hardhat/types'
import { AXIE_ADDRESS, OWNER_ADDRESS } from '../utils'

const deploy = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()

	const idContract = await deployments.get('PoxieID')

	await deploy('PoxieAxie', {
		from: deployer,
		log: true,
		args: [OWNER_ADDRESS, AXIE_ADDRESS, idContract.address],
	})
}

deploy.tags = ['PoxieAxie']
deploy.dependencies = ['VerifyContracts', 'PoxieID']

export default deploy
