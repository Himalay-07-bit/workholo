import { db } from "@workholo/db";
import { inboundQueue } from "@workholo/db/schema/inbound-queue";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure } from "../index";

export const inboundQueueIdSchema = z.object({
	id: z.string().min(1),
});

const inboundQueueFields = {
	agent: z.string().default(""),
	agentPriority: z.boolean().default(false),
	agentRingTime: z.number().int().min(0).default(30),
	callbackCrossover: z.boolean().default(false),
	description: z.string().default(""),
	enableQueueUrl: z.boolean().default(false),
	enableRepeatCaller: z.boolean().default(false),
	followMe: z.string().default("Select any Option"),
	followUserGroup: z.string().default("Hangup"),
	musicOnHold: z.string().default("Select any Option"),
	name: z.string().min(1),
	pbxconfigId: z.string().default(""),
	positionAnnouncement: z.boolean().default(false),
	queueTimeout: z.number().int().min(0).default(90),
	ringStrategy: z
		.enum(["Random", "Longest Wait Time", "Round Robin"])
		.default("Random"),
	sbcMissedCallAgent: z.string().default("Select any Option"),
	sbcMissedCallCaller: z.string().default("Select any Option"),
	slaDuration: z.number().int().min(0).default(0),
	stickyAgent: z.boolean().default(false),
	transferCode: z.string().default(""),
	waitAnnouncement: z.boolean().default(false),
	webhookMissedCallAgent: z.string().default("Select any Option"),
	webhookMissedCallCaller: z.string().default("Select any Option"),
	welcomeAnnouncement: z.string().default("Select any Option"),
};

export const createInboundQueueSchema = z.object(inboundQueueFields);

export const updateInboundQueueSchema = z.object({
	agent: inboundQueueFields.agent.optional(),
	agentPriority: inboundQueueFields.agentPriority.optional(),
	agentRingTime: inboundQueueFields.agentRingTime.optional(),
	callbackCrossover: inboundQueueFields.callbackCrossover.optional(),
	description: inboundQueueFields.description.optional(),
	enableQueueUrl: inboundQueueFields.enableQueueUrl.optional(),
	enableRepeatCaller: inboundQueueFields.enableRepeatCaller.optional(),
	followMe: inboundQueueFields.followMe.optional(),
	followUserGroup: inboundQueueFields.followUserGroup.optional(),
	id: z.string().min(1),
	musicOnHold: inboundQueueFields.musicOnHold.optional(),
	name: inboundQueueFields.name.optional(),
	pbxconfigId: inboundQueueFields.pbxconfigId.optional(),
	positionAnnouncement: inboundQueueFields.positionAnnouncement.optional(),
	queueTimeout: inboundQueueFields.queueTimeout.optional(),
	ringStrategy: inboundQueueFields.ringStrategy.optional(),
	sbcMissedCallAgent: inboundQueueFields.sbcMissedCallAgent.optional(),
	sbcMissedCallCaller: inboundQueueFields.sbcMissedCallCaller.optional(),
	slaDuration: inboundQueueFields.slaDuration.optional(),
	stickyAgent: inboundQueueFields.stickyAgent.optional(),
	transferCode: inboundQueueFields.transferCode.optional(),
	waitAnnouncement: inboundQueueFields.waitAnnouncement.optional(),
	webhookMissedCallAgent: inboundQueueFields.webhookMissedCallAgent.optional(),
	webhookMissedCallCaller:
		inboundQueueFields.webhookMissedCallCaller.optional(),
	welcomeAnnouncement: inboundQueueFields.welcomeAnnouncement.optional(),
});

export const inboundQueuesRouter = {
	create: protectedProcedure
		.input(createInboundQueueSchema)
		.handler(async ({ input }) => {
			const [createdQueue] = await db
				.insert(inboundQueue)
				.values({ ...input, id: crypto.randomUUID() })
				.returning();

			return createdQueue;
		}),
	delete: protectedProcedure
		.input(inboundQueueIdSchema)
		.handler(async ({ input }) => {
			const [deletedQueue] = await db
				.delete(inboundQueue)
				.where(eq(inboundQueue.id, input.id))
				.returning();

			return deletedQueue ?? null;
		}),
	getAll: protectedProcedure.handler(
		async () =>
			await db.select().from(inboundQueue).orderBy(inboundQueue.createdAt)
	),
	getById: protectedProcedure
		.input(inboundQueueIdSchema)
		.handler(async ({ input }) => {
			const [foundQueue] = await db
				.select()
				.from(inboundQueue)
				.where(eq(inboundQueue.id, input.id));

			return foundQueue ?? null;
		}),
	update: protectedProcedure
		.input(updateInboundQueueSchema)
		.handler(async ({ input }) => {
			const { id, ...updates } = input;
			const cleanUpdates = Object.fromEntries(
				Object.entries(updates).filter(([, value]) => value !== undefined)
			);

			if (Object.keys(cleanUpdates).length === 0) {
				const [existingQueue] = await db
					.select()
					.from(inboundQueue)
					.where(eq(inboundQueue.id, id));

				return existingQueue ?? null;
			}

			const [updatedQueue] = await db
				.update(inboundQueue)
				.set(cleanUpdates)
				.where(eq(inboundQueue.id, id))
				.returning();

			return updatedQueue ?? null;
		}),
};
