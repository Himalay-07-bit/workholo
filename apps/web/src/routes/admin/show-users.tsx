// biome-ignore-all lint/performance/noJsxPropsBind: The action uses the route-local navigator.
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Badge } from "@workholo/ui/components/badge";
import { Button } from "@workholo/ui/components/button";
import { Card, CardContent } from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import {
	CheckCircle2,
	MoreHorizontal,
	Plus,
	Search,
	Users,
} from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";

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
		<div className="min-h-svh bg-[#eef3f9] text-slate-900 dark:bg-[#0b1220] dark:text-slate-100">
			<AdminTopbar />

			{/* =====================================================
			    PAGE HEADER
			===================================================== */}
			<header className="border-slate-200 border-b bg-white dark:border-slate-800 dark:bg-[#111a2b]">
				<div className="flex items-center justify-between gap-4 px-5 py-4 lg:px-7">
					<div className="flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-xl bg-[#0757ff] text-white shadow-blue-500/20 shadow-md">
							<Users className="size-4" />
						</div>

						<div>
							<div className="flex items-center gap-2">
								<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-white">
									Users
								</h1>

								<span className="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-[#0757ff] text-[9px] dark:bg-blue-500/10 dark:text-blue-400">
									ADMIN
								</span>
							</div>

							<p className="text-slate-500 text-xs dark:text-slate-400">
								Manage users and their calling access.
							</p>
						</div>
					</div>

					<Button
						className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-blue-500/20 shadow-md hover:bg-[#004be0]"
						onClick={() =>
							navigate({
								to: "/admin/add-new-user",
							})
						}
					>
						<Plus className="mr-1.5 size-3.5" />
						Add User
					</Button>
				</div>
			</header>

			{/* =====================================================
			    MAIN
			===================================================== */}
			<main className="p-4 lg:p-6">
				<div className="mx-auto max-w-[1500px]">
					<Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#111a2b]">
						<CardContent className="p-5 lg:p-6">
							{/* =================================================
							    SUMMARY
							================================================= */}
							<div className="mb-5 grid gap-3 sm:grid-cols-3">
								<SummaryCard
									icon={<Users className="size-4" />}
									label="Calling Agents"
									value="23/23"
								/>

								<SummaryCard
									icon={<CheckCircle2 className="size-4" />}
									label="Interactions License"
									value="0/0"
								/>

								<SummaryCard
									icon={<Users className="size-4" />}
									label="Supervisors"
									value="0/0"
								/>
							</div>

							{/* =================================================
							    TOOLBAR
							================================================= */}
							<div className="mb-4 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
								<div className="flex flex-wrap gap-2">
									<Button
										className="h-9 rounded-lg border-blue-200 bg-blue-50 px-3 text-[#0757ff] text-[10px] hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20"
										variant="outline"
									>
										All Roles
									</Button>

									<Button
										className="h-9 rounded-lg border-slate-200 px-3 text-[10px] text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-[#0b1220] dark:text-slate-400 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
										variant="outline"
									>
										Extension Status
									</Button>

									<Button
										className="h-9 rounded-lg border-slate-200 px-3 text-[10px] text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-[#0b1220] dark:text-slate-400 dark:hover:border-blue-500/40 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
										variant="outline"
									>
										More Actions
									</Button>
								</div>

								<div className="relative w-full xl:w-72">
									<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400" />

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white pl-9 text-xs focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-[#0b1220] dark:text-slate-200 dark:placeholder:text-slate-500"
										placeholder="Search users..."
									/>
								</div>
							</div>

							{/* =================================================
							    TABLE
							================================================= */}
							<div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
								<div className="overflow-x-auto">
									<table className="w-full min-w-[1050px]">
										<thead>
											<tr className="border-slate-200 border-b bg-slate-50/80 hover:bg-slate-50/80 dark:border-slate-800 dark:bg-[#0d1627] dark:hover:bg-[#0d1627]">
												<th className="h-10 px-4 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Name
												</th>

												<th className="h-10 px-4 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Call Forward Number
												</th>

												<th className="h-10 px-4 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Email
												</th>

												<th className="h-10 px-4 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Agent
												</th>

												<th className="h-10 px-4 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Agent Extension
												</th>

												<th className="h-10 px-4 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Web Login
												</th>

												<th className="h-10 px-4 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Calling Agent
												</th>

												<th className="h-10 px-4 text-right font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Action
												</th>
											</tr>
										</thead>

										<tbody>
											{users.map((user) => (
												<tr
													className="border-slate-100 border-b transition-colors hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-500/5"
													key={user.name}
												>
													<td className="px-4 py-3">
														<div className="flex items-center gap-2.5">
															<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 font-bold text-[#0757ff] text-[10px] dark:bg-blue-500/10 dark:text-blue-400">
																{user.name.split(" ").at(-1)?.charAt(0)}
															</div>

															<div>
																<p className="font-semibold text-[#263b5b] text-xs dark:text-slate-200">
																	{user.name}
																</p>

																<Badge
																	className="mt-1 border-blue-100 bg-blue-50 px-1.5 py-0 text-[#0757ff] text-[8px] dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400"
																	variant="outline"
																>
																	Login Based Calling
																</Badge>
															</div>
														</div>
													</td>

													<td className="px-4 py-3 font-mono text-[10px] text-slate-600 dark:text-slate-400">
														{user.phone}
													</td>

													<td className="px-4 py-3 text-[10px] text-slate-600 dark:text-slate-400">
														{user.email}
													</td>

													<td className="px-4 py-3">
														<Status value={user.agent} />
													</td>

													<td className="px-4 py-3">
														<Status value={user.extension} />
													</td>

													<td className="px-4 py-3">
														<Badge className="border-emerald-200 bg-emerald-50 px-2 py-0.5 font-semibold text-[9px] text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
															<span className="mr-1 size-1.5 rounded-full bg-emerald-500" />
															{user.webLogin}
														</Badge>
													</td>

													<td className="px-4 py-3">
														<Status value={user.callingAgent} />
													</td>

													<td className="px-4 py-3 text-right">
														<Button
															className="size-8 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-[#0757ff] dark:text-slate-500 dark:hover:bg-blue-500/10 dark:hover:text-blue-400"
															size="icon"
															title="Actions"
															variant="ghost"
														>
															<MoreHorizontal className="size-4" />
														</Button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							{/* =================================================
							    FOOTER
							================================================= */}
							<div className="mt-3 flex items-center justify-between text-[9px] text-slate-400 dark:text-slate-500">
								<span>Showing {users.length} users</span>

								<span>All user access is managed from the admin panel.</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}

/* =====================================================
   SUMMARY CARD
===================================================== */

function SummaryCard({
	label,
	value,
	icon,
}: {
	label: string;
	value: string;
	icon: React.ReactNode;
}) {
	return (
		<div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3 dark:border-slate-800 dark:bg-[#0d1627]">
			<div>
				<p className="font-medium text-[9px] text-slate-500 uppercase tracking-wide dark:text-slate-500">
					{label}
				</p>

				<p className="mt-1 font-bold text-[#102b55] text-lg dark:text-white">
					{value}
				</p>
			</div>

			<div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-500/10 dark:text-blue-400">
				{icon}
			</div>
		</div>
	);
}

/* =====================================================
   STATUS
===================================================== */

function Status({ value }: { value: string }) {
	const active = value === "Yes";

	return (
		<span
			className={[
				"inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold text-[9px]",
				active
					? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
					: "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500",
			].join(" ")}
		>
			<span
				className={[
					"size-1.5 rounded-full",
					active ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600",
				].join(" ")}
			/>

			{value}
		</span>
	);
}
