import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/manage-leads")({
	component: ManageLeadsPage,
});

type LeadList = {
	id: number;
	name: string;
	description: string;
};

const leadLists: LeadList[] = [
	{ id: 1, name: "NLPC", description: "NLPC" },
	{ id: 2, name: "HRD Inhouse", description: "HRD Inhouse" },
	{ id: 3, name: "CRLA ACC", description: "CRLA ACC" },
	{ id: 4, name: "CRLB ACC", description: "CRLB ACC" },
	{ id: 5, name: "CRLD ACC", description: "CRLD ACC" },
	{ id: 6, name: "CRLA ACC Elites", description: "CRLA ACC Elites" },
	{ id: 7, name: "NLPC Backend", description: "NLPC Backend" },
	{ id: 8, name: "CRLA KC", description: "CRLA KC" },
	{ id: 9, name: "CRLB KC", description: "CRLB KC" },
	{ id: 10, name: "CRLD KC", description: "CRLD KC" },
	{ id: 11, name: "CRM KC", description: "CRM KC" },
	{ id: 12, name: "HRD KC", description: "HRD KC" },
];

function ManageLeadsPage() {
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredLists = useMemo(() => {
		const value = search.trim().toLowerCase();

		if (!value) {
			return leadLists;
		}

		return leadLists.filter((item) =>
			`${item.name} ${item.description}`.toLowerCase().includes(value)
		);
	}, [search]);

	const totalPages = Math.max(1, Math.ceil(filteredLists.length / pageSize));

	const safePage = Math.min(currentPage, totalPages);
	const startIndex = (safePage - 1) * pageSize;

	const visibleLists = filteredLists.slice(startIndex, startIndex + pageSize);

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex flex-col gap-3 border-b px-4 py-3 md:flex-row md:items-center md:justify-between">
						<h1 className="font-medium text-lg">Lead Lists</h1>

						<div className="flex flex-wrap gap-2">
							<Button variant="outline">Logs Of Upload Leads</Button>
							<Button variant="outline">Master Upload</Button>
							<Button variant="outline">Master Delete</Button>
							<Button>Add Lead List</Button>
						</div>
					</div>

					{/* Controls */}
					<div className="flex flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-2 text-sm">
							<span>Show</span>

							<select
								className="h-8 rounded-md border bg-background px-2"
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
						<table className="w-full min-w-[900px] border-collapse text-sm">
							<thead>
								<tr className="border-y bg-muted/40">
									<th className="px-3 py-3 text-left font-medium">S.No.</th>
									<th className="px-3 py-3 text-left font-medium">Name</th>
									<th className="px-3 py-3 text-left font-medium">
										Description
									</th>
									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								{visibleLists.map((item) => (
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
											<select
												className="h-9 min-w-[125px] rounded-md border bg-background px-2 text-sm"
												defaultValue=""
											>
												<option disabled value="">
													Select an Action
												</option>
												<option value="view">View</option>
												<option value="edit">Edit</option>
												<option value="upload">Upload</option>
												<option value="delete">Delete</option>
											</select>
										</td>
									</tr>
								))}

								{visibleLists.length === 0 && (
									<tr>
										<td
											className="px-4 py-10 text-center text-muted-foreground"
											colSpan={4}
										>
											No lead lists found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="flex flex-col gap-3 border-t px-4 py-4 text-sm md:flex-row md:items-center md:justify-between">
						<span className="text-muted-foreground">
							Showing {filteredLists.length === 0 ? 0 : startIndex + 1} to{" "}
							{Math.min(startIndex + pageSize, filteredLists.length)} of{" "}
							{filteredLists.length} entries
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
