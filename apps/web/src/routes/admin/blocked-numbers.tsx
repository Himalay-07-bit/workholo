// biome-ignore-all lint/performance/noJsxPropsBind: Table actions use local UI controls.

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import { ArrowLeft, Ban, Plus, Search } from "lucide-react";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/blocked-numbers")({
	component: BlockedNumbersPage,
});

const blockedNumbers = [
	{
		callerId: "+916290966136",
		blockedAgainst: "DID",
		numbers: "+91806214610, +917965267794, +918062366936",
	},
	{
		callerId: "+916379177223",
		blockedAgainst: "DID",
		numbers: "+91806214610, +917965267835, +917965267836",
	},
	{
		callerId: "+917042943323",
		blockedAgainst: "Account",
		numbers: "—",
	},
];

function BlockedNumbersPage() {
	const [search, setSearch] = useState("");

	const filteredNumbers = blockedNumbers.filter((item) => {
		const value = search.trim().toLowerCase();

		return (
			item.callerId.toLowerCase().includes(value) ||
			item.blockedAgainst.toLowerCase().includes(value) ||
			item.numbers.toLowerCase().includes(value)
		);
	});

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<div className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-[#0b1728]">
						<div className="flex items-center gap-3">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400">
								<Ban className="size-5" />
							</div>

							<div>
								<div className="flex items-center gap-2">
									<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-slate-100">
										Blocked Numbers
									</h1>

									<span className="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-[#0757ff] text-[9px] dark:bg-blue-950/50 dark:text-blue-400">
										{blockedNumbers.length} BLOCKED
									</span>
								</div>

								<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
									Manage numbers that are blocked from calling.
								</p>
							</div>
						</div>

						{/* PRIMARY BUTTON */}
						<Link
							className={buttonVariants({
								className:
									"!rounded-lg !bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-9 w-fit px-4 font-medium text-xs shadow-blue-500/20 shadow-sm transition-colors",
							})}
							to="/admin/block-calls"
						>
							<Plus className="mr-1.5 size-4" />
							Block a Number
						</Link>
					</div>

					{/* MAIN CARD */}
					<Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<CardHeader className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
								<div>
									<CardTitle className="font-semibold text-[#102b55] text-sm dark:text-slate-100">
										Blocked Numbers
									</CardTitle>

									<p className="mt-1 text-slate-400 text-xs dark:text-slate-500">
										{filteredNumbers.length} number
										{filteredNumbers.length === 1 ? "" : "s"} found
									</p>
								</div>

								<div className="flex flex-col gap-2 sm:flex-row">
									{/* SEARCH */}
									<div className="relative w-full sm:w-[260px]">
										<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

										<Input
											className="h-9 rounded-lg border-slate-200 bg-white pl-9 text-slate-700 text-xs shadow-sm placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:placeholder:text-slate-500"
											onChange={(event) => setSearch(event.target.value)}
											placeholder="Search blocked numbers..."
											value={search}
										/>
									</div>

									{/* BACK BUTTON */}
									<Link
										className={buttonVariants({
											variant: "outline",
											className:
												"h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-600 text-xs shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-400",
										})}
										to="/admin/manage-did-numbers"
									>
										<ArrowLeft className="mr-1.5 size-3.5" />
										Back
									</Link>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-0">
							{/* TABLE */}
							<div className="overflow-x-auto">
								<table className="w-full min-w-[850px] border-collapse text-xs">
									<thead>
										<tr className="border-slate-100 border-b bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70">
											<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
												Caller ID
											</th>

											<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
												Blocked Against
											</th>

											<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
												Number
											</th>

											<th className="px-5 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
												Actions
											</th>
										</tr>
									</thead>

									<tbody>
										{filteredNumbers.length === 0 ? (
											<tr>
												<td className="px-5 py-12 text-center" colSpan={4}>
													<div className="flex flex-col items-center gap-2">
														<div className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
															<Ban className="size-5 text-slate-400 dark:text-slate-500" />
														</div>

														<p className="font-semibold text-slate-600 text-sm dark:text-slate-300">
															No blocked numbers found
														</p>

														<p className="text-slate-400 text-xs dark:text-slate-500">
															Try changing your search.
														</p>
													</div>
												</td>
											</tr>
										) : (
											filteredNumbers.map((item) => (
												<tr
													className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/20"
													key={item.callerId}
												>
													{/* CALLER ID */}
													<td className="px-5 py-4">
														<div className="flex items-center gap-2.5">
															<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400">
																<Ban className="size-3.5" />
															</div>

															<span className="font-medium text-[#263b5b] text-xs dark:text-slate-200">
																{item.callerId}
															</span>
														</div>
													</td>

													{/* BLOCKED AGAINST */}
													<td className="px-5 py-4">
														<span className="inline-flex rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/50 dark:text-blue-400">
															{item.blockedAgainst}
														</span>
													</td>

													{/* NUMBERS */}
													<td className="max-w-md px-5 py-4">
														<span className="break-all font-mono text-[10px] text-slate-500 dark:text-slate-400">
															{item.numbers}
														</span>
													</td>

													{/* ACTION BUTTON */}
													<td className="px-5 py-4">
														<Button
															className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[10px] text-slate-600 shadow-sm transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
															size="sm"
															type="button"
															variant="outline"
														>
															Select an Action
														</Button>
													</td>
												</tr>
											))
										)}
									</tbody>
								</table>
							</div>

							{/* FOOTER */}
							<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
								<span className="text-slate-400 text-xs dark:text-slate-500">
									Showing{" "}
									<span className="font-semibold text-slate-600 dark:text-slate-300">
										{filteredNumbers.length}
									</span>{" "}
									of{" "}
									<span className="font-semibold text-slate-600 dark:text-slate-300">
										{blockedNumbers.length}
									</span>{" "}
									entries
								</span>

								<div className="flex items-center gap-1.5">
									{/* PREVIOUS */}
									<Button
										className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[10px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
										disabled
										size="sm"
										type="button"
										variant="outline"
									>
										Previous
									</Button>

									{/* ACTIVE PAGE */}
									<Button
										className="!bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-8 min-w-8 rounded-lg px-2 font-medium text-[10px] shadow-blue-500/20 shadow-sm"
										size="sm"
										type="button"
									>
										1
									</Button>

									{/* NEXT */}
									<Button
										className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[10px] text-slate-500 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
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
