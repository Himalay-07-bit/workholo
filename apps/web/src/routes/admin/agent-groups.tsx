import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/agent-groups")({
	component: AgentGroupsPage,
});

const teams = [
	{
		id: 1,
		name: "IT team",
		description: "team",
	},
	{
		id: 2,
		name: "CRM KC",
		description: "CRM KC",
	},
	{
		id: 3,
		name: "CRLD KC",
		description: "CRLD KC",
	},
	{
		id: 4,
		name: "CRLB KC",
		description: "CRLB KC",
	},
	{
		id: 5,
		name: "CRLA KC",
		description: "CRLA KC",
	},
	{
		id: 6,
		name: "NLPC Backend",
		description: "NLPC Backend",
	},
	{
		id: 7,
		name: "HRD",
		description: "HRD",
	},
	{
		id: 8,
		name: "NLPC",
		description: "NLPC",
	},
	{
		id: 9,
		name: "Default Team",
		description: "Default Team",
	},
];

function AgentGroupsPage() {
	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 space-y-6 bg-muted/30 p-6">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-semibold text-2xl tracking-tight">
							All Teams (Agent Groups)
						</h1>

						<p className="text-muted-foreground text-sm">
							Manage your teams and agent groups.
						</p>
					</div>

					<Button>
						<Plus className="mr-2 size-4" />
						Add New Team (Agent Group)
					</Button>
				</div>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between gap-4">
							<CardTitle className="text-base">Teams</CardTitle>

							<div className="relative w-64">
								<Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

								<Input className="pl-9" placeholder="Search..." />
							</div>
						</div>
					</CardHeader>

					<CardContent>
						<div className="mb-4 text-muted-foreground text-sm">
							Show <span className="font-medium text-foreground">10</span>{" "}
							entries
						</div>

						<div className="overflow-x-auto rounded-md border">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b bg-muted/50">
										<th className="px-4 py-3 text-left font-medium">ID</th>

										<th className="px-4 py-3 text-left font-medium">Name</th>

										<th className="px-4 py-3 text-left font-medium">
											Description
										</th>

										<th className="px-4 py-3 text-left font-medium">Action</th>
									</tr>
								</thead>

								<tbody>
									{teams.map((team) => (
										<tr
											className="border-b last:border-0 hover:bg-muted/30"
											key={team.id}
										>
											<td className="px-4 py-3">{team.id}</td>

											<td className="px-4 py-3 font-medium text-primary">
												{team.name}
											</td>

											<td className="px-4 py-3">{team.description}</td>

											<td className="px-4 py-3">
												<Button size="sm" variant="outline">
													<MoreHorizontal className="mr-2 size-4" />
													Select an Action
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="mt-4 flex items-center justify-between text-muted-foreground text-sm">
							<span>Showing 1 to 9 of 9 entries</span>

							<div className="flex gap-2">
								<Button disabled size="sm" variant="outline">
									Previous
								</Button>

								<Button size="sm">1</Button>

								<Button disabled size="sm" variant="outline">
									Next
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
