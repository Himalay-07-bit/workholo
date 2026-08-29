import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/manage-disposition-list")({
	component: ManageDispositionListPage,
});

type DispositionList = {
	id: number;
	name: string;
	description: string;
	statusAvailable: number;
	assigned: number;
	status: "Enabled" | "Disabled";
};

const dispositionLists: DispositionList[] = [
	{
		id: 1,
		name: "HRD",
		description: "HRD",
		statusAvailable: 12,
		assigned: 1,
		status: "Enabled",
	},
	{
		id: 2,
		name: "NLPC",
		description: "NLPC",
		statusAvailable: 12,
		assigned: 2,
		status: "Enabled",
	},
	{
		id: 3,
		name: "CRM",
		description: "CRM",
		statusAvailable: 15,
		assigned: 1,
		status: "Enabled",
	},
	{
		id: 4,
		name: "CRLD",
		description: "CRLD",
		statusAvailable: 11,
		assigned: 1,
		status: "Enabled",
	},
	{
		id: 5,
		name: "CRLAB",
		description: "CRLAB",
		statusAvailable: 12,
		assigned: 3,
		status: "Enabled",
	},
];

function ManageDispositionListPage() {
	const [name, setName] = useState("");
	const [status, setStatus] = useState("All");
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);

	const filteredLists = useMemo(() => {
		const searchValue = search.trim().toLowerCase();
		const nameValue = name.trim().toLowerCase();

		return dispositionLists.filter((item) => {
			const matchesName =
				!nameValue || item.name.toLowerCase().includes(nameValue);

			const matchesStatus = status === "All" || item.status === status;

			const matchesSearch =
				!searchValue ||
				`${item.name} ${item.description}`.toLowerCase().includes(searchValue);

			return matchesName && matchesStatus && matchesSearch;
		});
	}, [name, search, status]);

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h1 className="font-medium text-lg">Manage Disposition Lists</h1>

						<Button>Add Disposition List</Button>
					</div>

					{/* Filters */}
					<div className="flex flex-col gap-4 px-4 py-5 lg:flex-row lg:items-end">
						<div className="flex flex-col gap-2">
							<label
								className="text-muted-foreground text-sm"
								htmlFor="disposition-name"
							>
								Name
							</label>

							<Input
								className="w-[210px]"
								id="disposition-name"
								onChange={(event) => setName(event.target.value)}
								value={name}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label
								className="text-muted-foreground text-sm"
								htmlFor="disposition-status"
							>
								Status
							</label>

							<select
								className="h-10 w-[210px] rounded-md border bg-background px-3 text-sm"
								id="disposition-status"
								onChange={(event) => setStatus(event.target.value)}
								value={status}
							>
								<option value="All">All</option>
								<option value="Enabled">Enabled</option>
								<option value="Disabled">Disabled</option>
							</select>
						</div>

						<div className="flex gap-2">
							<Button onClick={() => undefined}>Search</Button>

							<Button
								onClick={() => {
									setName("");
									setStatus("All");
									setSearch("");
								}}
								variant="outline"
							>
								Reset
							</Button>
						</div>
					</div>

					{/* Secondary controls */}
					<div className="flex flex-col gap-3 border-t px-4 py-4 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-2 text-sm">
							<span>Show</span>

							<select
								className="h-8 rounded-md border bg-background px-2"
								onChange={(event) => setPageSize(Number(event.target.value))}
								value={pageSize}
							>
								<option value={10}>10</option>
								<option value={25}>25</option>
								<option value={50}>50</option>
							</select>

							<span>entries</span>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto">
						<table className="w-full min-w-[1100px] border-collapse text-sm">
							<thead>
								<tr className="border-y bg-muted/40">
									<th className="px-3 py-3 text-left font-medium">S.No.</th>

									<th className="px-3 py-3 text-left font-medium">Name</th>

									<th className="px-3 py-3 text-left font-medium">
										Description
									</th>

									<th className="px-3 py-3 text-left font-medium">
										No. of Disposition Status Available
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Availability
									</th>

									<th className="px-3 py-3 text-left font-medium">Status</th>

									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								{filteredLists.slice(0, pageSize).map((item) => (
									<tr className="border-b hover:bg-muted/20" key={item.id}>
										<td className="px-3 py-3">{item.id}.</td>

										<td className="px-3 py-3">
											<button
												className="text-blue-600 hover:underline"
												type="button"
											>
												{item.name}
											</button>
										</td>

										<td className="px-3 py-3">{item.description}</td>

										<td className="px-3 py-3">{item.statusAvailable}</td>

										<td className="px-3 py-3">
											<button
												className="text-blue-600 hover:underline"
												type="button"
											>
												Assigned ({item.assigned})
											</button>
										</td>

										<td className="px-3 py-3">{item.status}</td>

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
												<option value="disable">Disable</option>
												<option value="delete">Delete</option>
											</select>
										</td>
									</tr>
								))}

								{filteredLists.length === 0 && (
									<tr>
										<td
											className="px-4 py-10 text-center text-muted-foreground"
											colSpan={7}
										>
											No disposition lists found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between border-t px-4 py-4 text-sm">
						<span className="text-muted-foreground">
							Showing 1 to {filteredLists.length} of {filteredLists.length}{" "}
							entries
						</span>

						<div className="flex items-center gap-1">
							<Button disabled size="sm" variant="outline">
								First
							</Button>

							<Button disabled size="sm" variant="outline">
								Previous
							</Button>

							<Button size="sm">1</Button>

							<Button disabled size="sm" variant="outline">
								Next
							</Button>

							<Button disabled size="sm" variant="outline">
								Last
							</Button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
