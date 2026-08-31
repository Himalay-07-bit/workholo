import { db } from "@workholo/db";
import { platformUser } from "@workholo/db/schema/platform-user";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure } from "../index";

export const platformUserIdSchema = z.object({
	id: z.string().min(1),
});

const platformUserFields = {
	agentDispositions: z.boolean().default(false),
	autoGeneratePassword: z.boolean().default(true),
	blockWebLogin: z.boolean().default(false),
	callerIds: z.string().default(""),
	callForwardNumber: z.string().default(""),
	callingAgent: z.boolean().default(true),
	createExtension: z.boolean().default(false),
	department: z.string().default(""),
	designation: z.string().default(""),
	email: z.string().email(),
	loginBasedCalling: z.boolean().default(false),
	loginId: z.string().min(1),
	name: z.string().min(1),
	phone: z.string().min(1),
	role: z.enum(["Agent", "Supervisor", "Admin"]).default("Agent"),
	team: z.string().default(""),
	twoFactor: z.boolean().default(false),
};

export const createPlatformUserSchema = z.object(platformUserFields);

export const updatePlatformUserSchema = z.object({
	agentDispositions: platformUserFields.agentDispositions.optional(),
	autoGeneratePassword: platformUserFields.autoGeneratePassword.optional(),
	blockWebLogin: platformUserFields.blockWebLogin.optional(),
	callerIds: platformUserFields.callerIds.optional(),
	callForwardNumber: platformUserFields.callForwardNumber.optional(),
	callingAgent: platformUserFields.callingAgent.optional(),
	createExtension: platformUserFields.createExtension.optional(),
	department: platformUserFields.department.optional(),
	designation: platformUserFields.designation.optional(),
	email: platformUserFields.email.optional(),
	id: z.string().min(1),
	loginBasedCalling: platformUserFields.loginBasedCalling.optional(),
	loginId: platformUserFields.loginId.optional(),
	name: platformUserFields.name.optional(),
	phone: platformUserFields.phone.optional(),
	role: platformUserFields.role.optional(),
	team: platformUserFields.team.optional(),
	twoFactor: platformUserFields.twoFactor.optional(),
});

export const platformUsersRouter = {
	create: protectedProcedure
		.input(createPlatformUserSchema)
		.handler(async ({ input }) => {
			const [createdUser] = await db
				.insert(platformUser)
				.values({ ...input, id: crypto.randomUUID() })
				.returning();

			return createdUser;
		}),
	delete: protectedProcedure
		.input(platformUserIdSchema)
		.handler(async ({ input }) => {
			const [deletedUser] = await db
				.delete(platformUser)
				.where(eq(platformUser.id, input.id))
				.returning();

			return deletedUser ?? null;
		}),
	getAll: protectedProcedure.handler(
		async () =>
			await db.select().from(platformUser).orderBy(platformUser.createdAt)
	),
	getById: protectedProcedure
		.input(platformUserIdSchema)
		.handler(async ({ input }) => {
			const [foundUser] = await db
				.select()
				.from(platformUser)
				.where(eq(platformUser.id, input.id));

			return foundUser ?? null;
		}),
	update: protectedProcedure
		.input(updatePlatformUserSchema)
		.handler(async ({ input }) => {
			const { id, ...updates } = input;
			const cleanUpdates = Object.fromEntries(
				Object.entries(updates).filter(([, value]) => value !== undefined)
			);

			if (Object.keys(cleanUpdates).length === 0) {
				const [existingUser] = await db
					.select()
					.from(platformUser)
					.where(eq(platformUser.id, id));

				return existingUser ?? null;
			}

			const [updatedUser] = await db
				.update(platformUser)
				.set(cleanUpdates)
				.where(eq(platformUser.id, id))
				.returning();

			return updatedUser ?? null;
		}),
};
