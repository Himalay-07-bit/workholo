// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { Plus, Search, X } from "lucide-react";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/dnd/manage-list")({
	component: ManageDndListPage,
});

type DndList = {
	id: number;
	name: string;
	description: string;
	assigned: number;
};

const dndLists: DndList[] = [
	{
		id: 1,
		name: "DND",
		description: "",
		assigned: 3,
	},
];

function ManageDndListPage() {
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);

	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [newDndName, setNewDndName] = useState("");
	const [newDndDescription, setNewDndDescription] = useState("");

	const filteredLists = dndLists.filter((item) =>
		`${item.name} ${item.description}`
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	const visibleLists = filteredLists.slice(0, pageSize);

	const closeAddDialog = () => {
		setIsAddDialogOpen(false);
		setNewDndName("");
		setNewDndDescription("");
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* Header */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<div>
								<h1 className="font-bold text-[#102b55] text-base tracking-tight dark:text-white">
									Account DND Lists
								</h1>

								<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
									Manage account Do Not Disturb lists.
								</p>
							</div>

							<Button
								className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
								onClick={() => setIsAddDialogOpen(true)}
								type="button"
							>
								<Plus className="mr-1.5 size-3.5" />
								Add Account DND List
							</Button>
						</div>

						{/* Controls */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<div className="flex items-center gap-2 text-xs">
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

							<div className="relative">
								<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400" />

								<Input
									className="h-8 w-full rounded-lg border-slate-200 bg-white pl-8 text-xs shadow-sm placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 sm:w-[240px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
									onChange={(event) => setSearch(event.target.value)}
									placeholder="Search..."
									value={search}
								/>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[900px] border-collapse text-xs">
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
											Availability/Assigned To
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleLists.map((item) => (
										<tr
											className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/20"
											key={item.id}
										>
											<td className="px-5 py-4 font-medium text-slate-600 dark:text-slate-300">
												{item.id}.
											</td>

											<td className="px-5 py-4">
												<button
													className="font-medium text-[#0757ff] hover:underline dark:text-blue-400"
													type="button"
												>
													{item.name}
												</button>
											</td>

											<td className="px-5 py-4 text-slate-600 dark:text-slate-300">
												{item.description || "—"}
											</td>

											<td className="px-5 py-4">
												<button
													className="font-medium text-[#0757ff] hover:underline dark:text-blue-400"
													type="button"
												>
													Assigned ({item.assigned})
												</button>
											</td>

											<td className="px-5 py-4">
												<select
													className="h-8 min-w-[135px] rounded-lg border border-slate-200 bg-white px-2.5 text-slate-600 text-xs shadow-sm outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
													defaultValue=""
												>
													<option disabled value="">
														Select an Action
													</option>

													<option value="view">View</option>
													<option value="edit">Edit</option>
													<option value="delete">Delete</option>
												</select>
											</td>
										</tr>
									))}

									{filteredLists.length === 0 ? (
										<tr>
											<td
												className="px-5 py-12 text-center text-slate-400 dark:text-slate-500"
												colSpan={5}
											>
												<Search className="mx-auto mb-2 size-6 text-slate-300 dark:text-slate-600" />

												<p className="font-medium text-slate-500 dark:text-slate-400">
													No DND lists found
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

						{/* Footer */}
						<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<span className="text-slate-400 text-xs dark:text-slate-500">
								Showing{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredLists.length === 0 ? 0 : 1}
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
							</div>
						</div>
					</section>
				</div>
			</main>

			{/* ADD ACCOUNT DND LIST DIALOG */}
			{isAddDialogOpen ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]">
					<div className="w-full max-w-[525px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-[#0b1728]">
						{/* Dialog Header */}
						<div className="relative bg-[#0757ff] px-5 py-4">
							<div>
								<h2 className="font-bold text-base text-white">
									Add Account DND List
								</h2>

								<p className="mt-0.5 text-blue-100 text-xs">
									Create a new DND list.
								</p>
							</div>

							<button
								aria-label="Close Add Account DND List dialog"
								className="absolute top-1/2 right-4 flex size-7 -translate-y-1/2 items-center justify-center rounded-lg text-white/80 transition hover:bg-white/10 hover:text-white"
								onClick={closeAddDialog}
								type="button"
							>
								<X className="size-4" />
							</button>
						</div>

						{/* Dialog Body */}
						<div className="px-7 py-6 md:px-8">
							<div className="space-y-6">
								{/* Name */}
								<div className="space-y-1.5">
									<label
										className="font-medium text-[#52698a] text-xs dark:text-slate-400"
										htmlFor="new-dnd-list-name"
									>
										Name*
									</label>

									<Input
										className="h-10 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-sm shadow-sm transition placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
										id="new-dnd-list-name"
										onChange={(event) => setNewDndName(event.target.value)}
										placeholder="Enter DND list name"
										value={newDndName}
									/>
								</div>

								{/* Description */}
								<div className="space-y-1.5">
									<label
										className="font-medium text-[#52698a] text-xs dark:text-slate-400"
										htmlFor="new-dnd-list-description"
									>
										Description
									</label>

									<textarea
										className="min-h-[80px] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
										id="new-dnd-list-description"
										onChange={(event) =>
											setNewDndDescription(event.target.value)
										}
										placeholder="Enter description"
										value={newDndDescription}
									/>
								</div>
							</div>

							{/* Dialog Actions */}
							<div className="mt-6 flex justify-end gap-2">
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
