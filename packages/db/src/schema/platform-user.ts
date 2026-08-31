import {
	boolean,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

export const platformUser = pgTable(
	"platform_user",
	{
		agentDispositions: boolean("agent_dispositions").default(false).notNull(),
		autoGeneratePassword: boolean("auto_generate_password")
			.default(true)
			.notNull(),
		blockWebLogin: boolean("block_web_login").default(false).notNull(),
		callerIds: text("caller_ids").default("").notNull(),
		callForwardNumber: text("call_forward_number").default("").notNull(),
		callingAgent: boolean("calling_agent").default(true).notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		createExtension: boolean("create_extension").default(false).notNull(),
		department: text("department").default("").notNull(),
		designation: text("designation").default("").notNull(),
		email: text("email").notNull(),
		id: text("id").primaryKey(),
		loginBasedCalling: boolean("login_based_calling").default(false).notNull(),
		loginId: text("login_id").notNull(),
		name: text("name").notNull(),
		phone: text("phone").notNull(),
		role: text("role").default("Agent").notNull(),
		team: text("team").default("").notNull(),
		twoFactor: boolean("two_factor").default(false).notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [
		uniqueIndex("platform_user_email_uidx").on(table.email),
		uniqueIndex("platform_user_login_id_uidx").on(table.loginId),
	]
);
