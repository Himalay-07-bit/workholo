// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";

import { Plus, Search, X } from "lucide-react";
import { useState } from "react";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/manage-quick-transfer-list")({
	component: ManageQuickTransferListPage,
});

function ManageQuickTransferListPage() {
	const [name, setName] = useState("");
	const [status, setStatus] = useState("All");
	const [pageSize, setPageSize] = useState(10);

	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [newListName, setNewListName] = useState("");
	const [newListDescription, setNewListDescription] = useState("");

	const resetFilters = () => {
		setName("");
		setStatus("All");
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
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<div>
								<h1 className="font-bold text-[#102b55] text-base tracking-tight dark:text-white">
									Manage Quick Transfer Lists
								</h1>

								<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
									Manage your quick transfer number lists.
								</p>
							</div>

							<Button
								className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
								onClick={() => setIsAddDialogOpen(true)}
							>
								<Plus className="mr-1.5 size-3.5" />
								Add Quick Transfer List
							</Button>
						</div>

						<div className="border-slate-100 border-b px-5 py-5 dark:border-slate-800">
							<div className="flex flex-col gap-4 xl:flex-row xl:items-end">
								<div className="w-full space-y-1.5 xl:w-[300px]">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="quick-transfer-name"
									>
										Name
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
										id="quick-transfer-name"
										onChange={(event) => setName(event.target.value)}
										value={name}
									/>
								</div>

								<div className="w-full space-y-1.5 xl:w-[300px]">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="quick-transfer-status"
									>
										Status
									</label>

									<select
										className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs shadow-sm outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
										id="quick-transfer-status"
										onChange={(event) => setStatus(event.target.value)}
										value={status}
									>
										<option value="All">All</option>
										<option value="Enabled">Enabled</option>
										<option value="Disabled">Disabled</option>
									</select>
								</div>

								<div className="flex gap-2">
									<Button className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500">
										<Search className="mr-1.5 size-3.5" />
										Search
									</Button>

									<Button
										className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
										onClick={resetFilters}
										variant="outline"
									>
										Reset
									</Button>
								</div>
							</div>
						</div>

						<div className="flex items-center gap-2 border-slate-100 border-b px-5 py-4 text-xs dark:border-slate-800">
							<span className="text-slate-500 dark:text-slate-400">Show</span>

							<select
								className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs shadow-sm outline-none focus:border-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
								onChange={(event) => setPageSize(Number(event.target.value))}
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

						<div className="overflow-x-auto">
							<table className="w-full min-w-[1100px] border-collapse text-xs">
								<thead>
									<tr className="border-slate-100 border-y bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/60">
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
											No. of Quick Transfer Number Available
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
									<tr>
										<td
											className="px-5 py-14 text-center text-slate-400 dark:text-slate-500"
											colSpan={7}
										>
											<div className="flex flex-col items-center">
												<div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
													<Search className="size-5" />
												</div>

												<p className="font-medium text-slate-500 text-xs dark:text-slate-400">
													No data available in table
												</p>

												<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
													Try adjusting your filters or add a new quick transfer
													list.
												</p>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<span className="text-slate-400 text-xs dark:text-slate-500">
								Showing{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									0
								</span>{" "}
								to{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									0
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									0
								</span>{" "}
								entries
							</span>

							<div className="flex items-center gap-1.5">
								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									variant="outline"
								>
									Previous
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									variant="outline"
								>
									Next
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									variant="outline"
								>
									Last
								</Button>
							</div>
						</div>
					</section>
				</div>
			</main>

			{isAddDialogOpen ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
					<div className="w-full max-w-[525px] overflow-hidden rounded-md bg-white shadow-2xl dark:bg-[#0b1728]">
						<div className="flex items-center justify-between bg-[#0757ff] px-4 py-3">
							<h2 className="font-semibold text-sm text-white">
								Add Quick Transfer List
							</h2>

							<button
								aria-label="Close Add Quick Transfer List dialog"
								className="text-white/90 transition-colors hover:text-white"
								onClick={closeAddDialog}
								type="button"
							>
								<X className="size-4" />
							</button>
						</div>

						<div className="px-9 py-8">
							<div className="space-y-7">
								<div className="space-y-1.5">
									<label
										className="text-slate-500 text-xs dark:text-slate-400"
										htmlFor="new-quick-transfer-name"
									>
										Name*
									</label>

									<Input
										className="h-9 rounded-none border-0 border-slate-200 border-b bg-transparent px-0 text-sm shadow-none focus:border-[#0757ff] focus:ring-0 dark:border-slate-700"
										id="new-quick-transfer-name"
										onChange={(event) => setNewListName(event.target.value)}
										value={newListName}
									/>
								</div>

								<div className="space-y-1.5">
									<label
										className="text-slate-500 text-xs dark:text-slate-400"
										htmlFor="new-quick-transfer-description"
									>
										Description
									</label>

									<textarea
										className="min-h-[55px] w-full resize-y rounded-none border-0 border-slate-200 border-b bg-transparent px-0 py-2 text-sm outline-none focus:border-[#0757ff] dark:border-slate-700 dark:bg-transparent"
										id="new-quick-transfer-description"
										onChange={(event) =>
											setNewListDescription(event.target.value)
										}
										value={newListDescription}
									/>
								</div>
							</div>

							<div className="mt-9 flex justify-end">
								<Button
									className="h-9 bg-[#0757ff] text-xs hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									onClick={closeAddDialog}
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
