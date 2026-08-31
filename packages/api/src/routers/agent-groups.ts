import { db } from "@workholo/db";
import { agentGroup } from "@workholo/db/schema/agent-group";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure } from "../index";

export const agentGroupIdSchema = z.object({
	id: z.string().min(1),
});

export const createAgentGroupSchema = z.object({
	description: z.string().default(""),
	name: z.string().min(1),
});

export const updateAgentGroupSchema = z.object({
	description: z.string().optional(),
	id: z.string().min(1),
	name: z.string().min(1).optional(),
});

export const agentGroupsRouter = {
	create: protectedProcedure
		.input(createAgentGroupSchema)
		.handler(async ({ input }) => {
			const [createdGroup] = await db
				.insert(agentGroup)
				.values({ ...input, id: crypto.randomUUID() })
				.returning();

			return createdGroup;
		}),
	delete: protectedProcedure
		.input(agentGroupIdSchema)
		.handler(async ({ input }) => {
			const [deletedGroup] = await db
				.delete(agentGroup)
				.where(eq(agentGroup.id, input.id))
				.returning();

			return deletedGroup ?? null;
		}),
	getAll: protectedProcedure.handler(
		async () => await db.select().from(agentGroup).orderBy(agentGroup.createdAt)
	),
	getById: protectedProcedure
		.input(agentGroupIdSchema)
		.handler(async ({ input }) => {
			const [foundGroup] = await db
				.select()
				.from(agentGroup)
				.where(eq(agentGroup.id, input.id));

			return foundGroup ?? null;
		}),
	update: protectedProcedure
		.input(updateAgentGroupSchema)
		.handler(async ({ input }) => {
			const { id, ...updates } = input;
			const cleanUpdates = Object.fromEntries(
				Object.entries(updates).filter(([, value]) => value !== undefined)
			);

			if (Object.keys(cleanUpdates).length === 0) {
				const [existingGroup] = await db
					.select()
					.from(agentGroup)
					.where(eq(agentGroup.id, id));

				return existingGroup ?? null;
			}

			const [updatedGroup] = await db
				.update(agentGroup)
				.set(cleanUpdates)
				.where(eq(agentGroup.id, id))
				.returning();

			return updatedGroup ?? null;
		}),
};
