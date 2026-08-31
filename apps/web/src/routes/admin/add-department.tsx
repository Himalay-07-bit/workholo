// biome-ignore-all lint/performance/noJsxPropsBind: Department form uses local UI state.

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { Switch } from "@workholo/ui/components/switch";
import { ArrowLeft, Building2 } from "lucide-react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/add-department")({
	component: AddDepartmentPage,
});

function AddDepartmentPage() {
	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-slate-950">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
						{/* HEADER */}
						<div className="flex items-center justify-between border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950 dark:text-blue-400">
									<Building2 className="size-4" />
								</div>

								<div>
									<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-white">
										Add Department
									</h1>

									<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
										Create and configure a new department.
									</p>
								</div>
							</div>

							<Link
								className={buttonVariants({
									variant: "outline",
									className:
										"h-9 rounded-lg border-slate-200 px-3 text-slate-600 text-xs hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-400",
								})}
								to="/admin/departments"
							>
								<ArrowLeft className="mr-1.5 size-3.5" />
								Back
							</Link>
						</div>

						<div className="p-5 md:p-6">
							{/* GENERAL DETAILS */}
							<div className="mb-6">
								<h2 className="font-semibold text-[#102b55] text-sm dark:text-white">
									General Details
								</h2>

								<p className="mt-1 text-slate-400 text-xs dark:text-slate-500">
									Configure the basic department settings.
								</p>
							</div>

							{/* MAIN FIELDS */}
							<div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
								<Field label="Name*" placeholder="Enter department name" />

								<Field label="Description*" placeholder="Enter description" />

								<SelectField
									label="Ring Strategy"
									options={["Simultaneously", "Sequentially"]}
									value="Simultaneously"
								/>

								<SelectField
									label="Music On Hold"
									options={["Select any Option", "Default Music"]}
									value="Select any Option"
								/>

								<SelectField
									label="Missed Call SMS"
									options={["Select any Option", "Enabled", "Disabled"]}
									value="Select any Option"
								/>

								<SelectField
									label="Sticky Agent"
									options={["No", "Yes"]}
									value="No"
								/>

								<SelectField
									label="Use it as Queue"
									options={["Yes", "No"]}
									value="Yes"
								/>

								<Field label="Transfer Code" placeholder="" />

								<SelectField
									label="Failover Music"
									options={["Select any Option", "Default Music"]}
									value="Select any Option"
								/>

								<Field label="Queue Timeout (seconds)" placeholder="90" />

								{/* SIMULTANEOUS CALL PATCHING */}
								<div className="space-y-2">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="patching-cap"
									>
										Simultaneous Call Patching Caps Limit
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-slate-50 text-xs dark:border-slate-700 dark:bg-slate-950"
										disabled
										id="patching-cap"
									/>

									<p className="text-[10px] text-slate-400 dark:text-slate-500">
										<strong className="text-slate-500 dark:text-slate-400">
											Note:
										</strong>{" "}
										Maximum Allocated Caps Calls Limit: 5.
									</p>
								</div>
							</div>

							{/* QUEUE SETTINGS */}
							<div className="mt-8 border-slate-100 border-t pt-6 dark:border-slate-800">
								<div className="mb-5">
									<h2 className="font-semibold text-[#102b55] text-sm dark:text-white">
										Queue Settings
									</h2>

									<p className="mt-1 text-slate-400 text-xs dark:text-slate-500">
										Configure queue behavior for this department.
									</p>
								</div>

								<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
									<SwitchField label="Queue Limit" />
									<SwitchField label="Queue Welcome Announcement" />
									<SwitchField label="Queue Announce Holdtime" />
									<SwitchField label="Queue Position Announcement" />
									<SwitchField label="Queue Periodic Announcement" />
								</div>
							</div>

							{/* ACTIONS */}
							<div className="mt-8 flex flex-wrap gap-2 border-slate-100 border-t pt-5 dark:border-slate-800">
								<Button className="h-9 rounded-lg bg-[#0757ff] px-5 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500">
									Save
								</Button>

								<Link
									className={buttonVariants({
										variant: "outline",
										className:
											"h-9 rounded-lg border-slate-200 px-5 text-slate-600 text-xs hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-400",
									})}
									to="/admin/departments"
								>
									Cancel
								</Link>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
	const inputId = `department-${label
		.toLowerCase()
		.replaceAll(/[^a-z0-9]+/g, "-")}`;

	return (
		<div className="space-y-2">
			<label
				className="font-medium text-slate-500 text-xs dark:text-slate-400"
				htmlFor={inputId}
			>
				{label}
			</label>

			<Input
				className="h-9 rounded-lg border-slate-200 bg-white text-xs placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500"
				id={inputId}
				placeholder={placeholder}
			/>
		</div>
	);
}

function SelectField({
	label,
	value,
	options,
}: {
	label: string;
	value: string;
	options: string[];
}) {
	const inputId = `department-${label
		.toLowerCase()
		.replaceAll(/[^a-z0-9]+/g, "-")}`;

	return (
		<div className="space-y-2">
			<label
				className="font-medium text-slate-500 text-xs dark:text-slate-400"
				htmlFor={inputId}
			>
				{label}
			</label>

			<select
				className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-600 text-xs outline-none focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
				defaultValue={value}
				id={inputId}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

function SwitchField({ label }: { label: string }) {
	return (
		<div className="flex min-h-12 items-center justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/50">
			<span className="font-medium text-slate-600 text-xs dark:text-slate-300">
				{label}
			</span>

			<Switch />
		</div>
	);
}
