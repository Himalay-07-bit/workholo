import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const agentGroup = pgTable(
	"agent_group",
	{
		createdAt: timestamp("created_at").defaultNow().notNull(),
		description: text("description").default("").notNull(),
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [uniqueIndex("agent_group_name_uidx").on(table.name)]
);
