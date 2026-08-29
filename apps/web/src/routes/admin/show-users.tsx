// biome-ignore-all lint/performance/noJsxPropsBind: The action uses the route-local navigator.
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Badge } from "@workholo/ui/components/badge";

import { Button } from "@workholo/ui/components/button";
import { Card, CardContent } from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@workholo/ui/components/table";
import { MoreHorizontal, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/admin/show-users")({
	component: ShowUsersPage,
});

const users = [
	{
		name: "CRLA Dhriti",
		phone: "+913492481141",
		email: "hr@hireorbit.agency",
		agent: "Yes",
		extension: "Yes",
		webLogin: "Active",
		callingAgent: "Yes",
	},
	{
		name: "CRLA Farhin",
		phone: "+913840265022",
		email: "hr@hireorbit.agency",
		agent: "Yes",
		extension: "Yes",
		webLogin: "Active",
		callingAgent: "Yes",
	},
	{
		name: "CRLA Madiha",
		phone: "+913479461313",
		email: "hr@hireorbit.agency",
		agent: "Yes",
		extension: "Yes",
		webLogin: "Active",
		callingAgent: "Yes",
	},
	{
		name: "CRLA Ramadevi",
		phone: "+913840265025",
		email: "hr@hireorbit.agency",
		agent: "Yes",
		extension: "Yes",
		webLogin: "Active",
		callingAgent: "Yes",
	},
	{
		name: "CRLA Sanjib",
		phone: "+913481213435",
		email: "hr@hireorbit.agency",
		agent: "Yes",
		extension: "Yes",
		webLogin: "Active",
		callingAgent: "Yes",
	},
];

function ShowUsersPage() {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-svh flex-col">
			<div className="border-b bg-background px-6 py-4">
				<div className="flex items-center justify-between">
					<div>
						<h1 className="font-semibold text-xl">List of Users</h1>
						<p className="text-muted-foreground text-sm">
							Manage users and their calling access.
						</p>
					</div>

					<Button onClick={() => navigate({ to: "/admin/add-new-user" })}>
						<Plus className="mr-2 size-4" />
						Add User
					</Button>
				</div>
			</div>

			<main className="flex-1 bg-muted/30 p-6">
				<Card>
					<CardContent className="p-6">
						{/* Summary */}
						<div className="mb-6 grid gap-2 text-muted-foreground text-sm">
							<p>
								Number of Agents for calling:{" "}
								<strong className="text-foreground">23/23</strong>
							</p>

							<p>
								License for Interactions:{" "}
								<strong className="text-foreground">0/0</strong>
							</p>

							<p>
								Number of Supervisors:{" "}
								<strong className="text-foreground">0/0</strong>
							</p>
						</div>

						{/* Toolbar */}
						<div className="mb-4 flex flex-col justify-between gap-4 md:flex-row">
							<div className="flex gap-2">
								<Button variant="outline">All Roles</Button>
								<Button variant="outline">Extension Status</Button>
								<Button variant="outline">More Actions</Button>
							</div>

							<div className="relative w-full md:w-64">
								<Search className="absolute top-2.5 left-3 size-4 text-muted-foreground" />
								<Input className="pl-9" placeholder="Search" />
							</div>
						</div>

						{/* Table */}
						<div className="rounded-md border">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Call Forward Number</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Agent</TableHead>
										<TableHead>Agent Extension</TableHead>
										<TableHead>Web Login</TableHead>
										<TableHead>Calling Agent</TableHead>
										<TableHead className="text-right">Action</TableHead>
									</TableRow>
								</TableHeader>

								<TableBody>
									{users.map((user) => (
										<TableRow key={user.name}>
											<TableCell>
												<div className="space-y-1">
													<Badge variant="secondary">Login Based Calling</Badge>
													<div className="font-medium">{user.name}</div>
												</div>
											</TableCell>

											<TableCell>{user.phone}</TableCell>

											<TableCell>{user.email}</TableCell>

											<TableCell>{user.agent}</TableCell>

											<TableCell>{user.extension}</TableCell>

											<TableCell>
												<Badge>{user.webLogin}</Badge>
											</TableCell>

											<TableCell>{user.callingAgent}</TableCell>

											<TableCell className="text-right">
												<Button size="icon" title="Actions" variant="ghost">
													<MoreHorizontal className="size-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
