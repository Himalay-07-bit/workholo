// biome-ignore-all lint/performance/noJsxPropsBind: Wizard controls intentionally use component state.

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { ChevronRight, PhoneCall } from "lucide-react";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/add-dialer-campaign")({
	component: AddDialerCampaignPage,
});

const steps = [
	"1. Basic Settings",
	"2. Agent Settings",
	"3. Advanced Settings (Optional)",
];

function getStepClass(stepNumber: number, currentStep: number) {
	if (stepNumber === currentStep) {
		return "bg-[#0757ff] text-white shadow-blue-500/20 shadow-sm dark:bg-blue-600";
	}

	if (stepNumber < currentStep) {
		return "bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400";
	}

	return "border border-slate-200 bg-slate-50 text-slate-500 hover:border-blue-200 hover:bg-blue-50/50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/30";
}

function getStepNumberClass(stepNumber: number, currentStep: number) {
	if (stepNumber === currentStep) {
		return "bg-white/20 text-white";
	}

	if (stepNumber < currentStep) {
		return "bg-blue-100 text-[#0757ff] dark:bg-blue-900 dark:text-blue-400";
	}

	return "bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400";
}

function AddDialerCampaignPage() {
	const [step, setStep] = useState(1);

	const goNext = () => {
		setStep((current) => Math.min(3, current + 1));
	};

	const goPrevious = () => {
		setStep((current) => Math.max(1, current - 1));
	};

	const cancel = () => {
		window.history.back();
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-slate-950">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
						{/* HEADER */}
						<div className="flex items-center gap-3 border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950 dark:text-blue-400">
								<PhoneCall className="size-4" />
							</div>

							<div>
								<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-white">
									Add Dialer Campaign
								</h1>

								<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
									Create and configure a new dialer campaign.
								</p>
							</div>
						</div>

						<div className="p-5 md:p-6">
							{/* STEP NAVIGATION */}
							<div className="mb-5 grid gap-2 md:grid-cols-3">
								{steps.map((item, index) => {
									const stepNumber = index + 1;
									const active = stepNumber === step;

									return (
										<button
											className={`flex h-11 items-center gap-2 rounded-lg px-4 text-left font-semibold text-xs transition-all ${getStepClass(
												stepNumber,
												step
											)}`}
											key={item}
											onClick={() => setStep(stepNumber)}
											type="button"
										>
											<span
												className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] ${getStepNumberClass(
													stepNumber,
													step
												)}`}
											>
												{stepNumber}
											</span>

											<span>{item.slice(3)}</span>

											{active ? (
												<ChevronRight className="ml-auto size-3.5" />
											) : null}
										</button>
									);
								})}
							</div>

							{/* STEP 1 */}
							{step === 1 ? (
								<div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
									<div className="border-slate-100 border-b bg-slate-50/70 px-5 py-3 dark:border-slate-800 dark:bg-slate-950/50">
										<h2 className="font-semibold text-[#102b55] text-sm dark:text-white">
											Basic Settings
										</h2>

										<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
											Configure the basic campaign information.
										</p>
									</div>

									<div className="grid gap-x-8 gap-y-5 p-5 md:grid-cols-2">
										<div className="space-y-5">
											<Field label="Name*" />

											<SelectField
												label="Dial Method*"
												options={["Preview", "Progressive", "Predictive"]}
												value="Preview"
											/>

											<SelectField
												label="Disposition List*"
												options={["CRLAB", "CRM", "CRLA", "CRLB"]}
												value="CRLAB"
											/>

											<Field label="Wrap Up Time (In Seconds)*" value="30" />

											<Field label="Refresh Count" value="1" />

											<Field
												label="After Call Work Duration (In Seconds)*"
												value="0"
											/>
										</div>

										<div className="space-y-5">
											<Field label="Description" />

											<Field
												label="Preview Duration (In Seconds)*"
												value="10"
											/>

											<div className="grid grid-cols-[1fr_auto] gap-3">
												<SelectField
													label="Campaign Caller ID*"
													options={[
														"Select options",
														"+918064370287",
														"+917965369371",
													]}
													value="Select options"
												/>

												<Button
													className="mt-6 h-9 border-slate-200 text-slate-600 text-xs dark:border-slate-700 dark:text-slate-300"
													type="button"
													variant="outline"
												>
													Select Lead List(s)
												</Button>
											</div>

											<SelectField
												label="Dial Status*"
												options={["New", "Pending", "Completed"]}
												value="New"
											/>

											<Field
												label="Refresh Interval (DD:HH:MM)"
												value="00:00:30"
											/>
										</div>
									</div>
								</div>
							) : null}

							{/* STEP 2 */}
							{step === 2 ? (
								<div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
									<div className="border-slate-100 border-b bg-slate-50/70 px-5 py-3 dark:border-slate-800 dark:bg-slate-950/50">
										<h2 className="font-semibold text-[#102b55] text-sm dark:text-white">
											Agent Settings
										</h2>

										<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
											Configure how agents connect to the campaign.
										</p>
									</div>

									<div className="grid gap-x-8 gap-y-5 p-5 md:grid-cols-2">
										<div className="space-y-5">
											<SelectField
												label="Agent Connection Method*"
												options={[
													"Dial In (Session)",
													"Browser",
													"Auto Connect",
												]}
												value="Dial In (Session)"
											/>

											<SelectField
												label="Enforce Agent Pause Code"
												options={["Disable Pause Code", "Enable Pause Code"]}
												value="Disable Pause Code"
											/>

											<Field
												label="Agent Dial-In Number*"
												value="918068211299"
											/>
										</div>

										<div className="space-y-5">
											<SelectField
												label="Agent*"
												options={[
													"Select options",
													"Meera",
													"CRLA Zainab",
													"CRLA Tasneem",
												]}
												value="Select options"
											/>

											<Field label="Ring Timeout (In Seconds)*" value="30" />

											<ToggleField label="Agent Only Callback" />
										</div>
									</div>
								</div>
							) : null}

							{/* STEP 3 */}
							{step === 3 ? (
								<div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
									<div className="border-slate-100 border-b bg-slate-50/70 px-5 py-3 dark:border-slate-800 dark:bg-slate-950/50">
										<h2 className="font-semibold text-[#102b55] text-sm dark:text-white">
											Advanced Settings
										</h2>

										<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
											Optional campaign configuration.
										</p>
									</div>

									<div className="grid gap-x-8 gap-y-5 p-5 md:grid-cols-2">
										<SelectField
											label="Agent Voice Greeting"
											options={[
												"Select an option",
												"Default",
												"Custom Greeting",
											]}
											value="Select an option"
										/>

										<SelectField
											label="Caller ID Type"
											options={["Select an option", "Random", "Fixed"]}
											value="Select an option"
										/>

										<SelectField
											label="Campaign Script"
											options={["Select an option", "Default"]}
											value="Select an option"
										/>

										<SelectField
											label="Time Group"
											options={["Select Time Group", "Business Hours", "24x7"]}
											value="Select Time Group"
										/>

										<SelectField
											label="Account Timezone"
											options={["Asia/Kolkata", "UTC", "Asia/Dubai"]}
											value="Asia/Kolkata"
										/>

										<SelectField
											label="Add Transfer List"
											options={["Select an option", "Default List"]}
											value="Select an option"
										/>

										<SelectField
											label="After Call Disposition"
											options={["Select an option", "Automatic"]}
											value="Select an option"
										/>

										<SelectField
											label="Holiday Calendar"
											options={["Select an option", "Default Calendar"]}
											value="Select an option"
										/>
									</div>

									<Section title="Manual Dial Settings">
										<div className="grid gap-5 md:grid-cols-2">
											<Field label="Enable Manual Dial" value="No" />

											<Field label="Manual Dial Limit" value="0" />
										</div>
									</Section>

									<Section title="Inbound Settings">
										<ToggleField label="Enable Inbound" />
									</Section>

									<Section title="Webform Settings">
										<Field label="Webform" value="Select Webform" />
									</Section>

									<Section title="Reporting Settings">
										<Field
											label="Calls before Ring Duration (In Seconds)"
											value="30"
										/>
									</Section>
								</div>
							) : null}

							{/* NAVIGATION */}
							<div className="mt-5 flex flex-wrap justify-end gap-2">
								<Button
									className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs dark:border-slate-700 dark:text-slate-300"
									onClick={cancel}
									variant="outline"
								>
									Cancel
								</Button>

								<Button
									className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs dark:border-slate-700 dark:text-slate-300"
									disabled={step === 1}
									onClick={goPrevious}
									variant="outline"
								>
									Previous
								</Button>

								{step < 3 ? (
									<Button
										className="h-9 rounded-lg bg-[#0757ff] px-5 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
										onClick={goNext}
									>
										Next
										<ChevronRight className="ml-1 size-3.5" />
									</Button>
								) : (
									<Button className="h-9 rounded-lg bg-[#0757ff] px-5 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500">
										Save Campaign
									</Button>
								)}
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

function Field({ label, value = "" }: { label: string; value?: string }) {
	const fieldId = `field-${label
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "")}`;

	return (
		<div className="space-y-2">
			<label
				className="font-medium text-slate-500 text-xs dark:text-slate-400"
				htmlFor={fieldId}
			>
				{label}
			</label>

			<Input
				className="h-9 rounded-lg border-slate-200 bg-white text-xs placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500"
				id={fieldId}
				readOnly={value !== ""}
				value={value}
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
	const fieldId = `select-${label
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "")}`;

	return (
		<div className="space-y-2">
			<label
				className="font-medium text-slate-500 text-xs dark:text-slate-400"
				htmlFor={fieldId}
			>
				{label}
			</label>

			<select
				className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-600 text-xs outline-none focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"
				defaultValue={value}
				id={fieldId}
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

function ToggleField({ label }: { label: string }) {
	return (
		<div className="flex min-h-12 items-center justify-between rounded-lg border border-slate-200 bg-slate-50/50 px-4 dark:border-slate-800 dark:bg-slate-950/50">
			<span className="font-medium text-slate-600 text-xs dark:text-slate-300">
				{label}
			</span>

			<button
				className="h-6 w-11 rounded-full bg-slate-200 p-1 transition-colors dark:bg-slate-700"
				type="button"
			>
				<span className="block size-4 rounded-full bg-white shadow-sm dark:bg-slate-300" />
			</button>
		</div>
	);
}

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="border-slate-100 border-t p-5 dark:border-slate-800">
			<h2 className="mb-4 font-semibold text-[#102b55] text-sm dark:text-white">
				{title}
			</h2>

			{children}
		</div>
	);
}
