// biome-ignore-all lint/performance/noJsxPropsBind: Search and navigation use route-local state.
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import { MoreHorizontal, Plus, Search, UserRound } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/users")({
	component: RouteComponent,
});

type User = {
	id: number;
	name: string;
	phone: string;
	email: string;
	role: string;
	team: string;
	status: "Active" | "Inactive";
};

const users: User[] = [
	{
		id: 1,
		name: "Rahul Sharma",
		phone: "+91 9876543210",
		email: "rahul@example.com",
		role: "Agent",
		team: "Sales",
		status: "Active",
	},
	{
		id: 2,
		name: "Priya Singh",
		phone: "+91 9876543211",
		email: "priya@example.com",
		role: "Agent",
		team: "Support",
		status: "Active",
	},
	{
		id: 3,
		name: "Amit Kumar",
		phone: "+91 9876543212",
		email: "amit@example.com",
		role: "Supervisor",
		team: "Sales",
		status: "Inactive",
	},
];

function RouteComponent() {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");

	const filteredUsers = users.filter((user) => {
		const value = search.toLowerCase();

		return (
			user.name.toLowerCase().includes(value) ||
			user.email.toLowerCase().includes(value) ||
			user.phone.toLowerCase().includes(value) ||
			user.team.toLowerCase().includes(value)
		);
	});

	return (
		<div className="flex min-h-svh flex-col">
			{/* Page Header */}
			<div className="border-b bg-background px-6 py-4">
				<div className="flex items-center justify-between gap-4">
					<div>
						<h1 className="font-semibold text-xl">Users</h1>

						<p className="text-muted-foreground text-sm">
							Manage platform users and their access.
						</p>
					</div>

					<Button
						onClick={() => navigate({ to: "/admin/add-new-user" })}
						type="button"
					>
						<Plus className="mr-2 size-4" />
						Add User
					</Button>
				</div>
			</div>

			{/* Content */}
			<main className="flex-1 bg-muted/30 p-6">
				<Card>
					<CardHeader>
						<div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
							<div>
								<CardTitle>All Users</CardTitle>

								<p className="mt-1 text-muted-foreground text-sm">
									{filteredUsers.length} user
									{filteredUsers.length === 1 ? "" : "s"} found
								</p>
							</div>

							{/* Search */}
							<div className="relative w-full md:w-72">
								<Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

								<Input
									className="pl-9"
									onChange={(event) => setSearch(event.target.value)}
									placeholder="Search users..."
									value={search}
								/>
							</div>
						</div>
					</CardHeader>

					<CardContent>
						<div className="overflow-x-auto rounded-lg border">
							<table className="w-full min-w-[850px] text-sm">
								<thead>
									<tr className="border-b bg-muted/50">
										<th className="px-4 py-3 text-left font-medium">User</th>

										<th className="px-4 py-3 text-left font-medium">Phone</th>

										<th className="px-4 py-3 text-left font-medium">Email</th>

										<th className="px-4 py-3 text-left font-medium">Role</th>

										<th className="px-4 py-3 text-left font-medium">Team</th>

										<th className="px-4 py-3 text-left font-medium">Status</th>

										<th className="w-12 px-4 py-3" />
									</tr>
								</thead>

								<tbody>
									{filteredUsers.length === 0 ? (
										<tr>
											<td className="px-4 py-12 text-center" colSpan={7}>
												<div className="flex flex-col items-center gap-2">
													<UserRound className="size-8 text-muted-foreground" />

													<p className="font-medium">No users found</p>

													<p className="text-muted-foreground text-sm">
														Try changing your search.
													</p>
												</div>
											</td>
										</tr>
									) : (
										filteredUsers.map((user) => (
											<tr
												className="border-b last:border-b-0 hover:bg-muted/30"
												key={user.id}
											>
												<td className="px-4 py-4">
													<div className="font-medium">{user.name}</div>
												</td>

												<td className="px-4 py-4 text-muted-foreground">
													{user.phone}
												</td>

												<td className="px-4 py-4 text-muted-foreground">
													{user.email}
												</td>

												<td className="px-4 py-4">{user.role}</td>

												<td className="px-4 py-4">{user.team}</td>

												<td className="px-4 py-4">
													<span
														className={
															user.status === "Active"
																? "rounded-full bg-green-100 px-2.5 py-1 font-medium text-green-700 text-xs"
																: "rounded-full bg-muted px-2.5 py-1 font-medium text-muted-foreground text-xs"
														}
													>
														{user.status}
													</span>
												</td>

												<td className="px-4 py-4">
													<Button
														size="icon"
														title="User actions"
														type="button"
														variant="ghost"
													>
														<MoreHorizontal className="size-4" />
													</Button>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
