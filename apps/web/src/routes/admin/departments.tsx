import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/departments")({
	component: DepartmentsPage,
});

function DepartmentsPage() {
	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background shadow-sm">
					{/* Header */}
					<div className="flex flex-col gap-4 border-b px-5 py-3 md:flex-row md:items-center md:justify-between">
						<h1 className="font-medium text-lg">Departments</h1>

						<div className="flex gap-2">
							<Button variant="outline">Feature Codes</Button>

							<Link className={buttonVariants()} to="/admin/add-department">
								Add Department
							</Link>
						</div>
					</div>

					{/* Call answered filter */}
					<div className="flex justify-end px-5 py-3 text-xs">
						<div className="flex items-center gap-1">
							<span className="font-medium">(Filters for Calls Answered)</span>

							<Button className="h-7 px-3 text-xs" size="sm">
								1 Day
							</Button>

							<Button className="h-7 px-2 text-xs" size="sm" variant="ghost">
								2 Days
							</Button>

							<Button className="h-7 px-2 text-xs" size="sm" variant="ghost">
								4 Days
							</Button>

							<Button className="h-7 px-2 text-xs" size="sm" variant="ghost">
								7 Days
							</Button>

							<Button className="h-7 px-2 text-xs" size="sm" variant="ghost">
								10 Days
							</Button>

							<Button className="h-7 px-2 text-xs" size="sm" variant="ghost">
								Refresh
							</Button>
						</div>
					</div>

					{/* Controls */}
					<div className="flex flex-col gap-4 border-b px-5 py-4 md:flex-row md:items-center md:justify-between">
						<div className="flex items-center gap-2 text-sm">
							<span className="text-muted-foreground">Show</span>

							<select
								className="h-9 rounded-md border bg-background px-3 text-sm"
								defaultValue="10"
							>
								<option value="10">10</option>
								<option value="25">25</option>
								<option value="50">50</option>
							</select>

							<span className="text-muted-foreground">entries</span>
						</div>

						<div className="flex items-center gap-2">
							<span className="text-sm">Search:</span>

							<Input className="w-[220px]" />
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto px-5 py-4">
						<table className="w-full min-w-[1000px] text-sm">
							<thead>
								<tr className="border bg-muted/40">
									<th className="px-3 py-3 text-left font-medium">ID</th>

									<th className="px-3 py-3 text-left font-medium">Name</th>

									<th className="px-3 py-3 text-left font-medium">
										Description
									</th>

									<th className="px-3 py-3 text-left font-medium">Strategy</th>

									<th className="px-3 py-3 text-left font-medium">
										Calls Answered
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Calls Missed
									</th>

									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td
										className="border-x border-b px-4 py-5 text-center"
										colSpan={7}
									>
										No data available in table
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between border-t px-5 py-4 text-sm">
						<p className="text-muted-foreground">Showing 0 to 0 of 0 entries</p>

						<div className="flex gap-2">
							<Button disabled size="sm" variant="outline">
								Previous
							</Button>

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
