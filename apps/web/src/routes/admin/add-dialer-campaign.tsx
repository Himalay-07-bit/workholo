// biome-ignore-all lint/performance/noJsxPropsBind: Wizard controls intentionally use component state.

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
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
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Page title */}
					<div className="border-b px-4 py-3">
						<h1 className="font-medium text-lg">Add Dialer Campaign</h1>
					</div>

					<div className="p-6">
						{/* Step navigation */}
						<div className="grid grid-cols-1 gap-2 md:grid-cols-3">
							{steps.map((item, index) => {
								const stepNumber = index + 1;

								let stepClass = "bg-muted text-muted-foreground";

								if (stepNumber === step) {
									stepClass = "bg-primary text-primary-foreground";
								} else if (stepNumber < step) {
									stepClass = "bg-primary/60 text-primary-foreground";
								}

								return (
									<button
										className={`h-12 px-4 text-left font-medium text-sm ${stepClass}`}
										key={item}
										onClick={() => setStep(stepNumber)}
										type="button"
									>
										{item}
									</button>
								);
							})}
						</div>

						{/* STEP 1 */}
						{step === 1 ? (
							<div className="mt-4 rounded-md border">
								<div className="grid gap-8 p-5 md:grid-cols-2">
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

										<Field label="Preview Duration (In Seconds)*" value="10" />

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

											<button
												className="mt-7 h-9 rounded-md border px-3 text-sm"
												type="button"
											>
												Select Lead List(s)
											</button>
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
							<div className="mt-4 rounded-md border">
								<div className="grid gap-8 p-5 md:grid-cols-2">
									<div className="space-y-5">
										<SelectField
											label="Agent Connection Method*"
											options={["Dial In (Session)", "Browser", "Auto Connect"]}
											value="Dial In (Session)"
										/>

										<SelectField
											label="Enforce Agent Pause Code"
											options={["Disable Pause Code", "Enable Pause Code"]}
											value="Disable Pause Code"
										/>

										<Field label="Agent Dial-In Number*" value="918068211299" />
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

										<div className="flex items-center justify-between pt-4">
											<span className="text-sm">Agent Only Callback</span>

											<button
												className="h-6 w-11 rounded-full bg-muted p-1"
												type="button"
											>
												<span className="block size-4 rounded-full bg-background shadow-sm" />
											</button>
										</div>
									</div>
								</div>
							</div>
						) : null}

						{/* STEP 3 */}
						{step === 3 ? (
							<div className="mt-4 rounded-md border">
								<div className="grid gap-x-8 gap-y-5 p-5 md:grid-cols-2">
									<SelectField
										label="Agent Voice Greeting"
										options={["Select an option", "Default", "Custom Greeting"]}
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

								<div className="border-t p-5">
									<h2 className="mb-4 font-medium">Manual Dial Settings</h2>

									<div className="grid gap-5 md:grid-cols-2">
										<Field label="Enable Manual Dial" value="No" />

										<Field label="Manual Dial Limit" value="0" />
									</div>
								</div>

								<div className="border-t p-5">
									<h2 className="mb-4 font-medium">Inbound Settings</h2>

									<ToggleField label="Enable Inbound" />
								</div>

								<div className="border-t p-5">
									<h2 className="mb-4 font-medium">Webform Settings</h2>

									<Field label="Webform" value="Select Webform" />
								</div>

								<div className="border-t p-5">
									<h2 className="mb-4 font-medium">Reporting Settings</h2>

									<Field
										label="Calls before Ring Duration (In Seconds)"
										value="30"
									/>
								</div>
							</div>
						) : null}

						{/* Navigation */}
						<div className="mt-4 flex justify-end gap-2">
							<Button onClick={cancel} variant="outline">
								Cancel
							</Button>

							<Button
								disabled={step === 1}
								onClick={goPrevious}
								variant="outline"
							>
								Previous
							</Button>

							{step < 3 ? (
								<Button onClick={goNext}>Next</Button>
							) : (
								<Button>Save Campaign</Button>
							)}
						</div>
					</div>
				</section>
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
			<label className="text-muted-foreground text-sm" htmlFor={fieldId}>
				{label}
			</label>

			<Input id={fieldId} readOnly={value !== ""} value={value} />
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
			<label className="text-muted-foreground text-sm" htmlFor={fieldId}>
				{label}
			</label>

			<select
				className="h-10 w-full rounded-md border border-primary bg-background px-3 text-sm outline-none"
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
		<div className="flex items-center justify-between">
			<span className="text-sm">{label}</span>

			<button className="h-6 w-11 rounded-full bg-muted p-1" type="button">
				<span className="block size-4 rounded-full bg-background shadow-sm" />
			</button>
		</div>
	);
}
