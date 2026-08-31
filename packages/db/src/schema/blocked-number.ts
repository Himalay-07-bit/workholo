import { pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const blockedNumber = pgTable(
	"blocked_number",
	{
		blockAgainst: text("block_against").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		id: text("id").primaryKey(),
		sourceNumber: text("source_number").notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [
		uniqueIndex("blocked_number_source_scope_uidx").on(
			table.sourceNumber,
			table.blockAgainst
		),
	]
);
