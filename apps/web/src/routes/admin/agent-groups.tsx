import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import { MoreHorizontal, Plus, Search, UsersRound } from "lucide-react";
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
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 lg:p-6">
				<div className="mx-auto max-w-[1200px]">
					{/* =================================================
					    PAGE HEADER
					================================================= */}
					<div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-xl bg-[#0757ff] text-white shadow-blue-500/20 shadow-md dark:bg-blue-600 dark:shadow-blue-900/30">
								<UsersRound className="size-4" />
							</div>

							<div>
								<div className="flex items-center gap-2">
									<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-slate-100">
										Agent Groups
									</h1>

									<span className="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-[#0757ff] text-[9px] dark:bg-blue-950/60 dark:text-blue-400">
										ADMIN
									</span>
								</div>

								<p className="text-slate-500 text-xs dark:text-slate-400">
									Manage your teams and agent groups.
								</p>
							</div>
						</div>

						<Button className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-blue-500/20 shadow-md hover:bg-[#004be0] dark:bg-blue-600 dark:shadow-blue-900/30 dark:hover:bg-blue-500">
							<Plus className="mr-1.5 size-3.5" />
							Add New Team
						</Button>
					</div>

					{/* =================================================
					    MAIN CARD
					================================================= */}
					<Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<CardHeader className="border-slate-100 border-b bg-slate-50/60 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/50">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div>
									<CardTitle className="font-bold text-[#102b55] text-sm dark:text-slate-100">
										All Teams
									</CardTitle>

									<p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
										{teams.length} agent groups available
									</p>
								</div>

								<div className="relative w-full sm:w-64">
									<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white pl-9 text-slate-700 text-xs placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/10 dark:placeholder:text-slate-500"
										placeholder="Search teams..."
									/>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-5">
							{/* Entries info */}
							<div className="mb-3 flex items-center justify-between">
								<p className="text-[10px] text-slate-400 dark:text-slate-500">
									Show{" "}
									<span className="font-semibold text-[#102b55] dark:text-slate-200">
										{teams.length}
									</span>{" "}
									entries
								</p>
							</div>

							{/* =================================================
							    TABLE
							================================================= */}
							<div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
								<div className="overflow-x-auto">
									<table className="w-full min-w-[700px] text-xs">
										<thead>
											<tr className="border-slate-200 border-b bg-slate-50/80 dark:border-slate-700 dark:bg-slate-900/70">
												<th className="w-20 px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													ID
												</th>

												<th className="px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Team Name
												</th>

												<th className="px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Description
												</th>

												<th className="w-44 px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Action
												</th>
											</tr>
										</thead>

										<tbody>
											{teams.map((team) => (
												<tr
													className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/30"
													key={team.id}
												>
													<td className="px-4 py-3">
														<span className="font-mono font-semibold text-[10px] text-slate-400 dark:text-slate-500">
															#{String(team.id).padStart(2, "0")}
														</span>
													</td>

													<td className="px-4 py-3">
														<div className="flex items-center gap-2.5">
															<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-bold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
																{team.name.charAt(0).toUpperCase()}
															</div>

															<div>
																<p className="font-semibold text-[#263b5b] text-xs dark:text-slate-200">
																	{team.name}
																</p>

																<p className="mt-0.5 text-[9px] text-slate-400 dark:text-slate-500">
																	Agent Group
																</p>
															</div>
														</div>
													</td>

													<td className="px-4 py-3 text-[10px] text-slate-500 dark:text-slate-400">
														{team.description}
													</td>

													<td className="px-4 py-3">
														<Button
															className="h-8 rounded-lg border-slate-200 px-3 text-[10px] text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
															variant="outline"
														>
															<MoreHorizontal className="mr-1.5 size-3.5" />
															Select an Action
														</Button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							{/* =================================================
							    FOOTER / PAGINATION
							================================================= */}
							<div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<span className="text-[10px] text-slate-400 dark:text-slate-500">
									Showing{" "}
									<span className="font-semibold text-slate-600 dark:text-slate-300">
										1
									</span>{" "}
									to{" "}
									<span className="font-semibold text-slate-600 dark:text-slate-300">
										{teams.length}
									</span>{" "}
									of{" "}
									<span className="font-semibold text-slate-600 dark:text-slate-300">
										{teams.length}
									</span>{" "}
									entries
								</span>

								<div className="flex gap-1.5">
									<Button
										className="h-8 rounded-lg border-slate-200 px-3 text-[10px] text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500"
										disabled
										variant="outline"
									>
										Previous
									</Button>

									<Button className="h-8 min-w-8 rounded-lg bg-[#0757ff] px-2 text-[10px] hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500">
										1
									</Button>

									<Button
										className="h-8 rounded-lg border-slate-200 px-3 text-[10px] text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500"
										disabled
										variant="outline"
									>
										Next
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Security hint */}
					<p className="mt-3 text-center text-[9px] text-slate-400 dark:text-slate-500">
						Agent groups are managed securely from the admin panel.
					</p>
				</div>
			</main>
		</div>
	);
}
