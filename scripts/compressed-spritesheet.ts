import fs from 'node:fs'
import path from 'node:path'

import pako from 'pako'

const filePath = path.join(process.cwd(), 'src', 'config', 'spritesheet-element.json')

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
	if (err) {
		console.error('Error reading the file:', err)

		return
	}
	try {
		const jsonData = JSON.parse(data)
		const compressed = pako.deflate(JSON.stringify(jsonData))

		// const restored = JSON.parse(pako.inflate(compressed, { to: 'string' }))

		// console.log('restored', restored)

		fs.writeFileSync(path.join(process.cwd(), 'src', 'config', 'compressed-spritesheet.json'), compressed)
		console.log('JSON file compressed successfully!')
	} catch (error) {
		console.error('Error compressing the JSON file:', error)
	}
})
