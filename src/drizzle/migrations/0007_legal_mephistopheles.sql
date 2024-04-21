ALTER TABLE "user" ADD COLUMN "email" text DEFAULT 'user-email' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerified" timestamp;