// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
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

	const filteredLists = dndLists.filter((item) =>
		`${item.name} ${item.description}`
			.toLowerCase()
			.includes(search.toLowerCase())
	);

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h1 className="font-medium text-lg">Account DND Lists</h1>

						<Button>Add Account DND List</Button>
					</div>

					{/* Controls */}
					<div className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-2 text-sm">
							<span>Show</span>

							<select
								className="h-8 rounded-md border bg-background px-2"
								defaultValue="10"
							>
								<option value="10">10</option>
								<option value="25">25</option>
								<option value="50">50</option>
							</select>

							<span>entries</span>
						</div>

						<div className="flex items-center gap-2">
							<span className="text-sm">Search:</span>

							<Input
								className="w-[220px]"
								onChange={(event) => setSearch(event.target.value)}
								value={search}
							/>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto">
						<table className="w-full min-w-[900px] border-collapse text-sm">
							<thead>
								<tr className="border-y bg-muted/40">
									<th className="px-3 py-3 text-left font-medium">S.No.</th>

									<th className="px-3 py-3 text-left font-medium">Name</th>

									<th className="px-3 py-3 text-left font-medium">
										Description
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Availability/Assigned To
									</th>

									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								{filteredLists.map((item) => (
									<tr className="border-b hover:bg-muted/20" key={item.id}>
										<td className="px-3 py-3">{item.id}</td>

										<td className="px-3 py-3">
											<button
												className="text-blue-600 hover:underline"
												type="button"
											>
												{item.name}
											</button>
										</td>

										<td className="px-3 py-3">{item.description}</td>

										<td className="px-3 py-3">
											<button
												className="text-blue-600 hover:underline"
												type="button"
											>
												Assigned ({item.assigned})
											</button>
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
												<option value="delete">Delete</option>
											</select>
										</td>
									</tr>
								))}

								{filteredLists.length === 0 && (
									<tr>
										<td
											className="px-4 py-10 text-center text-muted-foreground"
											colSpan={5}
										>
											No DND lists found.
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
