import type { HardhatRuntimeEnvironment } from 'hardhat/types'
import { OWNER_ADDRESS } from '../utils'

const deploy = async ({ getNamedAccounts, deployments }: HardhatRuntimeEnvironment) => {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()

	await deploy('PokieID', {
		from: deployer,
		log: true,
		args: [OWNER_ADDRESS],
	})
}

deploy.tags = ['PokieID']
deploy.dependencies = ['VerifyContracts']

export default deploy
