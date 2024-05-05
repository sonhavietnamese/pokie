DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('idle', 'ongoing', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
