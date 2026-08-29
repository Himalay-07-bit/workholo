import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/extensions")({
	component: ExtensionsPage,
});

type Agent = {
	id: string;
	name: string;
	callForwardNumber: string;
	alternateNumbers: string;
	intercomNumber: string;
	timeGroup: string;
	departments: string;
	username: string;
	extensionCallerId: string;
	agentStatus: "Active" | "Blocked" | "Disabled" | "Busy" | "Offline";
	extensionStatus: "Registered" | "Unregistered";
	callsAnswered: number;
};

const agents: Agent[] = [
	{
		id: "0502155860217",
		name: "Meera",
		callForwardNumber: "+913286745687",
		alternateNumbers: "-",
		intercomNumber: "1002",
		timeGroup: "N.A",
		departments: "N.A",
		username: "0602155860211",
		extensionCallerId: "+918069977570(+918069977570)",
		agentStatus: "Offline",
		extensionStatus: "Unregistered",
		callsAnswered: 0,
	},
	{
		id: "0502155860215",
		name: "CRLA Zainab",
		callForwardNumber: "+913494675424",
		alternateNumbers: "-",
		intercomNumber: "1023",
		timeGroup: "N.A",
		departments: "N.A",
		username: "0602155860209",
		extensionCallerId: "+918064370287(+918064370287)",
		agentStatus: "Offline",
		extensionStatus: "Registered",
		callsAnswered: 0,
	},
	{
		id: "0502155860214",
		name: "CRLA Tasneem",
		callForwardNumber: "+913479645823",
		alternateNumbers: "-",
		intercomNumber: "1022",
		timeGroup: "N.A",
		departments: "N.A",
		username: "0602155860208",
		extensionCallerId: "+918064370287(+918064370287)",
		agentStatus: "Offline",
		extensionStatus: "Registered",
		callsAnswered: 0,
	},
	{
		id: "0502155860213",
		name: "CRLA Madiha",
		callForwardNumber: "+9134794641313",
		alternateNumbers: "-",
		intercomNumber: "1020",
		timeGroup: "N.A",
		departments: "N.A",
		username: "0602155860207",
		extensionCallerId: "+918064370287(+918064370287)",
		agentStatus: "Offline",
		extensionStatus: "Unregistered",
		callsAnswered: 0,
	},
	{
		id: "0502155860211",
		name: "CRLM Shifa",
		callForwardNumber: "+913246464646",
		alternateNumbers: "-",
		intercomNumber: "1012",
		timeGroup: "N.A",
		departments: "N.A",
		username: "0602155860205",
		extensionCallerId: "+917965369372(+917965369372)",
		agentStatus: "Offline",
		extensionStatus: "Registered",
		callsAnswered: 0,
	},
	{
		id: "0502155860210",
		name: "CRLD Aayushi",
		callForwardNumber: "+913546543468",
		alternateNumbers: "-",
		intercomNumber: "1009",
		timeGroup: "N.A",
		departments: "N.A",
		username: "0602155860204",
		extensionCallerId: "+917965369371(+917965369371)",
		agentStatus: "Offline",
		extensionStatus: "Registered",
		callsAnswered: 0,
	},
	{
		id: "0502155860209",
		name: "CRLA Dhriti",
		callForwardNumber: "+913492481141",
		alternateNumbers: "-",
		intercomNumber: "1008",
		timeGroup: "N.A",
		departments: "N.A",
		username: "0602155860203",
		extensionCallerId: "+918064370287(+918064370287)",
		agentStatus: "Offline",
		extensionStatus: "Unregistered",
		callsAnswered: 0,
	},
	{
		id: "0502155860208",
		name: "CRLA Vazira",
		callForwardNumber: "+914235453553",
		alternateNumbers: "-",
		intercomNumber: "1006",
		timeGroup: "N.A",
		departments: "N.A",
		username: "0602155860202",
		extensionCallerId: "+918064370287(+918064370287)",
		agentStatus: "Offline",
		extensionStatus: "Unregistered",
		callsAnswered: 0,
	},
	{
		id: "0502155860207",
		name: "CRLB M Ayushi",
		callForwardNumber: "+9134334444545",
		alternateNumbers: "-",
		intercomNumber: "1015",
		timeGroup: "N.A",
		departments: "N.A",
		username: "0602155860201",
		extensionCallerId: "+917965004859(+917965004859)",
		agentStatus: "Offline",
		extensionStatus: "Unregistered",
		callsAnswered: 0,
	},
];

function AgentStatusDot({ status }: { status: Agent["agentStatus"] }) {
	const className = {
		Active: "bg-green-500",
		Blocked: "bg-red-500",
		Disabled: "bg-yellow-500",
		Busy: "bg-orange-500",
		Offline: "bg-gray-400",
	}[status];

	return (
		<span
			className={`inline-block size-3 rounded-full ${className}`}
			title={status}
		/>
	);
}

function ExtensionStatusDot({ status }: { status: Agent["extensionStatus"] }) {
	return (
		<span
			className={`inline-block size-3 rounded-full ${
				status === "Registered" ? "bg-green-500" : "bg-red-500"
			}`}
			title={status}
		/>
	);
}

function ExtensionsPage() {
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredAgents = useMemo(() => {
		const value = search.trim().toLowerCase();

		if (!value) {
			return agents;
		}

		return agents.filter((agent) =>
			[
				agent.id,
				agent.name,
				agent.callForwardNumber,
				agent.intercomNumber,
				agent.username,
				agent.extensionCallerId,
			]
				.join(" ")
				.toLowerCase()
				.includes(value)
		);
	}, [search]);

	const totalPages = Math.max(1, Math.ceil(filteredAgents.length / pageSize));

	const safePage = Math.min(currentPage, totalPages);

	const startIndex = (safePage - 1) * pageSize;

	const visibleAgents = filteredAgents.slice(startIndex, startIndex + pageSize);

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex flex-col gap-3 border-b px-4 py-3 md:flex-row md:items-center md:justify-between">
						<h1 className="font-medium text-lg">All Agents</h1>

						<div className="flex flex-wrap gap-2">
							<Button variant="outline">Feature Codes</Button>
							<Button variant="outline">Upload Agents</Button>
							<Button variant="outline">Teams (Agent Groups)</Button>
							<Button>Add Agent</Button>
						</div>
					</div>

					{/* Agent information */}
					<div className="flex flex-col gap-4 px-4 py-4 xl:flex-row xl:items-start xl:justify-between">
						<div className="space-y-3">
							<p className="text-sm">
								<span className="font-medium">
									Maximum Number of Agents Allowed:
								</span>{" "}
								23
							</p>

							<p className="text-sm">
								<span className="font-medium">1 Domain</span> : 1
							</p>
						</div>

						<div className="space-y-2 text-sm">
							<div className="flex flex-wrap items-center gap-3">
								<span className="font-semibold">Agent Status:</span>

								<span className="flex items-center gap-1">
									<AgentStatusDot status="Active" />
									Active
								</span>

								<span className="flex items-center gap-1">
									<AgentStatusDot status="Blocked" />
									Blocked
								</span>

								<span className="flex items-center gap-1">
									<AgentStatusDot status="Disabled" />
									Disabled
								</span>

								<span className="flex items-center gap-1">
									<AgentStatusDot status="Busy" />
									Busy
								</span>

								<span className="flex items-center gap-1">
									<AgentStatusDot status="Offline" />
									Offline
								</span>
							</div>

							<div className="flex flex-wrap items-center gap-3">
								<span className="font-semibold">Extension Status:</span>

								<span className="flex items-center gap-1">
									<ExtensionStatusDot status="Registered" />
									Registered
								</span>

								<span className="flex items-center gap-1">
									<ExtensionStatusDot status="Unregistered" />
									Unregistered
								</span>
							</div>

							<div className="flex flex-wrap items-center gap-2">
								<span className="font-semibold">
									(Filters for Calls Answered)
								</span>

								<Button size="sm">1 Day</Button>
								<span>|</span>
								<button className="text-sm hover:underline" type="button">
									2 Days
								</button>
								<span>|</span>
								<button className="text-sm hover:underline" type="button">
									4 Days
								</button>
								<span>|</span>
								<button className="text-sm hover:underline" type="button">
									7 Days
								</button>
								<span>|</span>
								<button className="text-sm hover:underline" type="button">
									10 Days
								</button>
								<span>|</span>
								<button className="text-sm hover:underline" type="button">
									Refresh
								</button>
							</div>
						</div>
					</div>

					{/* Table controls */}
					<div className="flex flex-col gap-3 border-t px-4 py-3 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-2 text-sm">
							<span>Show</span>

							<select
								className="h-8 rounded-md border bg-background px-2"
								onChange={(event) => {
									setPageSize(Number(event.target.value));
									setCurrentPage(1);
								}}
								value={pageSize}
							>
								<option value={10}>10</option>
								<option value={25}>25</option>
								<option value={50}>50</option>
							</select>

							<span>entries</span>
						</div>

						<div className="flex items-center gap-2">
							<span className="text-sm">Search:</span>

							<Input
								className="w-[220px]"
								onChange={(event) => {
									setSearch(event.target.value);
									setCurrentPage(1);
								}}
								placeholder=""
								value={search}
							/>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto">
						<table className="w-full min-w-[1500px] border-collapse text-sm">
							<thead>
								<tr className="border-y bg-muted/40">
									<th className="px-3 py-3 text-left font-medium">Agent Id</th>
									<th className="px-3 py-3 text-left font-medium">Name</th>
									<th className="px-3 py-3 text-left font-medium">
										Call Forward Number
									</th>
									<th className="px-3 py-3 text-left font-medium">
										Alternate Numbers
									</th>
									<th className="px-3 py-3 text-left font-medium">
										Intercom Number
									</th>
									<th className="px-3 py-3 text-left font-medium">
										Time Group
									</th>
									<th className="px-3 py-3 text-left font-medium">
										Departments
									</th>
									<th className="px-3 py-3 text-left font-medium">Username</th>
									<th className="px-3 py-3 text-left font-medium">
										Extension CallerId
									</th>
									<th className="px-3 py-3 text-left font-medium">
										Agent Status
									</th>
									<th className="px-3 py-3 text-left font-medium">
										Extension Status
									</th>
									<th className="px-3 py-3 text-left font-medium">
										Calls Answered
									</th>
									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								{visibleAgents.map((agent) => (
									<tr className="border-b hover:bg-muted/20" key={agent.id}>
										<td className="px-3 py-3 font-medium">{agent.id}</td>

										<td className="px-3 py-3">
											<div>
												<span className="mb-1 inline-block rounded-sm bg-sky-500 px-2 py-1 font-semibold text-white text-xs">
													Login Based Calling
												</span>

												<div>{agent.name}</div>
											</div>
										</td>

										<td className="px-3 py-3">
											<div className="flex items-center gap-2">
												<span>{agent.callForwardNumber}</span>

												<span
													className="inline-flex size-4 items-center justify-center rounded-full bg-green-600 font-bold text-[10px] text-white"
													title="Verified"
												>
													✓
												</span>
											</div>
										</td>

										<td className="px-3 py-3">{agent.alternateNumbers}</td>

										<td className="px-3 py-3">{agent.intercomNumber}</td>

										<td className="px-3 py-3">{agent.timeGroup}</td>

										<td className="px-3 py-3">{agent.departments}</td>

										<td className="px-3 py-3">{agent.username}</td>

										<td className="max-w-[180px] px-3 py-3">
											<span className="break-words">
												{agent.extensionCallerId}
											</span>
										</td>

										<td className="px-3 py-3">
											<AgentStatusDot status={agent.agentStatus} />
										</td>

										<td className="px-3 py-3">
											<ExtensionStatusDot status={agent.extensionStatus} />
										</td>

										<td className="px-3 py-3 text-center">
											{agent.callsAnswered}
										</td>

										<td className="px-3 py-3">
											<select
												className="h-9 min-w-[125px] rounded-md border bg-background px-2 text-sm"
												defaultValue=""
											>
												<option disabled value="">
													Select an Action
												</option>
												<option value="edit">Edit</option>
												<option value="view">View</option>
												<option value="disable">Disable</option>
												<option value="delete">Delete</option>
											</select>
										</td>
									</tr>
								))}

								{visibleAgents.length === 0 && (
									<tr>
										<td
											className="px-4 py-10 text-center text-muted-foreground"
											colSpan={13}
										>
											No agents found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Pagination */}
					<div className="flex flex-col gap-3 border-t px-4 py-4 text-sm md:flex-row md:items-center md:justify-between">
						<span className="text-muted-foreground">
							Showing {filteredAgents.length === 0 ? 0 : startIndex + 1} to{" "}
							{Math.min(startIndex + pageSize, filteredAgents.length)} of{" "}
							{filteredAgents.length} entries
						</span>

						<div className="flex items-center gap-1">
							<Button
								disabled={safePage === 1}
								onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
								size="sm"
								variant="outline"
							>
								Previous
							</Button>

							{Array.from({ length: totalPages }, (_, index) => index + 1).map(
								(page) => (
									<Button
										key={page}
										onClick={() => setCurrentPage(page)}
										size="sm"
										variant={page === safePage ? "default" : "outline"}
									>
										{page}
									</Button>
								)
							)}

							<Button
								disabled={safePage === totalPages}
								onClick={() =>
									setCurrentPage((page) => Math.min(totalPages, page + 1))
								}
								size="sm"
								variant="outline"
							>
								Next
							</Button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
