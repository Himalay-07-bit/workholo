CREATE TABLE "lead_list" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"shared_with" text DEFAULT '32 selected' NOT NULL,
	"skill_based_routing" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "lead_list_field" (
	"id" text PRIMARY KEY NOT NULL,
	"lead_list_id" text NOT NULL,
	"name" text NOT NULL,
	"position" integer NOT NULL,
	"sensitive" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "lead_list_field_lead_list_id_lead_list_id_fk" FOREIGN KEY ("lead_list_id") REFERENCES "public"."lead_list"("id") ON DELETE cascade ON UPDATE no action
);
--> statement-breakpoint
CREATE INDEX "lead_list_field_lead_list_id_idx" ON "lead_list_field" USING btree ("lead_list_id");
--> statement-breakpoint
CREATE UNIQUE INDEX "lead_list_field_position_uidx" ON "lead_list_field" USING btree ("lead_list_id", "position");