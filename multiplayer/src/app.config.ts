import { monitor } from '@colyseus/monitor'
import { playground } from '@colyseus/playground'
import config from '@colyseus/tools'
import cors from 'cors'
import { PokieRoom } from './rooms/pokie-room'

import { matchMaker } from '@colyseus/core'

matchMaker.controller.getCorsHeaders = (req) => ({
	'Access-Control-Allow-Origin': '*',
	Vary: '*',
})

export default config({
	initializeGameServer: (gameServer) => {
		gameServer.define('pokie', PokieRoom)
	},

	initializeExpress: (app) => {
		app.use(
			cors({
				origin: ['*'],
				credentials: true,
			}),
		)

		app.get('/hello_world', (req, res) => {
			res.send("It's time to kick ass and chew bubblegum!")
		})

		app.use('/', playground)

		app.use('/colyseus', monitor())
	},

	beforeListen: () => {},
})
