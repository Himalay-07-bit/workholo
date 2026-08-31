import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import {
	ChevronLeft,
	ChevronRight,
	Clock3,
	Plus,
	Search,
	Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/show-inbound-queue")({
	component: ShowInboundQueuePage,
});

type InboundQueue = {
	id: number;
	name: string;
	description: string;
	strategy: string;
	queueTimeout: number;
};

const inboundQueues: InboundQueue[] = [
	{
		id: 1,
		name: "it team",
		description: "team",
		strategy: "Random",
		queueTimeout: 90,
	},
	{
		id: 2,
		name: "All Inbound",
		description: "All Inbound",
		strategy: "Longest Wait Time",
		queueTimeout: 600,
	},
	{
		id: 3,
		name: "CRM KC",
		description: "CRM KC",
		strategy: "Longest Wait Time",
		queueTimeout: 200,
	},
	{
		id: 4,
		name: "CRLD KC",
		description: "CRLD KC",
		strategy: "Longest Wait Time",
		queueTimeout: 200,
	},
	{
		id: 5,
		name: "CRLB KC",
		description: "CRLB KC",
		strategy: "Longest Wait Time",
		queueTimeout: 200,
	},
	{
		id: 6,
		name: "CRLA KC",
		description: "CRLA KC",
		strategy: "Longest Wait Time",
		queueTimeout: 200,
	},
	{
		id: 7,
		name: "NLPC Backend",
		description: "NLPC Backend",
		strategy: "Longest Wait Time",
		queueTimeout: 200,
	},
	{
		id: 8,
		name: "HRD Inbound",
		description: "HRD Inbound",
		strategy: "Longest Wait Time",
		queueTimeout: 200,
	},
	{
		id: 9,
		name: "NLPC Inbound",
		description: "NLPC Inbound",
		strategy: "Longest Wait Time",
		queueTimeout: 200,
	},
];

function ShowInboundQueuePage() {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredQueues = useMemo(() => {
		const value = search.trim().toLowerCase();

		if (!value) {
			return inboundQueues;
		}

		return inboundQueues.filter((queue) =>
			[queue.name, queue.description, queue.strategy, queue.queueTimeout]
				.join(" ")
				.toLowerCase()
				.includes(value)
		);
	}, [search]);

	const totalPages = Math.max(1, Math.ceil(filteredQueues.length / pageSize));

	const safePage = Math.min(currentPage, totalPages);
	const startIndex = (safePage - 1) * pageSize;

	const visibleQueues = filteredQueues.slice(startIndex, startIndex + pageSize);

	const goPrevious = () => {
		setCurrentPage((page) => Math.max(1, page - 1));
	};

	const goNext = () => {
		setCurrentPage((page) => Math.min(totalPages, page + 1));
	};

	const totalQueues = inboundQueues.length;

	const longestWaitQueues = inboundQueues.filter(
		(queue) => queue.strategy === "Longest Wait Time"
	).length;

	const averageTimeout = Math.round(
		inboundQueues.reduce((sum, queue) => sum + queue.queueTimeout, 0) /
			inboundQueues.length
	);

	return (
		<div className="min-h-svh bg-[#eef3f9] text-slate-900 dark:bg-[#0b1220] dark:text-slate-100">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<div className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-[#111a2b]">
						<div>
							<div className="flex items-center gap-2">
								<h1 className="font-bold text-[#102b55] text-xl tracking-tight dark:text-white">
									Inbound Queues
								</h1>

								<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-500/10 dark:text-blue-400">
									{totalQueues} QUEUES
								</span>
							</div>

							<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
								Manage inbound call queues and routing strategies.
							</p>
						</div>
						<Button
							className="h-9 bg-[#0757ff] text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
							onClick={() =>
								navigate({
									to: "/admin/add-inbound-queue",
								})
							}
						>
							<Plus className="mr-1.5 size-4" />
							Add Inbound Queue
						</Button>
					</div>

					{/* SUMMARY CARDS */}
					<div className="mb-4 grid gap-3 sm:grid-cols-3">
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#111a2b]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-500/10 dark:text-blue-400">
									<Users className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider">
										Total Queues
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-white">
										{totalQueues}
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#111a2b]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
									<Users className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider">
										Longest Wait Strategy
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-white">
										{longestWaitQueues}
									</p>
								</div>
							</div>
						</div>

						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#111a2b]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
									<Clock3 className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider">
										Avg. Queue Timeout
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-white">
										{averageTimeout}s
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* MAIN CARD */}
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111a2b]">
						{/* TOOLBAR */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-3.5 md:flex-row md:items-center md:justify-between dark:border-slate-800">
							<div className="flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<span>Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0b1220] dark:text-slate-300"
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
								<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400" />

								<Input
									className="h-8 w-full rounded-lg border-slate-200 bg-white pl-8 text-xs md:w-[240px] dark:border-slate-700 dark:bg-[#0b1220] dark:text-slate-200 dark:placeholder:text-slate-500"
									onChange={(event) => {
										setSearch(event.target.value);
										setCurrentPage(1);
									}}
									placeholder="Search queues..."
									value={search}
								/>
							</div>
						</div>

						{/* TABLE */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[900px] border-collapse text-xs">
								<thead>
									<tr className="border-slate-100 border-b bg-slate-50/70 dark:border-slate-800 dark:bg-[#0d1627]">
										<th className="w-[80px] px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											S.No
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Queue Name
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Description
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Strategy
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Queue Timeout
										</th>

										<th className="w-[170px] px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleQueues.map((queue) => (
										<tr
											className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-500/5"
											key={queue.id}
										>
											<td className="px-4 py-3 font-medium text-slate-400">
												{queue.id}.
											</td>

											<td className="px-4 py-3">
												<div className="flex items-center gap-2.5">
													<div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-500/10 dark:text-blue-400">
														<Users className="size-3.5" />
													</div>

													<div className="font-semibold text-[#263b5b] dark:text-slate-200">
														{queue.name}
													</div>
												</div>
											</td>

											<td className="px-4 py-3 text-slate-500 dark:text-slate-400">
												{queue.description}
											</td>

											<td className="px-4 py-3">
												<span className="inline-flex rounded-full bg-indigo-50 px-2.5 py-1 font-medium text-[10px] text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
													{queue.strategy}
												</span>
											</td>

											<td className="px-4 py-3">
												<div className="flex items-center gap-2">
													<Clock3 className="size-3.5 text-slate-400" />

													<span className="font-semibold text-[#102b55] dark:text-slate-200">
														{queue.queueTimeout}s
													</span>
												</div>
											</td>

											<td className="px-4 py-3">
												<select
													className="h-8 min-w-[125px] rounded-lg border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none transition hover:border-blue-200 focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0b1220] dark:text-slate-300 dark:hover:border-blue-500/50"
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

									{visibleQueues.length === 0 && (
										<tr>
											<td
												className="px-4 py-12 text-center text-slate-400"
												colSpan={6}
											>
												<Search className="mx-auto mb-2 size-7 text-slate-300 dark:text-slate-600" />

												<p className="font-medium text-slate-500 dark:text-slate-300">
													No inbound queues found
												</p>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{/* PAGINATION */}
						<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-3.5 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<span className="text-slate-400">
								Showing{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredQueues.length === 0 ? 0 : startIndex + 1}
								</span>{" "}
								to{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{Math.min(startIndex + pageSize, filteredQueues.length)}
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredQueues.length}
								</span>{" "}
								entries
							</span>

							<div className="flex items-center gap-1.5">
								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-transparent dark:text-slate-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() => setCurrentPage(1)}
									size="sm"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-transparent dark:text-slate-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={goPrevious}
									size="sm"
									variant="outline"
								>
									<ChevronLeft className="mr-1 size-3.5" />
									Previous
								</Button>

								<Button
									className="h-8 min-w-8 bg-[#0757ff] px-2 text-[11px] shadow-sm hover:bg-[#004be0]"
									size="sm"
								>
									{safePage}
								</Button>

								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-transparent dark:text-slate-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
									disabled={safePage === totalPages}
									onClick={goNext}
									size="sm"
									variant="outline"
								>
									Next
									<ChevronRight className="ml-1 size-3.5" />
								</Button>

								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-transparent dark:text-slate-400 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
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
