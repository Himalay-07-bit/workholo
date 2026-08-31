// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";

import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/survey-campaigns")({
	component: SurveyCampaignsPage,
});

type SurveyCampaign = {
	id: number;
	name: string;
	topic: string;
	heading: string;
};

const surveyCampaigns: SurveyCampaign[] = [
	{
		id: 1,
		name: "CRLA ACC",
		topic: "CRLA ACC",
		heading: "CRLA ACC",
	},
	{
		id: 2,
		name: "CRLA ACC Elites",
		topic: "CRLA ACC Elites",
		heading: "CRLA ACC Elites",
	},
	{
		id: 3,
		name: "CRLA KC",
		topic: "CRLA KC",
		heading: "CRLA KC",
	},
	{
		id: 4,
		name: "CRLB ACC",
		topic: "CRLB ACC",
		heading: "CRLB ACC",
	},
	{
		id: 5,
		name: "CRLB KC",
		topic: "CRLB KC",
		heading: "CRLB KC",
	},
	{
		id: 6,
		name: "CRLD ACC",
		topic: "CRLD ACC",
		heading: "CRLD ACC",
	},
	{
		id: 7,
		name: "CRLD KC",
		topic: "CRLD KC",
		heading: "CRLD KC",
	},
];

function SurveyCampaignsPage() {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);

	const filteredCampaigns = useMemo(() => {
		const searchValue = search.trim().toLowerCase();

		if (!searchValue) {
			return surveyCampaigns;
		}

		return surveyCampaigns.filter((campaign) =>
			`${campaign.name} ${campaign.topic} ${campaign.heading}`
				.toLowerCase()
				.includes(searchValue)
		);
	}, [search]);

	const visibleCampaigns = filteredCampaigns.slice(0, pageSize);

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h1 className="font-medium text-lg">Survey Campaigns</h1>

						<Button
							onClick={() =>
								navigate({
									to: "/admin/add-survey-campaign",
								})
							}
							type="button"
						>
							Add Survey Campaign
						</Button>
					</div>

					{/* Controls */}
					<div className="flex flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-2 text-sm">
							<span>Show</span>

							<select
								className="h-8 rounded-md border bg-background px-2"
								id="survey-page-size"
								onChange={(event) => setPageSize(Number(event.target.value))}
								value={pageSize}
							>
								<option value={10}>10</option>
								<option value={25}>25</option>
								<option value={50}>50</option>
							</select>

							<span>entries</span>
						</div>

						<div className="flex items-center gap-2">
							<label className="text-sm" htmlFor="survey-search">
								Search:
							</label>

							<Input
								className="w-[220px]"
								id="survey-search"
								onChange={(event) => setSearch(event.target.value)}
								value={search}
							/>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto px-4">
						<table className="w-full min-w-[900px] border-collapse text-sm">
							<thead>
								<tr className="border-y bg-muted/40">
									<th className="px-3 py-3 text-left font-medium">Name</th>

									<th className="px-3 py-3 text-left font-medium">Topic</th>

									<th className="px-3 py-3 text-left font-medium">Heading</th>

									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								{visibleCampaigns.map((campaign) => (
									<tr className="border-b hover:bg-muted/20" key={campaign.id}>
										<td className="px-3 py-3">{campaign.name}</td>

										<td className="px-3 py-3">{campaign.topic}</td>

										<td className="px-3 py-3">{campaign.heading}</td>

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

								{visibleCampaigns.length === 0 && (
									<tr>
										<td
											className="px-4 py-10 text-center text-muted-foreground"
											colSpan={4}
										>
											No survey campaigns found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between border-t px-4 py-4 text-sm">
						<span className="text-muted-foreground">
							Showing 1 to {visibleCampaigns.length} of{" "}
							{filteredCampaigns.length} entries
						</span>

						<div className="flex items-center gap-1">
							<Button disabled size="sm" variant="outline">
								Previous
							</Button>

							<Button size="sm">1</Button>

							<Button disabled size="sm" variant="outline">
								Next
							</Button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
