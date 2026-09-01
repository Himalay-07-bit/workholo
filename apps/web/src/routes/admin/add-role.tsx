import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/add-role")({
	component: AddRolePage,
});

type PermissionOption = {
	label: string;
	key?: string;
};

type PermissionRow = {
	label: string;
	options: PermissionOption[];
};

const crud = ["Add", "Edit", "View", "Delete", "Select All"];

const generalPermissions: PermissionRow[] = [
	{
		label: "Manage Team:",
		options: [
			"Add",
			"Edit",
			"View",
			"Delete",
			"Edit Two-Factor Authentication",
			"Bulk Password Reset",
			"Select All",
		].map((label) => ({ label })),
	},
	{
		label: "Manage User:",
		options: [
			"Add",
			"Edit",
			"View",
			"Delete",
			"Maker Checker",
			"Select All",
		].map((label) => ({ label })),
	},
	{
		label: "Manage Azure Team:",
		options: ["Add", "View", "Select All"].map((label) => ({ label })),
	},
	...[
		"Manage Role:",
		"IP Pool Whitelisting:",
		"Time Group:",
		"IVR:",
		"Auto Attendant:",
		"Agents:",
		"Department:",
	].map((label) => ({
		label,
		options: crud.map((option) => ({ label: option })),
	})),
	{ label: "Call Queue Announcement:", options: [{ label: "Enable" }] },
	...["Recording:", "Voicemail:"].map((label) => ({
		label,
		options: crud.map((option) => ({ label: option })),
	})),
	{
		label: "Webhook:",
		options: ["Add", "Edit", "View", "Delete", "Pause", "Select All"].map(
			(label) => ({ label })
		),
	},
	...["API Token:", "Click to Call API:"].map((label) => ({
		label,
		options: crud.map((option) => ({ label: option })),
	})),
	{
		label: "Contacts:",
		options: ["Add", "Edit", "View", "Delete", "Download", "Select All"].map(
			(label) => ({ label })
		),
	},
	{ label: "Survey Campaign:", options: crud.map((label) => ({ label })) },
	{
		label: "CDR:",
		options: [
			"View",
			"View Limited",
			"Download CDR",
			"Download Call Recording",
			"Listen Call Recording",
			"Transcribe Call Recording",
			"Whatsapp Chat",
			"Download Archived CDR",
			"Select All",
		].map((label) => ({ label })),
	},
	{
		label: "Active Calls:",
		options: ["View", "Disable hangup from Active Calls"].map((label) => ({
			label,
		})),
	},
	{ label: "DID Numbers:", options: crud.map((label) => ({ label })) },
	{
		label: "Billing:",
		options: [
			"Add",
			"Edit",
			"View",
			"Delete",
			"Enable Billing Notifications",
			"Select All",
		].map((label) => ({ label })),
	},
	{ label: "Dynamic Dialplan:", options: crud.map((label) => ({ label })) },
	{ label: "API DialPlan:", options: crud.map((label) => ({ label })) },
	{
		label: "Remote Storage (AWS):",
		options: ["View", "Add", "Edit", "Delete", "Select All"].map((label) => ({
			label,
		})),
	},
	{
		label: "Dashboard",
		options: ["Admin", "Supervisor", "Agent"].map((label) => ({ label })),
	},
	{
		label: "Reporting",
		options: [
			"Number Wise Reports",
			"Call Stats",
			"SMS Logs",
			"Agent Activity Log",
			"Agent Performance Report",
			"Department Performance Report",
			"Department Wallboard",
			"Agent Realtime Report",
			"Dialer Agent Time Entry Report",
			"Dialer Agent Performance Report",
			"Dialer Agent Login Report",
			"Dialer Realtime Report",
			"Dialer Campaign Performance Report",
			"Dialer Campaign Half Hourly Summary Report",
			"Dialer Agent Break Summary Report",
			"Dialer Webform Report",
			"Dialer Schedule Callbacks Report",
			"Activity Logs",
			"Email Logs",
			"Channel Utilisation Summary",
			"Missed Call Report",
			"Insights",
			"Insights MDR",
			"Insights PCA",
			"View PCA Config",
			"Edit PCA Config",
			"Insights BDR",
			"Insights Disposition Dashboard",
			"Insights CSAT Dashboard",
			"CSAT Report",
			"Select All",
		].map((label) => ({ label })),
	},
	{ label: "Manage Web Login:", options: [{ label: "Manage Web Login" }] },
	{
		label: "Manage Multiple Login:",
		options: [{ label: "Manage Multiple Login" }],
	},
	{ label: "Agent Disposition:", options: crud.map((label) => ({ label })) },
	{
		label: "Scheduled Email Reports:",
		options: crud.map((label) => ({ label })),
	},
	{ label: "Scheduled Calls:", options: crud.map((label) => ({ label })) },
	{ label: "Click to Call - External Agent:", options: [{ label: "Enable" }] },
	{ label: "Mask Numbers:", options: [{ label: "Enable" }] },
	{ label: "Click To Call-Contacts Only:", options: [{ label: "Enable" }] },
	{ label: "API Logs:", options: [{ label: "View" }] },
	{
		label: "Webhook Logs:",
		options: ["View", "Resend"].map((label) => ({ label })),
	},
	{
		label: "Integrations:",
		options: ["Manage", "Edit", "View"].map((label) => ({ label })),
	},
	{ label: "Manage Extensions", options: [{ label: "Enable" }] },
	{
		label: "Old Call Recording",
		options: ["Fetch", "Download", "Select All"].map((label) => ({ label })),
	},
	{ label: "Manage SFTP", options: [{ label: "Manage SFTP Configuration" }] },
	{ label: "Api Documentation", options: [{ label: "View" }] },
	{
		label: "CDP List",
		options: ["Add", "View", "Delete", "Select All"].map((label) => ({
			label,
		})),
	},
	{ label: "Whatsapp P2P", options: [{ label: "Enable" }] },
	{ label: "View Recording Logs", options: [{ label: "Enable" }] },
];

const outboundPermissions: PermissionRow[] = [
	...["Dialer Campaign:", "Inbound Queue:", "CSAT Survey:"].map((label) => ({
		label,
		options: crud.map((option) => ({ label: option })),
	})),
	{
		label: "Lead List:",
		options: ["Add", "Edit", "View", "Download", "Delete", "Select All"].map(
			(label) => ({ label })
		),
	},
	...[
		"Disposition List:",
		"Pause Code List:",
		"Account DND List:",
		"Quick Transfer List:",
		"Dialer Skill List:",
		"Agent Script:",
		"Holiday Calender:",
	].map((label) => ({
		label,
		options: crud.map((option) => ({ label: option })),
	})),
];

function AddRolePage() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [checked, setChecked] = useState<Record<string, boolean>>({});

	const allKeys = useMemo(
		() =>
			[...generalPermissions, ...outboundPermissions].flatMap((row) =>
				row.options.map((option) => `${row.label}|${option.label}`)
			),
		[]
	);

	const toggle = (key: string, value?: boolean) => {
		setChecked((prev) => ({ ...prev, [key]: value ?? !prev[key] }));
	};

	const toggleRow = (row: PermissionRow, value: boolean) => {
		const rowKeys = row.options
			.filter((option) => option.label !== "Select All")
			.map((option) => `${row.label}|${option.label}`);
		setChecked((prev) => {
			const next = { ...prev };
			for (const key of rowKeys) {
				next[key] = value;
			}
			next[`${row.label}|Select All`] = value;
			return next;
		});
	};

	const toggleEverything = (value: boolean) => {
		setChecked(Object.fromEntries(allKeys.map((key) => [key, value])));
	};

	const save = () => {
		// UI-only page for now. API integration can be added with the project's role endpoint later.
		console.log({ name, description, permissions: checked });
	};

	return (
		<div className="flex min-h-screen flex-col bg-background">
			<AdminTopbar />
			<main className="flex-1 bg-[#f4f7fb] p-4 md:p-6 dark:bg-slate-900">
				<section className="mx-auto max-w-[1600px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-slate-200/50 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
					<div className="flex items-center border-slate-200 border-b bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-950">
						<div className="border-[#0757ff] border-l-4 pl-3">
							<h1 className="font-semibold text-[#102b55] text-base dark:text-white">
								Add a new Role
							</h1>
							<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
								Create a role and assign permissions
							</p>
						</div>
					</div>

					<div className="p-5 md:p-7">
						<div className="grid grid-cols-1 gap-5 rounded-xl border border-slate-200 bg-slate-50/60 p-5 md:grid-cols-2 dark:border-slate-800 dark:bg-slate-900/40">
							<div>
								<label
									className="mb-2 block font-medium text-[#102b55] text-xs dark:text-slate-200"
									htmlFor="role-name"
								>
									Name<span className="text-red-500">*</span>
								</label>
								<input
									className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[#102b55] text-sm outline-none transition focus:border-[#0757ff] focus:ring-2 focus:ring-[#0757ff]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
									id="role-name"
									onChange={(e) => setName(e.target.value)}
									value={name}
								/>
							</div>
							<div>
								<label
									className="mb-2 block font-medium text-[#102b55] text-xs dark:text-slate-200"
									htmlFor="role-description"
								>
									Description<span className="text-red-500">*</span>
								</label>
								<input
									className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-[#102b55] text-sm outline-none transition focus:border-[#0757ff] focus:ring-2 focus:ring-[#0757ff]/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
									id="role-description"
									onChange={(e) => setDescription(e.target.value)}
									value={description}
								/>
							</div>
						</div>

						<PermissionSection
							checked={checked}
							rows={generalPermissions}
							title="General permissions"
							toggle={toggle}
							toggleEverything={toggleEverything}
							toggleRow={toggleRow}
						/>
						<PermissionSection
							checked={checked}
							rows={outboundPermissions}
							title="Outbound permissions"
							toggle={toggle}
							toggleRow={toggleRow}
						/>

						<div className="mt-8 flex items-center gap-3 border-slate-200 border-t pt-5 dark:border-slate-800">
							<button
								className="rounded-lg bg-[#0757ff] px-5 py-2.5 font-semibold text-white text-xs shadow-blue-500/20 shadow-sm transition hover:bg-[#0649d8] focus:outline-none focus:ring-2 focus:ring-[#0757ff]/20"
								onClick={save}
								type="button"
							>
								Save
							</button>
							<button
								className="rounded-lg border border-slate-200 bg-white px-5 py-2.5 font-medium text-slate-600 text-xs transition hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
								onClick={() => history.back()}
								type="button"
							>
								Cancel
							</button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

function PermissionSection({
	title,
	rows,
	checked,
	toggle,
	toggleRow,
	toggleEverything,
}: {
	title: string;
	rows: PermissionRow[];
	checked: Record<string, boolean>;
	toggle: (key: string, value?: boolean) => void;
	toggleRow: (row: PermissionRow, value: boolean) => void;
	toggleEverything?: (value: boolean) => void;
}) {
	return (
		<section className="mt-7 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
			<div className="flex items-center justify-between border-slate-200 border-b bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/70">
				<h2 className="border-[#0757ff] border-l-3 pl-2 font-semibold text-[#102b55] text-sm dark:text-white">
					{title}
				</h2>
				{title === "General permissions" && (
					<span
						className="text-[#0757ff] text-xs"
						title="Select permissions for this role"
					>
						ⓘ
					</span>
				)}
			</div>

			{toggleEverything ? (
				<label className="mx-4 mt-4 mb-4 flex w-fit cursor-pointer items-center gap-2 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 font-medium text-[#0757ff] text-xs dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-300">
					<input
						checked={rows.every((row) =>
							row.options
								.filter((o) => o.label !== "Select All")
								.every((o) => checked[`${row.label}|${o.label}`])
						)}
						className="size-4 accent-[#0757ff]"
						onChange={(e) => toggleEverything(e.target.checked)}
						type="checkbox"
					/>
					Select All
				</label>
			) : null}

			<div className="divide-y divide-slate-100 px-4 dark:divide-slate-800">
				{rows.map((row) => {
					const selectable = row.options.filter(
						(o) => o.label !== "Select All"
					);
					const allChecked =
						selectable.length > 0 &&
						selectable.every((o) => checked[`${row.label}|${o.label}`]);
					return (
						<div
							className="grid grid-cols-1 items-start gap-3 py-4 md:grid-cols-[250px_minmax(0,1fr)] md:gap-5"
							key={row.label}
						>
							<div className="pt-0.5 font-semibold text-[#102b55] text-xs dark:text-slate-200">
								{row.label}
							</div>
							<div className="flex flex-wrap gap-x-5 gap-y-2.5">
								{row.options.map((option) => {
									const key = `${row.label}|${option.label}`;
									const isSelectAll = option.label === "Select All";
									return (
										<label
											className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md px-2 py-1.5 text-[11px] text-slate-600 transition hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400"
											key={key}
										>
											<input
												checked={isSelectAll ? allChecked : !!checked[key]}
												className="size-4 accent-[#0757ff]"
												onChange={(e) =>
													isSelectAll
														? toggleRow(row, e.target.checked)
														: toggle(key, e.target.checked)
												}
												type="checkbox"
											/>
											{option.label}
										</label>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}
