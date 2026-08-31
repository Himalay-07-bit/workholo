import { db } from "@workholo/db";
import { blockedNumber } from "@workholo/db/schema/blocked-number";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure } from "../index";

export const blockedNumberIdSchema = z.object({
	id: z.string().min(1),
});

const blockedNumberFields = {
	blockAgainst: z.enum(["account", "did", "caller-id"]),
	sourceNumber: z.string().trim().min(1),
};

export const createBlockedNumberSchema = z.object(blockedNumberFields);

export const updateBlockedNumberSchema = z.object({
	blockAgainst: blockedNumberFields.blockAgainst.optional(),
	id: z.string().min(1),
	sourceNumber: blockedNumberFields.sourceNumber.optional(),
});

export const blockedNumbersRouter = {
	create: protectedProcedure
		.input(createBlockedNumberSchema)
		.handler(async ({ input }) => {
			const [createdNumber] = await db
				.insert(blockedNumber)
				.values({ ...input, id: crypto.randomUUID() })
				.returning();

			return createdNumber;
		}),
	delete: protectedProcedure
		.input(blockedNumberIdSchema)
		.handler(async ({ input }) => {
			const [deletedNumber] = await db
				.delete(blockedNumber)
				.where(eq(blockedNumber.id, input.id))
				.returning();

			return deletedNumber ?? null;
		}),
	getAll: protectedProcedure.handler(
		async () =>
			await db.select().from(blockedNumber).orderBy(blockedNumber.createdAt)
	),
	getById: protectedProcedure
		.input(blockedNumberIdSchema)
		.handler(async ({ input }) => {
			const [foundNumber] = await db
				.select()
				.from(blockedNumber)
				.where(eq(blockedNumber.id, input.id));

			return foundNumber ?? null;
		}),
	update: protectedProcedure
		.input(updateBlockedNumberSchema)
		.handler(async ({ input }) => {
			const { id, ...updates } = input;
			const cleanUpdates = Object.fromEntries(
				Object.entries(updates).filter(([, value]) => value !== undefined)
			);

			if (Object.keys(cleanUpdates).length === 0) {
				const [existingNumber] = await db
					.select()
					.from(blockedNumber)
					.where(eq(blockedNumber.id, id));

				return existingNumber ?? null;
			}

			const [updatedNumber] = await db
				.update(blockedNumber)
				.set(cleanUpdates)
				.where(eq(blockedNumber.id, id))
				.returning();

			return updatedNumber ?? null;
		}),
};
