import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import { Clock3, Plus, Search, ShieldAlert, UserRound } from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/pending-users")({
	component: PendingUsersPage,
});

function PendingUsersPage() {
	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 lg:p-6">
				<div className="mx-auto max-w-[1400px]">
					{/* =================================================
					    PAGE HEADER
					================================================= */}
					<div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-xl bg-[#0757ff] text-white shadow-blue-500/20 shadow-md dark:bg-blue-600">
								<Clock3 className="size-4" />
							</div>

							<div>
								<div className="flex items-center gap-2">
									<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-slate-100">
										Pending Users
									</h1>

									<span className="rounded-full bg-amber-50 px-2 py-0.5 font-semibold text-[9px] text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
										PENDING
									</span>
								</div>

								<p className="text-slate-500 text-xs dark:text-slate-400">
									Manage users who are waiting for approval.
								</p>
							</div>
						</div>

						<Button className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-blue-500/20 shadow-md hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500">
							<Plus className="mr-1.5 size-3.5" />
							Add User
						</Button>
					</div>

					{/* =================================================
					    MAIN CARD
					================================================= */}
					<Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<CardHeader className="border-slate-100 border-b bg-slate-50/60 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/60">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex items-center gap-2.5">
									<div className="flex size-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
										<UserRound className="size-3.5" />
									</div>

									<div>
										<CardTitle className="font-bold text-[#102b55] text-sm dark:text-slate-100">
											Pending Users
										</CardTitle>

										<p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
											Users awaiting approval
										</p>
									</div>
								</div>

								<div className="relative w-full sm:w-64">
									<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white pl-9 text-slate-800 text-xs focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500 dark:placeholder:text-slate-500"
										placeholder="Search pending users..."
									/>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-5">
							{/* =================================================
							    TABLE CONTROLS
							================================================= */}
							<div className="mb-4 flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
								<span>Show</span>

								<select className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-[10px] text-slate-600 outline-none focus:border-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500">
									<option>10</option>
									<option>25</option>
									<option>50</option>
								</select>

								<span>entries</span>
							</div>

							{/* =================================================
							    TABLE
							================================================= */}
							<div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
								<div className="overflow-x-auto">
									<table className="w-full min-w-[1000px] text-xs">
										<thead>
											<tr className="border-slate-200 border-b bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/70">
												<th className="px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Name
												</th>

												<th className="px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Number
												</th>

												<th className="px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Email
												</th>

												<th className="px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Agent
												</th>

												<th className="px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Agent Extension
												</th>

												<th className="px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Web Login
												</th>

												<th className="px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Status
												</th>

												<th className="px-4 py-3 text-left font-semibold text-[#263b5b] text-[10px] dark:text-slate-300">
													Action
												</th>
											</tr>
										</thead>

										<tbody>
											<tr className="dark:border-slate-800">
												<td className="h-36 px-4 text-center" colSpan={8}>
													<div className="flex flex-col items-center justify-center">
														<div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500">
															<Clock3 className="size-5" />
														</div>

														<p className="font-semibold text-[#263b5b] text-xs dark:text-slate-200">
															No pending users
														</p>

														<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
															No data available in table
														</p>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>

							{/* =================================================
							    TABLE FOOTER
							================================================= */}
							<div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<span className="text-[10px] text-slate-400 dark:text-slate-500">
									Showing{" "}
									<span className="font-semibold text-slate-600 dark:text-slate-300">
										0
									</span>{" "}
									to{" "}
									<span className="font-semibold text-slate-600 dark:text-slate-300">
										0
									</span>{" "}
									of{" "}
									<span className="font-semibold text-slate-600 dark:text-slate-300">
										0
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

									<Button
										className="h-8 rounded-lg border-slate-200 px-3 text-[10px] text-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500"
										disabled
										variant="outline"
									>
										Next
									</Button>
								</div>
							</div>

							{/* =================================================
							    NOTE
							================================================= */}
							<div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-100 bg-amber-50/60 px-4 py-3 dark:border-amber-900/50 dark:bg-amber-950/30">
								<ShieldAlert className="mt-0.5 size-4 shrink-0 text-amber-500 dark:text-amber-400" />

								<p className="text-[10px] text-amber-700 leading-5 dark:text-amber-300">
									<span className="font-bold">Note:</span> Rejected users will
									be deleted automatically after 30 days.
								</p>
							</div>
						</CardContent>
					</Card>

					{/* Footer hint */}
					<p className="mt-3 text-center text-[9px] text-slate-400 dark:text-slate-500">
						Pending user access is securely managed from the admin panel.
					</p>
				</div>
			</main>
		</div>
	);
}
