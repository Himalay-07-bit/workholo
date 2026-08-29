import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/dialer-campaigns")({
	component: DialerCampaignsPage,
});

type Campaign = {
	id: number;
	name: string;
	concurrentLimit: number;
	ringTimeout: number;
	listName: string;
	status: "Active" | "Not Active";
	callsStatus: string;
	activeAgents: number;
};

const campaigns: Campaign[] = [
	{
		id: 1,
		name: "it team (105865)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Not Active",
		callsStatus: "-",
		activeAgents: 0,
	},
	{
		id: 2,
		name: "CRM KC (104522)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 3,
	},
	{
		id: 3,
		name: "CRLD KC (104394)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 2,
	},
	{
		id: 4,
		name: "CRLB KC (104343)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 3,
	},
	{
		id: 5,
		name: "CRLA KC (104246)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 7,
	},
	{
		id: 6,
		name: "NLPC Backend (103560)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Not Active",
		callsStatus: "-",
		activeAgents: 0,
	},
	{
		id: 7,
		name: "NLPC (100938)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 2,
	},
	{
		id: 8,
		name: "HRD (100937)",
		concurrentLimit: 30,
		ringTimeout: 30,
		listName: "View Lead List(s)",
		status: "Active",
		callsStatus: "-",
		activeAgents: 1,
	},
];

function DialerCampaignsPage() {
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredCampaigns = useMemo(() => {
		const value = search.trim().toLowerCase();

		if (!value) {
			return campaigns;
		}

		return campaigns.filter((campaign) =>
			[campaign.name, campaign.status, campaign.callsStatus, campaign.listName]
				.join(" ")
				.toLowerCase()
				.includes(value)
		);
	}, [search]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredCampaigns.length / pageSize)
	);

	const safePage = Math.min(currentPage, totalPages);

	const startIndex = (safePage - 1) * pageSize;

	const visibleCampaigns = filteredCampaigns.slice(
		startIndex,
		startIndex + pageSize
	);

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h1 className="font-medium text-lg">Dialer Campaigns</h1>

						<Button>Add Dialer Campaign</Button>
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
						<table className="w-full min-w-[1100px] border-collapse text-sm">
							<thead>
								<tr className="border-y bg-muted/40">
									<th className="px-3 py-3 text-left font-medium">S.no</th>

									<th className="px-3 py-3 text-left font-medium">Name</th>

									<th className="px-3 py-3 text-left font-medium">
										Concurrent Limit
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Ring Timeout
									</th>

									<th className="px-3 py-3 text-left font-medium">List Name</th>

									<th className="px-3 py-3 text-left font-medium">Status</th>

									<th className="px-3 py-3 text-left font-medium">
										Calls Status(Current)
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Active Agents(Current)
									</th>

									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								{visibleCampaigns.map((campaign) => (
									<tr
										className="border-b last:border-0 hover:bg-muted/20"
										key={campaign.id}
									>
										<td className="px-3 py-3">{campaign.id}</td>

										<td className="px-3 py-3 font-medium">{campaign.name}</td>

										<td className="px-3 py-3">{campaign.concurrentLimit}</td>

										<td className="px-3 py-3">{campaign.ringTimeout}</td>

										<td className="px-3 py-3">
											<button
												className="text-blue-600 hover:underline"
												type="button"
											>
												{campaign.listName}
											</button>
										</td>

										<td className="px-3 py-3">
											<span
												className={`inline-flex rounded-sm px-2 py-1 font-medium text-white text-xs ${
													campaign.status === "Active"
														? "bg-blue-600"
														: "bg-gray-500"
												}`}
											>
												{campaign.status}
											</span>
										</td>

										<td className="px-3 py-3">{campaign.callsStatus}</td>

										<td className="px-3 py-3">
											{campaign.activeAgents > 0 ? (
												<span className="text-blue-600">
													{campaign.activeAgents}
												</span>
											) : (
												campaign.activeAgents
											)}
										</td>

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
												<option value="activate">Activate</option>
												<option value="delete">Delete</option>
											</select>
										</td>
									</tr>
								))}

								{visibleCampaigns.length === 0 && (
									<tr>
										<td
											className="px-4 py-10 text-center text-muted-foreground"
											colSpan={9}
										>
											No campaigns found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="flex flex-col gap-3 border-t px-4 py-4 text-sm md:flex-row md:items-center md:justify-between">
						<span className="text-muted-foreground">
							Showing {filteredCampaigns.length === 0 ? 0 : startIndex + 1} to{" "}
							{Math.min(startIndex + pageSize, filteredCampaigns.length)} of{" "}
							{filteredCampaigns.length} entries
						</span>

						<div className="flex items-center gap-1">
							<Button
								disabled={safePage === 1}
								onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
								size="sm"
								variant="outline"
							>
								First
							</Button>

							<Button
								disabled={safePage === 1}
								onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
								size="sm"
								variant="outline"
							>
								Previous
							</Button>

							{Array.from({ length: totalPages }, (_, index) => index + 1).map(
								(page) => (
									<Button
										key={page}
										onClick={() => setCurrentPage(page)}
										size="sm"
										variant={page === safePage ? "default" : "outline"}
									>
										{page}
									</Button>
								)
							)}

							<Button
								disabled={safePage === totalPages}
								onClick={() =>
									setCurrentPage((page) => Math.min(totalPages, page + 1))
								}
								size="sm"
								variant="outline"
							>
								Next
							</Button>

							<Button
								disabled={safePage === totalPages}
								onClick={() =>
									setCurrentPage((page) => Math.min(totalPages, page + 1))
								}
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
