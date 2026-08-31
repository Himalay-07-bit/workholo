CREATE TABLE "platform_user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"designation" text DEFAULT '' NOT NULL,
	"email" text NOT NULL,
	"team" text DEFAULT '' NOT NULL,
	"call_forward_number" text DEFAULT '' NOT NULL,
	"caller_ids" text DEFAULT '' NOT NULL,
	"department" text DEFAULT '' NOT NULL,
	"calling_agent" boolean DEFAULT true NOT NULL,
	"create_extension" boolean DEFAULT false NOT NULL,
	"role" text DEFAULT 'Agent' NOT NULL,
	"login_id" text NOT NULL,
	"auto_generate_password" boolean DEFAULT true NOT NULL,
	"two_factor" boolean DEFAULT false NOT NULL,
	"login_based_calling" boolean DEFAULT false NOT NULL,
	"block_web_login" boolean DEFAULT false NOT NULL,
	"agent_dispositions" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "platform_user_email_uidx" ON "platform_user" USING btree ("email");
--> statement-breakpoint
CREATE UNIQUE INDEX "platform_user_login_id_uidx" ON "platform_user" USING btree ("login_id");