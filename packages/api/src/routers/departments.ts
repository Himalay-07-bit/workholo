import { db } from "@workholo/db";
import { department } from "@workholo/db/schema/department";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { protectedProcedure } from "../index";

export const departmentIdSchema = z.object({
	id: z.string().min(1),
});

export const createDepartmentSchema = z.object({
	description: z.string().default(""),
	failoverMusic: z.string().default("Select any Option"),
	missedCallSms: z.string().default("Select any Option"),
	musicOnHold: z.string().default("Select any Option"),
	name: z.string().min(1),
	queueAnnounceHoldtime: z.boolean().default(false),
	queueLimit: z.boolean().default(false),
	queuePeriodicAnnouncement: z.boolean().default(false),
	queuePositionAnnouncement: z.boolean().default(false),
	queueTimeout: z.number().int().min(0).max(3600).default(90),
	queueWelcomeAnnouncement: z.boolean().default(false),
	ringStrategy: z
		.enum(["Simultaneously", "Sequentially"])
		.default("Simultaneously"),
	simultaneousCallPatchingCapsLimit: z.number().int().min(0).max(5).default(0),
	stickyAgent: z.boolean().default(false),
	transferCode: z.string().default(""),
	useItAsQueue: z.boolean().default(true),
});

export const updateDepartmentSchema = z.object({
	description: z.string().optional(),
	failoverMusic: z.string().optional(),
	id: z.string().min(1),
	missedCallSms: z.string().optional(),
	musicOnHold: z.string().optional(),
	name: z.string().min(1).optional(),
	queueAnnounceHoldtime: z.boolean().optional(),
	queueLimit: z.boolean().optional(),
	queuePeriodicAnnouncement: z.boolean().optional(),
	queuePositionAnnouncement: z.boolean().optional(),
	queueTimeout: z.number().int().min(0).max(3600).optional(),
	queueWelcomeAnnouncement: z.boolean().optional(),
	ringStrategy: z.enum(["Simultaneously", "Sequentially"]).optional(),
	simultaneousCallPatchingCapsLimit: z.number().int().min(0).max(5).optional(),
	stickyAgent: z.boolean().optional(),
	transferCode: z.string().optional(),
	useItAsQueue: z.boolean().optional(),
});

export const departmentsRouter = {
	create: protectedProcedure
		.input(createDepartmentSchema)
		.handler(async ({ input }) => {
			const [createdDepartment] = await db
				.insert(department)
				.values({
					...input,
					id: crypto.randomUUID(),
				})
				.returning();

			return createdDepartment;
		}),
	delete: protectedProcedure
		.input(departmentIdSchema)
		.handler(async ({ input }) => {
			const [deletedDepartment] = await db
				.delete(department)
				.where(eq(department.id, input.id))
				.returning();

			return deletedDepartment;
		}),
	getAll: protectedProcedure.handler(
		async () => await db.select().from(department).orderBy(department.createdAt)
	),
	getById: protectedProcedure
		.input(departmentIdSchema)
		.handler(async ({ input }) => {
			const [foundDepartment] = await db
				.select()
				.from(department)
				.where(eq(department.id, input.id));

			return foundDepartment ?? null;
		}),
	update: protectedProcedure
		.input(updateDepartmentSchema)
		.handler(async ({ input }) => {
			const { id, ...updates } = input;
			const cleanUpdates = Object.fromEntries(
				Object.entries(updates).filter(([, value]) => value !== undefined)
			);

			if (Object.keys(cleanUpdates).length === 0) {
				const [existingDepartment] = await db
					.select()
					.from(department)
					.where(eq(department.id, id));

				return existingDepartment ?? null;
			}

			const [updatedDepartment] = await db
				.update(department)
				.set(cleanUpdates)
				.where(eq(department.id, id))
				.returning();

			return updatedDepartment ?? null;
		}),
};
