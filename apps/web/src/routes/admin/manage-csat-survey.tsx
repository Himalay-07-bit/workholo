// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { Plus, Search } from "lucide-react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/manage-csat-survey")({
	component: ManageCsatSurveyPage,
});

function ManageCsatSurveyPage() {
	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* PAGE HEADER */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<div>
								<h1 className="font-bold text-[#102b55] text-base tracking-tight dark:text-white">
									CSAT Survey
								</h1>

								<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
									Manage customer satisfaction survey configurations.
								</p>
							</div>

							<Button className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500">
								<Plus className="mr-1.5 size-3.5" />
								Create CSAT Configuration
							</Button>
						</div>

						{/* CONTROLS */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<div className="flex items-center gap-2 text-xs">
								<span className="text-slate-500 dark:text-slate-400">Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs shadow-sm outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
									defaultValue="10"
								>
									<option value="10">10</option>
									<option value="25">25</option>
									<option value="50">50</option>
								</select>

								<span className="text-slate-500 dark:text-slate-400">
									entries
								</span>
							</div>

							<div className="relative">
								<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400" />

								<Input
									className="h-8 w-full rounded-lg border-slate-200 bg-white pl-8 text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 sm:w-[240px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
									placeholder="Search..."
								/>
							</div>
						</div>

						{/* TABLE */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[900px] border-collapse text-xs">
								<thead>
									<tr className="border-slate-100 border-y bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/60">
										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											S no.
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Name
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Description
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											No. of Questions
										</th>

										<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									<tr>
										<td
											className="px-5 py-14 text-center text-slate-400 dark:text-slate-500"
											colSpan={5}
										>
											<div className="flex flex-col items-center">
												<div className="mb-2 flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
													<Search className="size-5" />
												</div>

												<p className="font-medium text-slate-500 text-xs dark:text-slate-400">
													No data available in table
												</p>

												<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
													Create a CSAT configuration to get started.
												</p>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>

						{/* FOOTER */}
						<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<span className="text-slate-400 text-xs dark:text-slate-500">
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

							<div className="flex items-center gap-1.5">
								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									variant="outline"
								>
									Previous
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
									variant="outline"
								>
									Next
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 px-3 text-[11px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
									disabled
									size="sm"
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
