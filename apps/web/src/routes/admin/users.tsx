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
import {
	CheckCircle2,
	MoreHorizontal,
	Plus,
	Search,
	UserRound,
	UsersRound,
} from "lucide-react";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

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
		const value = search.trim().toLowerCase();

		return (
			user.name.toLowerCase().includes(value) ||
			user.email.toLowerCase().includes(value) ||
			user.phone.toLowerCase().includes(value) ||
			user.team.toLowerCase().includes(value) ||
			user.role.toLowerCase().includes(value)
		);
	});

	const activeUsers = users.filter((user) => user.status === "Active").length;

	const agents = users.filter((user) => user.role === "Agent").length;

	return (
		<div className="min-h-svh w-full bg-[#eef3f9] text-[#102b55] transition-colors dark:bg-[#07111f] dark:text-slate-100">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<div className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-colors lg:flex-row lg:items-center lg:justify-between dark:border-slate-800 dark:bg-[#0b1728]">
						<div>
							<div className="flex flex-wrap items-center gap-2">
								<h1 className="font-bold text-[#102b55] text-xl tracking-tight dark:text-slate-100">
									Users
								</h1>

								<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
									{users.length} USERS
								</span>
							</div>

							<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
								Manage platform users and their access.
							</p>
						</div>

						<Button
							className="!bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-9 w-fit rounded-lg px-4 font-medium text-xs shadow-blue-500/20 shadow-sm transition-colors"
							onClick={() =>
								navigate({
									to: "/admin/add-new-user",
								})
							}
							type="button"
						>
							<Plus className="mr-1.5 size-4" />
							Add User
						</Button>
					</div>

					{/* SUMMARY CARDS */}
					<div className="mb-4 grid gap-3 sm:grid-cols-3">
						{/* TOTAL USERS */}
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
									<UsersRound className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Total Users
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{users.length}
									</p>
								</div>
							</div>
						</div>

						{/* ACTIVE USERS */}
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
									<CheckCircle2 className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Active Users
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{activeUsers}
									</p>
								</div>
							</div>
						</div>

						{/* AGENTS */}
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
									<UserRound className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Agents
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{agents}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* USERS CARD */}
					<Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-[#0b1728]">
						<CardHeader className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
								<div>
									<CardTitle className="font-bold text-[#102b55] text-base dark:text-slate-100">
										All Users
									</CardTitle>

									<p className="mt-1 text-slate-400 text-xs dark:text-slate-500">
										{filteredUsers.length} user
										{filteredUsers.length === 1 ? "" : "s"} found
									</p>
								</div>

								{/* SEARCH */}
								<div className="relative w-full md:w-[260px]">
									<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white pl-9 text-slate-700 text-xs shadow-sm placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500"
										onChange={(event) => setSearch(event.target.value)}
										placeholder="Search users..."
										value={search}
									/>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-0">
							<div className="overflow-x-auto">
								<table className="w-full min-w-[900px] border-collapse text-xs">
									<thead>
										<tr className="border-slate-100 border-b bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70">
											<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
												User
											</th>

											<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
												Phone
											</th>

											<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
												Email
											</th>

											<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
												Role
											</th>

											<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
												Team
											</th>

											<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
												Status
											</th>

											<th className="w-12 px-5 py-3" />
										</tr>
									</thead>

									<tbody>
										{filteredUsers.length === 0 ? (
											<tr>
												<td className="px-5 py-12 text-center" colSpan={7}>
													<div className="flex flex-col items-center gap-2">
														<div className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
															<UserRound className="size-5 text-slate-400 dark:text-slate-500" />
														</div>

														<p className="font-semibold text-slate-600 text-xs dark:text-slate-300">
															No users found
														</p>

														<p className="text-slate-400 text-xs dark:text-slate-500">
															Try changing your search.
														</p>
													</div>
												</td>
											</tr>
										) : (
											filteredUsers.map((user) => (
												<tr
													className="border-slate-100 border-b transition-colors hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/30"
													key={user.id}
												>
													<td className="px-5 py-3.5">
														<div className="flex items-center gap-3">
															<div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 font-bold text-[#0757ff] text-xs dark:bg-blue-950/60 dark:text-blue-400">
																{user.name.charAt(0)}
															</div>

															<div>
																<div className="font-semibold text-[#102b55] dark:text-slate-100">
																	{user.name}
																</div>

																<div className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
																	ID #{user.id}
																</div>
															</div>
														</div>
													</td>

													<td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
														{user.phone}
													</td>

													<td className="px-5 py-3.5 text-slate-500 dark:text-slate-400">
														{user.email}
													</td>

													<td className="px-5 py-3.5">
														<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
															{user.role}
														</span>
													</td>

													<td className="px-5 py-3.5 font-medium text-slate-600 dark:text-slate-300">
														{user.team}
													</td>

													<td className="px-5 py-3.5">
														<span
															className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold text-[10px] ${
																user.status === "Active"
																	? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
																	: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
															}`}
														>
															<span
																className={`size-1.5 rounded-full ${
																	user.status === "Active"
																		? "bg-emerald-500"
																		: "bg-slate-400"
																}`}
															/>

															{user.status}
														</span>
													</td>

													<td className="px-5 py-3.5">
														<Button
															className="size-8 rounded-lg text-slate-400 transition-colors hover:bg-blue-50 hover:text-[#0757ff] dark:text-slate-500 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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

							{/* FOOTER */}
							<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-3.5 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
								<span className="text-slate-400 dark:text-slate-500">
									Showing{" "}
									<span className="font-semibold text-slate-600 dark:text-slate-300">
										{filteredUsers.length}
									</span>{" "}
									of{" "}
									<span className="font-semibold text-slate-600 dark:text-slate-300">
										{users.length}
									</span>{" "}
									users
								</span>

								<div className="flex items-center gap-1.5">
									<Button
										className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
										disabled
										size="sm"
										type="button"
										variant="outline"
									>
										Previous
									</Button>

									<Button
										className="!bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-8 min-w-8 rounded-lg px-2 font-medium text-[11px] shadow-blue-500/20 shadow-sm"
										size="sm"
										type="button"
									>
										1
									</Button>

									<Button
										className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
										disabled
										size="sm"
										type="button"
										variant="outline"
									>
										Next
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
