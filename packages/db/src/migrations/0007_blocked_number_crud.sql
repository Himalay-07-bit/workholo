CREATE TABLE "blocked_number" (
	"id" text PRIMARY KEY NOT NULL,
	"source_number" text NOT NULL,
	"block_against" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "blocked_number_source_scope_uidx" ON "blocked_number" USING btree ("source_number", "block_against");