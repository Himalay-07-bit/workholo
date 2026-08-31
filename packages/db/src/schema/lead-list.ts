import {
	boolean,
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
} from "drizzle-orm/pg-core";

export const leadList = pgTable("lead_list", {
	createdAt: timestamp("created_at").defaultNow().notNull(),
	description: text("description").default("").notNull(),
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	sharedWith: text("shared_with").default("32 selected").notNull(),
	skillBasedRouting: boolean("skill_based_routing").default(false).notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const leadListField = pgTable(
	"lead_list_field",
	{
		createdAt: timestamp("created_at").defaultNow().notNull(),
		id: text("id").primaryKey(),
		leadListId: text("lead_list_id")
			.notNull()
			.references(() => leadList.id, { onDelete: "cascade" }),
		name: text("name").notNull(),
		position: integer("position").notNull(),
		sensitive: boolean("sensitive").default(false).notNull(),
	},
	(table) => [
		index("lead_list_field_lead_list_id_idx").on(table.leadListId),
		uniqueIndex("lead_list_field_position_uidx").on(
			table.leadListId,
			table.position
		),
	]
);
