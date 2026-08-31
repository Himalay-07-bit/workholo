// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/sms-templates")({
	component: SmsTemplatesPage,
});

type Template = {
	id: number;
	name: string;
	message: string;
	type: string;
	templateStatus: string;
	reason: string;
	status: "Enabled" | "Disabled";
};

const templates: Template[] = [
	{
		id: 263_327,
		name: "Template 1",
		message:
			"You missed a call from {caller_no} in department {department_name}.",
		type: "INCOMING MISSED CALL (TO AGENT)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_328,
		name: "Template 2",
		message:
			"Thank you for calling. Sorry! we missed your call, we will get back to you soon.",
		type: "INCOMING MISSED CALL (TO CALLER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_329,
		name: "Template 3",
		message:
			"A call was missed from {caller_no} in department {department_name}.",
		type: "INCOMING DEPARTMENT MISSED CALL (TO ALL AGENTS)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_330,
		name: "Template 4",
		message: "You got a call from {caller_no} in department {department_name}.",
		type: "INCOMING ANSWERED CALL (TO AGENT)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_331,
		name: "Template 5",
		message: "Thank you for calling. You just spoke with {agent_name}.",
		type: "INCOMING ANSWERED CALL (TO CALLER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_332,
		name: "Template 6",
		message: "Hi, A call from {caller_no} was answered on IVR and hangup.",
		type: "INCOMING ANSWERED ON IVR (TO CALLER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_333,
		name: "Template 7",
		message:
			"Hi, A call from {caller_no} was answered on Auto Attendant and hangup.",
		type: "INCOMING ANSWERED ON AUTO-ATTENDANT (TO CALLER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_334,
		name: "Template 8",
		message: "Thank you for calling. We will get in touch with you soon.",
		type: "IVR OPTION (TO CALLER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_335,
		name: "Template 9",
		message: "You missed a call from {caller_no}.",
		type: "BROADCAST MISSED CALL (TO LEAD NUMBER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_336,
		name: "Template 10",
		message: "You answered a call from {caller_no}.",
		type: "BROADCAST ANSWERED CALL (TO LEAD NUMBER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
];

function SmsTemplatesPage() {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);

	const filteredTemplates = useMemo(() => {
		const searchValue = search.trim().toLowerCase();

		if (!searchValue) {
			return templates;
		}

		return templates.filter((template) =>
			`${template.id} ${template.name} ${template.message} ${template.type} ${template.templateStatus} ${template.status}`
				.toLowerCase()
				.includes(searchValue)
		);
	}, [search]);

	const visibleTemplates = filteredTemplates.slice(0, pageSize);

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h1 className="font-medium text-lg">Template Management</h1>

						<Button
							onClick={() =>
								navigate({
									to: "/admin/add-sms-templates",
								})
							}
							type="button"
						>
							Add Template
						</Button>
					</div>

					{/* Description */}
					<div className="px-4 py-4">
						<p className="text-sm">
							Setup SMS/Email templates against the respective services
						</p>
					</div>

					{/* Table Controls */}
					<div className="flex flex-col gap-4 px-4 py-3 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-2 text-sm">
							<span>Show</span>

							<select
								className="h-8 rounded-md border bg-background px-2"
								id="template-page-size"
								onChange={(event) => setPageSize(Number(event.target.value))}
								value={pageSize}
							>
								<option value={10}>10</option>
								<option value={25}>25</option>
								<option value={50}>50</option>
							</select>

							<span>entries</span>
						</div>

						<div className="flex items-center gap-2">
							<label className="text-sm" htmlFor="template-search">
								Search:
							</label>

							<Input
								className="w-[220px]"
								id="template-search"
								onChange={(event) => setSearch(event.target.value)}
								value={search}
							/>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto px-4 pb-4">
						<table className="w-full min-w-[1250px] border-collapse text-sm">
							<thead>
								<tr className="border-y bg-muted/40">
									<th className="px-3 py-3 text-left font-medium">
										Template ID
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Template Name
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Template Message
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Template Type
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Template Status
									</th>

									<th className="px-3 py-3 text-left font-medium">Reason</th>

									<th className="px-3 py-3 text-left font-medium">Status</th>

									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								{visibleTemplates.map((template) => (
									<tr className="border-b hover:bg-muted/20" key={template.id}>
										<td className="px-3 py-3">{template.id}</td>

										<td className="px-3 py-3">
											<div className="flex flex-col gap-1">
												<div className="flex items-center gap-2">
													<button
														className="text-blue-600 hover:underline"
														type="button"
													>
														{template.name}
													</button>

													<span className="rounded bg-muted px-2 py-0.5 text-xs">
														Default
													</span>
												</div>

												<span className="w-fit rounded bg-muted px-2 py-0.5 text-xs">
													SMS
												</span>
											</div>
										</td>

										<td className="max-w-[430px] px-3 py-3">
											{template.message}
										</td>

										<td className="px-3 py-3">{template.type}</td>

										<td className="px-3 py-3">{template.templateStatus}</td>

										<td className="px-3 py-3">{template.reason}</td>

										<td className="px-3 py-3">
											<span className="inline-flex rounded-sm bg-green-600 px-2 py-1 font-medium text-white text-xs">
												{template.status}
											</span>
										</td>

										<td className="px-3 py-3">
											<select
												className="h-9 min-w-[125px] rounded-md border bg-background px-2 text-sm"
												defaultValue=""
												id={`template-action-${template.id}`}
											>
												<option disabled value="">
													Select an Action
												</option>

												<option value="view">View</option>
												<option value="edit">Edit</option>
												<option value="delete">Delete</option>
											</select>
										</td>
									</tr>
								))}

								{visibleTemplates.length === 0 && (
									<tr>
										<td
											className="px-4 py-10 text-center text-muted-foreground"
											colSpan={8}
										>
											No templates found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between border-t px-4 py-4 text-sm">
						<span className="text-muted-foreground">
							Showing 1 to {visibleTemplates.length} of{" "}
							{filteredTemplates.length} entries
						</span>

						<div className="flex items-center gap-1">
							<Button disabled size="sm" variant="outline">
								Previous
							</Button>

							<Button size="sm">1</Button>

							<Button disabled size="sm" variant="outline">
								Next
							</Button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
