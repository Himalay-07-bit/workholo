// biome-ignore-all lint/performance/noJsxPropsBind: Table controls use local component state.
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { CheckCircle2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/manage-did-numbers")({
	component: ManageDidNumbersPage,
});

type NumberRow = {
	id: number;
	name: string;
	description: string;
	number: string;
	status: "Enabled" | "Disabled";
	assignedTo: string;
	type: "DID" | "Toll Free" | "Virtual";
};

const numberData: NumberRow[] = [
	{
		id: 1,
		name: "",
		description: "",
		number: "918064370288",
		status: "Enabled",
		assignedTo: "",
		type: "DID",
	},
	{
		id: 2,
		name: "",
		description: "",
		number: "917965369373",
		status: "Enabled",
		assignedTo: "",
		type: "DID",
	},
	{
		id: 3,
		name: "CRLA KC01",
		description: "CRLA KC01",
		number: "918069561798",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 4,
		name: "CRLA KC02",
		description: "CRLA KC02",
		number: "918069561801",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 5,
		name: "CRLA KC03",
		description: "CRLA KC03",
		number: "918064055041",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 6,
		name: "CRLA KC04",
		description: "CRLA KC04",
		number: "918064055415",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 7,
		name: "CRLA KC05",
		description: "CRLA KC05",
		number: "918064055414",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 8,
		name: "CRLA KC06",
		description: "CRLA KC06",
		number: "918064055413",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 9,
		name: "CRLA KC07",
		description: "CRLA KC07",
		number: "918064055411",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 10,
		name: "CRLA KC08",
		description: "CRLA KC08",
		number: "918069975489",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
];

const extraNumbers: NumberRow[] = Array.from({ length: 29 }, (_, index) => ({
	id: index + 11,
	name: `Number ${String(index + 11).padStart(2, "0")}`,
	description: `DID Number ${String(index + 11).padStart(2, "0")}`,
	number: `918060000${String(index + 11).padStart(4, "0")}`,
	status: "Enabled",
	assignedTo: index % 3 === 0 ? "" : "Hang up",
	type: index % 5 === 0 ? "Virtual" : "DID",
}));

const allNumbers = [...numberData, ...extraNumbers];

function ManageDidNumbersPage() {
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const [statusFilter, setStatusFilter] = useState("All");
	const [typeFilter, setTypeFilter] = useState("All Types");

	const [search, setSearch] = useState("");
	const [appliedSearch, setAppliedSearch] = useState("");

	const filteredNumbers = useMemo(() => {
		const normalizedSearch = appliedSearch.trim().toLowerCase();

		return allNumbers.filter((item) => {
			const matchesStatus =
				statusFilter === "All" || item.status === statusFilter;

			const matchesType =
				typeFilter === "All Types" || item.type === typeFilter;

			const matchesSearch =
				normalizedSearch.length === 0 ||
				item.name.toLowerCase().includes(normalizedSearch) ||
				item.description.toLowerCase().includes(normalizedSearch) ||
				item.number.toLowerCase().includes(normalizedSearch) ||
				item.assignedTo.toLowerCase().includes(normalizedSearch);

			return matchesStatus && matchesType && matchesSearch;
		});
	}, [appliedSearch, statusFilter, typeFilter]);

	const totalPages = Math.max(1, Math.ceil(filteredNumbers.length / pageSize));

	const safeCurrentPage = Math.min(currentPage, totalPages);

	const startIndex = (safeCurrentPage - 1) * pageSize;

	const visibleNumbers = filteredNumbers.slice(
		startIndex,
		startIndex + pageSize
	);

	function handlePageSizeChange(value: string) {
		setPageSize(Number(value));
		setCurrentPage(1);
	}

	function handleStatusChange(value: string) {
		setStatusFilter(value);
		setCurrentPage(1);
	}

	function handleTypeChange(value: string) {
		setTypeFilter(value);
		setCurrentPage(1);
	}

	function handleSearch() {
		setAppliedSearch(search);
		setCurrentPage(1);
	}

	function goToPreviousPage() {
		setCurrentPage((page) => Math.max(1, page - 1));
	}

	function goToNextPage() {
		setCurrentPage((page) => Math.min(totalPages, page + 1));
	}

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-7xl">
					{/* PAGE HEADER */}
					<div className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-[#0b1728]">
						<div>
							<div className="flex items-center gap-2">
								<h1 className="font-bold text-[#102b55] text-xl tracking-tight dark:text-slate-100">
									My Numbers
								</h1>

								<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
									{filteredNumbers.length} NUMBERS
								</span>
							</div>

							<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
								Manage your DID numbers and calling assignments.
							</p>
						</div>

						<div className="flex flex-wrap gap-2">
							<Button
								className="border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
								variant="outline"
							>
								Export Numbers
							</Button>

							<Button
								className="border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
								variant="outline"
							>
								Block a Number
							</Button>

							<Button
								className="border-slate-200 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
								variant="outline"
							>
								All Blocked Numbers
							</Button>
						</div>
					</div>

					{/* MAIN CARD */}
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* FILTER BAR */}
						<div className="flex flex-col gap-4 border-slate-100 border-b px-5 py-4 lg:flex-row lg:items-center lg:justify-between dark:border-slate-800">
							<div className="flex items-center gap-2 text-xs">
								<span className="font-medium text-slate-500 dark:text-slate-400">
									Show
								</span>

								<select
									className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs outline-none transition focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500"
									onChange={(event) => handlePageSizeChange(event.target.value)}
									value={pageSize}
								>
									<option value={10}>10</option>
									<option value={25}>25</option>
									<option value={50}>50</option>
								</select>

								<span className="text-slate-500 dark:text-slate-400">
									entries
								</span>
							</div>

							<div className="flex flex-col gap-2 sm:flex-row">
								<select
									className="h-9 min-w-[130px] rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs outline-none transition focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500"
									onChange={(event) => handleStatusChange(event.target.value)}
									value={statusFilter}
								>
									<option value="All">All Status</option>
									<option value="Enabled">Enabled</option>
									<option value="Disabled">Disabled</option>
								</select>

								<select
									className="h-9 min-w-[130px] rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs outline-none transition focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500"
									onChange={(event) => handleTypeChange(event.target.value)}
									value={typeFilter}
								>
									<option value="All Types">All Types</option>
									<option value="DID">DID</option>
									<option value="Toll Free">Toll Free</option>
									<option value="Virtual">Virtual</option>
								</select>

								<div className="flex gap-2">
									<div className="relative">
										<Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

										<Input
											className="h-9 w-full rounded-lg border-slate-200 bg-white pl-9 text-xs sm:w-[220px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
											onChange={(event) => setSearch(event.target.value)}
											onKeyDown={(event) => {
												if (event.key === "Enter") {
													handleSearch();
												}
											}}
											placeholder="Search numbers..."
											value={search}
										/>
									</div>

									<Button
										className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
										onClick={handleSearch}
									>
										<Search className="mr-1.5 size-3.5" />
										Search
									</Button>
								</div>
							</div>
						</div>

						{/* TABLE */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[950px] text-xs">
								<thead>
									<tr className="border-slate-100 border-b bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70">
										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Name
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Description
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Number
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Status
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Assigned To
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleNumbers.length > 0 ? (
										visibleNumbers.map((item) => (
											<tr
												className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/30"
												key={item.id}
											>
												<td className="px-5 py-3.5">
													<span className="font-medium text-[#263b5b] dark:text-slate-200">
														{item.name || "—"}
													</span>
												</td>

												<td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
													{item.description || "—"}
												</td>

												<td className="px-5 py-3.5">
													<span className="font-semibold text-[#102b55] dark:text-slate-200">
														{item.number}
													</span>
												</td>

												<td className="px-5 py-3.5">
													<span
														className={[
															"inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold text-[10px]",
															item.status === "Enabled"
																? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
																: "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
														].join(" ")}
													>
														<CheckCircle2 className="size-3" />
														{item.status}
													</span>
												</td>

												<td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
													{item.assignedTo || "Not assigned"}
												</td>

												<td className="px-5 py-3.5">
													<select
														className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-600 outline-none transition hover:border-blue-200 focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500 dark:hover:border-blue-800"
														defaultValue=""
													>
														<option disabled value="">
															Select Action
														</option>

														<option value="view">View</option>

														<option value="edit">Edit</option>

														<option value="assign">Assign</option>

														<option value="block">Block</option>
													</select>
												</td>
											</tr>
										))
									) : (
										<tr>
											<td
												className="px-5 py-12 text-center text-slate-400 dark:text-slate-500"
												colSpan={6}
											>
												<div className="flex flex-col items-center">
													<Search className="mb-2 size-7 text-slate-300 dark:text-slate-600" />

													<p className="font-medium text-slate-500 dark:text-slate-400">
														No numbers found
													</p>

													<p className="mt-1 text-[11px]">
														Try changing your search or filters.
													</p>
												</div>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{/* FOOTER */}
						<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<p className="text-slate-400 text-xs dark:text-slate-500">
								Showing{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredNumbers.length === 0 ? 0 : startIndex + 1}
								</span>{" "}
								to{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{Math.min(startIndex + pageSize, filteredNumbers.length)}
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredNumbers.length}
								</span>{" "}
								entries
							</p>

							<div className="flex items-center gap-1.5">
								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safeCurrentPage === 1}
									onClick={goToPreviousPage}
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
											page === safeCurrentPage
												? "h-8 min-w-8 bg-[#0757ff] px-2 text-[11px] shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
												: "h-8 min-w-8 border-slate-200 px-2 text-[11px] text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
										}
										key={page}
										onClick={() => setCurrentPage(page)}
										size="sm"
										variant={page === safeCurrentPage ? "default" : "outline"}
									>
										{page}
									</Button>
								))}

								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safeCurrentPage === totalPages}
									onClick={goToNextPage}
									size="sm"
									variant="outline"
								>
									Next
									<ChevronRight className="ml-1 size-3.5" />
								</Button>
							</div>
						</div>
					</div>

					{/* SECURITY FOOTER */}
					<div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500">
						<CheckCircle2 className="size-3.5 text-emerald-500" />
						DID numbers are securely managed
					</div>
				</div>
			</main>
		</div>
	);
}
