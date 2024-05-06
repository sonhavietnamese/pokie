import { relations } from 'drizzle-orm'
import { boolean, integer, pgEnum, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core'
import type { AdapterAccount } from 'next-auth/adapters'

export const users = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name').default('user-name'),
	email: text('email').notNull().default('user-email'),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	wallet: text('wallet').notNull().default('0x'),
	created_at: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
	image: text('image'),
	isBoarded: boolean('is_boarded').notNull().default(false),
})

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccount['type']>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
)

export const profile = pgTable('profiles', {
	id: serial('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	energy: integer('energy').notNull().default(100),
})

export const sessions = pgTable('session', {
	id: serial('id').notNull().primaryKey(),
	sessionToken: text('sessionToken').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
	'verificationToken',
	{
		identifier: text('identifier').notNull(),
		token: text('token').notNull(),
		expires: timestamp('expires', { mode: 'date' }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
)

export const backpack = pgTable('backpacks', {
	id: serial('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	milks: integer('milks').notNull().default(0),
	fishes: integer('fishes').notNull().default(0),
	feathers: integer('feathers').notNull().default(0),
	rocks: integer('rocks').notNull().default(0),
	nuts: integer('nuts').notNull().default(0),
	plants: integer('plants').notNull().default(0),
	bugs: integer('bugs').notNull().default(0),
	stars: integer('stars').notNull().default(0),
	moons: integer('moons').notNull().default(0),
})

export const questTypeEnum = pgEnum('quest_type', ['onboarding', 'main'])
export const quests = pgTable('quests', {
	id: text('id').notNull().primaryKey(),
	name: text('name').notNull(),
	type: questTypeEnum('type').notNull(),
})

export const usersRelations = relations(users, ({ many }) => ({
	usersToQuests: many(usersToQuests),
}))

export const questsRelation = relations(quests, ({ many }) => ({
	usersToQuests: many(usersToQuests),
}))

export const statusEnum = pgEnum('status', ['idle', 'ongoing', 'completed'])
export const usersToQuests = pgTable(
	'users_to_quests',
	{
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		questId: text('quest_id')
			.notNull()
			.references(() => quests.id),
		status: statusEnum('status').notNull().default('idle'),
		updatedAt: timestamp('updated_at', { mode: 'date' }).notNull().defaultNow(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.userId, t.questId] }),
	}),
)

export const usersToQuestsRelations = relations(usersToQuests, ({ one }) => ({
	quest: one(quests, {
		fields: [usersToQuests.questId],
		references: [quests.id],
	}),
	user: one(users, {
		fields: [usersToQuests.userId],
		references: [users.id],
	}),
}))
