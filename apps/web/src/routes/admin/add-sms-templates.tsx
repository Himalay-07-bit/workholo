// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { Switch } from "@workholo/ui/components/switch";
import { Info } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/add-sms-templates")({
	component: AddSmsTemplatesPage,
});

function AddSmsTemplatesPage() {
	const navigate = useNavigate();
	const [isEnabled, setIsEnabled] = useState(true);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// UI only for now.
	};

	const handleCancel = () => {
		navigate({
			to: "/admin/sms-templates",
		});
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-slate-950">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
						{/* HEADER */}
						<div className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-white">
								Add Template
							</h1>

							<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
								Create a new SMS template.
							</p>
						</div>

						{/* FORM */}
						<form className="p-5 md:p-6" onSubmit={handleSubmit}>
							<div className="grid gap-x-8 gap-y-5 md:grid-cols-2">
								{/* LEFT COLUMN */}
								<div className="space-y-5">
									<FormField label="Name" name="template-name">
										<Input
											className="h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-xs shadow-none placeholder:text-slate-400 focus-visible:border-[#0757ff] focus-visible:ring-4 focus-visible:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500"
											id="template-name"
											placeholder="Enter template name"
										/>
									</FormField>

									<FormField label="SMS Text Type" name="sms-text-type">
										<select
											className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs outline-none transition-all focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
											defaultValue="text-english"
											id="sms-text-type"
										>
											<option value="text-english">Text (For English)</option>
											<option value="unicode">Unicode</option>
										</select>
									</FormField>

									<FormField label="Message" name="template-message">
										<textarea
											className="min-h-36 w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-700 text-xs outline-none transition-all placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500"
											id="template-message"
											placeholder="Enter your SMS message"
										/>
									</FormField>

									<FormField
										label="Short URL Campaigns"
										name="short-url-campaigns"
									>
										<select
											className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs outline-none transition-all focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
											defaultValue=""
											id="short-url-campaigns"
										>
											<option value="">Select any type</option>
										</select>
									</FormField>
								</div>

								{/* RIGHT COLUMN */}
								<div className="space-y-5">
									{/* STATUS */}
									<div className="flex min-h-9 items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 dark:border-slate-700 dark:bg-slate-950/50">
										<span className="font-medium text-slate-500 text-xs dark:text-slate-400">
											Status
										</span>

										<Switch
											aria-label="Template status"
											checked={isEnabled}
											id="template-status"
											onCheckedChange={setIsEnabled}
										/>
									</div>

									<FormField label="Template Type" name="template-type">
										<select
											className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs outline-none transition-all focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
											defaultValue=""
											id="template-type"
										>
											<option value="">Select any type</option>
										</select>
									</FormField>

									<FormField label="Destination URL" name="destination-url">
										<Input
											className="h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-xs shadow-none placeholder:text-slate-400 focus-visible:border-[#0757ff] focus-visible:ring-4 focus-visible:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500"
											id="destination-url"
											placeholder="https://example.com"
											type="url"
										/>
									</FormField>
								</div>
							</div>

							{/* ACTIONS */}
							<div className="mt-6 flex flex-wrap justify-end gap-2 border-slate-100 border-t pt-5 dark:border-slate-800">
								<Button
									className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs dark:border-slate-700 dark:text-slate-300"
									onClick={handleCancel}
									type="button"
									variant="outline"
								>
									Cancel
								</Button>

								<Button
									className="h-9 rounded-lg bg-[#0757ff] px-5 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									type="submit"
								>
									Save
								</Button>
							</div>
						</form>
					</section>
				</div>
			</main>
		</div>
	);
}

function FormField({
	children,
	label,
	name,
}: {
	children: ReactNode;
	label: string;
	name: string;
}) {
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between gap-2">
				<label
					className="font-medium text-slate-500 text-xs dark:text-slate-400"
					htmlFor={name}
				>
					{label}
				</label>

				<Info
					aria-label={`${label} information`}
					className="size-3.5 text-slate-400"
					role="img"
				/>
			</div>

			{children}
		</div>
	);
}
