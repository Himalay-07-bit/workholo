// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";

import { ChevronLeft, ChevronRight, Phone, Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/scheduled-calls")({
	component: ScheduledCallsPage,
});

type ScheduledCall = {
	id: number;
	customer: string;
	callbackDate: string;
	assignedTo: string;
	status: string;
	campaign: string;
};

const scheduledCalls: ScheduledCall[] = [
	{
		id: 1,
		customer: "KANAGASABAI GUNASEKARAN(9500001434)",
		callbackDate: "2026-08-31 10:45:00",
		assignedTo: "CRLB Mahima",
		status: "Connected",
		campaign: "CRLB KC",
	},
	{
		id: 2,
		customer: "Bahadur Singh(7006596171)",
		callbackDate: "2026-08-31 10:45:00",
		assignedTo: "CRLB Mahima",
		status: "Connected",
		campaign: "CRLB KC",
	},
	{
		id: 3,
		customer: "MUKESH MISHRA(9234669084)",
		callbackDate: "2026-08-31 10:45:00",
		assignedTo: "CRLB Shalini",
		status: "Connected",
		campaign: "CRLB KC",
	},
	{
		id: 4,
		customer: "Arindam Naskar(9046043863)",
		callbackDate: "2026-08-31 10:45:00",
		assignedTo: "CRLB Shalini",
		status: "Connected",
		campaign: "CRLB KC",
	},
	{
		id: 5,
		customer: "Jayabrata Chakrabarti(7710082496)",
		callbackDate: "2026-08-31 10:45:00",
		assignedTo: "CRLB Shalini",
		status: "Connected",
		campaign: "CRLB KC",
	},
	{
		id: 6,
		customer: "KHALILUR RAHMAN(9435014968)",
		callbackDate: "2026-08-31 10:45:00",
		assignedTo: "CRLA Tasneem",
		status: "Connected",
		campaign: "CRLA KC",
	},
	{
		id: 7,
		customer: "R Sanjeev Ravichanthiran(9360984425)",
		callbackDate: "2026-08-31 10:45:00",
		assignedTo: "CRLB Shalini",
		status: "Connected",
		campaign: "CRLB KC",
	},
	{
		id: 8,
		customer: "rakesh singh(9810108308)",
		callbackDate: "2026-08-31 10:45:00",
		assignedTo: "CRLA Tasneem",
		status: "Connected",
		campaign: "CRLA KC",
	},
	{
		id: 9,
		customer: "Santosh Kumar(8000001496)",
		callbackDate: "2026-08-31 10:46:00",
		assignedTo: "CRLA Tasneem",
		status: "Connected",
		campaign: "CRLA KC",
	},
];

function ScheduledCallsPage() {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const [agent, setAgent] = useState("");
	const [dateRange, setDateRange] = useState("");
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const [number, setNumber] = useState("");
	const [customerName, setCustomerName] = useState("");
	const [assignedTo, setAssignedTo] = useState("");
	const [callbackDateTime, setCallbackDateTime] = useState("");
	const [duration, setDuration] = useState("10");
	const [note, setNote] = useState("");

	const filteredCalls = useMemo(() => {
		const searchValue = search.trim().toLowerCase();

		return scheduledCalls.filter((call) => {
			const matchesSearch =
				!searchValue ||
				`${call.customer} ${call.assignedTo} ${call.campaign} ${call.status}`
					.toLowerCase()
					.includes(searchValue);

			const matchesAgent = !agent || call.assignedTo === agent;

			return matchesSearch && matchesAgent;
		});
	}, [agent, search]);

	const totalPages = Math.max(1, Math.ceil(filteredCalls.length / pageSize));

	const safePage = Math.min(currentPage, totalPages);

	const startIndex = (safePage - 1) * pageSize;

	const visibleCalls = filteredCalls.slice(startIndex, startIndex + pageSize);

	const resetForm = () => {
		setNumber("");
		setCustomerName("");
		setAssignedTo("");
		setCallbackDateTime("");
		setDuration("10");
		setNote("");
	};

	const handleClose = () => {
		setIsDialogOpen(false);
		resetForm();
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		handleClose();
	};

	const resetFilters = () => {
		setAgent("");
		setDateRange("");
		setSearch("");
		setCurrentPage(1);
	};

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<div className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm lg:flex-row lg:items-center lg:justify-between dark:border-slate-800 dark:bg-[#0b1728]">
						<div>
							<div className="flex items-center gap-2">
								<h1 className="font-bold text-[#102b55] text-xl tracking-tight dark:text-slate-100">
									Scheduled Calls
								</h1>

								<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
									{scheduledCalls.length} CALLS
								</span>
							</div>

							<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
								Manage and schedule customer callback calls.
							</p>
						</div>

						<Button
							className="h-9 w-fit rounded-lg bg-[#0757ff] px-4 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
							onClick={() => setIsDialogOpen(true)}
							type="button"
						>
							<Phone className="mr-1.5 size-3.5" />
							Add Schedule Call
						</Button>
					</div>

					{/* MAIN CARD */}
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* FILTERS */}
						<div className="border-slate-100 border-b px-5 py-5 dark:border-slate-800">
							<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[250px_330px_auto]">
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="scheduled-agent"
									>
										Agent
									</label>

									<select
										className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs shadow-sm outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
										id="scheduled-agent"
										onChange={(event) => {
											setAgent(event.target.value);
											setCurrentPage(1);
										}}
										value={agent}
									>
										<option value="">Select Agent</option>
										<option value="CRLA Tasneem">CRLA Tasneem</option>
										<option value="CRLB Mahima">CRLB Mahima</option>
										<option value="CRLB Shalini">CRLB Shalini</option>
									</select>
								</div>

								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="scheduled-date-range"
									>
										Date Range
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
										id="scheduled-date-range"
										onChange={(event) => {
											setDateRange(event.target.value);
											setCurrentPage(1);
										}}
										placeholder="01-08-2026 00:00:00 to 31-08-2026 17:57:51"
										value={dateRange}
									/>
								</div>

								<div className="flex items-end gap-2">
									<Button
										className="h-9 rounded-lg bg-[#0757ff] px-4 text-xs shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
										onClick={() => setCurrentPage(1)}
										type="button"
									>
										<Search className="mr-1.5 size-3.5" />
										Search
									</Button>

									<Button
										className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
										onClick={resetFilters}
										type="button"
										variant="outline"
									>
										Reset
									</Button>

									<Button
										className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
										type="button"
										variant="outline"
									>
										Export
									</Button>
								</div>
							</div>
						</div>

						{/* TABLE CONTROLS */}
						<div className="flex flex-col gap-3 px-5 py-3.5 md:flex-row md:items-center md:justify-between">
							<div className="flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<span>Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs outline-none focus:border-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
									onChange={(event) => {
										setPageSize(Number(event.target.value));
										setCurrentPage(1);
									}}
									value={pageSize}
								>
									<option value={10}>10</option>
									<option value={25}>25</option>
									<option value={50}>50</option>
								</select>

								<span>entries</span>
							</div>

							<div className="relative">
								<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />

								<Input
									className="h-8 w-full rounded-lg border-slate-200 bg-white pl-8 text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 md:w-[240px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
									onChange={(event) => {
										setSearch(event.target.value);
										setCurrentPage(1);
									}}
									placeholder="Search calls..."
									value={search}
								/>
							</div>
						</div>

						{/* TABLE */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[1150px] border-collapse text-xs">
								<thead>
									<tr className="border-slate-100 border-y bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70">
										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											S.No.
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Customer
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Callback Date
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Assigned To
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Status
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Campaign
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleCalls.map((call) => (
										<tr
											className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/30"
											key={call.id}
										>
											<td className="px-4 py-3.5 font-medium text-slate-400 dark:text-slate-500">
												{startIndex + call.id}.
											</td>

											<td className="px-4 py-3.5">
												<div className="flex items-center gap-2">
													<span className="font-medium text-slate-700 dark:text-slate-200">
														{call.customer}
													</span>

													<Phone className="size-3.5 shrink-0 text-[#0757ff] dark:text-blue-400" />
												</div>
											</td>

											<td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">
												{call.callbackDate}
											</td>

											<td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">
												{call.assignedTo}
											</td>

											<td className="px-4 py-3.5">
												<span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-[10px] text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
													{call.status}
												</span>
											</td>

											<td className="px-4 py-3.5 text-slate-600 dark:text-slate-300">
												{call.campaign}
											</td>

											<td className="px-4 py-3.5">
												<select
													className="h-8 min-w-[125px] rounded-lg border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none hover:border-blue-200 focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800"
													defaultValue=""
												>
													<option disabled value="">
														Select Action
													</option>

													<option value="view">View</option>
													<option value="edit">Edit</option>
													<option value="delete">Delete</option>
												</select>
											</td>
										</tr>
									))}

									{visibleCalls.length === 0 ? (
										<tr>
											<td
												className="px-4 py-12 text-center text-slate-400 dark:text-slate-500"
												colSpan={7}
											>
												<Search className="mx-auto mb-2 size-7 text-slate-300 dark:text-slate-600" />

												<p className="font-medium text-slate-500 dark:text-slate-400">
													No scheduled calls found
												</p>
											</td>
										</tr>
									) : null}
								</tbody>
							</table>
						</div>

						{/* FOOTER */}
						<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-3.5 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<span className="text-slate-400 dark:text-slate-500">
								Showing{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredCalls.length === 0 ? 0 : startIndex + 1}
								</span>{" "}
								to{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{Math.min(startIndex + pageSize, filteredCalls.length)}
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredCalls.length}
								</span>{" "}
								entries
							</span>

							<div className="flex items-center gap-1.5">
								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() => setCurrentPage(1)}
									size="sm"
									type="button"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() =>
										setCurrentPage((page) => Math.max(1, page - 1))
									}
									size="sm"
									type="button"
									variant="outline"
								>
									<ChevronLeft className="mr-1 size-3.5" />
									Previous
								</Button>

								{Array.from(
									{ length: totalPages },
									(_, index) => index + 1
								).map((page) => (
									<Button
										className={
											page === safePage
												? "h-8 min-w-8 bg-[#0757ff] px-2 text-[11px] shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
												: "h-8 min-w-8 border-slate-200 px-2 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
										}
										key={page}
										onClick={() => setCurrentPage(page)}
										size="sm"
										type="button"
										variant={page === safePage ? "default" : "outline"}
									>
										{page}
									</Button>
								))}

								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === totalPages}
									onClick={() =>
										setCurrentPage((page) => Math.min(totalPages, page + 1))
									}
									size="sm"
									type="button"
									variant="outline"
								>
									Next
									<ChevronRight className="ml-1 size-3.5" />
								</Button>

								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === totalPages}
									onClick={() => setCurrentPage(totalPages)}
									size="sm"
									type="button"
									variant="outline"
								>
									Last
								</Button>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* SCHEDULE CALLS DIALOG */}
			{isDialogOpen ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
					<div className="w-full max-w-[520px] overflow-hidden rounded-md border border-white/70 bg-white shadow-2xl dark:border-slate-600 dark:bg-[#0b1728]">
						{/* Dialog Header */}
						<div className="flex items-center justify-between border-white/20 border-b bg-[#0757ff] px-4 py-3">
							<h2 className="font-semibold text-sm text-white">
								Schedule Calls
							</h2>

							<button
								aria-label="Close Schedule Calls dialog"
								className="text-white/90 transition-colors hover:text-white"
								onClick={handleClose}
								type="button"
							>
								<X className="size-4" />
							</button>
						</div>

						{/* Dialog Body */}
						<form className="px-7 py-7 md:px-9" onSubmit={handleSubmit}>
							<div className="space-y-6">
								{/* Enter Number */}
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="schedule-number"
									>
										Enter Number*
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-sm shadow-sm placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
										id="schedule-number"
										onChange={(event) => setNumber(event.target.value)}
										placeholder="Enter number"
										required
										value={number}
									/>
								</div>

								{/* Enter Name */}
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="schedule-name"
									>
										Enter Name
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-sm shadow-sm placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
										id="schedule-name"
										onChange={(event) => setCustomerName(event.target.value)}
										placeholder="Enter customer name"
										value={customerName}
									/>
								</div>

								{/* Assigned To */}
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="schedule-assigned-to"
									>
										Assigned To*
									</label>

									<select
										className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-sm shadow-sm outline-none focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
										id="schedule-assigned-to"
										onChange={(event) => setAssignedTo(event.target.value)}
										required
										value={assignedTo}
									>
										<option value="">Select an Option</option>
										<option value="CRLA Tasneem">CRLA Tasneem</option>
										<option value="CRLB Mahima">CRLB Mahima</option>
										<option value="CRLB Shalini">CRLB Shalini</option>
									</select>
								</div>

								{/* Callback Date Time */}
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="callback-date-time"
									>
										Callback Date Time*
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-sm shadow-sm focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
										id="callback-date-time"
										onChange={(event) =>
											setCallbackDateTime(event.target.value)
										}
										required
										type="datetime-local"
										value={callbackDateTime}
									/>
								</div>

								{/* Estimated Call Duration */}
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="estimated-duration"
									>
										Estimated Call Duration (in mins)*
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-sm shadow-sm focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
										id="estimated-duration"
										min="1"
										onChange={(event) => setDuration(event.target.value)}
										required
										type="number"
										value={duration}
									/>
								</div>

								{/* Note */}
								<div className="space-y-1.5">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="schedule-note"
									>
										Note
									</label>

									<textarea
										className="min-h-[80px] w-full resize-y rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 text-sm shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500"
										id="schedule-note"
										onChange={(event) => setNote(event.target.value)}
										placeholder="Enter note"
										value={note}
									/>
								</div>
							</div>

							{/* Dialog Actions */}
							<div className="mt-8 flex justify-end gap-2">
								<Button
									className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs shadow-sm hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
									onClick={handleClose}
									type="button"
									variant="outline"
								>
									Cancel
								</Button>

								<Button
									className="h-9 rounded-lg bg-[#0757ff] px-5 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									type="submit"
								>
									Submit
								</Button>
							</div>
						</form>
					</div>
				</div>
			) : null}
		</div>
	);
}
