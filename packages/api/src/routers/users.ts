import { db } from "@workholo/db";
import { user } from "@workholo/db/schema/auth";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure } from "../index";

export const userIdSchema = z.object({
	id: z.string().min(1),
});

export const createUserSchema = z.object({
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
});

export const updateUserSchema = z.object({
	email: z.string().email().optional(),
	emailVerified: z.boolean().optional(),
	id: z.string().min(1),
	image: z
		.string()
		.url()
		.optional()
		.or(z.literal(""))
		.transform((value) => (value === "" ? undefined : value)),
	name: z.string().min(1).optional(),
});

export const usersRouter = {
	create: protectedProcedure
		.input(createUserSchema)
		.handler(async ({ input }) => {
			const [createdUser] = await db
				.insert(user)
				.values({
					email: input.email,
					emailVerified: input.emailVerified,
					id: crypto.randomUUID(),
					image: input.image,
					name: input.name,
				})
				.returning();

			return createdUser;
		}),
	delete: protectedProcedure.input(userIdSchema).handler(async ({ input }) => {
		const [deletedUser] = await db
			.delete(user)
			.where(eq(user.id, input.id))
			.returning();

		return deletedUser;
	}),
	getAll: protectedProcedure.handler(
		async () => await db.select().from(user).orderBy(user.createdAt)
	),
	getById: protectedProcedure.input(userIdSchema).handler(async ({ input }) => {
		const [foundUser] = await db
			.select()
			.from(user)
			.where(eq(user.id, input.id));

		return foundUser ?? null;
	}),
	update: protectedProcedure
		.input(updateUserSchema)
		.handler(async ({ input }) => {
			const { id, ...updates } = input;
			const cleanUpdates = Object.fromEntries(
				Object.entries(updates).filter(([, value]) => value !== undefined)
			);

			if (Object.keys(cleanUpdates).length === 0) {
				const [existingUser] = await db
					.select()
					.from(user)
					.where(eq(user.id, id));

				return existingUser ?? null;
			}

			const [updatedUser] = await db
				.update(user)
				.set(cleanUpdates)
				.where(eq(user.id, id))
				.returning();

			return updatedUser ?? null;
		}),
};
