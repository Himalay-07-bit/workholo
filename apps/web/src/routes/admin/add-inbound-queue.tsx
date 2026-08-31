// biome-ignore-all lint/performance/noJsxPropsBind: Form controls use local state and intentional inline handlers.

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/add-inbound-queue")({
	component: AddInboundQueuePage,
});

function AddInboundQueuePage() {
	const [repeatCaller, setRepeatCaller] = useState(false);
	const [queueUrl, setQueueUrl] = useState(false);
	const [waitAnnouncement, setWaitAnnouncement] = useState(false);
	const [positionAnnouncement, setPositionAnnouncement] = useState(false);
	const [agentPriority, setAgentPriority] = useState(false);
	const [callbackCrossover, setCallbackCrossover] = useState(false);

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<div className="mb-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<h1 className="font-bold text-[#102b55] text-xl tracking-tight dark:text-slate-100">
							Add Inbound Queue
						</h1>
					</div>

					{/* GENERAL DETAILS */}
					<section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<div className="border-slate-100 border-b px-5 py-3.5 dark:border-slate-800">
							<h2 className="font-semibold text-[#263b5b] text-sm dark:text-slate-200">
								General Details
							</h2>
						</div>

						<div className="grid gap-x-8 gap-y-5 p-5 md:grid-cols-2">
							{/* LEFT COLUMN */}
							<div className="space-y-5">
								<Field label="Name*" />

								<SelectField
									label="Ring Strategy*"
									options={["Random", "Longest Wait Time", "Round Robin"]}
									value="Random"
								/>

								<Field label="Agent Ring Time*" value="30" />

								<SelectField
									label="Follow User Group*"
									options={["Hangup", "Follow User Group"]}
									value="Hangup"
								/>

								<SelectField
									label="Sticky Agent*"
									options={["No", "Yes"]}
									value="No"
								/>

								<SelectField
									label="SBC 1 IMAP (Incoming Missed Call - Caller)"
									options={["Select any Option", "Enabled", "Disabled"]}
									value="Select any Option"
								/>

								<SelectField
									label="SBC 1 IMAP (Incoming Missed Call - Agent)"
									options={["Select any Option", "Enabled", "Disabled"]}
									value="Select any Option"
								/>

								<SelectField
									label="Webhook 1 IMAP (Incoming Missed Call - Caller)"
									options={["Select any Option", "Enabled", "Disabled"]}
									value="Select any Option"
								/>

								<Field label="Transfer Code" />

								<ToggleField
									checked={waitAnnouncement}
									label="Wait Announcement"
									onToggle={() => setWaitAnnouncement((value) => !value)}
								/>

								<ToggleField
									checked={positionAnnouncement}
									label="Position Announcement"
									onToggle={() => setPositionAnnouncement((value) => !value)}
								/>
							</div>

							{/* RIGHT COLUMN */}
							<div className="space-y-5">
								<Field label="Description" />

								<Field label="Queue Timeout (Seconds)*" value="90" />

								<SelectField
									label="Music On Hold"
									options={["Select any Option", "Default", "Hold Music"]}
									value="Select any Option"
								/>

								<SelectField
									label="Follow Me"
									options={["Select any Option", "Enabled", "Disabled"]}
									value="Select any Option"
								/>

								<ToggleField
									checked={repeatCaller}
									label="Enable Repeat Caller"
									onToggle={() => setRepeatCaller((value) => !value)}
								/>

								<SelectField
									label="SBC 1 IMAP (Incoming Missed Call - Caller)"
									options={["Select any Option", "Enabled", "Disabled"]}
									value="Select any Option"
								/>

								<SelectField
									label="Webhook 1 IMAP (Incoming Missed Call - Caller)"
									options={["Select any Option", "Enabled", "Disabled"]}
									value="Select any Option"
								/>

								<Field label="PBXCONFIG ID" />

								<SelectField
									label="Welcome Announcement"
									options={["Select any Option", "Default", "Custom"]}
									value="Select any Option"
								/>

								<ToggleField
									checked={queueUrl}
									label="Enable Queue URL"
									onToggle={() => setQueueUrl((value) => !value)}
								/>
							</div>
						</div>
					</section>

					{/* AGENT SELECTION */}
					<section className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<div className="border-slate-100 border-b px-5 py-3.5 dark:border-slate-800">
							<h2 className="font-semibold text-[#263b5b] text-sm dark:text-slate-200">
								Agent Selection
							</h2>
						</div>

						<div className="grid gap-8 p-5 md:grid-cols-2">
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

							<ToggleField
								checked={agentPriority}
								label="Agent Priority"
								onToggle={() => setAgentPriority((value) => !value)}
							/>
						</div>
					</section>

					{/* REPORTING SETTINGS */}
					<section className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<div className="border-slate-100 border-b px-5 py-3.5 dark:border-slate-800">
							<h2 className="font-semibold text-[#263b5b] text-sm dark:text-slate-200">
								Reporting Settings
							</h2>
						</div>

						<div className="p-5">
							<div className="max-w-[50%]">
								<Field label="SLA Duration (In Seconds)" />
							</div>
						</div>
					</section>

					{/* CALLBACK SETTINGS */}
					<section className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<div className="border-slate-100 border-b px-5 py-3.5 dark:border-slate-800">
							<h2 className="font-semibold text-[#263b5b] text-sm dark:text-slate-200">
								Callback Settings
							</h2>
						</div>

						<div className="p-5">
							<ToggleField
								checked={callbackCrossover}
								label="Callback Crossover"
								onToggle={() => setCallbackCrossover((value) => !value)}
							/>
						</div>
					</section>

					{/* ACTIONS */}
					<div className="mt-4 flex justify-start gap-2">
						<Button className="bg-[#0757ff] hover:bg-[#004be0]">Save</Button>

						<Button variant="outline">Cancel</Button>
					</div>
				</div>
			</main>
		</div>
	);
}

function Field({ label, value = "" }: { label: string; value?: string }) {
	const inputId = `inbound-queue-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;

	return (
		<div className="space-y-1.5">
			<label
				className="text-slate-500 text-xs dark:text-slate-400"
				htmlFor={inputId}
			>
				{label}
			</label>

			<Input
				className="h-9 rounded-none border-0 border-slate-200 border-b bg-transparent px-0 text-sm shadow-none focus:border-[#0757ff] focus:ring-0 dark:border-slate-700"
				defaultValue={value}
				id={inputId}
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
	const inputId = `inbound-queue-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;

	return (
		<div className="space-y-1.5">
			<label
				className="text-slate-500 text-xs dark:text-slate-400"
				htmlFor={inputId}
			>
				{label}
			</label>

			<select
				className="h-9 w-full rounded-none border-0 border-slate-200 border-b bg-transparent px-0 text-sm outline-none focus:border-[#0757ff] dark:border-slate-700 dark:bg-transparent"
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

function ToggleField({
	label,
	checked,
	onToggle,
}: {
	label: string;
	checked: boolean;
	onToggle: () => void;
}) {
	return (
		<div className="flex items-center justify-between">
			<span className="text-slate-600 text-sm dark:text-slate-300">
				{label}
			</span>

			<button
				aria-pressed={checked}
				className={`flex h-5 w-10 items-center rounded-full p-0.5 transition ${
					checked
						? "justify-end bg-[#0757ff]"
						: "justify-start bg-slate-300 dark:bg-slate-600"
				}`}
				onClick={onToggle}
				type="button"
			>
				<span className="size-4 rounded-full bg-white shadow-sm" />
			</button>
		</div>
	);
}
