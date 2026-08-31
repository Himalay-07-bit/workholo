import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const inboundQueue = pgTable("inbound_queue", {
	agent: text("agent").default("").notNull(),
	agentPriority: boolean("agent_priority").default(false).notNull(),
	agentRingTime: integer("agent_ring_time").default(30).notNull(),
	callbackCrossover: boolean("callback_crossover").default(false).notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	description: text("description").default("").notNull(),
	enableQueueUrl: boolean("enable_queue_url").default(false).notNull(),
	enableRepeatCaller: boolean("enable_repeat_caller").default(false).notNull(),
	followMe: text("follow_me").default("Select any Option").notNull(),
	followUserGroup: text("follow_user_group").default("Hangup").notNull(),
	id: text("id").primaryKey(),
	musicOnHold: text("music_on_hold").default("Select any Option").notNull(),
	name: text("name").notNull(),
	pbxconfigId: text("pbxconfig_id").default("").notNull(),
	positionAnnouncement: boolean("position_announcement")
		.default(false)
		.notNull(),
	queueTimeout: integer("queue_timeout").default(90).notNull(),
	ringStrategy: text("ring_strategy").default("Random").notNull(),
	sbcMissedCallAgent: text("sbc_missed_call_agent")
		.default("Select any Option")
		.notNull(),
	sbcMissedCallCaller: text("sbc_missed_call_caller")
		.default("Select any Option")
		.notNull(),
	slaDuration: integer("sla_duration").default(0).notNull(),
	stickyAgent: boolean("sticky_agent").default(false).notNull(),
	transferCode: text("transfer_code").default("").notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	waitAnnouncement: boolean("wait_announcement").default(false).notNull(),
	webhookMissedCallAgent: text("webhook_missed_call_agent")
		.default("Select any Option")
		.notNull(),
	webhookMissedCallCaller: text("webhook_missed_call_caller")
		.default("Select any Option")
		.notNull(),
	welcomeAnnouncement: text("welcome_announcement")
		.default("Select any Option")
		.notNull(),
});
