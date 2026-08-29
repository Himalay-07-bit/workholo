import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
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

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h1 className="font-medium text-lg">Inbound Queues</h1>

						<Button>Add Inbound Queue</Button>
					</div>

					{/* Controls */}
					<div className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-2 text-sm">
							<span>Show</span>

							<select
								className="h-8 rounded-md border bg-background px-2 text-sm"
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

						<div className="flex items-center gap-2">
							<span className="text-sm">Search:</span>

							<Input
								className="w-[220px]"
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
						<table className="w-full min-w-[950px] border-collapse text-sm">
							<thead>
								<tr className="border-y bg-muted/40">
									<th className="w-[90px] px-3 py-3 text-left font-medium">
										S.no
									</th>

									<th className="px-3 py-3 text-left font-medium">Name</th>

									<th className="px-3 py-3 text-left font-medium">
										Description
									</th>

									<th className="px-3 py-3 text-left font-medium">Strategy</th>

									<th className="px-3 py-3 text-left font-medium">
										Queue Timeout
									</th>

									<th className="w-[180px] px-3 py-3 text-left font-medium">
										Action
									</th>
								</tr>
							</thead>

							<tbody>
								{visibleQueues.map((queue) => (
									<tr className="border-b hover:bg-muted/20" key={queue.id}>
										<td className="px-3 py-3">{queue.id}.</td>

										<td className="px-3 py-3 font-medium">{queue.name}</td>

										<td className="px-3 py-3">{queue.description}</td>

										<td className="px-3 py-3">{queue.strategy}</td>

										<td className="px-3 py-3">{queue.queueTimeout}</td>

										<td className="px-3 py-3">
											<select
												className="h-9 min-w-[125px] rounded-md border bg-background px-2 text-sm"
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

								{visibleQueues.length === 0 && (
									<tr>
										<td
											className="px-4 py-10 text-center text-muted-foreground"
											colSpan={6}
										>
											No inbound queues found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="flex flex-col gap-3 border-t px-4 py-4 text-sm md:flex-row md:items-center md:justify-between">
						<span className="text-muted-foreground">
							Showing {filteredQueues.length === 0 ? 0 : startIndex + 1} to{" "}
							{Math.min(startIndex + pageSize, filteredQueues.length)} of{" "}
							{filteredQueues.length} entries
						</span>

						<div className="flex items-center gap-1">
							<Button
								disabled={safePage === 1}
								onClick={() => setCurrentPage(1)}
								size="sm"
								variant="outline"
							>
								First
							</Button>

							<Button
								disabled={safePage === 1}
								onClick={goPrevious}
								size="sm"
								variant="outline"
							>
								Previous
							</Button>

							<Button size="sm" variant="default">
								{safePage}
							</Button>

							<Button
								disabled={safePage === totalPages}
								onClick={goNext}
								size="sm"
								variant="outline"
							>
								Next
							</Button>

							<Button
								disabled={safePage === totalPages}
								onClick={() => setCurrentPage(totalPages)}
								size="sm"
								variant="outline"
							>
								Last
							</Button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
