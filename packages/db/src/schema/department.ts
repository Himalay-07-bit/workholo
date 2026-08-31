import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const department = pgTable("department", {
	createdAt: timestamp("created_at").defaultNow().notNull(),
	description: text("description").default("").notNull(),
	failoverMusic: text("failover_music").default("Select any Option").notNull(),
	id: text("id").primaryKey(),
	missedCallSms: text("missed_call_sms").default("Select any Option").notNull(),
	musicOnHold: text("music_on_hold").default("Select any Option").notNull(),
	name: text("name").notNull(),
	queueAnnounceHoldtime: boolean("queue_announce_holdtime")
		.default(false)
		.notNull(),
	queueLimit: boolean("queue_limit").default(false).notNull(),
	queuePeriodicAnnouncement: boolean("queue_periodic_announcement")
		.default(false)
		.notNull(),
	queuePositionAnnouncement: boolean("queue_position_announcement")
		.default(false)
		.notNull(),
	queueTimeout: integer("queue_timeout").default(90).notNull(),
	queueWelcomeAnnouncement: boolean("queue_welcome_announcement")
		.default(false)
		.notNull(),
	ringStrategy: text("ring_strategy").default("Simultaneously").notNull(),
	simultaneousCallPatchingCapsLimit: integer(
		"simultaneous_call_patching_caps_limit"
	)
		.default(0)
		.notNull(),
	stickyAgent: boolean("sticky_agent").default(false).notNull(),
	transferCode: text("transfer_code").default("").notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	useItAsQueue: boolean("use_it_as_queue").default(true).notNull(),
});
