// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";

import { useState } from "react";

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

	const [number, setNumber] = useState("");
	const [customerName, setCustomerName] = useState("");
	const [assignedTo, setAssignedTo] = useState("");
	const [callbackDateTime, setCallbackDateTime] = useState("");
	const [duration, setDuration] = useState("10");
	const [note, setNote] = useState("");

	const filteredCalls = scheduledCalls.filter((call) => {
		const searchValue = search.trim().toLowerCase();

		if (!searchValue) {
			return true;
		}

		return `${call.customer} ${call.assignedTo} ${call.campaign} ${call.status}`
			.toLowerCase()
			.includes(searchValue);
	});

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

		// UI only for now.
		handleClose();
	};

	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="flex items-center justify-between border-b px-4 py-3">
						<h1 className="font-medium text-lg">Scheduled Calls</h1>

						<Button onClick={() => setIsDialogOpen(true)} type="button">
							Add Schedule Call
						</Button>
					</div>

					{/* Filters */}
					<div className="flex flex-col gap-4 px-4 py-5 xl:flex-row xl:items-end">
						<div className="flex flex-col gap-2">
							<label
								className="text-muted-foreground text-sm"
								htmlFor="scheduled-agent"
							>
								Agent
							</label>

							<select
								className="h-10 w-[330px] rounded-none border-0 border-slate-200 border-b bg-transparent px-0 text-sm outline-none focus:border-[#0757ff] dark:border-slate-700"
								id="scheduled-agent"
								onChange={(event) => setAgent(event.target.value)}
								value={agent}
							>
								<option value="">Select Agent</option>
								<option value="CRLA Tasneem">CRLA Tasneem</option>
								<option value="CRLB Mahima">CRLB Mahima</option>
								<option value="CRLB Shalini">CRLB Shalini</option>
							</select>
						</div>

						<div className="flex flex-col gap-2">
							<label
								className="text-muted-foreground text-sm"
								htmlFor="scheduled-date-range"
							>
								Date Range
							</label>

							<Input
								className="w-[330px]"
								id="scheduled-date-range"
								onChange={(event) => setDateRange(event.target.value)}
								placeholder="01-08-2026 00:00:00 to 31-08-2026 17:57:51"
								value={dateRange}
							/>
						</div>

						<div className="flex gap-2">
							<Button type="button">Search</Button>

							<Button
								onClick={() => {
									setAgent("");
									setDateRange("");
									setSearch("");
								}}
								type="button"
								variant="outline"
							>
								Reset
							</Button>

							<Button type="button" variant="outline">
								Export
							</Button>
						</div>
					</div>

					{/* Table controls */}
					<div className="flex items-center justify-between border-t px-4 py-4 text-sm">
						<div className="flex items-center gap-2">
							<span>Show</span>

							<select
								className="h-8 rounded-md border bg-background px-2"
								defaultValue="10"
							>
								<option value="10">10</option>
								<option value="25">25</option>
								<option value="50">50</option>
							</select>

							<span>entries</span>
						</div>

						<div className="flex items-center gap-2">
							<span>Search:</span>

							<Input
								className="w-[220px]"
								onChange={(event) => setSearch(event.target.value)}
								value={search}
							/>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto px-4">
						<table className="w-full min-w-[1250px] border-collapse text-sm">
							<thead>
								<tr className="border-y bg-muted/40">
									<th className="px-3 py-3 text-left font-medium">S.No.</th>

									<th className="px-3 py-3 text-left font-medium">Customer</th>

									<th className="px-3 py-3 text-left font-medium">
										Callback Date
									</th>

									<th className="px-3 py-3 text-left font-medium">
										Assigned To
									</th>

									<th className="px-3 py-3 text-left font-medium">Status</th>

									<th className="px-3 py-3 text-left font-medium">Campaign</th>

									<th className="px-3 py-3 text-left font-medium">Action</th>
								</tr>
							</thead>

							<tbody>
								{filteredCalls.map((call) => (
									<tr className="border-b hover:bg-muted/20" key={call.id}>
										<td className="px-3 py-3">{call.id}</td>

										<td className="px-3 py-3">
											<span>{call.customer}</span>
											<span className="ml-2 text-blue-600">☎</span>
										</td>

										<td className="px-3 py-3">{call.callbackDate}</td>

										<td className="px-3 py-3">{call.assignedTo}</td>

										<td className="px-3 py-3">{call.status}</td>

										<td className="px-3 py-3">{call.campaign}</td>

										<td className="px-3 py-3">-</td>
									</tr>
								))}

								{filteredCalls.length === 0 && (
									<tr>
										<td
											className="px-4 py-10 text-center text-muted-foreground"
											colSpan={7}
										>
											No data available in table
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Footer */}
					<div className="flex items-center justify-between border-t px-4 py-4 text-sm">
						<span className="text-muted-foreground">
							Showing 1 to {filteredCalls.length} of {filteredCalls.length}{" "}
							entries
						</span>

						<div className="flex items-center gap-1">
							<Button disabled size="sm" variant="outline">
								First
							</Button>

							<Button disabled size="sm" variant="outline">
								Previous
							</Button>

							<Button size="sm">1</Button>

							<Button disabled size="sm" variant="outline">
								Next
							</Button>

							<Button disabled size="sm" variant="outline">
								Last
							</Button>
						</div>
					</div>
				</section>
			</main>

			{/* Add Schedule Call Dialog */}
			{isDialogOpen ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
					<div
						aria-modal="true"
						className="w-full max-w-[520px] overflow-hidden bg-background shadow-xl"
						role="dialog"
					>
						{/* Dialog header */}
						<div className="flex items-center justify-between bg-[#0645d8] px-4 py-3 text-white">
							<h2 className="font-medium">Schedule Calls</h2>

							<button
								aria-label="Close"
								className="text-xl leading-none hover:opacity-80"
								onClick={handleClose}
								type="button"
							>
								×
							</button>
						</div>

						{/* Dialog form */}
						<form className="space-y-5 px-5 py-6" onSubmit={handleSubmit}>
							<ModalField htmlFor="schedule-number" label="Enter Number*">
								<Input
									autoFocus
									className="h-10 rounded-none border-0 border-blue-600 border-b bg-transparent px-0 shadow-none focus-visible:ring-0"
									id="schedule-number"
									onChange={(event) => setNumber(event.target.value)}
									required
									value={number}
								/>
							</ModalField>

							<ModalField htmlFor="schedule-name" label="Enter name">
								<Input
									className="h-10 rounded-none border-0 border-blue-600 border-b bg-transparent px-0 shadow-none focus-visible:ring-0"
									id="schedule-name"
									onChange={(event) => setCustomerName(event.target.value)}
									value={customerName}
								/>
							</ModalField>

							<ModalField htmlFor="schedule-assigned-to" label="Assigned To*">
								<select
									className="h-10 w-full rounded-none border-0 border-blue-600 border-b bg-transparent px-0 text-sm outline-none"
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
							</ModalField>

							<ModalField
								htmlFor="callback-date-time"
								label="Callback Date Time*"
							>
								<Input
									className="h-10 rounded-none border-0 border-blue-600 border-b bg-transparent px-0 shadow-none focus-visible:ring-0"
									id="callback-date-time"
									onChange={(event) => setCallbackDateTime(event.target.value)}
									required
									type="datetime-local"
									value={callbackDateTime}
								/>
							</ModalField>

							<ModalField
								htmlFor="estimated-duration"
								label="Estimated Call Duration(in mins)*"
							>
								<Input
									className="h-10 rounded-none border-0 border-blue-600 border-b bg-transparent px-0 shadow-none focus-visible:ring-0"
									id="estimated-duration"
									min="1"
									onChange={(event) => setDuration(event.target.value)}
									required
									type="number"
									value={duration}
								/>
							</ModalField>

							<ModalField htmlFor="schedule-note" label="Note">
								<textarea
									className="min-h-16 w-full resize-y rounded-none border-0 border-blue-600 border-b bg-transparent px-0 py-2 text-sm outline-none"
									id="schedule-note"
									onChange={(event) => setNote(event.target.value)}
									value={note}
								/>
							</ModalField>

							{/* Buttons */}
							<div className="flex gap-2 pt-2">
								<Button type="submit">Save</Button>

								<Button onClick={handleClose} type="button" variant="outline">
									Close
								</Button>
							</div>
						</form>
					</div>
				</div>
			) : null}
		</div>
	);
}

function ModalField({
	children,
	label,
	htmlFor,
}: {
	children: React.ReactNode;
	label: string;
	htmlFor: string;
}) {
	return (
		<div className="space-y-1">
			<label className="text-muted-foreground text-xs" htmlFor={htmlFor}>
				{label}
			</label>

			{children}
		</div>
	);
}
