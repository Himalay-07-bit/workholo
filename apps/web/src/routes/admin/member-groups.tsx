"use client";

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { ChevronLeft, ChevronRight, CircleHelp } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/member-groups")({
	component: MemberGroupsPage,
});

type TeamMemberGroup = {
	id: number;
	name: string;
	description: string;
};

const teamMemberGroups: TeamMemberGroup[] = [];

function MemberGroupsPage() {
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);
	const [groupName, setGroupName] = useState("");
	const [groupDescription, setGroupDescription] = useState("");

	const filteredGroups = useMemo(() => {
		const value = search.trim().toLowerCase();

		if (!value) {
			return teamMemberGroups;
		}

		return teamMemberGroups.filter((group) =>
			`${group.id} ${group.name} ${group.description}`
				.toLowerCase()
				.includes(value)
		);
	}, [search]);

	const totalPages = Math.max(1, Math.ceil(filteredGroups.length / pageSize));

	const safePage = Math.min(currentPage, totalPages);

	const startIndex = (safePage - 1) * pageSize;

	const visibleGroups = filteredGroups.slice(startIndex, startIndex + pageSize);

	const firstShown = filteredGroups.length === 0 ? 0 : startIndex + 1;

	const lastShown = Math.min(startIndex + pageSize, filteredGroups.length);

	const goFirst = () => {
		setCurrentPage(1);
	};

	const goPrevious = () => {
		setCurrentPage((page) => Math.max(1, page - 1));
	};

	const goNext = () => {
		setCurrentPage((page) => Math.min(totalPages, page + 1));
	};

	const goLast = () => {
		setCurrentPage(totalPages);
	};

	const closeAddGroupModal = () => {
		setIsAddGroupOpen(false);
		setGroupName("");
		setGroupDescription("");
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				{/* Add Member Group Modal */}
				{isAddGroupOpen ? (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
						<button
							aria-label="Close add member group dialog"
							className="absolute inset-0"
							onClick={closeAddGroupModal}
							type="button"
						/>
						<div className="relative w-[590px] max-w-[calc(100vw-32px)] overflow-hidden bg-white shadow-xl dark:bg-[#0b1728]">
							{/* Modal Header */}
							<div className="flex h-11 items-center bg-[#063cdb] px-4">
								<h2 className="font-medium text-sm text-white">
									Add Member Group
								</h2>
							</div>

							{/* Modal Form */}
							<div className="px-6 pt-5 pb-4">
								{/* Name */}
								<div className="relative mb-4">
									<input
										className="h-12 w-full border-0 border-[#0757ff] border-b bg-transparent px-0 pr-9 text-slate-700 text-sm outline-none placeholder:text-slate-400 dark:text-slate-200"
										id="member-group-name"
										onChange={(event) => setGroupName(event.target.value)}
										placeholder="Name"
										type="text"
										value={groupName}
									/>

									<button
										aria-label="Name help"
										className="absolute top-1/2 right-0 -translate-y-1/2 text-[#00b8d9]"
										type="button"
									>
										<CircleHelp className="h-5 w-5" />
									</button>
								</div>

								{/* Description */}
								<div className="relative">
									<input
										className="h-12 w-full border-0 border-[#0757ff] border-b bg-transparent px-0 pr-9 text-slate-700 text-sm outline-none placeholder:text-slate-400 dark:text-slate-200"
										id="member-group-description"
										onChange={(event) =>
											setGroupDescription(event.target.value)
										}
										placeholder="Description"
										type="text"
										value={groupDescription}
									/>

									<button
										aria-label="Description help"
										className="absolute top-1/2 right-0 -translate-y-1/2 text-[#00b8d9]"
										type="button"
									>
										<CircleHelp className="h-5 w-5" />
									</button>
								</div>
							</div>

							{/* Modal Footer */}
							<div className="flex justify-end gap-1 px-3 pb-3">
								<Button
									className="h-8 rounded-sm bg-[#0757ff] px-4 text-white text-xs hover:bg-[#004be0]"
									onClick={() => {
										// Save functionality will be connected later
									}}
									type="button"
								>
									SAVE
								</Button>

								<Button
									className="h-8 rounded-sm border-slate-300 px-4 text-slate-600 text-xs"
									onClick={closeAddGroupModal}
									type="button"
									variant="outline"
								>
									CLOSE
								</Button>
							</div>
						</div>
					</div>
				) : null}

				<div className="mx-auto max-w-[1600px]">
					<section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* Header */}
						<div className="flex items-center justify-between border-slate-200 border-b px-4 py-3 dark:border-slate-800">
							<h1 className="font-medium text-[#102b55] text-sm dark:text-white">
								All Team Member Groups
							</h1>

							<Button
								className="h-8 rounded-sm bg-[#0757ff] px-3 text-white text-xs shadow-sm hover:bg-[#004be0]"
								onClick={() => setIsAddGroupOpen(true)}
								type="button"
							>
								Add New Team Member Group
							</Button>
						</div>

						{/* Table Controls */}
						<div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex items-center gap-2 text-slate-600 text-xs dark:text-slate-300">
								<span>Show</span>

								<select
									aria-label="Rows per page"
									className="h-8 rounded-sm border border-slate-300 bg-white px-2 text-xs outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
									onChange={(event) => {
										setPageSize(Number(event.target.value));
										setCurrentPage(1);
									}}
									value={pageSize}
								>
									<option value={10}>10</option>
									<option value={25}>25</option>
									<option value={50}>50</option>
									<option value={100}>100</option>
								</select>

								<span>entries</span>
							</div>

							<div className="flex items-center gap-2">
								<label
									className="text-slate-600 text-xs dark:text-slate-300"
									htmlFor="member-group-search"
								>
									Search:
								</label>

								<Input
									className="h-8 w-[220px] rounded-sm border-slate-300 text-xs dark:border-slate-700"
									id="member-group-search"
									onChange={(event) => {
										setSearch(event.target.value);
										setCurrentPage(1);
									}}
									value={search}
								/>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[800px] border-collapse text-xs">
								<thead>
									<tr className="bg-slate-50 text-left dark:bg-slate-900/70">
										<th className="w-[120px] border-slate-200 border-b px-4 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											ID
										</th>

										<th className="border-slate-200 border-b px-4 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Name
										</th>

										<th className="border-slate-200 border-b px-4 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Description
										</th>

										<th className="w-[160px] border-slate-200 border-b px-4 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleGroups.map((group) => (
										<tr
											className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50"
											key={group.id}
										>
											<td className="border-slate-200 border-b px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{group.id}
											</td>

											<td className="border-slate-200 border-b px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-200">
												{group.name}
											</td>

											<td className="border-slate-200 border-b px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{group.description}
											</td>

											<td className="border-slate-200 border-b px-4 py-3 dark:border-slate-800">
												<button
													className="text-[#0757ff] hover:underline"
													type="button"
												>
													Select an Action
												</button>
											</td>
										</tr>
									))}

									{visibleGroups.length === 0 && (
										<tr>
											<td
												className="border-slate-200 border-b px-4 py-8 text-center text-slate-500 text-xs dark:border-slate-800"
												colSpan={4}
											>
												No data available in table
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{/* Footer / Pagination */}
						<div className="flex flex-col gap-3 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between">
							<p className="text-slate-500 dark:text-slate-400">
								Showing {firstShown} to {lastShown} of {filteredGroups.length}{" "}
								entries
							</p>

							<div className="flex items-center gap-1">
								<Button
									className="h-8 rounded-sm px-2"
									disabled={safePage === 1}
									onClick={goFirst}
									size="sm"
									type="button"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 rounded-sm px-2"
									disabled={safePage === 1}
									onClick={goPrevious}
									size="sm"
									type="button"
									variant="outline"
								>
									<ChevronLeft className="h-3.5 w-3.5" />
									Previous
								</Button>

								<span className="flex h-8 min-w-8 items-center justify-center rounded-sm bg-[#0757ff] px-2 text-white text-xs">
									{safePage}
								</span>

								<Button
									className="h-8 rounded-sm px-2"
									disabled={safePage === totalPages}
									onClick={goNext}
									size="sm"
									type="button"
									variant="outline"
								>
									Next
									<ChevronRight className="h-3.5 w-3.5" />
								</Button>

								<Button
									className="h-8 rounded-sm px-2"
									disabled={safePage === totalPages}
									onClick={goLast}
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
		</div>
	);
}
