// biome-ignore-all lint/performance/noJsxPropsBind: Table controls use local component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";

import { ChevronLeft, ChevronRight, List, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/survey-campaigns")({
	component: SurveyCampaignsPage,
});

type SurveyCampaign = {
	id: number;
	name: string;
	topic: string;
	heading: string;
};

const surveyCampaigns: SurveyCampaign[] = [
	{
		id: 1,
		name: "CRLA ACC",
		topic: "CRLA ACC",
		heading: "CRLA ACC",
	},
	{
		id: 2,
		name: "CRLA ACC Elites",
		topic: "CRLA ACC Elites",
		heading: "CRLA ACC Elites",
	},
	{
		id: 3,
		name: "CRLA KC",
		topic: "CRLA KC",
		heading: "CRLA KC",
	},
	{
		id: 4,
		name: "CRLB ACC",
		topic: "CRLB ACC",
		heading: "CRLB ACC",
	},
	{
		id: 5,
		name: "CRLB KC",
		topic: "CRLB KC",
		heading: "CRLB KC",
	},
	{
		id: 6,
		name: "CRLD ACC",
		topic: "CRLD ACC",
		heading: "CRLD ACC",
	},
	{
		id: 7,
		name: "CRLD KC",
		topic: "CRLD KC",
		heading: "CRLD KC",
	},
];

function SurveyCampaignsPage() {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredCampaigns = useMemo(() => {
		const searchValue = search.trim().toLowerCase();

		if (!searchValue) {
			return surveyCampaigns;
		}

		return surveyCampaigns.filter((campaign) =>
			`${campaign.name} ${campaign.topic} ${campaign.heading}`
				.toLowerCase()
				.includes(searchValue)
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

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<div className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm lg:flex-row lg:items-center lg:justify-between dark:border-slate-800 dark:bg-[#0b1728]">
						<div>
							<div className="flex flex-wrap items-center gap-2">
								<h1 className="font-bold text-[#102b55] text-xl tracking-tight dark:text-slate-100">
									Survey Campaigns
								</h1>

								<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
									{surveyCampaigns.length} CAMPAIGNS
								</span>
							</div>

							<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
								Manage survey campaigns and their topics and headings.
							</p>
						</div>

						<Button
							className="!bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-9 w-fit rounded-lg px-4 font-medium text-xs shadow-blue-500/20 shadow-sm transition-colors"
							onClick={() =>
								navigate({
									to: "/admin/add-survey-campaign",
								})
							}
							type="button"
						>
							<Plus className="mr-1.5 size-4" />
							Add Survey Campaign
						</Button>
					</div>

					{/* SUMMARY */}
					<div className="mb-4 grid gap-3 sm:grid-cols-2">
						{/* TOTAL CAMPAIGNS */}
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
									<List className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Total Campaigns
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{surveyCampaigns.length}
									</p>
								</div>
							</div>
						</div>

						{/* VISIBLE RESULTS */}
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
									<List className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Visible Results
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{filteredCampaigns.length}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* MAIN CARD */}
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* TABLE CONTROLS */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-3.5 md:flex-row md:items-center md:justify-between dark:border-slate-800">
							<div className="flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<span>Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs outline-none transition-colors focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
									id="survey-page-size"
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
									className="h-8 w-full rounded-lg border-slate-200 bg-white pl-8 text-xs shadow-sm transition-colors focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 md:w-[240px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
									id="survey-search"
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
							<table className="w-full min-w-[900px] border-collapse text-xs">
								<thead>
									<tr className="border-slate-100 border-y bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70">
										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											S.No.
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Name
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Topic
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Heading
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
											<td className="px-4 py-3 font-medium text-slate-400 dark:text-slate-500">
												{campaign.id}.
											</td>

											<td className="px-4 py-3">
												<button
													className="font-semibold text-[#0757ff] hover:underline dark:text-blue-400"
													type="button"
												>
													{campaign.name}
												</button>
											</td>

											<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
												{campaign.topic}
											</td>

											<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
												{campaign.heading}
											</td>

											<td className="px-4 py-3">
												<select
													className="h-8 min-w-[135px] rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-600 shadow-sm outline-none transition-colors hover:border-blue-200 focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500 dark:hover:border-blue-800"
													defaultValue=""
													id={`survey-action-${campaign.id}`}
												>
													<option disabled value="">
														Select Action
													</option>

													<option value="view">View</option>
													<option value="edit">Edit</option>
													<option value="delete">Delete</option>
												</select>
											</td>
										</tr>
									))}

									{visibleCampaigns.length === 0 ? (
										<tr>
											<td
												className="px-4 py-12 text-center text-slate-400 dark:text-slate-500"
												colSpan={5}
											>
												<Search className="mx-auto mb-2 size-7 text-slate-300 dark:text-slate-600" />

												<p className="font-medium text-slate-500 dark:text-slate-400">
													No survey campaigns found
												</p>

												<p className="mt-1 text-[11px]">
													Try changing your search.
												</p>
											</td>
										</tr>
									) : null}
								</tbody>
							</table>
						</div>

						{/* FOOTER */}
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
								{/* FIRST */}
								<Button
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() => setCurrentPage(1)}
									size="sm"
									type="button"
									variant="outline"
								>
									First
								</Button>

								{/* PREVIOUS */}
								<Button
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
												? "!bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-8 min-w-8 rounded-lg px-2 font-medium text-[11px] shadow-blue-500/20 shadow-sm"
												: "h-8 min-w-8 rounded-lg border-slate-200 bg-white px-2 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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

								{/* LAST */}
								<Button
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
