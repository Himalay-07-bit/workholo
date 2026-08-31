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
		// UI-only implementation for now.
		// Backend integration will be added later.
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
						{/* PAGE TITLE */}
						<div className="border-slate-200 border-b bg-slate-50/70 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
							<h1 className="font-medium text-[#263b5b] text-sm dark:text-slate-100">
								Add Lead List
							</h1>
						</div>

						<div className="px-5 py-5 md:px-8">
							{/* GENERAL DETAILS */}
							<section>
								<h2 className="mb-5 font-semibold text-[#263b5b] text-sm dark:text-slate-200">
									General Details
								</h2>

								<div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
									{/* NAME */}
									<div>
										<label
											className="mb-1.5 block text-[10px] text-slate-400 dark:text-slate-500"
											htmlFor="lead-list-name"
										>
											Name*
										</label>

										<div className="relative">
											<Input
												className="h-8 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 pr-7 text-slate-700 text-xs shadow-none focus:border-[#0757ff] focus:ring-0 dark:border-slate-700 dark:text-slate-200"
												id="lead-list-name"
												onChange={(event) => setName(event.target.value)}
												value={name}
											/>

											<HelpCircle className="absolute top-1/2 right-0 size-3.5 -translate-y-1/2 text-cyan-500" />
										</div>
									</div>

									{/* DESCRIPTION */}
									<div>
										<label
											className="mb-1.5 block text-[10px] text-slate-400 dark:text-slate-500"
											htmlFor="lead-list-description"
										>
											Description
										</label>

										<div className="relative">
											<Input
												className="h-8 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 pr-7 text-slate-700 text-xs shadow-none focus:border-[#0757ff] focus:ring-0 dark:border-slate-700 dark:text-slate-200"
												id="lead-list-description"
												onChange={(event) => setDescription(event.target.value)}
												value={description}
											/>

											<HelpCircle className="absolute top-1/2 right-0 size-3.5 -translate-y-1/2 text-cyan-500" />
										</div>
									</div>

									{/* SHARED WITH */}
									<div>
										<label
											className="mb-1.5 block text-[10px] text-slate-400 dark:text-slate-500"
											htmlFor="shared-with"
										>
											Shared With
										</label>

										<div className="relative">
											<select
												className="h-8 w-full appearance-none rounded-none border-0 border-slate-300 border-b bg-transparent px-0 text-slate-700 text-xs outline-none focus:border-[#0757ff] dark:border-slate-700 dark:bg-transparent dark:text-slate-200"
												id="shared-with"
												onChange={(event) => setSharedWith(event.target.value)}
												value={sharedWith}
											>
												<option value="32 selected">32 selected</option>
												<option value="All Users">All Users</option>
												<option value="Selected Users">Selected Users</option>
											</select>

											<HelpCircle className="pointer-events-none absolute top-1/2 right-0 size-3.5 -translate-y-1/2 text-slate-500" />
										</div>
									</div>

									{/* SKILL BASED ROUTING */}
									<div className="flex h-8 items-center justify-between border-slate-300 border-b dark:border-slate-700">
										<span className="text-[11px] text-slate-600 dark:text-slate-300">
											Enable Outbound Skill Based Routing
										</span>

										<button
											aria-checked={skillBasedRouting}
											className={`relative h-4 w-7 rounded-full transition-colors ${
												skillBasedRouting ? "bg-[#0757ff]" : "bg-slate-400"
											}`}
											onClick={() =>
												setSkillBasedRouting((current) => !current)
											}
											role="switch"
											type="button"
										>
											<span
												className={`absolute top-0.5 size-3 rounded-full bg-white shadow-sm transition-transform ${
													skillBasedRouting
														? "translate-x-3.5"
														: "translate-x-0.5"
												}`}
											/>
										</button>
									</div>
								</div>
							</section>

							{/* FIELD MAP */}
							<section className="mt-8">
								<h2 className="mb-1 font-semibold text-[#263b5b] text-sm dark:text-slate-200">
									Create Field Map for Leads
								</h2>

								<p className="mb-5 text-[10px] text-slate-400 dark:text-slate-500">
									Map lead fields to the columns that will be uploaded.
								</p>

								<div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
									{fields.map((field, index) => {
										const isLeftColumn = index % 2 === 0;

										return (
											<div
												className={`relative ${
													isLeftColumn ? "md:col-start-1" : "md:col-start-2"
												}`}
												key={field.id}
											>
												<label
													className="mb-1.5 block text-[10px] text-slate-400 dark:text-slate-500"
													htmlFor={`field-${field.id}`}
												>
													{field.id === 0
														? "Field 0 (For Mobile Number)"
														: `Field ${field.id}`}
												</label>

												<div className="relative">
													<Input
														className="h-8 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 pr-8 text-slate-700 text-xs shadow-none focus:border-[#0757ff] focus:ring-0 dark:border-slate-700 dark:text-slate-200"
														id={`field-${field.id}`}
														onChange={(event) =>
															updateField(field.id, event.target.value)
														}
														readOnly={field.id === 0}
														value={field.value}
													/>

													<HelpCircle className="absolute top-1/2 right-0 size-3.5 -translate-y-1/2 text-cyan-500" />
												</div>

												{/* SENSITIVE */}
												<div className="mt-1.5 flex items-center gap-1.5">
													<input
														checked={sensitiveFields.includes(field.id)}
														className="size-3 rounded border-slate-300 text-[#0757ff] focus:ring-[#0757ff]"
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

												{/* REMOVE FIELD */}
												{field.id >= 5 && (
													<button
														aria-label={`Remove Field ${field.id}`}
														className="absolute top-6 right-5 text-cyan-500 transition hover:text-red-500"
														onClick={() => removeField(field.id)}
														type="button"
													>
														<X className="size-3.5" />
													</button>
												)}
											</div>
										);
									})}
								</div>

								{/* ADD MORE */}
								<div className="mt-6">
									<Button
										className="h-8 border-slate-300 px-3 text-[11px] text-slate-600 hover:border-[#0757ff] hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
										onClick={addMoreField}
										size="sm"
										variant="outline"
									>
										<Plus className="mr-1 size-3.5" />
										Add More
									</Button>
								</div>
							</section>

							{/* ACTIONS */}
							<div className="mt-7 flex items-center gap-2 border-slate-200 border-t pt-5 dark:border-slate-800">
								<Button
									className="h-8 bg-[#0757ff] px-4 text-[11px] hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									onClick={handleSave}
									size="sm"
								>
									SAVE
								</Button>

								<Button
									className="h-8 border-slate-300 px-4 text-[11px] text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
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
