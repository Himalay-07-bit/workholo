// biome-ignore-all lint/performance/noJsxPropsBind: Table controls use local component state.

import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/break-lists")({
	component: BreakListsPage,
});

type BreakList = {
	id: number;
	name: string;
	description: string;
	pauseCodes: number;
	assigned: number;
	status: "Enabled" | "Disabled";
};

const breakLists: BreakList[] = [
	{
		id: 1,
		name: "Break",
		description: "Break",
		pauseCodes: 3,
		assigned: 7,
		status: "Enabled",
	},
];

function BreakListsPage() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [status, setStatus] = useState("All");
	const [pageSize, setPageSize] = useState(10);

	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [newListName, setNewListName] = useState("");
	const [newListDescription, setNewListDescription] = useState("");

	const filteredLists = useMemo(() => {
		const nameValue = name.trim().toLowerCase();
		const descriptionValue = description.trim().toLowerCase();

		return breakLists.filter((item) => {
			const matchesName =
				!nameValue || item.name.toLowerCase().includes(nameValue);

			const matchesDescription =
				!descriptionValue ||
				item.description.toLowerCase().includes(descriptionValue);

			const matchesStatus = status === "All" || item.status === status;

			return matchesName && matchesDescription && matchesStatus;
		});
	}, [description, name, status]);

	const visibleLists = filteredLists.slice(0, pageSize);

	const resetFilters = () => {
		setName("");
		setDescription("");
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
					{/* PAGE HEADER */}
					<section className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-white">
									Manage Pause Code Lists
								</h1>

								<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
									Manage break and pause code lists.
								</p>
							</div>

							<Button
								className="h-9 w-fit rounded-lg bg-[#0757ff] px-4 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
								onClick={() => setIsAddDialogOpen(true)}
								type="button"
							>
								Add Pause Code List
							</Button>
						</div>
					</section>

					{/* MAIN CARD */}
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* FILTERS */}
						<div className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<div className="grid gap-4 lg:grid-cols-[240px_300px_220px_auto] lg:items-end">
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="break-list-name"
									>
										Name
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-xs shadow-sm placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
										id="break-list-name"
										onChange={(event) => setName(event.target.value)}
										placeholder="Search by name"
										value={name}
									/>
								</div>

								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="break-list-description"
									>
										Description
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-xs shadow-sm placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
										id="break-list-description"
										onChange={(event) => setDescription(event.target.value)}
										placeholder="Search by description"
										value={description}
									/>
								</div>

								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="break-list-status"
									>
										Status
									</label>

									<select
										className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs shadow-sm outline-none transition focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
										id="break-list-status"
										onChange={(event) => setStatus(event.target.value)}
										value={status}
									>
										<option value="All">All</option>
										<option value="Enabled">Enabled</option>
										<option value="Disabled">Disabled</option>
									</select>
								</div>

								<div className="flex gap-2">
									<Button
										className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
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
						<div className="flex items-center gap-2 border-slate-100 border-b px-5 py-3.5 text-xs dark:border-slate-800">
							<span className="text-slate-500 dark:text-slate-400">Show</span>

							<select
								className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs shadow-sm outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
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

						{/* TABLE */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[1100px] border-collapse text-xs">
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
											No. of Pause Codes
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
													{item.pauseCodes}
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
													className="h-8 min-w-[130px] rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-600 shadow-sm outline-none transition hover:border-blue-200 focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800"
													defaultValue=""
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

									{visibleLists.length === 0 ? (
										<tr>
											<td
												className="px-5 py-14 text-center text-slate-400 dark:text-slate-500"
												colSpan={7}
											>
												<Search className="mx-auto mb-2 size-7 text-slate-300 dark:text-slate-600" />

												<p className="font-medium text-slate-500 dark:text-slate-400">
													No pause code lists found
												</p>

												<p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
													Try changing your filters.
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
									{visibleLists.length === 0 ? 0 : 1}
								</span>{" "}
								to{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{visibleLists.length}
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredLists.length}
								</span>{" "}
								entries
							</span>

							<div className="flex items-center gap-1.5">
								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									type="button"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									type="button"
									variant="outline"
								>
									Previous
								</Button>

								<Button
									className="h-8 min-w-8 rounded-lg bg-[#0757ff] px-2 text-[11px] shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									size="sm"
									type="button"
								>
									1
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									type="button"
									variant="outline"
								>
									Next
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
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

			{/* ADD PAUSE CODE LIST DIALOG */}
			{isAddDialogOpen ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-[2px]">
					<div className="w-full max-w-[520px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-[#0b1728]">
						{/* DIALOG HEADER */}
						<div className="flex items-center justify-between bg-[#0757ff] px-5 py-3.5">
							<div>
								<h2 className="font-semibold text-sm text-white">
									Add Pause Code List
								</h2>

								<p className="mt-0.5 text-[10px] text-blue-100">
									Create a new pause code list.
								</p>
							</div>

							<button
								aria-label="Close Add Pause Code List dialog"
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
										htmlFor="new-pause-code-list-name"
									>
										Name*
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-sm shadow-sm placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
										id="new-pause-code-list-name"
										onChange={(event) => setNewListName(event.target.value)}
										placeholder="Enter pause code list name"
										value={newListName}
									/>
								</div>

								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="new-pause-code-list-description"
									>
										Description
									</label>

									<textarea
										className="min-h-[80px] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
										id="new-pause-code-list-description"
										onChange={(event) =>
											setNewListDescription(event.target.value)
										}
										placeholder="Enter description"
										value={newListDescription}
									/>
								</div>
							</div>

							{/* DIALOG ACTIONS */}
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
