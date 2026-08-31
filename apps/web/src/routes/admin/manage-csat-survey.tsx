// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/manage-csat-survey")({
	component: ManageCsatSurveyPage,
});

function ManageCsatSurveyPage() {
	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h1 className="font-medium text-lg">CSAT Survey</h1>

						<Button>Create CSAT Configuration</Button>
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

							<Input className="w-[220px]" />
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto">
						<table className="w-full min-w-[900px] border-collapse text-sm">
							<thead>
								<tr className="border-y bg-muted/40">
									<th className="px-3 py-3 text-left font-medium">S no.</th>

									<th className="px-3 py-3 text-left font-medium">Name</th>

									<th className="px-3 py-3 text-left font-medium">
										Description
									</th>

									<th className="px-3 py-3 text-left font-medium">
										No. of Questions
									</th>

									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td
										className="px-4 py-4 text-center text-muted-foreground"
										colSpan={5}
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
