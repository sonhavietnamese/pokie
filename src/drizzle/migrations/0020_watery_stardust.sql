ALTER TABLE "quests" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users_to_quests" ALTER COLUMN "quest_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users_to_quests" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;