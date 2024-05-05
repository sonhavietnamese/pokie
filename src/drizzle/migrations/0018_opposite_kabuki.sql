DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('onboarding', 'main');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "quests" ALTER COLUMN "type" SET DATA TYPE type;