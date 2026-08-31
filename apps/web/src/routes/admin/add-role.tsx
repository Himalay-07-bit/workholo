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
			<main className="flex-1 p-4 md:p-6">
				<section className="mx-auto max-w-[1600px] overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
					<div className="border-slate-200 border-b px-5 py-4 text-slate-700 text-sm dark:border-slate-800 dark:text-slate-200">
						Add a new Role
					</div>

					<div className="p-6 md:p-8">
						<div className="grid grid-cols-1 gap-8 md:grid-cols-2">
							<div>
								<label
									className="mb-2 block text-slate-600 text-sm dark:text-slate-300"
									htmlFor="role-name"
								>
									Name<span className="text-red-500">*</span>
								</label>
								<input
									className="h-9 w-full border-0 border-slate-300 border-b bg-transparent px-0 text-sm outline-none focus:border-blue-500 dark:border-slate-700"
									id="role-name"
									onChange={(e) => setName(e.target.value)}
									value={name}
								/>
							</div>
							<div>
								<label
									className="mb-2 block text-slate-600 text-sm dark:text-slate-300"
									htmlFor="role-description"
								>
									Description<span className="text-red-500">*</span>
								</label>
								<input
									className="h-9 w-full border-0 border-slate-300 border-b bg-transparent px-0 text-sm outline-none focus:border-blue-500 dark:border-slate-700"
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

						<div className="mt-8 flex items-center gap-2 border-slate-200 border-t pt-5 dark:border-slate-800">
							<button
								className="rounded-sm bg-blue-600 px-4 py-2 font-medium text-white text-xs hover:bg-blue-700"
								onClick={save}
								type="button"
							>
								Save
							</button>
							<button
								className="rounded-sm border border-slate-300 bg-white px-4 py-2 text-slate-700 text-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
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
		<section className="mt-8">
			<div className="mb-5 flex items-center gap-2">
				<h2 className="font-medium text-slate-700 text-sm dark:text-slate-200">
					{title}
				</h2>
				{title === "General permissions" && (
					<span className="text-cyan-500">ⓘ</span>
				)}
			</div>

			{toggleEverything ? (
				<label className="mb-5 flex cursor-pointer items-center gap-2 text-slate-600 text-xs dark:text-slate-300">
					<input
						checked={rows.every((row) =>
							row.options
								.filter((o) => o.label !== "Select All")
								.every((o) => checked[`${row.label}|${o.label}`])
						)}
						className="h-3.5 w-3.5"
						onChange={(e) => toggleEverything(e.target.checked)}
						type="checkbox"
					/>
					Select All
				</label>
			) : null}

			<div className="space-y-6">
				{rows.map((row) => {
					const selectable = row.options.filter(
						(o) => o.label !== "Select All"
					);
					const allChecked =
						selectable.length > 0 &&
						selectable.every((o) => checked[`${row.label}|${o.label}`]);
					return (
						<div
							className="grid grid-cols-[250px_minmax(0,1fr)] items-start gap-5"
							key={row.label}
						>
							<div className="pt-0.5 text-slate-600 text-xs dark:text-slate-300">
								{row.label}
							</div>
							<div className="flex flex-wrap gap-x-5 gap-y-3">
								{row.options.map((option) => {
									const key = `${row.label}|${option.label}`;
									const isSelectAll = option.label === "Select All";
									return (
										<label
											className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-[11px] text-slate-600 dark:text-slate-300"
											key={key}
										>
											<input
												checked={isSelectAll ? allChecked : !!checked[key]}
												className="h-3.5 w-3.5"
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
