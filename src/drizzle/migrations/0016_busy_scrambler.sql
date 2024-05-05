ALTER TABLE "quests" ADD COLUMN "type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "users_to_quests" ADD COLUMN "status" "status" DEFAULT 'idle' NOT NULL;--> statement-breakpoint
ALTER TABLE "quests" DROP COLUMN IF EXISTS "reward";--> statement-breakpoint
ALTER TABLE "quests" DROP COLUMN IF EXISTS "description";--> statement-breakpoint
ALTER TABLE "users_to_quests" DROP COLUMN IF EXISTS "completed";