// biome-ignore-all lint/performance/noJsxPropsBind: Table controls use local component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";

import {
	ChevronLeft,
	ChevronRight,
	MessageSquareText,
	Plus,
	Search,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/sms-templates")({
	component: SmsTemplatesPage,
});

type Template = {
	id: number;
	name: string;
	message: string;
	type: string;
	templateStatus: string;
	reason: string;
	status: "Enabled" | "Disabled";
};

const templates: Template[] = [
	{
		id: 263_327,
		name: "Template 1",
		message:
			"You missed a call from {caller_no} in department {department_name}.",
		type: "INCOMING MISSED CALL (TO AGENT)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_328,
		name: "Template 2",
		message:
			"Thank you for calling. Sorry! we missed your call, we will get back to you soon.",
		type: "INCOMING MISSED CALL (TO CALLER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_329,
		name: "Template 3",
		message:
			"A call was missed from {caller_no} in department {department_name}.",
		type: "INCOMING DEPARTMENT MISSED CALL (TO ALL AGENTS)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_330,
		name: "Template 4",
		message: "You got a call from {caller_no} in department {department_name}.",
		type: "INCOMING ANSWERED CALL (TO AGENT)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_331,
		name: "Template 5",
		message: "Thank you for calling. You just spoke with {agent_name}.",
		type: "INCOMING ANSWERED CALL (TO CALLER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_332,
		name: "Template 6",
		message: "Hi, A call from {caller_no} was answered on IVR and hangup.",
		type: "INCOMING ANSWERED ON IVR (TO CALLER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_333,
		name: "Template 7",
		message:
			"Hi, A call from {caller_no} was answered on Auto Attendant and hangup.",
		type: "INCOMING ANSWERED ON AUTO-ATTENDANT (TO CALLER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_334,
		name: "Template 8",
		message: "Thank you for calling. We will get in touch with you soon.",
		type: "IVR OPTION (TO CALLER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_335,
		name: "Template 9",
		message: "You missed a call from {caller_no}.",
		type: "BROADCAST MISSED CALL (TO LEAD NUMBER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
	{
		id: 263_336,
		name: "Template 10",
		message: "You answered a call from {caller_no}.",
		type: "BROADCAST ANSWERED CALL (TO LEAD NUMBER)",
		templateStatus: "Approved",
		reason: "—",
		status: "Enabled",
	},
];

function SmsTemplatesPage() {
	const navigate = useNavigate();

	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredTemplates = useMemo(() => {
		const searchValue = search.trim().toLowerCase();

		if (!searchValue) {
			return templates;
		}

		return templates.filter((template) =>
			`${template.id} ${template.name} ${template.message} ${template.type} ${template.templateStatus} ${template.status}`
				.toLowerCase()
				.includes(searchValue)
		);
	}, [search]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredTemplates.length / pageSize)
	);

	const safePage = Math.min(currentPage, totalPages);

	const startIndex = (safePage - 1) * pageSize;

	const visibleTemplates = filteredTemplates.slice(
		startIndex,
		startIndex + pageSize
	);

	const enabledCount = templates.filter(
		(template) => template.status === "Enabled"
	).length;

	const approvedCount = templates.filter(
		(template) => template.templateStatus === "Approved"
	).length;

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<div className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm lg:flex-row lg:items-center lg:justify-between dark:border-slate-800 dark:bg-[#0b1728]">
						<div>
							<div className="flex flex-wrap items-center gap-2">
								<h1 className="font-bold text-[#102b55] text-xl tracking-tight dark:text-slate-100">
									Template Management
								</h1>

								<span className="rounded-full bg-blue-50 px-2.5 py-1 font-semibold text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
									{templates.length} TEMPLATES
								</span>
							</div>

							<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
								Setup SMS/Email templates against the respective services.
							</p>
						</div>

						<Button
							className="!bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-9 w-fit rounded-lg px-4 font-medium text-xs shadow-blue-500/20 shadow-sm transition-colors"
							onClick={() =>
								navigate({
									to: "/admin/add-sms-templates",
								})
							}
							type="button"
						>
							<Plus className="mr-1.5 size-4" />
							Add Template
						</Button>
					</div>

					{/* SUMMARY */}
					<div className="mb-4 grid gap-3 sm:grid-cols-3">
						{/* TOTAL */}
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
									<MessageSquareText className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Total Templates
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{templates.length}
									</p>
								</div>
							</div>
						</div>

						{/* APPROVED */}
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
									<MessageSquareText className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Approved
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{approvedCount}
									</p>
								</div>
							</div>
						</div>

						{/* ENABLED */}
						<div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
									<MessageSquareText className="size-4" />
								</div>

								<div>
									<p className="font-semibold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
										Enabled
									</p>

									<p className="font-bold text-[#102b55] text-lg dark:text-slate-100">
										{enabledCount}
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* MAIN CARD */}
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* TABLE CONTROLS */}
						<div className="flex flex-col gap-3 border-slate-100 border-b px-5 py-4 md:flex-row md:items-center md:justify-between dark:border-slate-800">
							<div className="flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<span>Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
									id="template-page-size"
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
									className="h-8 w-full rounded-lg border-slate-200 bg-white pl-8 text-xs shadow-sm focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 md:w-[260px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
									id="template-search"
									onChange={(event) => {
										setSearch(event.target.value);
										setCurrentPage(1);
									}}
									placeholder="Search templates..."
									value={search}
								/>
							</div>
						</div>

						{/* TABLE */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[1250px] border-collapse text-xs">
								<thead>
									<tr className="border-slate-100 border-y bg-slate-50/70 dark:border-slate-800 dark:bg-slate-900/70">
										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Template ID
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Template Name
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Template Message
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Template Type
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Template Status
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Reason
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Status
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleTemplates.map((template) => (
										<tr
											className="border-slate-100 border-b transition-colors last:border-0 hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/30"
											key={template.id}
										>
											<td className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">
												{template.id}
											</td>

											<td className="px-4 py-3">
												<div className="flex flex-col gap-1.5">
													<div className="flex items-center gap-2">
														<button
															className="font-semibold text-[#0757ff] hover:underline dark:text-blue-400"
															type="button"
														>
															{template.name}
														</button>

														<span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-[10px] text-slate-500 dark:bg-slate-800 dark:text-slate-400">
															Default
														</span>
													</div>

													<span className="w-fit rounded-full bg-blue-50 px-2 py-0.5 font-medium text-[#0757ff] text-[10px] dark:bg-blue-950/60 dark:text-blue-400">
														SMS
													</span>
												</div>
											</td>

											<td className="max-w-[430px] px-4 py-3 text-slate-600 leading-5 dark:text-slate-300">
												{template.message}
											</td>

											<td className="max-w-[280px] px-4 py-3 text-slate-500 dark:text-slate-400">
												{template.type}
											</td>

											<td className="px-4 py-3">
												<span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-[10px] text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
													{template.templateStatus}
												</span>
											</td>

											<td className="px-4 py-3 text-slate-400 dark:text-slate-500">
												{template.reason}
											</td>

											<td className="px-4 py-3">
												<span
													className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold text-[10px] ${
														template.status === "Enabled"
															? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400"
															: "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
													}`}
												>
													<span
														className={`size-1.5 rounded-full ${
															template.status === "Enabled"
																? "bg-emerald-500"
																: "bg-slate-400"
														}`}
													/>

													{template.status}
												</span>
											</td>

											<td className="px-4 py-3">
												<select
													className="h-8 min-w-[135px] rounded-lg border border-slate-200 bg-white px-2.5 text-[11px] text-slate-600 shadow-sm outline-none transition-colors hover:border-blue-200 focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:focus:border-blue-500 dark:hover:border-blue-800"
													defaultValue=""
													id={`template-action-${template.id}`}
												>
													<option disabled value="">
														Select Action
													</option>

													<option value="view">View</option>
													<option value="edit">Edit</option>
													<option value="disable">Disable</option>
													<option value="delete">Delete</option>
												</select>
											</td>
										</tr>
									))}

									{visibleTemplates.length === 0 ? (
										<tr>
											<td
												className="px-4 py-12 text-center text-slate-400 dark:text-slate-500"
												colSpan={8}
											>
												<Search className="mx-auto mb-2 size-7 text-slate-300 dark:text-slate-600" />

												<p className="font-medium text-slate-500 dark:text-slate-400">
													No templates found
												</p>

												<p className="mt-1 text-[11px]">
													Try changing your search.
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
									{filteredTemplates.length === 0 ? 0 : startIndex + 1}
								</span>{" "}
								to{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{Math.min(startIndex + pageSize, filteredTemplates.length)}
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredTemplates.length}
								</span>{" "}
								entries
							</span>

							<div className="flex items-center gap-1.5">
								<Button
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() => setCurrentPage(1)}
									size="sm"
									type="button"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
												? "!bg-[#0757ff] !text-white hover:!bg-[#004be0] dark:!bg-blue-600 dark:hover:!bg-blue-500 h-8 min-w-8 rounded-lg px-2 font-medium text-[11px] shadow-blue-500/20 shadow-sm"
												: "h-8 min-w-8 rounded-lg border-slate-200 bg-white px-2 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
									className="h-8 rounded-lg border-slate-200 bg-white px-3 text-[11px] text-slate-500 shadow-sm hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
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
		</div>
	);
}
