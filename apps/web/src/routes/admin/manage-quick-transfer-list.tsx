// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/manage-quick-transfer-list")({
	component: ManageQuickTransferListPage,
});

function ManageQuickTransferListPage() {
	const [name, setName] = useState("");
	const [status, setStatus] = useState("All");

	const resetFilters = () => {
		setName("");
		setStatus("All");
	};

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h1 className="font-medium text-lg">Manage Quick Transfer Lists</h1>

						<Button>Add Quick Transfer List</Button>
					</div>

					{/* Filters */}
					<div className="flex flex-col gap-4 px-4 py-5 lg:flex-row lg:items-end">
						<div className="flex flex-col gap-2">
							<label
								className="text-muted-foreground text-sm"
								htmlFor="quick-transfer-name"
							>
								Name
							</label>

							<Input
								className="w-[330px]"
								id="quick-transfer-name"
								onChange={(event) => setName(event.target.value)}
								value={name}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label
								className="text-muted-foreground text-sm"
								htmlFor="quick-transfer-status"
							>
								Status
							</label>

							<select
								className="h-10 w-[330px] rounded-md border bg-background px-3 text-sm"
								id="quick-transfer-status"
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

					{/* Table controls */}
					<div className="flex items-center gap-2 border-t px-4 py-4 text-sm">
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
										No. of Quick Transfer Number Available
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Availability
									</th>

									<th className="px-3 py-3 text-left font-medium">Status</th>

									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td
										className="px-4 py-4 text-center text-muted-foreground"
										colSpan={7}
									>
										No data available in table
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between border-t px-4 py-4 text-sm">
						<span className="text-muted-foreground">
							Showing 0 to 0 of 0 entries
						</span>

						<div className="flex items-center gap-1">
							<Button disabled size="sm" variant="outline">
								First
							</Button>

							<Button disabled size="sm" variant="outline">
								Previous
							</Button>

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
