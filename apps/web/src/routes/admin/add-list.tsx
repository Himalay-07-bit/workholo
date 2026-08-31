// biome-ignore-all lint/performance/noJsxPropsBind: Form controls use local component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { HelpCircle, Plus, X } from "lucide-react";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/add-list")({
	component: AddListPage,
});

type LeadField = {
	id: number;
	value: string;
};

const initialFields: LeadField[] = [
	{ id: 0, value: "Phone Number" },
	{ id: 1, value: "Name" },
	{ id: 2, value: "Email Id" },
	{ id: 3, value: "Address" },
	{ id: 4, value: "Company Name" },
	{ id: 5, value: "" },
];

function AddListPage() {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [sharedWith, setSharedWith] = useState("32 selected");
	const [skillBasedRouting, setSkillBasedRouting] = useState(false);
	const [fields, setFields] = useState<LeadField[]>(initialFields);
	const [sensitiveFields, setSensitiveFields] = useState<number[]>([]);

	const updateField = (id: number, value: string) => {
		setFields((currentFields) =>
			currentFields.map((field) =>
				field.id === id ? { ...field, value } : field
			)
		);
	};

	const toggleSensitive = (id: number) => {
		setSensitiveFields((current) =>
			current.includes(id)
				? current.filter((fieldId) => fieldId !== id)
				: [...current, id]
		);
	};

	const addMoreField = () => {
		const nextId =
			fields.length > 0 ? Math.max(...fields.map((field) => field.id)) + 1 : 0;

		setFields((currentFields) => [
			...currentFields,
			{
				id: nextId,
				value: "",
			},
		]);
	};

	const removeField = (id: number) => {
		if (id === 0) {
			return;
		}

		setFields((currentFields) =>
			currentFields.filter((field) => field.id !== id)
		);

		setSensitiveFields((current) =>
			current.filter((fieldId) => fieldId !== id)
		);
	};

	const handleSave = () => {
		console.log({
			name,
			description,
			sharedWith,
			skillBasedRouting,
			fields,
			sensitiveFields,
		});
	};

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE CARD */}
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* PAGE HEADER */}
						<div className="border-slate-200 border-b bg-slate-50/70 px-5 py-3.5 dark:border-slate-800 dark:bg-slate-900/60">
							<div className="flex items-center gap-2">
								<div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
									<Plus className="size-4" />
								</div>

								<div>
									<h1 className="font-semibold text-[#263b5b] text-sm dark:text-slate-100">
										Add Lead List
									</h1>

									<p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
										Create and configure a new lead list.
									</p>
								</div>
							</div>
						</div>

						<div className="p-5 md:p-7">
							{/* GENERAL DETAILS */}
							<section>
								<div className="mb-5 flex items-center gap-2">
									<span className="h-5 w-1 rounded-full bg-[#0757ff]" />

									<h2 className="font-semibold text-[#263b5b] text-sm dark:text-slate-200">
										General Details
									</h2>
								</div>

								<div className="grid gap-5 md:grid-cols-2">
									{/* NAME */}
									<FormField help id="lead-list-name" label="Name*">
										<Input
											className="h-9 rounded-lg border-slate-200 bg-white pr-9 text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
											id="lead-list-name"
											onChange={(event) => setName(event.target.value)}
											placeholder="Enter lead list name"
											value={name}
										/>
									</FormField>

									{/* DESCRIPTION */}
									<FormField
										help
										id="lead-list-description"
										label="Description"
									>
										<Input
											className="h-9 rounded-lg border-slate-200 bg-white pr-9 text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
											id="lead-list-description"
											onChange={(event) => setDescription(event.target.value)}
											placeholder="Enter description"
											value={description}
										/>
									</FormField>

									{/* SHARED WITH */}
									<FormField help id="shared-with" label="Shared With">
										<div className="relative">
											<select
												className="h-9 w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 pr-9 text-slate-700 text-xs shadow-sm outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
												id="shared-with"
												onChange={(event) => setSharedWith(event.target.value)}
												value={sharedWith}
											>
												<option value="32 selected">32 selected</option>
												<option value="All Users">All Users</option>
												<option value="Selected Users">Selected Users</option>
											</select>

											<HelpCircle className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-slate-400" />
										</div>
									</FormField>

									{/* SKILL ROUTING */}
									<div className="flex min-h-9 items-center justify-between rounded-lg border border-slate-200 bg-white px-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
										<div>
											<p className="font-medium text-[11px] text-slate-600 dark:text-slate-300">
												Enable Outbound Skill Based Routing
											</p>

											<p className="mt-0.5 text-[9px] text-slate-400 dark:text-slate-500">
												Route leads based on agent skills.
											</p>
										</div>

										<button
											aria-checked={skillBasedRouting}
											className={`relative flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
												skillBasedRouting
													? "justify-end bg-[#0757ff]"
													: "justify-start bg-slate-300 dark:bg-slate-600"
											}`}
											onClick={() =>
												setSkillBasedRouting((current) => !current)
											}
											role="switch"
											type="button"
										>
											<span className="size-4 rounded-full bg-white shadow-sm" />
										</button>
									</div>
								</div>
							</section>

							{/* FIELD MAP */}
							<section className="mt-8 border-slate-200 border-t pt-7 dark:border-slate-800">
								<div className="mb-5 flex items-center gap-2">
									<span className="h-5 w-1 rounded-full bg-[#0757ff]" />

									<div>
										<h2 className="font-semibold text-[#263b5b] text-sm dark:text-slate-200">
											Create Field Map for Leads
										</h2>

										<p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
											Map lead fields to the columns that will be uploaded.
										</p>
									</div>
								</div>

								<div className="grid gap-5 md:grid-cols-2">
									{fields.map((field, index) => {
										const isLeftColumn = index % 2 === 0;

										return (
											<div
												className={`relative ${
													isLeftColumn ? "md:col-start-1" : "md:col-start-2"
												}`}
												key={field.id}
											>
												<div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900">
													<div className="mb-2 flex items-center justify-between">
														<label
															className="font-medium text-[10px] text-slate-500 dark:text-slate-400"
															htmlFor={`field-${field.id}`}
														>
															{field.id === 0
																? "Field 0 (For Mobile Number)"
																: `Field ${field.id}`}
														</label>

														{field.id >= 5 && (
															<button
																aria-label={`Remove Field ${field.id}`}
																className="text-slate-400 transition hover:text-red-500 dark:text-slate-500"
																onClick={() => removeField(field.id)}
																type="button"
															>
																<X className="size-3.5" />
															</button>
														)}
													</div>

													<div className="relative">
														<Input
															className="h-9 rounded-lg border-slate-200 bg-slate-50 pr-9 text-xs shadow-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
															id={`field-${field.id}`}
															onChange={(event) =>
																updateField(field.id, event.target.value)
															}
															placeholder={
																field.id === 0
																	? "Phone Number"
																	: "Enter field name"
															}
															readOnly={field.id === 0}
															value={field.value}
														/>

														<HelpCircle className="absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-slate-400" />
													</div>

													<div className="mt-2 flex items-center gap-2">
														<input
															checked={sensitiveFields.includes(field.id)}
															className="size-3.5 rounded border-slate-300 accent-[#0757ff]"
															id={`sensitive-${field.id}`}
															onChange={() => toggleSensitive(field.id)}
															type="checkbox"
														/>

														<label
															className="text-[10px] text-slate-500 dark:text-slate-400"
															htmlFor={`sensitive-${field.id}`}
														>
															Sensitive
														</label>
													</div>
												</div>
											</div>
										);
									})}
								</div>

								{/* ADD MORE */}
								<div className="mt-5">
									<Button
										className="h-9 rounded-lg border-slate-200 px-3 text-[11px] text-slate-600 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
										onClick={addMoreField}
										size="sm"
										variant="outline"
									>
										<Plus className="mr-1.5 size-3.5" />
										Add More
									</Button>
								</div>
							</section>

							{/* ACTIONS */}
							<div className="mt-7 flex items-center gap-2 border-slate-200 border-t pt-5 dark:border-slate-800">
								<Button
									className="h-9 rounded-lg bg-[#0757ff] px-5 text-[11px] shadow-blue-500/15 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									onClick={handleSave}
									size="sm"
								>
									SAVE
								</Button>

								<Button
									className="h-9 rounded-lg border-slate-200 bg-white px-5 text-[11px] text-slate-500 shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
									onClick={() => navigate({ to: "/admin/manage-leads" })}
									size="sm"
									variant="outline"
								>
									CANCEL
								</Button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

function FormField({
	id,
	label,
	help = false,
	children,
}: {
	id: string;
	label: string;
	help?: boolean;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-1.5">
			<div className="flex items-center gap-1">
				<label
					className="font-medium text-[10px] text-slate-500 dark:text-slate-400"
					htmlFor={id}
				>
					{label}
				</label>

				{!!help && <HelpCircle className="size-3 text-cyan-500" />}
			</div>

			{children}
		</div>
	);
}
