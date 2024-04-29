CREATE TABLE IF NOT EXISTS "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"energy" integer DEFAULT 100 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "quests" (
	"id" serial PRIMARY KEY NOT NULL,
	"reward" jsonb DEFAULT '0'::jsonb NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL
);
--> statement-breakpoint
DROP TABLE "profile";--> statement-breakpoint
DROP TABLE "quest";--> statement-breakpoint
ALTER TABLE "users_to_quests" DROP CONSTRAINT "users_to_quests_group_id_quest_id_fk";
--> statement-breakpoint
ALTER TABLE "users_to_quests" DROP CONSTRAINT "users_to_quests_user_id_group_id_pk";--> statement-breakpoint
ALTER TABLE "users_to_quests" ADD CONSTRAINT "users_to_quests_user_id_quest_id_pk" PRIMARY KEY("user_id","quest_id");--> statement-breakpoint
ALTER TABLE "users_to_quests" ADD COLUMN "quest_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_to_quests" ADD CONSTRAINT "users_to_quests_quest_id_quests_id_fk" FOREIGN KEY ("quest_id") REFERENCES "quests"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users_to_quests" DROP COLUMN IF EXISTS "group_id";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "profiles" ADD CONSTRAINT "profiles_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
