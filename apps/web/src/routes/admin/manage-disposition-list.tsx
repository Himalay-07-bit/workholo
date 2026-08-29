// biome-ignore-all lint/performance/noJsxPropsBind: Table controls use local component state.
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import {
	CheckCircle2,
	ChevronLeft,
	ChevronRight,
	List,
	Plus,
	Search,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/manage-disposition-list")({
	component: ManageDispositionListPage,
});

type DispositionList = {
	id: number;
	name: string;
	description: string;
	statusAvailable: number;
	assigned: number;
	status: "Enabled" | "Disabled";
};

const dispositionLists: DispositionList[] = [
	{
		id: 1,
		name: "HRD",
		description: "HRD",
		statusAvailable: 12,
		assigned: 1,
		status: "Enabled",
	},
	{
		id: 2,
		name: "NLPC",
		description: "NLPC",
		statusAvailable: 12,
		assigned: 2,
		status: "Enabled",
	},
	{
		id: 3,
		name: "CRM",
		description: "CRM",
		statusAvailable: 15,
		assigned: 1,
		status: "Enabled",
	},
	{
		id: 4,
		name: "CRLD",
		description: "CRLD",
		statusAvailable: 11,
		assigned: 1,
		status: "Enabled",
	},
	{
		id: 5,
		name: "CRLAB",
		description: "CRLAB",
		statusAvailable: 12,
		assigned: 3,
		status: "Enabled",
	},
];

function ManageDispositionListPage() {
	const [name, setName] = useState("");
	const [status, setStatus] = useState("All");
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredLists = useMemo(() => {
		const searchValue = search.trim().toLowerCase();
		const nameValue = name.trim().toLowerCase();

		return dispositionLists.filter((item) => {
			const matchesName =
				!nameValue || item.name.toLowerCase().includes(nameValue);

			const matchesStatus = status === "All" || item.status === status;

			const matchesSearch =
				!searchValue ||
				`${item.name} ${item.description}`.toLowerCase().includes(searchValue);

			return matchesName && matchesStatus && matchesSearch;
		});
	}, [name, search, status]);

	const totalPages = Math.max(1, Math.ceil(filteredLists.length / pageSize));

	const safePage = Math.min(currentPage, totalPages);

	const startIndex = (safePage - 1) * pageSize;

	const visibleLists = filteredLists.slice(startIndex, startIndex + pageSize);

	const enabledCount = dispositionLists.filter(
		(item) => item.status === "Enabled"
	).length;

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<div className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm lg:flex-row lg:items-center lg:justify-between dark:border-slate-800 dark:bg-[#0b1728]">
						<div>
							<div className="flex items-center gap-2">
								<h1 className="font-bold text-[#102b55] text-xl tracking-tight dark:text-slate-100">
									Manage Disposition Lists
								</h1>

								<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
									{dispositionLists.length} LISTS
								</span>
							</div>

							<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
								Manage disposition lists and their available statuses.
							</p>
						</div>

						<Button className="h-9 w-fit bg-[#0757ff] text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500">
							<Plus className="mr-1.5 size-4" />
							Add Disposition List
						</Button>
					</div>

					{/* SUMMARY */}
					<div className="mb-4 grid gap-3 sm:grid-cols-3">
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
									<List className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Total Lists
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{dispositionLists.length}
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
									<CheckCircle2 className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Enabled
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{enabledCount}
									</p>
								</div>
							</div>
						</div>

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
										{filteredLists.length}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* MAIN CARD */}
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* FILTERS */}
						<div className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[220px_220px_auto]">
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="disposition-name"
									>
										Name
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
										id="disposition-name"
										onChange={(event) => {
											setName(event.target.value);
											setCurrentPage(1);
										}}
										placeholder="Search by name"
										value={name}
									/>
								</div>

								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="disposition-status"
									>
										Status
									</label>

									<select
										className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500"
										id="disposition-status"
										onChange={(event) => {
											setStatus(event.target.value);
											setCurrentPage(1);
										}}
										value={status}
									>
										<option value="All">All</option>
										<option value="Enabled">Enabled</option>
										<option value="Disabled">Disabled</option>
									</select>
								</div>

								<div className="flex items-end gap-2">
									<Button
										className="h-9 bg-[#0757ff] text-xs hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
										onClick={() => setCurrentPage(1)}
									>
										<Search className="mr-1.5 size-3.5" />
										Search
									</Button>

									<Button
										className="h-9 border-slate-200 text-slate-600 text-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
										onClick={() => {
											setName("");
											setStatus("All");
											setSearch("");
											setCurrentPage(1);
										}}
										variant="outline"
									>
										Reset
									</Button>
								</div>
							</div>
						</div>

						{/* TABLE CONTROLS */}
						<div className="flex flex-col gap-3 px-5 py-3.5 md:flex-row md:items-center md:justify-between">
							<div className="flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<span>Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
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
									className="h-8 w-full rounded-lg border-slate-200 bg-white pl-8 text-xs md:w-[240px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
									onChange={(event) => {
										setSearch(event.target.value);
										setCurrentPage(1);
									}}
									placeholder="Search lists..."
									value={search}
								/>
							</div>
						</div>

						{/* TABLE */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[1000px] border-collapse text-xs">
								<thead>
									<tr className="border-slate-100 border-y bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70">
										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											S.No.
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Name
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Description
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Disposition Status
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Availability
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Status
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleLists.map((item) => (
										<tr
											className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/30"
											key={item.id}
										>
											<td className="px-4 py-3 font-medium text-slate-400 dark:text-slate-500">
												{item.id}.
											</td>

											<td className="px-4 py-3">
												<button
													className="font-semibold text-[#0757ff] hover:underline dark:text-blue-400"
													type="button"
												>
													{item.name}
												</button>
											</td>

											<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
												{item.description}
											</td>

											<td className="px-4 py-3">
												<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[11px] dark:bg-blue-950/60 dark:text-blue-400">
													{item.statusAvailable}
												</span>
											</td>

											<td className="px-4 py-3">
												<button
													className="font-medium text-[#0757ff] hover:underline dark:text-blue-400"
													type="button"
												>
													Assigned ({item.assigned})
												</button>
											</td>

											<td className="px-4 py-3">
												<span
													className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold text-[10px] ${
														item.status === "Enabled"
															? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
															: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
													}`}
												>
													<span
														className={`size-1.5 rounded-full ${
															item.status === "Enabled"
																? "bg-emerald-500"
																: "bg-slate-400"
														}`}
													/>

													{item.status}
												</span>
											</td>

											<td className="px-4 py-3">
												<select
													className="h-8 min-w-[125px] rounded-lg border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none hover:border-blue-200 focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500 dark:hover:border-blue-800"
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

									{visibleLists.length === 0 && (
										<tr>
											<td
												className="px-4 py-12 text-center text-slate-400 dark:text-slate-500"
												colSpan={7}
											>
												<Search className="mx-auto mb-2 size-7 text-slate-300 dark:text-slate-600" />

												<p className="font-medium text-slate-500 dark:text-slate-400">
													No disposition lists found
												</p>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{/* FOOTER */}
						<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-3.5 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<span className="text-slate-400 dark:text-slate-500">
								Showing{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredLists.length === 0 ? 0 : startIndex + 1}
								</span>{" "}
								to{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{Math.min(startIndex + pageSize, filteredLists.length)}
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredLists.length}
								</span>{" "}
								entries
							</span>

							<div className="flex items-center gap-1.5">
								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() => setCurrentPage(1)}
									size="sm"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() =>
										setCurrentPage((page) => Math.max(1, page - 1))
									}
									size="sm"
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
												? "h-8 min-w-8 bg-[#0757ff] px-2 text-[11px] shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
												: "h-8 min-w-8 border-slate-200 px-2 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
										}
										key={page}
										onClick={() => setCurrentPage(page)}
										size="sm"
										variant={page === safePage ? "default" : "outline"}
									>
										{page}
									</Button>
								))}

								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === totalPages}
									onClick={() =>
										setCurrentPage((page) => Math.min(totalPages, page + 1))
									}
									size="sm"
									variant="outline"
								>
									Next
									<ChevronRight className="ml-1 size-3.5" />
								</Button>

								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === totalPages}
									onClick={() => setCurrentPage(totalPages)}
									size="sm"
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
