// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";

import {
	ChevronLeft,
	ChevronRight,
	ListChecks,
	Plus,
	Search,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/agent-dispositions")({
	component: AgentDispositionsPage,
});

type Disposition = {
	id: number;
	name: string;
	code: string;
};

const dispositions: Disposition[] = [
	{ id: 1, name: "RNR1", code: "RNR" },
	{ id: 2, name: "Call Back", code: "CBB" },
	{ id: 3, name: "Disconnected", code: "DISC" },
	{ id: 4, name: "Switch Off", code: "SWIT" },
	{ id: 5, name: "Not Interested", code: "NII" },
	{ id: 6, name: "INTRESTED", code: "INT" },
	{ id: 7, name: "Not Reachable", code: "NOR" },
	{ id: 8, name: "Pick Up Someone Else", code: "PBSE" },
	{ id: 9, name: "Want JD Before Interview", code: "WJBI" },
	{ id: 10, name: "Lead Already Converter", code: "LAC" },
];

function AgentDispositionsPage() {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredDispositions = useMemo(() => {
		const searchValue = search.trim().toLowerCase();

		if (!searchValue) {
			return dispositions;
		}

		return dispositions.filter((item) =>
			`${item.name} ${item.code}`.toLowerCase().includes(searchValue)
		);
	}, [search]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredDispositions.length / pageSize)
	);

	const safePage = Math.min(currentPage, totalPages);

	const startIndex = (safePage - 1) * pageSize;

	const visibleDispositions = filteredDispositions.slice(
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
									Agent Dispositions
								</h1>

								<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
									{dispositions.length} DISPOSITIONS
								</span>
							</div>

							<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
								Manage agent dispositions and their corresponding codes.
							</p>
						</div>

						<Button
							className="!bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-9 w-fit rounded-lg px-4 font-medium text-xs shadow-blue-500/20 shadow-sm transition-colors"
							onClick={() =>
								navigate({
									to: "/admin/add-disposition",
								})
							}
							type="button"
						>
							<Plus className="mr-1.5 size-4" />
							Add Disposition
						</Button>
					</div>

					{/* SUMMARY */}
					<div className="mb-4 grid gap-3 sm:grid-cols-2">
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
									<ListChecks className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Total Dispositions
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{dispositions.length}
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
									<ListChecks className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Visible Results
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{filteredDispositions.length}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* MAIN CARD */}
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* TABLE CONTROLS */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-4 md:flex-row md:items-center md:justify-between dark:border-slate-800">
							<div className="flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<span>Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs outline-none transition-colors focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
									id="disposition-page-size"
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
									className="h-8 w-full rounded-lg border-slate-200 bg-white pl-8 text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 md:w-[260px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
									id="disposition-search"
									onChange={(event) => {
										setSearch(event.target.value);
										setCurrentPage(1);
									}}
									placeholder="Search dispositions..."
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
											Code
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleDispositions.map((item) => (
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

											<td className="px-4 py-3">
												<span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
													{item.code}
												</span>
											</td>

											<td className="px-4 py-3">
												<select
													className="h-8 min-w-[135px] rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-600 shadow-sm outline-none transition-colors hover:border-blue-200 focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500 dark:hover:border-blue-800"
													defaultValue=""
													id={`disposition-action-${item.id}`}
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

									{visibleDispositions.length === 0 ? (
										<tr>
											<td
												className="px-4 py-12 text-center text-slate-400 dark:text-slate-500"
												colSpan={4}
											>
												<Search className="mx-auto mb-2 size-7 text-slate-300 dark:text-slate-600" />

												<p className="font-medium text-slate-500 dark:text-slate-400">
													No dispositions found
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
									{filteredDispositions.length === 0 ? 0 : startIndex + 1}
								</span>{" "}
								to{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{Math.min(startIndex + pageSize, filteredDispositions.length)}
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredDispositions.length}
								</span>{" "}
								entries
							</span>

							<div className="flex items-center gap-1.5">
								<Button
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() => setCurrentPage(1)}
									size="sm"
									type="button"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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

								<Button
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
