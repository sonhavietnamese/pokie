CREATE TABLE IF NOT EXISTS "backpacks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"milks" integer DEFAULT 0 NOT NULL,
	"fishes" integer DEFAULT 0 NOT NULL,
	"feathers" integer DEFAULT 0 NOT NULL,
	"rocks" integer DEFAULT 0 NOT NULL,
	"nuts" integer DEFAULT 0 NOT NULL,
	"plants" integer DEFAULT 0 NOT NULL,
	"bugs" integer DEFAULT 0 NOT NULL,
	"stars" integer DEFAULT 0 NOT NULL,
	"moons" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
DROP TABLE "backpack";--> statement-breakpoint
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_quests" ALTER COLUMN "user_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "session" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "backpacks" ADD CONSTRAINT "backpacks_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
