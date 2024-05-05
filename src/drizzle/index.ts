import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from './schema'

const connectionString = process.env.DATABASE_URL as string
const client = postgres(connectionString)

export type SelectUser = typeof schema.users.$inferSelect
export type InsertUser = typeof schema.users.$inferInsert
export type SelectProfile = typeof schema.profile.$inferSelect
export type InsertProfile = typeof schema.profile.$inferInsert
export type SelectBackpack = typeof schema.backpack.$inferSelect
export type InsertBackpack = typeof schema.backpack.$inferInsert
export type SelectQuest = typeof schema.quests.$inferSelect
export type InsertQuest = typeof schema.quests.$inferInsert

export const db = drizzle(client, { schema })
