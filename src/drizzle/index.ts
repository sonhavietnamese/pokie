import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

const connectionString = process.env.DATABASE_URL as string
const client = postgres(connectionString)

export type SelectUser = typeof schema.users.$inferSelect
export type InsertUser = typeof schema.users.$inferInsert

export const db = drizzle(client, { schema })
