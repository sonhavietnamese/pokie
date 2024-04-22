import { integer, pgTable, primaryKey, serial, text, timestamp } from 'drizzle-orm/pg-core'
import type { AdapterAccount } from 'next-auth/adapters'

export const users = pgTable('user', {
	id: text('id').notNull().primaryKey(),
	name: text('name').default('user-name'),
	email: text('email').notNull().default('user-email'),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	wallet: text('wallet').notNull().default('0x'),
	created_at: timestamp('created_at', { mode: 'date' }).notNull().defaultNow(),
	image: text('image'),
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

export const profile = pgTable('profile', {
	id: serial('id').notNull().primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	energy: integer('energy').notNull().default(100),
})

export const sessions = pgTable('session', {
	id: serial('id').notNull().primaryKey(),
	sessionToken: text('sessionToken').notNull(),
	userId: text('userId')
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
