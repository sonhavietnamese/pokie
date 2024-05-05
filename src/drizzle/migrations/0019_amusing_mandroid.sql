DO $$ BEGIN
 CREATE TYPE "quest_type" AS ENUM('onboarding', 'main');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "quests" ALTER COLUMN "type" SET DATA TYPE quest_type;