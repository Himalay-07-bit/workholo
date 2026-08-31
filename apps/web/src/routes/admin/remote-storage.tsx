"use client";

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/remote-storage")({
	component: RemoteStoragePage,
});

type RemoteStorageConfiguration = {
	id: number;
	name: string;
	accessKeyId: string;
	secretAccessKey: string;
	region: string;
	defaultOutputFormat: string;
	status: string;
};

const remoteStorageConfigurations: RemoteStorageConfiguration[] = [];

function RemoteStoragePage() {
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [isAddConfigurationOpen, setIsAddConfigurationOpen] = useState(false);
	const [name, setName] = useState("");
	const [accessKeyId, setAccessKeyId] = useState("");
	const [secretAccessKey, setSecretAccessKey] = useState("");
	const [region, setRegion] = useState("ap-south-1");
	const [defaultOutputFormat, setDefaultOutputFormat] = useState("");
	const [customReports, setCustomReports] = useState(true);
	const [s3BucketPath, setS3BucketPath] = useState("");
	const [s3BucketPublicUrl, setS3BucketPublicUrl] = useState("");

	const openAddConfiguration = () => {
		setName("");
		setAccessKeyId("");
		setSecretAccessKey("");
		setRegion("ap-south-1");
		setDefaultOutputFormat("");
		setCustomReports(true);
		setS3BucketPath("");
		setS3BucketPublicUrl("");
		setIsAddConfigurationOpen(true);
	};

	const closeAddConfiguration = () => {
		setIsAddConfigurationOpen(false);
	};

	const filteredConfigurations = useMemo(() => {
		const value = search.trim().toLowerCase();

		if (!value) {
			return remoteStorageConfigurations;
		}

		return remoteStorageConfigurations.filter((item) =>
			`${item.id} ${item.name} ${item.accessKeyId} ${item.secretAccessKey} ${item.region} ${item.defaultOutputFormat} ${item.status}`
				.toLowerCase()
				.includes(value)
		);
	}, [search]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredConfigurations.length / pageSize)
	);

	const safePage = Math.min(currentPage, totalPages);

	const startIndex = (safePage - 1) * pageSize;

	const visibleConfigurations = filteredConfigurations.slice(
		startIndex,
		startIndex + pageSize
	);

	const firstShown = filteredConfigurations.length === 0 ? 0 : startIndex + 1;

	const lastShown = Math.min(
		startIndex + pageSize,
		filteredConfigurations.length
	);

	const goFirst = () => {
		setCurrentPage(1);
	};

	const goPrevious = () => {
		setCurrentPage((page) => Math.max(1, page - 1));
	};

	const goNext = () => {
		setCurrentPage((page) => Math.min(totalPages, page + 1));
	};

	const goLast = () => {
		setCurrentPage(totalPages);
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1600px]">
					<section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* Header */}
						<div className="flex items-center justify-between border-slate-200 border-b px-4 py-3 dark:border-slate-800">
							<h1 className="font-medium text-[#102b55] text-sm dark:text-white">
								Remote Storage (AWS)
							</h1>

							<Button
								className="h-8 rounded-sm bg-white px-3 text-slate-600 text-xs shadow-none ring-1 ring-slate-300 hover:bg-slate-50 dark:bg-[#0b1728] dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800"
								onClick={openAddConfiguration}
								type="button"
							>
								<Plus className="mr-1 h-3.5 w-3.5" />
								Add Configuration
							</Button>
						</div>

						{/* Information Note */}
						<div className="mx-4 mt-5 border-[#1683d8] border-l-4 bg-[#e5f3ff] px-4 py-3 text-slate-700 text-xs dark:bg-[#10263a] dark:text-slate-300">
							<p className="mb-1 font-semibold">Please note:</p>

							<ol className="list-decimal space-y-1 pl-4">
								<li>
									Verified AWS Credentials are used to store call recordings and
									custom reports.
								</li>

								<li>
									Verification of credentials is performed through{" "}
									<span className="font-mono text-[#ff2f70]">aws s3 cp</span>{" "}
									command.
								</li>

								<li>
									Make sure ACLs are enabled on the bucket provided, you can
									confirm this on your S3 Console by:{" "}
									<span className="font-mono text-[#ff2f70]">
										Bucket &gt; Permissions &gt; Object Ownership &gt; Edit
									</span>
								</li>

								<li className="flex items-center gap-1">
									Configuration that will be used as default for call recording
									upload is marked by
									<span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#18a96b] text-[10px] text-white">
										✓
									</span>
								</li>
							</ol>
						</div>

						{/* Table Controls */}
						<div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
							<div className="flex items-center gap-2 text-slate-600 text-xs dark:text-slate-300">
								<span>Show</span>

								<select
									aria-label="Rows per page"
									className="h-8 rounded-sm border border-slate-300 bg-white px-2 text-xs outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
									onChange={(event) => {
										setPageSize(Number(event.target.value));
										setCurrentPage(1);
									}}
									value={pageSize}
								>
									<option value={10}>10</option>
									<option value={25}>25</option>
									<option value={50}>50</option>
									<option value={100}>100</option>
								</select>

								<span>entries</span>
							</div>

							<div className="flex items-center gap-2">
								<label
									className="text-slate-600 text-xs dark:text-slate-300"
									htmlFor="remote-storage-search"
								>
									Search:
								</label>

								<Input
									className="h-8 w-[220px] rounded-sm border-slate-300 text-xs dark:border-slate-700"
									id="remote-storage-search"
									onChange={(event) => {
										setSearch(event.target.value);
										setCurrentPage(1);
									}}
									value={search}
								/>
							</div>
						</div>

						{/* Table */}
						<div className="overflow-x-auto px-4">
							<table className="w-full min-w-[1100px] border-collapse text-xs">
								<thead>
									<tr className="bg-slate-50 text-left dark:bg-slate-900/70">
										<th className="w-[100px] border border-slate-200 px-3 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											S.no
										</th>

										<th className="border border-slate-200 px-3 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Name
										</th>

										<th className="border border-slate-200 px-3 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Access Key ID
										</th>

										<th className="border border-slate-200 px-3 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Secret Access Key
										</th>

										<th className="border border-slate-200 px-3 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Region
										</th>

										<th className="border border-slate-200 px-3 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Default Output format
										</th>

										<th className="border border-slate-200 px-3 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Status
										</th>

										<th className="w-[120px] border border-slate-200 px-3 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Actions
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleConfigurations.map((item) => (
										<tr
											className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50"
											key={item.id}
										>
											<td className="border border-slate-200 px-3 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{item.id}
											</td>

											<td className="border border-slate-200 px-3 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-200">
												{item.name}
											</td>

											<td className="border border-slate-200 px-3 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{item.accessKeyId}
											</td>

											<td className="border border-slate-200 px-3 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{item.secretAccessKey}
											</td>

											<td className="border border-slate-200 px-3 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{item.region}
											</td>

											<td className="border border-slate-200 px-3 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{item.defaultOutputFormat}
											</td>

											<td className="border border-slate-200 px-3 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{item.status}
											</td>

											<td className="border border-slate-200 px-3 py-3 dark:border-slate-800">
												<button
													className="text-[#0757ff] hover:underline"
													type="button"
												>
													Select an Action
												</button>
											</td>
										</tr>
									))}

									{visibleConfigurations.length === 0 && (
										<tr>
											<td
												className="border border-slate-200 px-4 py-8 text-center text-slate-500 text-xs dark:border-slate-800"
												colSpan={8}
											>
												No data available in table
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						{/* Footer / Pagination */}
						<div className="flex flex-col gap-3 px-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between">
							<p className="text-slate-500 dark:text-slate-400">
								Showing {firstShown} to {lastShown} of{" "}
								{filteredConfigurations.length} entries
							</p>

							<div className="flex items-center gap-1">
								<Button
									className="h-8 rounded-sm px-2"
									disabled={safePage === 1}
									onClick={goFirst}
									size="sm"
									type="button"
									variant="outline"
								>
									First
								</Button>

								<Button
									className="h-8 rounded-sm px-2"
									disabled={safePage === 1}
									onClick={goPrevious}
									size="sm"
									type="button"
									variant="outline"
								>
									<ChevronLeft className="h-3.5 w-3.5" />
									Previous
								</Button>

								<span className="flex h-8 min-w-8 items-center justify-center rounded-sm bg-[#0757ff] px-2 text-white text-xs">
									{safePage}
								</span>

								<Button
									className="h-8 rounded-sm px-2"
									disabled={safePage === totalPages}
									onClick={goNext}
									size="sm"
									type="button"
									variant="outline"
								>
									Next
									<ChevronRight className="h-3.5 w-3.5" />
								</Button>

								<Button
									className="h-8 rounded-sm px-2"
									disabled={safePage === totalPages}
									onClick={goLast}
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

			{isAddConfigurationOpen ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4">
					<button
						aria-label="Close add AWS configuration dialog"
						className="absolute inset-0"
						onClick={closeAddConfiguration}
						type="button"
					/>
					<div
						aria-labelledby="add-aws-configuration-title"
						aria-modal="true"
						className="relative w-full max-w-[590px] overflow-hidden bg-white shadow-2xl dark:bg-[#0b1728]"
						role="dialog"
					>
						<div className="flex h-[43px] items-center justify-between bg-[#0647dc] px-4">
							<h2
								className="font-semibold text-sm text-white"
								id="add-aws-configuration-title"
							>
								Add AWS Configuration
							</h2>
							<button
								aria-label="Close"
								className="rounded-sm p-1 text-white/80 hover:bg-white/10 hover:text-white"
								onClick={closeAddConfiguration}
								type="button"
							>
								<X className="h-4 w-4" />
							</button>
						</div>

						<div className="px-6 py-5">
							<div className="space-y-5">
								<div className="relative">
									<Input
										className="h-9 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 pr-8 text-xs shadow-none focus:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
										id="aws-name"
										onChange={(event) => setName(event.target.value)}
										placeholder="Name*"
										value={name}
									/>
									<span className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-[15px] text-cyan-500">
										?
									</span>
								</div>

								<div className="relative">
									<Input
										className="h-9 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 pr-8 text-xs shadow-none focus:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
										id="aws-access-key-id"
										onChange={(event) => setAccessKeyId(event.target.value)}
										placeholder="Access Key ID*"
										value={accessKeyId}
									/>
									<span className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-[15px] text-cyan-500">
										?
									</span>
								</div>

								<div className="relative">
									<Input
										className="h-9 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 pr-8 text-xs shadow-none focus:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
										id="aws-secret-access-key"
										onChange={(event) => setSecretAccessKey(event.target.value)}
										placeholder="Secret Access Key*"
										type="password"
										value={secretAccessKey}
									/>
									<span className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-[15px] text-cyan-500">
										?
									</span>
								</div>

								<div className="grid grid-cols-1 gap-7 md:grid-cols-2">
									<div className="relative">
										<label
											className="mb-1 block text-[11px] text-slate-400"
											htmlFor="aws-region"
										>
											Region ID
										</label>
										<Input
											className="h-8 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 pr-8 text-xs shadow-none focus:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
											id="aws-region"
											onChange={(event) => setRegion(event.target.value)}
											value={region}
										/>
										<span className="pointer-events-none absolute top-[30px] right-1 text-[15px] text-cyan-500">
											?
										</span>
									</div>

									<div className="relative">
										<label
											className="mb-1 block text-[11px] text-slate-400"
											htmlFor="aws-output-format"
										>
											Default Output Format
										</label>
										<select
											className="h-8 w-full appearance-none border-0 border-slate-300 border-b bg-transparent pr-8 text-slate-700 text-xs outline-none focus:border-[#0757ff] dark:border-slate-700 dark:text-slate-200"
											id="aws-output-format"
											onChange={(event) =>
												setDefaultOutputFormat(event.target.value)
											}
											value={defaultOutputFormat}
										>
											<option value="">Select an Option</option>
											<option value="CSV">CSV</option>
											<option value="XLSX">XLSX</option>
											<option value="JSON">JSON</option>
											<option value="PDF">PDF</option>
										</select>
										<span className="pointer-events-none absolute top-[31px] right-7 text-[10px] text-slate-500">
											▼
										</span>
										<span className="pointer-events-none absolute top-[30px] right-1 text-[15px] text-cyan-500">
											?
										</span>
									</div>
								</div>

								<div className="flex items-center gap-2 pt-1 text-slate-600 text-xs dark:text-slate-300">
									<span>Use this configuration for:</span>
									<button
										aria-label="Use this configuration for Custom Reports"
										aria-pressed={customReports}
										className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[11px] ${customReports ? "bg-white text-[#18a96b]" : "border border-slate-300 bg-white text-transparent dark:border-slate-600 dark:bg-slate-900"}`}
										onClick={() => setCustomReports((checked) => !checked)}
										type="button"
									>
										✓
									</button>
									<span>Custom Reports</span>
								</div>

								<div className="relative pt-2">
									<Input
										className="h-9 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 pr-8 text-xs shadow-none focus:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
										id="s3-bucket-path"
										onChange={(event) => setS3BucketPath(event.target.value)}
										placeholder="S3 Bucket Path for Custom Reports"
										value={s3BucketPath}
									/>
									<span className="pointer-events-none absolute top-1/2 right-1 mt-1 -translate-y-1/2 text-[15px] text-cyan-500">
										?
									</span>
								</div>

								<div className="relative pt-2">
									<Input
										className="h-9 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 pr-8 text-xs shadow-none focus:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
										id="s3-bucket-public-url"
										onChange={(event) =>
											setS3BucketPublicUrl(event.target.value)
										}
										placeholder="S3 Bucket Public URL for Custom Reports"
										value={s3BucketPublicUrl}
									/>
									<span className="pointer-events-none absolute top-1/2 right-1 mt-1 -translate-y-1/2 text-[15px] text-cyan-500">
										?
									</span>
								</div>
							</div>

							<div className="mt-7 flex justify-end gap-2">
								<Button
									className="h-8 rounded-sm bg-[#0757ff] px-4 text-white text-xs hover:bg-[#004be0]"
									onClick={closeAddConfiguration}
									type="button"
								>
									SAVE
								</Button>
								<Button
									className="h-8 rounded-sm border-slate-300 px-3 text-slate-600 text-xs dark:border-slate-700 dark:text-slate-300"
									onClick={closeAddConfiguration}
									type="button"
									variant="outline"
								>
									CLOSE
								</Button>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
