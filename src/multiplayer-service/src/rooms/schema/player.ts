import { Schema, type } from '@colyseus/schema'

export class Position extends Schema {
	@type('number') x: number
	@type('number') y: number
	@type('number') z: number

	constructor(x: number, y: number, z: number) {
		super()
		this.set(x, y, z)
	}

	set(x: number, y: number, z: number) {
		this.x = x
		this.y = y
		this.z = z
	}
}

export class Rotation extends Schema {
	@type('number') x: number
	@type('number') y: number
	@type('number') z: number

	constructor(x: number, y: number, z: number) {
		super()
		this.set(x, y, z)
	}

	set(x: number, y: number, z: number) {
		this.x = x
		this.y = y
		this.z = z
	}
}

export class Player extends Schema {
	@type('string') username: string
	@type('string') animation: string
	@type('string') address: string
	@type('string') skin: string
	@type(Position) position: Position = new Position(0, 0, 0)
	@type(Rotation) rotation: Rotation = new Rotation(0, 0, 0)
	@type('number') timestamp = 0

	constructor(username: string, address: string, position: Position, animation: string, skin: string) {
		super()

		this.username = username
		this.address = address
		this.animation = animation
		this.setPosition(position)
		this.skin = skin
	}

	setAnimation(animation: string) {
		this.animation = animation
	}

	setPosition(position: Position) {
		this.position.set(position.x, position.y, position.z)
	}

	setRotation(rotation: Rotation) {
		this.rotation.set(rotation.x, rotation.y, rotation.z)
	}

	setSkin(skin: string) {
		this.skin = skin
	}
}
