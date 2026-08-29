// biome-ignore-all lint/performance/noJsxPropsBind: Copy controls need the row's call identifier.

import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@workholo/ui/components/badge";
import { Button } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import {
	ArrowUpRight,
	Copy,
	MoreHorizontal,
	Phone,
	Radio,
	ShieldCheck,
} from "lucide-react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/livecalls")({
	component: LiveCallsPage,
});

const liveCalls = [
	{
		id: "CALL-1001",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860196)",
		number: "+917965004859",
		destination: "7096644642",
		duration: "00:07:27",
		state: "Answered",
	},
	{
		id: "CALL-1002",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860204)",
		number: "+917965369371",
		destination: "9845097613",
		duration: "00:07:23",
		state: "Answered",
	},
	{
		id: "CALL-1003",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860195)",
		number: "+917965004859",
		destination: "9940508247",
		duration: "00:05:07",
		state: "Answered",
	},
	{
		id: "CALL-1004",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860201)",
		number: "+917965004859",
		destination: "9977220778",
		duration: "00:04:38",
		state: "Answered",
	},
	{
		id: "CALL-1005",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860176)",
		number: "+917965369372",
		destination: "9769951082",
		duration: "00:01:57",
		state: "Answered",
	},
	{
		id: "CALL-1006",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860164)",
		number: "+918064370287",
		destination: "7980914376",
		duration: "00:01:00",
		state: "Answered",
	},
	{
		id: "CALL-1007",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860167)",
		number: "+918064370287",
		destination: "9998631485",
		duration: "00:00:28",
		state: "Answered",
	},
];

function LiveCallsPage() {
	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-slate-950">
			<AdminTopbar />

			<main className="flex-1 p-5 lg:p-7">
				<div className="mx-auto max-w-7xl space-y-5">
					{/* =====================================================
					    PAGE HEADER
					===================================================== */}
					<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
						<div>
							<div className="mb-2 flex items-center gap-2">
								<span className="size-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />

								<span className="font-semibold text-[#0757ff] text-[10px] uppercase tracking-[0.12em] dark:text-blue-400">
									Real-time Monitoring
								</span>
							</div>

							<h1 className="font-bold text-2xl text-[#102b55] tracking-tight lg:text-3xl dark:text-white">
								Live Calls
							</h1>

							<p className="mt-1 text-slate-500 text-sm dark:text-slate-400">
								Monitor and manage currently active calls.
							</p>
						</div>

						{/* Active calls counter */}
						<div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
							<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950 dark:text-blue-400">
								<Phone className="size-4" />
							</div>

							<div>
								<p className="font-bold text-[#102b55] text-lg leading-none dark:text-white">
									{liveCalls.length}
								</p>

								<p className="mt-1 text-[9px] text-slate-400 dark:text-slate-500">
									Active Calls
								</p>
							</div>

							<div className="ml-1 h-8 w-px bg-slate-100 dark:bg-slate-800" />

							<div className="flex items-center gap-1.5">
								<span className="size-1.5 rounded-full bg-emerald-400" />

								<span className="font-medium text-[10px] text-emerald-600 dark:text-emerald-400">
									Live
								</span>
							</div>
						</div>
					</div>

					{/* =====================================================
					    MAIN CARD
					===================================================== */}
					<Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
						<CardHeader className="border-slate-100 border-b bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
							<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex items-center gap-3">
									<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950 dark:text-blue-400">
										<Radio className="size-4" />
									</div>

									<div>
										<CardTitle className="font-semibold text-[#102b55] text-sm dark:text-white">
											Active Call Sessions
										</CardTitle>

										<p className="mt-0.5 text-[10px] text-slate-400 dark:text-slate-500">
											{liveCalls.length} calls currently in progress
										</p>
									</div>
								</div>

								<div className="flex gap-2">
									<Button
										className="h-9 rounded-lg border-slate-200 text-slate-600 text-xs hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
										variant="outline"
									>
										Feature Codes
									</Button>

									<Button
										className="h-9 rounded-lg border-slate-200 text-slate-600 text-xs hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
										variant="outline"
									>
										More
										<MoreHorizontal className="ml-1.5 size-3.5" />
									</Button>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-0">
							<div className="overflow-x-auto">
								<table className="w-full min-w-[1100px] text-xs">
									{/* TABLE HEADER */}
									<thead>
										<tr className="border-slate-100 border-b bg-[#f8fbff] dark:border-slate-800 dark:bg-slate-950">
											<th className="px-5 py-3.5 text-left font-semibold text-slate-500 dark:text-slate-400">
												Call Direction
											</th>

											<th className="px-5 py-3.5 text-left font-semibold text-slate-500 dark:text-slate-400">
												Source
											</th>

											<th className="px-5 py-3.5 text-left font-semibold text-slate-500 dark:text-slate-400">
												Number
											</th>

											<th className="px-5 py-3.5 text-left font-semibold text-slate-500 dark:text-slate-400">
												Destination
											</th>

											<th className="px-5 py-3.5 text-left font-semibold text-slate-500 dark:text-slate-400">
												Duration
											</th>

											<th className="px-5 py-3.5 text-left font-semibold text-slate-500 dark:text-slate-400">
												State
											</th>

											<th className="px-5 py-3.5 text-left font-semibold text-slate-500 dark:text-slate-400">
												Action
											</th>
										</tr>
									</thead>

									{/* TABLE BODY */}
									<tbody>
										{liveCalls.map((call) => (
											<tr
												className="border-slate-100 border-b transition-colors last:border-0 hover:bg-[#f8fbff] dark:border-slate-800 dark:hover:bg-slate-800/50"
												key={call.id}
											>
												{/* Direction */}
												<td className="px-5 py-4">
													<div className="flex items-center gap-2.5">
														<div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950 dark:text-blue-400">
															<ArrowUpRight className="size-4" />
														</div>

														<div>
															<p className="font-semibold text-[#263b5b] text-xs dark:text-slate-200">
																{call.direction}
															</p>

															<p className="mt-0.5 text-[9px] text-slate-400 dark:text-slate-500">
																Outgoing call
															</p>
														</div>
													</div>
												</td>

												{/* Source */}
												<td className="max-w-[280px] px-5 py-4">
													<div className="flex items-center gap-2.5">
														<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
															<Radio className="size-3.5" />
														</div>

														<div className="min-w-0">
															<p className="truncate font-medium text-[#263b5b] text-xs dark:text-slate-200">
																{call.source}
															</p>

															<p className="mt-0.5 text-[9px] text-slate-400 dark:text-slate-500">
																Dialer Extension
															</p>
														</div>
													</div>
												</td>

												{/* Number */}
												<td className="px-5 py-4">
													<span className="font-medium text-[#263b5b] dark:text-slate-200">
														{call.number}
													</span>
												</td>

												{/* Destination */}
												<td className="px-5 py-4">
													<span className="font-medium text-[#263b5b] dark:text-slate-200">
														{call.destination}
													</span>
												</td>

												{/* Duration */}
												<td className="px-5 py-4">
													<div className="flex items-center gap-2">
														<span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />

														<span className="font-medium font-mono text-[#102b55] dark:text-slate-200">
															{call.duration}
														</span>
													</div>
												</td>

												{/* State */}
												<td className="px-5 py-4">
													<Badge
														className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-semibold text-[9px] text-emerald-600 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400"
														variant="secondary"
													>
														<span className="mr-1.5 inline-block size-1.5 rounded-full bg-emerald-400" />
														{call.state}
													</Badge>
												</td>

												{/* Actions */}
												<td className="px-5 py-4">
													<div className="flex min-w-[170px] flex-col gap-2">
														<button
															className="w-fit font-medium text-[10px] text-red-500 transition-colors hover:text-red-600 hover:underline dark:text-red-400 dark:hover:text-red-300"
															type="button"
														>
															Hangup
														</button>

														<button
															className="w-fit font-medium text-[#0757ff] text-[10px] transition-colors hover:text-[#004be0] hover:underline dark:text-blue-400 dark:hover:text-blue-300"
															type="button"
														>
															Listen / Whisper
														</button>

														<Button
															className="h-7 w-fit rounded-md border-blue-100 bg-blue-50 px-2.5 font-medium text-[#0757ff] text-[9px] hover:bg-blue-100 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-400 dark:hover:bg-blue-900"
															onClick={() =>
																navigator.clipboard.writeText(call.id)
															}
															size="sm"
															variant="secondary"
														>
															<Copy className="mr-1.5 size-3" />
															Copy Call-ID
														</Button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</CardContent>
					</Card>

					{/* =====================================================
					    FOOTER INFO
					===================================================== */}
					<div className="flex items-center justify-center gap-2 pb-2 text-[9px] text-slate-400 dark:text-slate-600">
						<ShieldCheck className="size-3.5 text-emerald-500" />

						<span>Live call data is securely monitored by WORKHOLO</span>
					</div>
				</div>
			</main>
		</div>
	);
}
