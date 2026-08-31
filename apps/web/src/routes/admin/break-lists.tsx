// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
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
	}, [name, description, status]);

	const visibleLists = filteredLists.slice(0, pageSize);

	const resetFilters = () => {
		setName("");
		setDescription("");
		setStatus("All");
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* PAGE HEADER */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<div>
								<h1 className="font-bold text-[#102b55] text-base tracking-tight dark:text-white">
									Manage Pause Code Lists
								</h1>

								<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
									Manage break and pause code lists.
								</p>
							</div>

							<Button className="rounded-lg bg-[#0757ff] text-xs shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500">
								Add Pause Code List
							</Button>
						</div>

						{/* FILTERS */}
						<div className="border-slate-100 border-b px-5 py-5 dark:border-slate-800">
							<div className="grid gap-4 lg:grid-cols-[250px_330px_220px_auto] lg:items-end">
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="break-list-name"
									>
										Name
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
										id="break-list-name"
										onChange={(event) => setName(event.target.value)}
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
										className="h-9 rounded-lg border-slate-200 bg-white text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
										id="break-list-description"
										onChange={(event) => setDescription(event.target.value)}
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
										className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs shadow-sm outline-none transition focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
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
									<Button className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500">
										Search
									</Button>

									<Button
										className="h-9 rounded-lg border-slate-200 px-4 text-xs shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
										onClick={resetFilters}
										variant="outline"
									>
										Reset
									</Button>
								</div>
							</div>
						</div>

						{/* TABLE CONTROLS */}
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

						{/* TABLE */}
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
											className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/20"
											key={item.id}
										>
											<td className="px-5 py-3.5 font-medium text-slate-600 dark:text-slate-300">
												{item.id}.
											</td>

											<td className="px-5 py-3.5">
												<button
													className="font-medium text-[#0757ff] hover:underline dark:text-blue-400"
													type="button"
												>
													{item.name}
												</button>
											</td>

											<td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
												{item.description}
											</td>

											<td className="px-5 py-3.5 text-slate-600 dark:text-slate-300">
												{item.pauseCodes}
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
												<span
													className={`inline-flex rounded-full px-2.5 py-1 font-semibold text-[10px] ${
														item.status === "Enabled"
															? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
															: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
													}`}
												>
													{item.status}
												</span>
											</td>

											<td className="px-5 py-3.5">
												<select
													className="h-8 min-w-[130px] rounded-lg border border-slate-200 bg-white px-2.5 text-slate-600 text-xs shadow-sm outline-none focus:border-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
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

									{visibleLists.length === 0 && (
										<tr>
											<td
												className="px-5 py-12 text-center text-slate-400 dark:text-slate-500"
												colSpan={7}
											>
												No pause code lists found.
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{/* FOOTER */}
						<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-4 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
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
									className="h-8 min-w-8 rounded-lg bg-[#0757ff] px-2 text-[11px] shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									size="sm"
								>
									1
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
		</div>
	);
}
