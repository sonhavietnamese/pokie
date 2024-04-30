// import { drizzle } from 'drizzle-orm/node-postgres'
// import { Pool } from 'pg'
// import { z } from 'zod'
// import type { Stuff } from '.'
// import { stuffs, user_stuffs } from './schema'
// import StuffData from './stuffs.json'

// const stuffDataSchema = z.array(
// 	z.object({
// 		id: z.number(),
// 		name: z.string(),
// 		slug: z.string(),
// 		description: z.string(),
// 	}),
// )

// const connectionString = process.env.DATABASE_URL as string
// const client = new Pool({
// 	connectionString,
// })
// const db = drizzle(client)

// const stuffData = stuffDataSchema.parse(StuffData)

// const main = async () => {
// 	await db.delete(user_stuffs)
// 	await db.delete(stuffs)

// 	const data: Stuff[] = []

// 	stuffData.forEach((stuff, index) => {
// 		data.push({
// 			id: stuff.id,
// 			name: stuff.name,
// 			description: stuff.description,
// 			slug: stuff.slug,
// 		})
// 	})

// 	await db.insert(stuffs).values(data)
// }

// main()
