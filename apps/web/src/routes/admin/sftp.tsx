// biome-ignore-all lint/performance/noJsxPropsBind: Table controls use local component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/sftp")({
	component: SftpConfigurationPage,
});

type SftpConfiguration = {
	id: number;
	name: string;
	host: string;
	port: string;
	username: string;
	targetFolderPath: string;
};

const sftpConfigurations: SftpConfiguration[] = [];

function SftpConfigurationPage() {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredConfigurations = useMemo(() => {
		const value = search.trim().toLowerCase();

		if (!value) {
			return sftpConfigurations;
		}

		return sftpConfigurations.filter((item) =>
			`${item.id} ${item.name} ${item.host} ${item.port} ${item.username} ${item.targetFolderPath}`
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

	const goFirst = () => setCurrentPage(1);
	const goPrevious = () => setCurrentPage((page) => Math.max(1, page - 1));
	const goNext = () => setCurrentPage((page) => Math.min(totalPages, page + 1));
	const goLast = () => setCurrentPage(totalPages);

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1600px]">
					<section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<div className="flex items-center justify-between border-slate-200 border-b px-4 py-3 dark:border-slate-800">
							<h1 className="font-medium text-[#102b55] text-sm dark:text-white">
								SFTP Configuration
							</h1>

							<Button
								className="h-8 rounded-sm bg-[#0757ff] px-3 text-white text-xs shadow-sm hover:bg-[#004be0]"
								onClick={() => navigate({ to: "/admin/add-sftp" })}
								type="button"
							>
								Add SFTP Configuration
							</Button>
						</div>

						<div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
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
									htmlFor="sftp-search"
								>
									Search:
								</label>

								<div className="relative">
									<Search className="pointer-events-none absolute top-1/2 left-2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
									<Input
										className="h-8 w-[220px] rounded-sm border-slate-300 pl-7 text-xs dark:border-slate-700"
										id="sftp-search"
										onChange={(event) => {
											setSearch(event.target.value);
											setCurrentPage(1);
										}}
										value={search}
									/>
								</div>
							</div>
						</div>

						<div className="overflow-x-auto">
							<table className="w-full min-w-[900px] border-collapse text-xs">
								<thead>
									<tr className="bg-slate-50 text-left dark:bg-slate-900/70">
										<th className="w-[120px] border-slate-200 border-b px-4 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											ID
										</th>
										<th className="border-slate-200 border-b px-4 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Name
										</th>
										<th className="border-slate-200 border-b px-4 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Host
										</th>
										<th className="border-slate-200 border-b px-4 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Port
										</th>
										<th className="border-slate-200 border-b px-4 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Username
										</th>
										<th className="border-slate-200 border-b px-4 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Target Folder Path
										</th>
										<th className="w-[140px] border-slate-200 border-b px-4 py-3 font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
											Action
										</th>
									</tr>
								</thead>

								<tbody>
									{visibleConfigurations.map((item) => (
										<tr
											className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50"
											key={item.id}
										>
											<td className="border-slate-200 border-b px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{item.id}
											</td>
											<td className="border-slate-200 border-b px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-200">
												{item.name}
											</td>
											<td className="border-slate-200 border-b px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{item.host}
											</td>
											<td className="border-slate-200 border-b px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{item.port}
											</td>
											<td className="border-slate-200 border-b px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{item.username}
											</td>
											<td className="border-slate-200 border-b px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
												{item.targetFolderPath}
											</td>
											<td className="border-slate-200 border-b px-4 py-3 text-slate-700 dark:border-slate-800 dark:text-slate-300">
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
												className="border-slate-200 border-b px-4 py-8 text-center text-slate-500 text-xs dark:border-slate-800"
												colSpan={7}
											>
												No data available in table
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>

						<div className="flex flex-col gap-3 px-4 py-4 text-xs sm:flex-row sm:items-center sm:justify-between">
							<p className="text-slate-500 dark:text-slate-400">
								Showing {firstShown} to {lastShown} of{" "}
								{filteredConfigurations.length} entries
							</p>

							<div className="flex items-center gap-1">
								<Button
									aria-label="First page"
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
									aria-label="Previous page"
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
									aria-label="Next page"
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
									aria-label="Last page"
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
		</div>
	);
}
