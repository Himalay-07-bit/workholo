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
	};

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1400px]">
					<section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* Page Header */}
						<div className="border-slate-200 border-b px-5 py-3 dark:border-slate-800">
							<h1 className="font-medium text-[#263b5b] text-lg dark:text-slate-100">
								Add Template
							</h1>
						</div>

						<form className="p-5 md:p-6" onSubmit={handleSubmit}>
							<div className="grid gap-x-10 gap-y-6 md:grid-cols-2">
								{/* Left Column */}
								<div className="space-y-6">
									<FormField label="Name" name="template-name">
										<Input
											className="h-10 rounded-none border-0 border-slate-200 border-b bg-transparent px-0 shadow-none focus-visible:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
											id="template-name"
										/>
									</FormField>

									<FormField label="SMS Text Type" name="sms-text-type">
										<select
											className="h-10 w-full rounded-none border-0 border-slate-200 border-b bg-transparent px-0 text-sm outline-none focus:border-[#0757ff] dark:border-slate-700 dark:bg-transparent"
											defaultValue="text-english"
											id="sms-text-type"
										>
											<option value="text-english">Text (For English)</option>
											<option value="unicode">Unicode</option>
										</select>
									</FormField>

									<FormField label="Message" name="template-message">
										<textarea
											className="min-h-36 w-full resize-y rounded-md border border-slate-200 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-[#0757ff] dark:border-slate-700 dark:text-slate-100"
											id="template-message"
										/>
									</FormField>

									<FormField
										label="Short URL Campaigns"
										name="short-url-campaigns"
									>
										<select
											className="h-10 w-full rounded-none border-0 border-slate-200 border-b bg-transparent px-0 text-sm outline-none focus:border-[#0757ff] dark:border-slate-700 dark:bg-transparent"
											defaultValue=""
											id="short-url-campaigns"
										>
											<option value="">Select any type</option>
										</select>
									</FormField>
								</div>

								{/* Right Column */}
								<div className="space-y-6">
									{/* Status */}
									<div className="flex items-center justify-between border-slate-200 border-b pb-3 dark:border-slate-700">
										<label
											className="font-medium text-slate-500 text-sm dark:text-slate-400"
											htmlFor="template-status"
										>
											Status
										</label>

										<Switch
											aria-label="Template status"
											checked={isEnabled}
											id="template-status"
											onCheckedChange={setIsEnabled}
										/>
									</div>

									<FormField label="Template Type" name="template-type">
										<select
											className="h-10 w-full rounded-none border-0 border-slate-200 border-b bg-transparent px-0 text-sm outline-none focus:border-[#0757ff] dark:border-slate-700 dark:bg-transparent"
											defaultValue=""
											id="template-type"
										>
											<option value="">Select any type</option>
										</select>
									</FormField>

									<FormField label="Destination URL" name="destination-url">
										<Input
											className="h-10 rounded-none border-0 border-slate-200 border-b bg-transparent px-0 shadow-none focus-visible:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
											id="destination-url"
											type="url"
										/>
									</FormField>
								</div>
							</div>

							{/* Actions */}
							<div className="mt-8 flex gap-2 border-slate-200 border-t pt-5 dark:border-slate-800">
								<Button
									className="bg-[#0757ff] hover:bg-[#004be0]"
									type="submit"
								>
									Save
								</Button>

								<Button
									onClick={() =>
										navigate({
											to: "/admin/sms-templates",
										})
									}
									type="button"
									variant="outline"
								>
									Cancel
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
		<div className="space-y-1.5">
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
