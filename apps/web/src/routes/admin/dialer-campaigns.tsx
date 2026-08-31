// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";

import {
	ChevronLeft,
	ChevronRight,
	Plus,
	Search,
	Target,
	Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/dialer-campaigns")({
	component: DialerCampaignsPage,
});

type Campaign = {
	id: number;
	name: string;
	concurrentLimit: number;
	ringTimeout: number;
	listName: string;
	status: "Active" | "Not Active";
	callsStatus: string;
	activeAgents: number;
};

const campaigns: Campaign[] = [
	{
		id: 1,
		name: "it team (105865)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Not Active",
		callsStatus: "-",
		activeAgents: 0,
	},
	{
		id: 2,
		name: "CRM KC (104522)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 3,
	},
	{
		id: 3,
		name: "CRLD KC (104394)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 2,
	},
	{
		id: 4,
		name: "CRLB KC (104343)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 3,
	},
	{
		id: 5,
		name: "CRLA KC (104246)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 7,
	},
	{
		id: 6,
		name: "NLPC Backend (103560)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Not Active",
		callsStatus: "-",
		activeAgents: 0,
	},
	{
		id: 7,
		name: "NLPC (100938)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 2,
	},
	{
		id: 8,
		name: "HRD (100937)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 1,
	},
];

function DialerCampaignsPage() {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredCampaigns = useMemo(() => {
		const value = search.trim().toLowerCase();

		if (!value) {
			return campaigns;
		}

		return campaigns.filter((campaign) =>
			[campaign.name, campaign.status, campaign.callsStatus, campaign.listName]
				.join(" ")
				.toLowerCase()
				.includes(value)
		);
	}, [search]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredCampaigns.length / pageSize)
	);

	const safePage = Math.min(currentPage, totalPages);
	const startIndex = (safePage - 1) * pageSize;

	const visibleCampaigns = filteredCampaigns.slice(
		startIndex,
		startIndex + pageSize
	);

	const activeCampaigns = campaigns.filter(
		(campaign) => campaign.status === "Active"
	).length;

	const totalActiveAgents = campaigns.reduce(
		(total, campaign) => total + campaign.activeAgents,
		0
	);

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<div className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-[#0b1728]">
						<div>
							<div className="flex items-center gap-2">
								<h1 className="font-bold text-[#102b55] text-xl tracking-tight dark:text-slate-100">
									Dialer Campaigns
								</h1>

								<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
									{campaigns.length} CAMPAIGNS
								</span>
							</div>

							<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
								Manage outbound calling campaigns and active agents.
							</p>
						</div>

						<Button
							className="!rounded-lg !bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-9 px-4 font-medium text-xs shadow-blue-500/20 shadow-sm transition-colors"
							onClick={() =>
								navigate({
									to: "/admin/add-dialer-campaign",
								})
							}
							type="button"
						>
							<Plus className="mr-1.5 size-4" />
							Add Dialer Campaign
						</Button>
					</div>

					{/* SUMMARY */}
					<div className="mb-4 grid gap-3 sm:grid-cols-3">
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
									<Target className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Total Campaigns
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{campaigns.length}
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400">
									<span className="size-2.5 rounded-full bg-emerald-500" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Active Campaigns
									</p>

									<p className="font-bold text-emerald-600 text-lg dark:text-emerald-400">
										{activeCampaigns}
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
									<Users className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Active Agents
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{totalActiveAgents}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* MAIN CARD */}
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* TOOLBAR */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-3.5 md:flex-row md:items-center md:justify-between dark:border-slate-800">
							<div className="flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<span>Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-500"
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
									placeholder="Search campaigns..."
									value={search}
								/>
							</div>
						</div>

						{/* TABLE */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[1100px] border-collapse text-xs">
								<thead>
									<tr className="border-slate-100 border-b bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70">
										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											S.No
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Campaign Name
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Concurrent Limit
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Ring Timeout
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Lead List
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Status
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Calls Status
										</th>

										<th className="px-4 py-3 text-center font-semibold text-[#263b5b] dark:text-slate-300">
											Active Agents
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleCampaigns.map((campaign) => (
										<tr
											className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/30"
											key={campaign.id}
										>
											<td className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">
												{campaign.id}
											</td>

											<td className="px-4 py-3">
												<div className="flex items-center gap-2.5">
													<div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
														<Target className="size-3.5" />
													</div>

													<div>
														<div className="font-semibold text-[#263b5b] dark:text-slate-200">
															{campaign.name}
														</div>

														<div className="mt-0.5 font-mono text-[9px] text-slate-400 dark:text-slate-500">
															ID: {campaign.id}
														</div>
													</div>
												</div>
											</td>

											<td className="px-4 py-3">
												<span className="font-semibold text-[#102b55] dark:text-slate-200">
													{campaign.concurrentLimit}
												</span>
											</td>

											<td className="px-4 py-3 text-slate-600 dark:text-slate-400">
												{campaign.ringTimeout}s
											</td>

											<td className="px-4 py-3">
												<button
													className="font-medium text-[#0757ff] hover:underline dark:text-blue-400"
													type="button"
												>
													{campaign.listName}
												</button>
											</td>

											<td className="px-4 py-3">
												<span
													className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold text-[10px] ${
														campaign.status === "Active"
															? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
															: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
													}`}
												>
													<span
														className={`size-1.5 rounded-full ${
															campaign.status === "Active"
																? "bg-emerald-500"
																: "bg-slate-400"
														}`}
													/>

													{campaign.status}
												</span>
											</td>

											<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
												{campaign.callsStatus}
											</td>

											<td className="px-4 py-3 text-center">
												<span
													className={
														campaign.activeAgents > 0
															? "font-bold text-[#0757ff] dark:text-blue-400"
															: "text-slate-400 dark:text-slate-500"
													}
												>
													{campaign.activeAgents}
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
													<option value="activate">Activate</option>
													<option value="delete">Delete</option>
												</select>
											</td>
										</tr>
									))}

									{visibleCampaigns.length === 0 && (
										<tr>
											<td
												className="px-4 py-12 text-center text-slate-400 dark:text-slate-500"
												colSpan={9}
											>
												<Search className="mx-auto mb-2 size-7 text-slate-300 dark:text-slate-600" />

												<p className="font-medium text-slate-500 dark:text-slate-400">
													No campaigns found
												</p>
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
									{filteredCampaigns.length === 0 ? 0 : startIndex + 1}
								</span>{" "}
								to{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{Math.min(startIndex + pageSize, filteredCampaigns.length)}
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredCampaigns.length}
								</span>{" "}
								entries
							</span>

							<div className="flex items-center gap-1.5">
								<Button
									className="!rounded-lg h-8 border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() => setCurrentPage(1)}
									size="sm"
									type="button"
									variant="outline"
								>
									First
								</Button>

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

								<Button
									className="!rounded-lg h-8 border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === totalPages}
									onClick={() => setCurrentPage(totalPages)}
									size="sm"
									type="button"
									variant="outline"
								>
									Last
								</Button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
