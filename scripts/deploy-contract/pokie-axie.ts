import type { HardhatRuntimeEnvironment } from 'hardhat/types'
import { AXIE_ADDRESS, OWNER_ADDRESS } from '../utils'

const deploy = async ({
	getNamedAccounts,
	deployments,
}: HardhatRuntimeEnvironment) => {
	const { deploy } = deployments
	const { deployer } = await getNamedAccounts()

	const idContract = await deployments.get('PokieID')

	await deploy('PokieAxie', {
		from: deployer,
		log: true,
		args: [OWNER_ADDRESS, AXIE_ADDRESS, idContract.address],
	})
}

deploy.tags = ['PokieAxie']
deploy.dependencies = ['VerifyContracts', 'PokieID']

export default deploy
