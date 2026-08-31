// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";

import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/agent-dispositions")({
	component: AgentDispositionsPage,
});

type Disposition = {
	id: number;
	name: string;
	code: string;
};

const dispositions: Disposition[] = [
	{ id: 1, name: "RNR1", code: "RNR" },
	{ id: 2, name: "Call Back", code: "CBB" },
	{ id: 3, name: "Disconnected", code: "DISC" },
	{ id: 4, name: "Switch Off", code: "SWIT" },
	{ id: 5, name: "Not Interested", code: "NII" },
	{ id: 6, name: "INTRESTED", code: "INT" },
	{ id: 7, name: "Not Reachable", code: "NOR" },
	{ id: 8, name: "Pick Up Someone Else", code: "PBSE" },
	{ id: 9, name: "Want JD Before Interview", code: "WJBI" },
	{ id: 10, name: "Lead Already Converter", code: "LAC" },
];

function AgentDispositionsPage() {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);

	const filteredDispositions = useMemo(() => {
		const searchValue = search.trim().toLowerCase();

		if (!searchValue) {
			return dispositions;
		}

		return dispositions.filter((item) =>
			`${item.name} ${item.code}`.toLowerCase().includes(searchValue)
		);
	}, [search]);

	const visibleDispositions = filteredDispositions.slice(0, pageSize);

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h1 className="font-medium text-lg">Agent Dispositions</h1>

						<Button
							onClick={() =>
								navigate({
									to: "/admin/add-disposition",
								})
							}
							type="button"
						>
							+ Add Disposition
						</Button>
					</div>

					{/* Controls */}
					<div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-2 text-sm">
							<span>Show</span>

							<select
								className="h-8 rounded-md border bg-background px-2"
								id="disposition-page-size"
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
							<label className="text-sm" htmlFor="disposition-search">
								Search:
							</label>

							<Input
								className="w-[220px]"
								id="disposition-search"
								onChange={(event) => setSearch(event.target.value)}
								value={search}
							/>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto px-4 pb-4">
						<table className="w-full min-w-[900px] border-collapse text-sm">
							<thead>
								<tr className="border-y bg-muted/40">
									<th className="px-3 py-3 text-left font-medium">S.No.</th>

									<th className="px-3 py-3 text-left font-medium">Name</th>

									<th className="px-3 py-3 text-left font-medium">Code</th>

									<th className="px-3 py-3 text-left font-medium">Actions</th>
								</tr>
							</thead>

							<tbody>
								{visibleDispositions.map((item) => (
									<tr className="border-b hover:bg-muted/20" key={item.id}>
										<td className="px-3 py-3">{item.id}</td>

										<td className="px-3 py-3">{item.name}</td>

										<td className="px-3 py-3">{item.code}</td>

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

								{visibleDispositions.length === 0 && (
									<tr>
										<td
											className="px-4 py-10 text-center text-muted-foreground"
											colSpan={4}
										>
											No dispositions found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between border-t px-4 py-4 text-sm">
						<span className="text-muted-foreground">
							Showing 1 to {visibleDispositions.length} of{" "}
							{filteredDispositions.length} entries
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
