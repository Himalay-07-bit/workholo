import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import { Plus, Search } from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/pending-users")({
	component: PendingUsersPage,
});

function PendingUsersPage() {
	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 space-y-6 bg-muted/30 p-6">
				{/* Page header */}
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-semibold text-2xl tracking-tight">
							List of Pending User(s)
						</h1>

						<p className="text-muted-foreground text-sm">
							Manage users who are waiting for approval.
						</p>
					</div>

					<Button>
						<Plus className="mr-2 size-4" />
						Add User
					</Button>
				</div>

				{/* Users table */}
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between gap-4">
							<CardTitle className="text-base">Pending Users</CardTitle>

							<div className="relative w-64">
								<Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

								<Input className="pl-9" placeholder="Search..." />
							</div>
						</div>
					</CardHeader>

					<CardContent>
						<div className="mb-4 flex items-center gap-2 text-muted-foreground text-sm">
							<span>Show</span>

							<select className="h-9 rounded-md border bg-background px-3 text-sm">
								<option>10</option>
								<option>25</option>
								<option>50</option>
							</select>

							<span>entries</span>
						</div>

						<div className="overflow-x-auto rounded-md border">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b bg-muted/50">
										<th className="px-4 py-3 text-left font-medium">Name</th>

										<th className="px-4 py-3 text-left font-medium">Number</th>

										<th className="px-4 py-3 text-left font-medium">Email</th>

										<th className="px-4 py-3 text-left font-medium">Agent</th>

										<th className="px-4 py-3 text-left font-medium">
											Agent Extension
										</th>

										<th className="px-4 py-3 text-left font-medium">
											Web Login
										</th>

										<th className="px-4 py-3 text-left font-medium">Status</th>

										<th className="px-4 py-3 text-left font-medium">Action</th>
									</tr>
								</thead>

								<tbody>
									<tr>
										<td
											className="h-32 text-center text-muted-foreground"
											colSpan={8}
										>
											No data available in table
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						{/* Table footer */}
						<div className="mt-4 flex items-center justify-between text-muted-foreground text-sm">
							<span>Showing 0 to 0 of 0 entries</span>

							<div className="flex gap-2">
								<Button disabled size="sm" variant="outline">
									Previous
								</Button>

								<Button disabled size="sm" variant="outline">
									Next
								</Button>
							</div>
						</div>

						{/* Acefone note */}
						<div className="mt-6 text-sm">
							<span className="font-semibold">Note:</span> Rejected User will be
							deleted automatically after 30 Days.
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
