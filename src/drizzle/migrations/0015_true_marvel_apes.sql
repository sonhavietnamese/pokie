ALTER TABLE "user" ADD COLUMN "is_boarded" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "onboarding";