import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/manage-did-numbers")({
	component: ManageDidNumbersPage,
});

type NumberRow = {
	id: number;
	name: string;
	description: string;
	number: string;
	status: "Enabled" | "Disabled";
	assignedTo: string;
	type: "DID" | "Toll Free" | "Virtual";
};

const numberData: NumberRow[] = [
	{
		id: 1,
		name: "",
		description: "",
		number: "918064370288",
		status: "Enabled",
		assignedTo: "",
		type: "DID",
	},
	{
		id: 2,
		name: "",
		description: "",
		number: "917965369373",
		status: "Enabled",
		assignedTo: "",
		type: "DID",
	},
	{
		id: 3,
		name: "CRLA KC01",
		description: "CRLA KC01",
		number: "918069561798",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 4,
		name: "CRLA KC02",
		description: "CRLA KC02",
		number: "918069561801",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 5,
		name: "CRLA KC03",
		description: "CRLA KC03",
		number: "918064055041",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 6,
		name: "CRLA KC04",
		description: "CRLA KC04",
		number: "918064055415",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 7,
		name: "CRLA KC05",
		description: "CRLA KC05",
		number: "918064055414",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 8,
		name: "CRLA KC06",
		description: "CRLA KC06",
		number: "918064055413",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 9,
		name: "CRLA KC07",
		description: "CRLA KC07",
		number: "918064055411",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
	{
		id: 10,
		name: "CRLA KC08",
		description: "CRLA KC08",
		number: "918069975489",
		status: "Enabled",
		assignedTo: "Hang up",
		type: "DID",
	},
];

const extraNumbers: NumberRow[] = Array.from({ length: 29 }, (_, index) => ({
	id: index + 11,
	name: `Number ${String(index + 11).padStart(2, "0")}`,
	description: `DID Number ${String(index + 11).padStart(2, "0")}`,
	number: `918060000${String(index + 11).padStart(4, "0")}`,
	status: "Enabled",
	assignedTo: index % 3 === 0 ? "" : "Hang up",
	type: index % 5 === 0 ? "Virtual" : "DID",
}));

const allNumbers = [...numberData, ...extraNumbers];

function ManageDidNumbersPage() {
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const [statusFilter, setStatusFilter] = useState("All");
	const [typeFilter, setTypeFilter] = useState("All Types");
	const [search, setSearch] = useState("");
	const [appliedSearch, setAppliedSearch] = useState("");

	const filteredNumbers = useMemo(() => {
		const normalizedSearch = appliedSearch.trim().toLowerCase();

		return allNumbers.filter((item) => {
			const matchesStatus =
				statusFilter === "All" || item.status === statusFilter;

			const matchesType =
				typeFilter === "All Types" || item.type === typeFilter;

			const matchesSearch =
				normalizedSearch.length === 0 ||
				item.name.toLowerCase().includes(normalizedSearch) ||
				item.description.toLowerCase().includes(normalizedSearch) ||
				item.number.toLowerCase().includes(normalizedSearch) ||
				item.assignedTo.toLowerCase().includes(normalizedSearch);

			return matchesStatus && matchesType && matchesSearch;
		});
	}, [appliedSearch, statusFilter, typeFilter]);

	const totalPages = Math.max(1, Math.ceil(filteredNumbers.length / pageSize));

	const safeCurrentPage = Math.min(currentPage, totalPages);

	const startIndex = (safeCurrentPage - 1) * pageSize;

	const visibleNumbers = filteredNumbers.slice(
		startIndex,
		startIndex + pageSize
	);

	const handlePageSizeChange = (value: string) => {
		const newSize = Number(value);

		setPageSize(newSize);
		setCurrentPage(1);
	};

	const handleStatusChange = (value: string) => {
		setStatusFilter(value);
		setCurrentPage(1);
	};

	const handleTypeChange = (value: string) => {
		setTypeFilter(value);
		setCurrentPage(1);
	};

	const handleSearch = () => {
		setAppliedSearch(search);
		setCurrentPage(1);
	};

	const goToPreviousPage = () => {
		setCurrentPage((page) => Math.max(1, page - 1));
	};

	const goToNextPage = () => {
		setCurrentPage((page) => Math.min(totalPages, page + 1));
	};

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background shadow-sm">
					{/* Page Header */}
					<div className="flex flex-col gap-4 border-b px-6 py-4 md:flex-row md:items-center md:justify-between">
						<h1 className="font-semibold text-xl">My Numbers</h1>

						<div className="flex flex-wrap gap-2">
							<Button variant="outline">Export Numbers</Button>

							<Button variant="outline">Block a Number</Button>

							<Button variant="outline">All Blocked Numbers</Button>
						</div>
					</div>

					{/* Filters */}
					<div className="flex flex-col gap-4 border-b px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
						<div className="flex items-center gap-2 text-sm">
							<span className="text-muted-foreground">Show</span>

							<select
								className="h-9 rounded-md border bg-background px-3 text-sm outline-none"
								onChange={(event) => handlePageSizeChange(event.target.value)}
								value={pageSize}
							>
								<option value={10}>10</option>
								<option value={25}>25</option>
								<option value={50}>50</option>
							</select>

							<span className="text-muted-foreground">entries</span>
						</div>

						<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
							<select
								className="h-9 min-w-[140px] rounded-md border bg-background px-3 text-sm outline-none"
								onChange={(event) => handleStatusChange(event.target.value)}
								value={statusFilter}
							>
								<option value="All">All</option>
								<option value="Enabled">Enabled</option>
								<option value="Disabled">Disabled</option>
							</select>

							<select
								className="h-9 min-w-[140px] rounded-md border bg-background px-3 text-sm outline-none"
								onChange={(event) => handleTypeChange(event.target.value)}
								value={typeFilter}
							>
								<option value="All Types">All Types</option>
								<option value="DID">DID</option>
								<option value="Toll Free">Toll Free</option>
								<option value="Virtual">Virtual</option>
							</select>

							<div className="flex gap-2">
								<Input
									className="w-full sm:w-[220px]"
									onChange={(event) => setSearch(event.target.value)}
									onKeyDown={(event) => {
										if (event.key === "Enter") {
											handleSearch();
										}
									}}
									placeholder="Search"
									value={search}
								/>

								<Button onClick={handleSearch}>Search</Button>
							</div>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto">
						<table className="w-full min-w-[1050px] text-sm">
							<thead>
								<tr className="border-b bg-muted/40">
									<th className="px-4 py-3 text-left font-medium">Name</th>

									<th className="px-4 py-3 text-left font-medium">
										Description
									</th>

									<th className="px-4 py-3 text-left font-medium">Number</th>

									<th className="px-4 py-3 text-left font-medium">Status</th>

									<th className="px-4 py-3 text-left font-medium">
										Assigned to
									</th>

									<th className="px-4 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								{visibleNumbers.length > 0 ? (
									visibleNumbers.map((item) => (
										<tr
											className="border-b last:border-0 hover:bg-muted/20"
											key={item.id}
										>
											<td className="px-4 py-3">{item.name || "—"}</td>

											<td className="px-4 py-3">{item.description || "—"}</td>

											<td className="px-4 py-3 font-medium">{item.number}</td>

											<td className="px-4 py-3">
												<span
													className={
														item.status === "Enabled"
															? "font-medium text-green-600"
															: "font-medium text-red-600"
													}
												>
													{item.status}
												</span>
											</td>

											<td className="px-4 py-3">{item.assignedTo || ""}</td>

											<td className="px-4 py-3">
												<select
													className="h-9 rounded-md border bg-background px-3 text-sm outline-none"
													defaultValue=""
												>
													<option disabled value="">
														Select an Action
													</option>
													<option value="view">View</option>
													<option value="edit">Edit</option>
													<option value="assign">Assign</option>
													<option value="block">Block</option>
												</select>
											</td>
										</tr>
									))
								) : (
									<tr>
										<td
											className="px-4 py-10 text-center text-muted-foreground"
											colSpan={6}
										>
											No numbers found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Footer / Pagination */}
					<div className="flex flex-col gap-4 border-t px-6 py-4 text-sm md:flex-row md:items-center md:justify-between">
						<p className="text-muted-foreground">
							Showing {filteredNumbers.length === 0 ? 0 : startIndex + 1} to{" "}
							{Math.min(startIndex + pageSize, filteredNumbers.length)} of{" "}
							{filteredNumbers.length} entries
						</p>

						<div className="flex items-center gap-1">
							<Button
								disabled={safeCurrentPage === 1}
								onClick={goToPreviousPage}
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
										variant={page === safeCurrentPage ? "default" : "outline"}
									>
										{page}
									</Button>
								)
							)}

							<Button
								disabled={safeCurrentPage === totalPages}
								onClick={goToNextPage}
								size="sm"
								variant="outline"
							>
								Next
							</Button>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}
