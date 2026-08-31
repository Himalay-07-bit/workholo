// biome-ignore-all lint/performance/noJsxPropsBind: Department controls use local UI actions.

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { Building2, Search } from "lucide-react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/departments")({
	component: DepartmentsPage,
});

function DepartmentsPage() {
	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* MAIN CARD */}
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* PAGE HEADER */}
						<div className="flex flex-col gap-4 border-slate-100 border-b px-5 py-4 md:flex-row md:items-center md:justify-between dark:border-slate-800">
							<div>
								<div className="flex items-center gap-2">
									<h1 className="font-bold text-[#102b55] text-xl tracking-tight dark:text-slate-100">
										Departments
									</h1>

									<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
										0 DEPARTMENTS
									</span>
								</div>

								<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
									Manage departments and call routing strategies.
								</p>
							</div>

							<div className="flex flex-wrap gap-2">
								<Button
									className="h-9 rounded-lg border-slate-200 px-3 text-slate-600 text-xs shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
									type="button"
									variant="outline"
								>
									Feature Codes
								</Button>

								<Link
									className={buttonVariants({
										className:
											"!rounded-lg !bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-9 px-4 font-medium text-xs shadow-blue-500/20 shadow-sm transition-colors",
									})}
									to="/admin/add-department"
								>
									Add Department
								</Link>
							</div>
						</div>

						{/* CALL ANSWERED FILTER */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<div>
								<p className="font-semibold text-[#263b5b] text-xs dark:text-slate-300">
									Calls Answered
								</p>

								<p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
									Select a period to view call statistics.
								</p>
							</div>

							<div className="flex flex-wrap items-center gap-1.5">
								<Button
									className="h-7 rounded-lg bg-blue-50 px-3 font-semibold text-[#0757ff] text-[10px] shadow-sm hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-950"
									size="sm"
									type="button"
								>
									1 Day
								</Button>

								<Button
									className="h-7 rounded-lg px-2.5 text-[10px] text-slate-500 hover:bg-slate-100 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
									size="sm"
									type="button"
									variant="ghost"
								>
									2 Days
								</Button>

								<Button
									className="h-7 rounded-lg px-2.5 text-[10px] text-slate-500 hover:bg-slate-100 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
									size="sm"
									type="button"
									variant="ghost"
								>
									4 Days
								</Button>

								<Button
									className="h-7 rounded-lg px-2.5 text-[10px] text-slate-500 hover:bg-slate-100 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
									size="sm"
									type="button"
									variant="ghost"
								>
									7 Days
								</Button>

								<Button
									className="h-7 rounded-lg px-2.5 text-[10px] text-slate-500 hover:bg-slate-100 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
									size="sm"
									type="button"
									variant="ghost"
								>
									10 Days
								</Button>

								<Button
									className="h-7 rounded-lg px-2.5 text-[10px] text-slate-500 hover:bg-slate-100 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
									size="sm"
									type="button"
									variant="ghost"
								>
									Refresh
								</Button>
							</div>
						</div>

						{/* TABLE CONTROLS */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-3.5 md:flex-row md:items-center md:justify-between dark:border-slate-800">
							<div className="flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<span>Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs shadow-sm outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
									defaultValue="10"
									id="department-page-size"
								>
									<option value="10">10</option>
									<option value="25">25</option>
									<option value="50">50</option>
								</select>

								<span>entries</span>
							</div>

							<div className="relative w-full md:w-[240px]">
								<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

								<Input
									className="h-8 w-full rounded-lg border-slate-200 bg-white pl-8 text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
									placeholder="Search departments..."
								/>
							</div>
						</div>

						{/* TABLE */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[1000px] border-collapse text-xs">
								<thead>
									<tr className="border-slate-100 border-y bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70">
										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											ID
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Name
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Description
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Strategy
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Calls Answered
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Calls Missed
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									<tr className="border-slate-100 border-b dark:border-slate-800">
										<td
											className="px-4 py-14 text-center text-slate-400 dark:text-slate-500"
											colSpan={7}
										>
											<div className="flex flex-col items-center gap-2">
												<div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
													<Building2 className="size-5 text-slate-400 dark:text-slate-500" />
												</div>

												<p className="font-semibold text-slate-500 text-xs dark:text-slate-400">
													No data available in table
												</p>

												<p className="text-[10px] text-slate-400 dark:text-slate-500">
													There are no departments to display.
												</p>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						{/* FOOTER */}
						<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-3.5 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<p className="text-slate-400 dark:text-slate-500">
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
							</p>

							<div className="flex items-center gap-1.5">
								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									type="button"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									type="button"
									variant="outline"
								>
									Previous
								</Button>

								<Button
									className="h-8 min-w-8 rounded-lg bg-[#0757ff] px-2 text-[11px] shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									size="sm"
									type="button"
								>
									1
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									type="button"
									variant="outline"
								>
									Next
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									type="button"
									variant="outline"
								>
									Last
								</Button>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
