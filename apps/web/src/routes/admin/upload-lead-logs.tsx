// biome-ignore-all lint/performance/noJsxPropsBind: Table controls use local component state.
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import {
	ChevronLeft,
	ChevronRight,
	Download,
	FileText,
	Search,
} from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/upload-lead-logs")({
	component: UploadLeadLogsPage,
});

type UploadLog = {
	id: number;
	leadListId: string;
	name: string;
	total: number;
	successful: number;
	failed: number;
	invalidTimeGroup: number;
	duplicateNumber: number;
	existingNumber: number;
	invalidNumber: number;
	invalidName: number;
	dateTime: string;
	hasFailedFile: boolean;
};

const uploadLogs: UploadLog[] = [
	{
		id: 1,
		leadListId: "322469",
		name: "CRM KC",
		total: 71,
		successful: 71,
		failed: 0,
		invalidTimeGroup: 0,
		duplicateNumber: 0,
		existingNumber: 0,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "29-08-2026 22:00:30",
		hasFailedFile: false,
	},
	{
		id: 2,
		leadListId: "322203",
		name: "CRLD KC",
		total: 58,
		successful: 57,
		failed: 1,
		invalidTimeGroup: 0,
		duplicateNumber: 1,
		existingNumber: 0,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "29-08-2026 21:49:22",
		hasFailedFile: true,
	},
	{
		id: 3,
		leadListId: "321953",
		name: "CRLB KC",
		total: 117,
		successful: 108,
		failed: 9,
		invalidTimeGroup: 0,
		duplicateNumber: 1,
		existingNumber: 8,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "29-08-2026 21:35:48",
		hasFailedFile: true,
	},
	{
		id: 4,
		leadListId: "321953",
		name: "CRLB KC",
		total: 2,
		successful: 2,
		failed: 0,
		invalidTimeGroup: 0,
		duplicateNumber: 0,
		existingNumber: 0,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "29-08-2026 16:16:48",
		hasFailedFile: false,
	},
	{
		id: 5,
		leadListId: "322469",
		name: "CRM KC",
		total: 37,
		successful: 37,
		failed: 0,
		invalidTimeGroup: 0,
		duplicateNumber: 0,
		existingNumber: 0,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "27-08-2026 22:26:01",
		hasFailedFile: false,
	},
	{
		id: 6,
		leadListId: "322203",
		name: "CRLD KC",
		total: 60,
		successful: 58,
		failed: 2,
		invalidTimeGroup: 0,
		duplicateNumber: 2,
		existingNumber: 0,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "27-08-2026 22:16:58",
		hasFailedFile: true,
	},
	{
		id: 7,
		leadListId: "321953",
		name: "CRLB KC",
		total: 43,
		successful: 41,
		failed: 2,
		invalidTimeGroup: 0,
		duplicateNumber: 0,
		existingNumber: 2,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "27-08-2026 21:48:14",
		hasFailedFile: true,
	},
	{
		id: 8,
		leadListId: "322469",
		name: "CRM KC",
		total: 25,
		successful: 25,
		failed: 0,
		invalidTimeGroup: 0,
		duplicateNumber: 0,
		existingNumber: 0,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "27-08-2026 20:32:09",
		hasFailedFile: false,
	},
	{
		id: 9,
		leadListId: "322203",
		name: "CRLD KC",
		total: 82,
		successful: 80,
		failed: 2,
		invalidTimeGroup: 0,
		duplicateNumber: 1,
		existingNumber: 1,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "27-08-2026 19:41:35",
		hasFailedFile: true,
	},
	{
		id: 10,
		leadListId: "321953",
		name: "CRLB KC",
		total: 19,
		successful: 19,
		failed: 0,
		invalidTimeGroup: 0,
		duplicateNumber: 0,
		existingNumber: 0,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "27-08-2026 18:22:11",
		hasFailedFile: false,
	},
	{
		id: 11,
		leadListId: "322469",
		name: "CRM KC",
		total: 34,
		successful: 32,
		failed: 2,
		invalidTimeGroup: 0,
		duplicateNumber: 2,
		existingNumber: 0,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "27-08-2026 17:58:42",
		hasFailedFile: true,
	},
	{
		id: 12,
		leadListId: "322203",
		name: "CRLD KC",
		total: 51,
		successful: 50,
		failed: 1,
		invalidTimeGroup: 0,
		duplicateNumber: 1,
		existingNumber: 0,
		invalidNumber: 0,
		invalidName: 0,
		dateTime: "27-08-2026 16:43:26",
		hasFailedFile: true,
	},
];

function UploadLeadLogsPage() {
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredLogs = useMemo(() => {
		const value = search.trim().toLowerCase();

		if (!value) {
			return uploadLogs;
		}

		return uploadLogs.filter((item) =>
			`${item.leadListId} ${item.name} ${item.dateTime}`
				.toLowerCase()
				.includes(value)
		);
	}, [search]);

	const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize));

	const safePage = Math.min(currentPage, totalPages);
	const startIndex = (safePage - 1) * pageSize;

	const visibleLogs = filteredLogs.slice(startIndex, startIndex + pageSize);

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<div className="border-slate-200 border-b bg-slate-50/70 px-5 py-3 dark:border-slate-800 dark:bg-slate-900/60">
							<div className="flex items-center gap-2">
								<div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
									<FileText className="size-4" />
								</div>

								<h1 className="font-semibold text-[#263b5b] text-sm dark:text-slate-100">
									Logs Of Upload Leads
								</h1>
							</div>
						</div>

						{/* WARNING */}
						<div className="px-5 pt-4">
							<p className="font-medium text-[11px] text-red-500">
								Note : CSV Log for one uploaded lead list can only be downloaded
								within 24 hours of upload.
							</p>
						</div>

						{/* CONTROLS */}
						<div className="flex flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between">
							<div className="flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<span>Show</span>

								<select
									className="h-8 rounded-lg border border-slate-200 bg-white px-2.5 text-slate-700 text-xs outline-none focus:border-[#0757ff] focus:ring-2 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
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
								<Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-slate-400" />

								<Input
									className="h-8 w-full rounded-lg border-slate-200 bg-white pl-8 text-xs md:w-[240px] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
									onChange={(event) => {
										setSearch(event.target.value);
										setCurrentPage(1);
									}}
									placeholder="Search..."
									value={search}
								/>
							</div>
						</div>

						{/* TABLE */}
						<div className="overflow-x-auto">
							<table className="w-full min-w-[1100px] border-collapse text-xs">
								<thead>
									<tr className="border-slate-200 border-y bg-slate-50 dark:border-slate-800 dark:bg-slate-900/70">
										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Lead List ID
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Name
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Lead Count
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Errors in Upload
										</th>

										<th className="px-4 py-3 text-left font-semibold text-[#263b5b] dark:text-slate-300">
											Date - Time
										</th>

										<th className="px-4 py-3 text-center font-semibold text-[#263b5b] dark:text-slate-300">
											Failed Leads file
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleLogs.map((item) => (
										<tr
											className="border-slate-100 border-b transition-colors hover:bg-blue-50/30 dark:border-slate-800 dark:hover:bg-blue-950/20"
											key={item.id}
										>
											{/* LEAD LIST ID */}
											<td className="px-4 py-4 font-medium text-slate-700 dark:text-slate-300">
												{item.leadListId}
											</td>

											{/* NAME */}
											<td className="px-4 py-4 font-medium text-slate-700 dark:text-slate-300">
												{item.name}
											</td>

											{/* LEAD COUNT */}
											<td className="px-4 py-4 leading-5">
												<div className="text-slate-700 dark:text-slate-300">
													Total : {item.total}
												</div>

												<div className="text-slate-700 dark:text-slate-300">
													Successful : {item.successful}
												</div>

												<div className="text-slate-700 dark:text-slate-300">
													Failed : {item.failed}
												</div>
											</td>

											{/* ERRORS */}
											<td className="px-4 py-4 leading-5">
												<div className="text-slate-700 dark:text-slate-300">
													Invalid Time Group : {item.invalidTimeGroup}
												</div>

												<div className="text-slate-700 dark:text-slate-300">
													Duplicate Number : {item.duplicateNumber}
												</div>

												<div className="text-slate-700 dark:text-slate-300">
													Existing Number : {item.existingNumber}
												</div>

												<div className="text-slate-700 dark:text-slate-300">
													Invalid Number : {item.invalidNumber}
												</div>

												<div className="text-slate-700 dark:text-slate-300">
													Invalid Name : {item.invalidName}
												</div>
											</td>

											{/* DATE */}
											<td className="whitespace-nowrap px-4 py-4 text-slate-700 dark:text-slate-300">
												{item.dateTime}
											</td>

											{/* DOWNLOAD */}
											<td className="px-4 py-4 text-center">
												{item.hasFailedFile ? (
													<Button
														className="h-8 border-slate-200 bg-white px-3 text-[11px] text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800"
														size="sm"
														variant="outline"
													>
														<Download className="mr-1.5 size-3.5" />
														Download
													</Button>
												) : (
													<span className="text-slate-500 dark:text-slate-400">
														—
													</span>
												)}
											</td>
										</tr>
									))}

									{visibleLogs.length === 0 && (
										<tr>
											<td
												className="px-4 py-12 text-center text-slate-400 dark:text-slate-500"
												colSpan={6}
											>
												<Search className="mx-auto mb-2 size-7 text-slate-300 dark:text-slate-600" />

												<p className="font-medium text-slate-500 dark:text-slate-400">
													No upload logs found
												</p>

												<p className="mt-1 text-slate-400 text-xs dark:text-slate-500">
													Try changing your search.
												</p>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{/* FOOTER */}
						<div className="flex flex-col gap-3 border-slate-100 border-t px-5 py-3.5 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
							<span className="text-slate-400 dark:text-slate-500">
								Showing{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredLogs.length === 0 ? 0 : startIndex + 1}
								</span>{" "}
								to{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{Math.min(startIndex + pageSize, filteredLogs.length)}
								</span>{" "}
								of{" "}
								<span className="font-semibold text-slate-600 dark:text-slate-300">
									{filteredLogs.length}
								</span>{" "}
								entries
							</span>

							<div className="flex items-center gap-1.5">
								<Button
									className="h-8 border-slate-200 px-3 text-[11px] text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									disabled={safePage === 1}
									onClick={() => setCurrentPage(1)}
									size="sm"
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
