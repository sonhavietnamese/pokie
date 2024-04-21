import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const dir = join(process.cwd(), 'public/textures/axie')
const files = readdirSync(dir)

for (const file of files) {
	const filePath = join(dir, file)
	const buffer = readFileSync(filePath)

	sharp(buffer).resize(256, 256)
}
