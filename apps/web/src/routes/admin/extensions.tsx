// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import {
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	RefreshCw,
	Search,
	Upload,
	Users,
} from "lucide-react";
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
		Active: "bg-emerald-500",
		Blocked: "bg-red-500",
		Disabled: "bg-amber-500",
		Busy: "bg-orange-500",
		Offline: "bg-slate-400",
	}[status];

	return (
		<span
			className={`inline-block size-2.5 rounded-full ring-4 ring-white dark:ring-[#0b1728] ${className}`}
			title={status}
		/>
	);
}

function ExtensionStatusDot({ status }: { status: Agent["extensionStatus"] }) {
	return (
		<span
			className={`inline-block size-2.5 rounded-full ring-4 ring-white dark:ring-[#0b1728] ${
				status === "Registered" ? "bg-emerald-500" : "bg-red-500"
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

	const registeredCount = agents.filter(
		(agent) => agent.extensionStatus === "Registered"
	).length;

	const offlineCount = agents.filter(
		(agent) => agent.agentStatus === "Offline"
	).length;

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1600px]">
					{/* PAGE HEADER */}
					<div className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm xl:flex-row xl:items-center xl:justify-between dark:border-slate-800 dark:bg-[#0b1728]">
						<div>
							<div className="flex items-center gap-2">
								<h1 className="font-bold text-[#102b55] text-xl tracking-tight dark:text-slate-100">
									All Agents
								</h1>

								<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
									{agents.length} AGENTS
								</span>
							</div>

							<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
								Manage agents, extensions and calling configuration.
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							{/* FEATURE CODES */}
							<Button
								className="!rounded-lg h-9 border-slate-200 px-3 text-slate-600 text-xs shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
								type="button"
								variant="outline"
							>
								Feature Codes
							</Button>

							{/* UPLOAD AGENTS */}
							<Button
								className="!rounded-lg h-9 border-slate-200 px-3 text-slate-600 text-xs shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
								type="button"
								variant="outline"
							>
								<Upload className="mr-1.5 size-3.5" />
								Upload Agents
							</Button>

							{/* TEAMS */}
							<Button
								className="!rounded-lg h-9 border-slate-200 px-3 text-slate-600 text-xs shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
								type="button"
								variant="outline"
							>
								<Users className="mr-1.5 size-3.5" />
								Teams
							</Button>

							{/* ADD AGENT */}
							<Button
								className="!rounded-lg !bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-9 px-4 font-medium text-xs shadow-blue-500/20 shadow-sm transition-colors"
								type="button"
							>
								+ Add Agent
							</Button>
						</div>
					</div>

					{/* SUMMARY */}
					<div className="mb-4 grid gap-3 sm:grid-cols-3">
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
								Maximum Agents
							</p>

							<p className="mt-1 font-bold text-[#102b55] text-lg dark:text-slate-100">
								23
							</p>
						</div>

						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
								Registered Extensions
							</p>

							<p className="mt-1 font-bold text-emerald-600 text-lg dark:text-emerald-400">
								{registeredCount}
								<span className="font-normal text-slate-400 text-xs">
									{" "}
									/ {agents.length}
								</span>
							</p>
						</div>

						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
								Offline Agents
							</p>

							<p className="mt-1 font-bold text-lg text-slate-600 dark:text-slate-300">
								{offlineCount}
							</p>
						</div>
					</div>

					{/* MAIN CARD */}
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* STATUS LEGEND */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-3.5 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800">
							<div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px]">
								<span className="font-semibold text-[#263b5b] dark:text-slate-200">
									Agent Status
								</span>

								<span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
									<AgentStatusDot status="Active" />
									Active
								</span>

								<span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
									<AgentStatusDot status="Blocked" />
									Blocked
								</span>

								<span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
									<AgentStatusDot status="Disabled" />
									Disabled
								</span>

								<span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
									<AgentStatusDot status="Busy" />
									Busy
								</span>

								<span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
									<AgentStatusDot status="Offline" />
									Offline
								</span>

								<span className="mx-1 hidden h-4 w-px bg-slate-200 sm:block dark:bg-slate-700" />

								<span className="font-semibold text-[#263b5b] dark:text-slate-200">
									Extension
								</span>

								<span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
									<ExtensionStatusDot status="Registered" />
									Registered
								</span>

								<span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
									<ExtensionStatusDot status="Unregistered" />
									Unregistered
								</span>
							</div>

							<div className="flex items-center gap-1.5">
								<span className="font-semibold text-[11px] text-slate-500 dark:text-slate-400">
									Calls Answered:
								</span>

								{/* 1 DAY */}
								<Button
									className="!rounded-lg !bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-7 px-2.5 font-medium text-[10px] shadow-blue-500/20 shadow-sm transition-colors"
									size="sm"
									type="button"
								>
									1 Day
								</Button>

								{/* 2 DAYS */}
								<Button
									className="!rounded-lg h-7 border-slate-200 px-2.5 text-[10px] text-slate-500 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									size="sm"
									type="button"
									variant="outline"
								>
									2 Days
								</Button>

								{/* 7 DAYS */}
								<Button
									className="!rounded-lg h-7 border-slate-200 px-2.5 text-[10px] text-slate-500 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									size="sm"
									type="button"
									variant="outline"
								>
									7 Days
								</Button>

								{/* REFRESH */}
								<Button
									className="!rounded-lg h-7 w-7 border-slate-200 p-0 text-slate-500 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									size="sm"
									title="Refresh"
									type="button"
									variant="outline"
								>
									<RefreshCw className="size-3" />
								</Button>
							</div>
						</div>

						{/* TABLE TOOLBAR */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-3.5 md:flex-row md:items-center md:justify-between dark:border-slate-800">
							<div className="flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<span>Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500"
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

							<div className="relative">
								<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

								<Input
									className="h-8 w-full rounded-lg border-slate-200 pl-8 text-xs md:w-[240px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
									onChange={(event) => {
										setSearch(event.target.value);
										setCurrentPage(1);
									}}
									placeholder="Search agents..."
									value={search}
								/>
							</div>
						</div>

						{/* TABLE */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[1450px] border-collapse text-xs">
								<thead>
									<tr className="border-slate-100 border-b bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70">
										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Agent ID
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Name
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Call Forward Number
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Alternate Numbers
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Intercom
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Time Group
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Departments
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Username
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Extension Caller ID
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Agent Status
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Extension Status
										</th>

										<th className="px-4 py-3 text-center font-semibold text-[#263b5b] dark:text-slate-300">
											Calls
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleAgents.map((agent) => (
										<tr
											className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/30"
											key={agent.id}
										>
											<td className="px-4 py-3">
												<span className="font-mono font-semibold text-[#102b55] dark:text-slate-200">
													{agent.id}
												</span>
											</td>

											<td className="px-4 py-3">
												<div className="space-y-1">
													<span className="inline-flex rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-[#0757ff] text-[9px] dark:bg-blue-950/60 dark:text-blue-400">
														Login Based Calling
													</span>

													<div className="font-medium text-[#263b5b] dark:text-slate-200">
														{agent.name}
													</div>
												</div>
											</td>

											<td className="px-4 py-3">
												<div className="flex items-center gap-1.5 whitespace-nowrap">
													<span className="text-slate-600 dark:text-slate-400">
														{agent.callForwardNumber}
													</span>

													<span
														className="flex size-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] text-white"
														title="Verified"
													>
														✓
													</span>
												</div>
											</td>

											<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
												{agent.alternateNumbers}
											</td>

											<td className="px-4 py-3 font-medium text-slate-600 dark:text-slate-400">
												{agent.intercomNumber}
											</td>

											<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
												{agent.timeGroup}
											</td>

											<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
												{agent.departments}
											</td>

											<td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
												{agent.username}
											</td>

											<td className="max-w-[210px] px-4 py-3 text-slate-500 dark:text-slate-400">
												<span className="break-words">
													{agent.extensionCallerId}
												</span>
											</td>

											<td className="px-4 py-3">
												<div className="flex items-center gap-2">
													<AgentStatusDot status={agent.agentStatus} />

													<span className="text-slate-500 dark:text-slate-400">
														{agent.agentStatus}
													</span>
												</div>
											</td>

											<td className="px-4 py-3">
												<div className="flex items-center gap-2">
													<ExtensionStatusDot status={agent.extensionStatus} />

													<span
														className={
															agent.extensionStatus === "Registered"
																? "text-emerald-600 dark:text-emerald-400"
																: "text-red-500 dark:text-red-400"
														}
													>
														{agent.extensionStatus}
													</span>
												</div>
											</td>

											<td className="px-4 py-3 text-center">
												<span className="font-semibold text-[#102b55] dark:text-slate-200">
													{agent.callsAnswered}
												</span>
											</td>

											<td className="px-4 py-3">
												<select
													className="h-8 min-w-[120px] rounded-lg border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none transition hover:border-blue-200 focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500 dark:hover:border-blue-800"
													defaultValue=""
												>
													<option disabled value="">
														Select Action
													</option>

													<option value="view">View</option>
													<option value="edit">Edit</option>
													<option value="disable">Disable</option>
													<option value="delete">Delete</option>
												</select>
											</td>
										</tr>
									))}

									{visibleAgents.length === 0 && (
										<tr>
											<td className="px-4 py-12 text-center" colSpan={13}>
												<div className="flex flex-col items-center">
													<Search className="mb-2 size-7 text-slate-300 dark:text-slate-600" />

													<p className="font-medium text-slate-500 dark:text-slate-400">
														No agents found
													</p>

													<p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
														Try changing your search.
													</p>
												</div>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{/* PAGINATION */}
						<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-3.5 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<span className="text-slate-400 dark:text-slate-500">
								Showing{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredAgents.length === 0 ? 0 : startIndex + 1}
								</span>{" "}
								to{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{Math.min(startIndex + pageSize, filteredAgents.length)}
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredAgents.length}
								</span>{" "}
								entries
							</span>

							<div className="flex items-center gap-1.5">
								{/* PREVIOUS */}
								<Button
									className="!rounded-lg h-8 border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() =>
										setCurrentPage((page) => Math.max(1, page - 1))
									}
									size="sm"
									type="button"
									variant="outline"
								>
									<ChevronLeft className="mr-1 size-3.5" />
									Previous
								</Button>

								{/* PAGE NUMBERS */}
								{Array.from(
									{ length: totalPages },
									(_, index) => index + 1
								).map((page) => (
									<Button
										className={
											page === safePage
												? "!rounded-lg !bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-8 min-w-8 px-2 text-[11px] shadow-blue-500/20 shadow-sm"
												: "!rounded-lg h-8 min-w-8 border-slate-200 px-2 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
										}
										key={page}
										onClick={() => setCurrentPage(page)}
										size="sm"
										type="button"
										variant={page === safePage ? "default" : "outline"}
									>
										{page}
									</Button>
								))}

								{/* NEXT */}
								<Button
									className="!rounded-lg h-8 border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === totalPages}
									onClick={() =>
										setCurrentPage((page) => Math.min(totalPages, page + 1))
									}
									size="sm"
									type="button"
									variant="outline"
								>
									Next
									<ChevronRight className="ml-1 size-3.5" />
								</Button>
							</div>
						</div>
					</div>

					{/* FOOTER */}
					<div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500">
						<CheckCircle2 className="size-3.5 text-emerald-500" />
						Agent and extension data is securely managed
					</div>
				</div>
			</main>
		</div>
	);
}
