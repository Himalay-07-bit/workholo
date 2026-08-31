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
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h1 className="font-medium text-lg">Manage Pause Code Lists</h1>

						<Button>Add Pause Code List</Button>
					</div>

					{/* Filters */}
					<div className="flex flex-col gap-4 px-4 py-5 xl:flex-row xl:items-end">
						<div className="flex flex-col gap-2">
							<label
								className="text-muted-foreground text-sm"
								htmlFor="break-list-name"
							>
								Name
							</label>

							<Input
								className="w-[250px]"
								id="break-list-name"
								onChange={(event) => setName(event.target.value)}
								value={name}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label
								className="text-muted-foreground text-sm"
								htmlFor="break-list-description"
							>
								Description
							</label>

							<Input
								className="w-[330px]"
								id="break-list-description"
								onChange={(event) => setDescription(event.target.value)}
								value={description}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label
								className="text-muted-foreground text-sm"
								htmlFor="break-list-status"
							>
								Status
							</label>

							<select
								className="h-10 w-[330px] rounded-md border bg-background px-3 text-sm"
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
							<Button>Search</Button>

							<Button onClick={resetFilters} variant="outline">
								Reset
							</Button>
						</div>
					</div>

					{/* Table Controls */}
					<div className="flex items-center gap-2 border-t px-4 py-4 text-sm">
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
										No. of Pause Codes
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Availability
									</th>

									<th className="px-3 py-3 text-left font-medium">Status</th>

									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								{visibleLists.map((item) => (
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

										<td className="px-3 py-3">{item.pauseCodes}</td>

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
												<option value="delete">Delete</option>
											</select>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between border-t px-4 py-4 text-sm">
						<span className="text-muted-foreground">
							Showing 1 to {visibleLists.length} of {filteredLists.length}{" "}
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
