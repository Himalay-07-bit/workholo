"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/ip-pool-whitelisting")({
	component: IpPoolWhitelistingPage,
});

type IpPool = {
	id: number;
	name: string;
	description: string;
	type: "Single IP" | "Multiple IP";
	ips: string;
	assignedTo: string;
};

const ipPools: IpPool[] = [];

function IpPoolWhitelistingPage() {
	const navigate = useNavigate();

	const [activeTab, setActiveTab] = useState<"users" | "extension">("users");
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredPools = useMemo(() => {
		const value = search.trim().toLowerCase();

		if (!value) {
			return ipPools;
		}

		return ipPools.filter((pool) =>
			`${pool.id} ${pool.name} ${pool.description} ${pool.type} ${pool.ips} ${pool.assignedTo}`
				.toLowerCase()
				.includes(value)
		);
	}, [search]);

	const totalPages = Math.max(1, Math.ceil(filteredPools.length / pageSize));

	const safePage = Math.min(currentPage, totalPages);
	const startIndex = (safePage - 1) * pageSize;

	const visiblePools = filteredPools.slice(startIndex, startIndex + pageSize);

	const firstShown = filteredPools.length === 0 ? 0 : startIndex + 1;

	const lastShown = Math.min(startIndex + pageSize, filteredPools.length);

	const goFirst = () => setCurrentPage(1);

	const goPrevious = () => {
		setCurrentPage((page) => Math.max(1, page - 1));
	};

	const goNext = () => {
		setCurrentPage((page) => Math.min(totalPages, page + 1));
	};

	const goLast = () => setCurrentPage(totalPages);

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1600px]">
					<section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* Header */}
						<div className="flex items-center justify-between border-slate-200 border-b px-4 py-3 dark:border-slate-800">
							<h1 className="font-medium text-[#102b55] text-sm dark:text-white">
								List of IP Pools
							</h1>

							<Button
								className="h-8 rounded-sm border border-slate-300 bg-white px-3 text-slate-700 text-xs shadow-none hover:bg-slate-50 dark:border-slate-700 dark:bg-[#0b1728] dark:text-slate-200 dark:hover:bg-slate-800"
								onClick={() =>
									navigate({
										to: "/admin/add-new-ip-pool",
									})
								}
								type="button"
							>
								<Plus className="mr-1 h-3.5 w-3.5" />
								Add IP Pool
							</Button>
						</div>

						{/* Tabs */}
						<div className="px-4 pt-10">
							<div className="flex border-slate-200 border-b dark:border-slate-800">
								<button
									className={`h-12 w-[150px] text-sm transition-colors ${
										activeTab === "users"
											? "bg-[#2c6b8e] font-medium text-white"
											: "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200"
									}`}
									onClick={() => {
										setActiveTab("users");
										setCurrentPage(1);
									}}
									type="button"
								>
									Users
								</button>

								<button
									className={`h-12 w-[150px] text-sm transition-colors ${
										activeTab === "extension"
											? "bg-[#2c6b8e] font-medium text-white"
											: "bg-slate-200 text-slate-800 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200"
									}`}
									onClick={() => {
										setActiveTab("extension");
										setCurrentPage(1);
									}}
									type="button"
								>
									Extension
								</button>
							</div>
						</div>

						{/* Table Controls */}
						<div className="flex flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex items-center gap-2 text-slate-600 text-xs dark:text-slate-300">
								<span>Show</span>

								<select
									aria-label="Rows per page"
									className="h-8 rounded-sm border border-slate-300 bg-white px-2 text-xs outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
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
									htmlFor="ip-pool-search"
								>
									Search:
								</label>

								<Input
									className="h-8 w-[220px] rounded-sm border-slate-300 text-xs dark:border-slate-700"
									id="ip-pool-search"
									onChange={(event) => {
										setSearch(event.target.value);
										setCurrentPage(1);
									}}
									value={search}
								/>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto px-4">
							<table className="w-full min-w-[1000px] border-collapse text-xs">
								<thead>
									<tr className="bg-slate-50 text-left dark:bg-slate-900/70">
										<th className="w-[80px] border border-slate-200 px-2 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											S.No
										</th>

										<th className="border border-slate-200 px-2 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Name
										</th>

										<th className="border border-slate-200 px-2 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Description
										</th>

										<th className="border border-slate-200 px-2 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Type
										</th>

										<th className="border border-slate-200 px-2 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											IP(s)
										</th>

										<th className="border border-slate-200 px-2 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Assigned To
										</th>

										<th className="w-[140px] border border-slate-200 px-2 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visiblePools.map((pool) => (
										<tr
											className="hover:bg-slate-50 dark:hover:bg-slate-900/50"
											key={pool.id}
										>
											<td className="border border-slate-200 px-2 py-3 dark:border-slate-800">
												{pool.id}
											</td>
											<td className="border border-slate-200 px-2 py-3 dark:border-slate-800">
												{pool.name}
											</td>
											<td className="border border-slate-200 px-2 py-3 dark:border-slate-800">
												{pool.description}
											</td>
											<td className="border border-slate-200 px-2 py-3 dark:border-slate-800">
												{pool.type}
											</td>
											<td className="border border-slate-200 px-2 py-3 dark:border-slate-800">
												{pool.ips}
											</td>
											<td className="border border-slate-200 px-2 py-3 dark:border-slate-800">
												{pool.assignedTo}
											</td>
											<td className="border border-slate-200 px-2 py-3 dark:border-slate-800">
												<button
													className="text-[#0757ff] hover:underline"
													type="button"
												>
													Select an Action
												</button>
											</td>
										</tr>
									))}

									{visiblePools.length === 0 && (
										<tr>
											<td
												className="border border-slate-200 px-4 py-10 text-center text-slate-500 text-xs dark:border-slate-800"
												colSpan={7}
											>
												No data available in table
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{/* Footer */}
						<div className="flex flex-col gap-3 px-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
							<p className="text-slate-500 dark:text-slate-400">
								Showing {firstShown} to {lastShown} of {filteredPools.length}{" "}
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
