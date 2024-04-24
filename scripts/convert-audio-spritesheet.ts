import fs from 'node:fs'
import path from 'node:path'
import audiosprite from 'audiosprite'

const filePath = path.join(process.cwd(), 'public', 'audio')

const files = fs.readdirSync(filePath).map((file) => path.join(filePath, file))

console.log('files', files)

const opts = { output: 'result' }

audiosprite(files, opts, (err, obj) => {
	if (err) return console.error(err)

	console.log(JSON.stringify(obj, null, 2))
})
