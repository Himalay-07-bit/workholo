import { db } from "@workholo/db";
import { leadList, leadListField } from "@workholo/db/schema/lead-list";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure } from "../index";

const leadListIdSchema = z.object({
	id: z.string().min(1),
});

const leadFieldSchema = z.object({
	name: z.string().min(1),
	position: z.number().int().min(0),
	sensitive: z.boolean().default(false),
});

const leadListFields = {
	description: z.string().default(""),
	fields: z.array(leadFieldSchema).min(1),
	name: z.string().min(1),
	sharedWith: z.string().default("32 selected"),
	skillBasedRouting: z.boolean().default(false),
};

export const createLeadListSchema = z.object(leadListFields);

export const updateLeadListSchema = z.object({
	description: leadListFields.description.optional(),
	fields: leadListFields.fields.optional(),
	id: z.string().min(1),
	name: leadListFields.name.optional(),
	sharedWith: leadListFields.sharedWith.optional(),
	skillBasedRouting: leadListFields.skillBasedRouting.optional(),
});

async function getLeadListById(id: string) {
	const [foundList] = await db
		.select()
		.from(leadList)
		.where(eq(leadList.id, id));

	if (!foundList) {
		return null;
	}

	const fields = await db
		.select()
		.from(leadListField)
		.where(eq(leadListField.leadListId, id))
		.orderBy(asc(leadListField.position));

	return { ...foundList, fields };
}

export const leadListsRouter = {
	create: protectedProcedure
		.input(createLeadListSchema)
		.handler(async ({ input }) => {
			const id = crypto.randomUUID();
			const { fields, ...list } = input;

			await db.transaction(async (transaction) => {
				await transaction.insert(leadList).values({ ...list, id });
				await transaction.insert(leadListField).values(
					fields.map((field) => ({
						...field,
						id: crypto.randomUUID(),
						leadListId: id,
					}))
				);
			});

			return await getLeadListById(id);
		}),
	delete: protectedProcedure
		.input(leadListIdSchema)
		.handler(async ({ input }) => {
			const [deletedList] = await db
				.delete(leadList)
				.where(eq(leadList.id, input.id))
				.returning();

			return deletedList ?? null;
		}),
	getAll: protectedProcedure.handler(async () => {
		const lists = await db.select().from(leadList).orderBy(leadList.createdAt);

		return await Promise.all(lists.map((list) => getLeadListById(list.id)));
	}),
	getById: protectedProcedure
		.input(leadListIdSchema)
		.handler(async ({ input }) => await getLeadListById(input.id)),
	update: protectedProcedure
		.input(updateLeadListSchema)
		.handler(async ({ input }) => {
			const { fields, id, ...updates } = input;
			const cleanUpdates = Object.fromEntries(
				Object.entries(updates).filter(([, value]) => value !== undefined)
			);

			if (Object.keys(cleanUpdates).length === 0 && !fields) {
				return await getLeadListById(id);
			}

			await db.transaction(async (transaction) => {
				if (Object.keys(cleanUpdates).length > 0) {
					await transaction
						.update(leadList)
						.set(cleanUpdates)
						.where(eq(leadList.id, id));
				}

				if (fields) {
					await transaction
						.delete(leadListField)
						.where(eq(leadListField.leadListId, id));
					await transaction.insert(leadListField).values(
						fields.map((field) => ({
							...field,
							id: crypto.randomUUID(),
							leadListId: id,
						}))
					);
				}
			});

			return await getLeadListById(id);
		}),
};
