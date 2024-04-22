CREATE TABLE IF NOT EXISTS "backpack" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
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
ALTER TABLE "profile" ALTER COLUMN "energy" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "backpack" ADD CONSTRAINT "backpack_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
