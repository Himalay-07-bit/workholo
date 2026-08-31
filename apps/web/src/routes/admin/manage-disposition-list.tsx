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
	X,
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

	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [newListName, setNewListName] = useState("");
	const [newListDescription, setNewListDescription] = useState("");

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

	const resetFilters = () => {
		setName("");
		setStatus("All");
		setSearch("");
		setCurrentPage(1);
	};

	const closeAddDialog = () => {
		setIsAddDialogOpen(false);
		setNewListName("");
		setNewListDescription("");
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<section className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<div className="flex flex-wrap items-center gap-2">
									<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
										<List className="size-4" />
									</div>

									<div>
										<div className="flex items-center gap-2">
											<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-white">
												Manage Disposition Lists
											</h1>

											<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
												{dispositionLists.length} LISTS
											</span>
										</div>

										<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
											Manage disposition lists and their available statuses.
										</p>
									</div>
								</div>
							</div>

							<Button
								className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
								onClick={() => setIsAddDialogOpen(true)}
								type="button"
							>
								<Plus className="mr-1.5 size-3.5" />
								Add Disposition List
							</Button>
						</div>
					</section>

					{/* SUMMARY CARDS */}
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

									<p className="mt-0.5 font-bold text-[#102b55] text-lg dark:text-slate-100">
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

									<p className="mt-0.5 font-bold text-[#102b55] text-lg dark:text-slate-100">
										{enabledCount}
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
									<Search className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Visible Results
									</p>

									<p className="mt-0.5 font-bold text-[#102b55] text-lg dark:text-slate-100">
										{filteredLists.length}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* MAIN CARD */}
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* FILTER HEADER */}
						<div className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[240px_220px_auto]">
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="disposition-name"
									>
										Name
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white text-xs shadow-sm transition focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
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
										className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs shadow-sm outline-none transition focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
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
										className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
										onClick={() => setCurrentPage(1)}
										type="button"
									>
										<Search className="mr-1.5 size-3.5" />
										Search
									</Button>

									<Button
										className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
										onClick={resetFilters}
										type="button"
										variant="outline"
									>
										Reset
									</Button>
								</div>
							</div>
						</div>

						{/* TABLE CONTROLS */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-3.5 md:flex-row md:items-center md:justify-between dark:border-slate-800">
							<div className="flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<span>Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs shadow-sm outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
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
									className="h-8 w-full rounded-lg border-slate-200 bg-white pl-8 text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 md:w-[240px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
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
									<tr className="border-slate-100 border-y bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/70">
										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											S.No.
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Name
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Description
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Disposition Status
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Availability
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Status
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleLists.map((item) => (
										<tr
											className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/40 dark:border-slate-800 dark:hover:bg-blue-950/20"
											key={item.id}
										>
											<td className="px-5 py-3.5 font-medium text-slate-400 dark:text-slate-500">
												{item.id}.
											</td>

											<td className="px-5 py-3.5">
												<button
													className="font-semibold text-[#0757ff] hover:underline dark:text-blue-400"
													type="button"
												>
													{item.name}
												</button>
											</td>

											<td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
												{item.description}
											</td>

											<td className="px-5 py-3.5">
												<span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
													{item.statusAvailable}
												</span>
											</td>

											<td className="px-5 py-3.5">
												<button
													className="font-medium text-[#0757ff] hover:underline dark:text-blue-400"
													type="button"
												>
													Assigned ({item.assigned})
												</button>
											</td>

											<td className="px-5 py-3.5">
												{item.status === "Enabled" ? (
													<span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-[10px] text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
														<span className="size-1.5 rounded-full bg-emerald-500" />
														Enabled
													</span>
												) : (
													<span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 font-semibold text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
														<span className="size-1.5 rounded-full bg-slate-400" />
														Disabled
													</span>
												)}
											</td>

											<td className="px-5 py-3.5">
												<select
													className="h-8 min-w-[125px] rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-600 shadow-sm outline-none transition hover:border-blue-200 focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800"
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

									{visibleLists.length === 0 ? (
										<tr>
											<td
												className="px-5 py-14 text-center text-slate-400 dark:text-slate-500"
												colSpan={7}
											>
												<Search className="mx-auto mb-2 size-7 text-slate-300 dark:text-slate-600" />

												<p className="font-medium text-slate-500 dark:text-slate-400">
													No disposition lists found
												</p>

												<p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
													Try changing your filters or search.
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
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() => setCurrentPage(1)}
									size="sm"
									type="button"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
												? "h-8 min-w-8 rounded-lg bg-[#0757ff] px-2 text-[11px] shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
												: "h-8 min-w-8 rounded-lg border-slate-200 px-2 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
					</section>
				</div>
			</main>

			{/* ADD DISPOSITION LIST DIALOG */}
			{isAddDialogOpen ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]">
					<div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-[#0b1728]">
						{/* DIALOG HEADER */}
						<div className="flex items-center justify-between bg-[#0757ff] px-5 py-3.5">
							<div>
								<h2 className="font-semibold text-sm text-white">
									Add Disposition List
								</h2>

								<p className="mt-0.5 text-[10px] text-blue-100">
									Create a new disposition list.
								</p>
							</div>

							<button
								aria-label="Close dialog"
								className="flex size-7 items-center justify-center rounded-md text-white/80 transition-colors hover:bg-white/10 hover:text-white"
								onClick={closeAddDialog}
								type="button"
							>
								<X className="size-4" />
							</button>
						</div>

						{/* DIALOG BODY */}
						<div className="px-7 py-7 md:px-9">
							<div className="space-y-6">
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="new-disposition-name"
									>
										Name*
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white text-sm shadow-sm focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
										id="new-disposition-name"
										onChange={(event) => setNewListName(event.target.value)}
										placeholder="Enter disposition list name"
										value={newListName}
									/>
								</div>

								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="new-disposition-description"
									>
										Description
									</label>

									<textarea
										className="min-h-[80px] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
										id="new-disposition-description"
										onChange={(event) =>
											setNewListDescription(event.target.value)
										}
										placeholder="Enter description"
										value={newListDescription}
									/>
								</div>
							</div>

							<div className="mt-8 flex justify-end gap-2">
								<Button
									className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
									onClick={closeAddDialog}
									type="button"
									variant="outline"
								>
									Cancel
								</Button>

								<Button
									className="h-9 rounded-lg bg-[#0757ff] px-5 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									onClick={closeAddDialog}
									type="button"
								>
									Submit
								</Button>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
