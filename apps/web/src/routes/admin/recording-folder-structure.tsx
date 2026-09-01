"use client";

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/recording-folder-structure")({
	component: RecordingFolderStructurePage,
});

type FolderStructure =
	| "default"
	| "number-wise"
	| "date-based"
	| "date-did-wise"
	| "date-customer-wise";

const folderStructures: {
	id: FolderStructure;
	title: string;
	description: string;
	preview: string;
}[] = [
	{
		id: "default",
		title: "Default",
		description:
			"All recordings delivered flat into your configured target folder. Current behaviour, applied unless you choose otherwise.",
		preview: `<target-folder>/
├── <recording-uuid>.mp3
├── <recording-uuid>.mp3
└── ...`,
	},
	{
		id: "number-wise",
		title: "Number-wise (DID)",
		description:
			"A folder per DID / phone number; that number's inbound and outbound recordings land inside it.",
		preview: `<target-folder>/
├── <did-number>/
│   ├── <recording-uuid>.mp3
│   └── <recording-uuid>.mp3
└── ...`,
	},
	{
		id: "date-based",
		title: "Date-based (Year → Month → Date)",
		description:
			"Recordings auto-partitioned into a YYYY / MM / DD hierarchy under your target folder.",
		preview: `<target-folder>/
├── YYYY/
│   ├── MM/
│   │   ├── DD/
│   │   │   ├── <recording-uuid>.mp3
│   │   │   └── ...
│   │   └── ...
│   └── ...
└── ...`,
	},
	{
		id: "date-did-wise",
		title: "Date-wise → DID-wise",
		description:
			"Recordings partitioned by date then by DID number within each day.",
		preview: `<target-folder>/
├── YYYY/
│   ├── MM/
│   │   ├── DD/
│   │   │   ├── <did-number>/
│   │   │   │   ├── <recording-uuid>.mp3
│   │   │   │   └── ...
│   │   │   └── ...
│   │   └── ...
│   └── ...
└── ...`,
	},
	{
		id: "date-customer-wise",
		title: "Date-wise → Customer-wise",
		description:
			"Recordings partitioned by date then by the external customer number within each day.",
		preview: `<target-folder>/
├── YYYY/
│   ├── MM/
│   │   ├── DD/
│   │   │   ├── <customer-number>/
│   │   │   │   ├── <recording-uuid>.mp3
│   │   │   │   └── ...
│   │   │   └── ...
│   │   └── ...
│   └── ...
└── ...`,
	},
];

function RecordingFolderStructurePage() {
	const [selectedStructure, setSelectedStructure] =
		useState<FolderStructure>("default");

	const selected = folderStructures.find(
		(structure) => structure.id === selectedStructure
	);

	const isDefaultSelected = selectedStructure === "default";

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1600px]">
					<section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* Page Header */}
						<div className="border-slate-200 border-b px-4 py-3 dark:border-slate-800">
							<h1 className="font-medium text-[#102b55] text-sm dark:text-white">
								Recording Folder Structure
							</h1>
						</div>

						{/* Folder Organisation */}
						<div className="px-4 py-4">
							<h2 className="font-semibold text-[#102b55] text-sm dark:text-white">
								Folder organisation
							</h2>

							<p className="mt-1 max-w-4xl text-slate-500 text-xs dark:text-slate-400">
								Choose how your call recordings are organised in your connected
								storage. Applies to both SFTP and AWS delivery under BYOS.
								Default is already applied — keep it and save, or switch to
								another structure and save.
							</p>
						</div>

						{/* Warning */}
						<div className="px-4">
							<div className="max-w-[650px] rounded-sm border-red-400 border-l-4 bg-red-50 px-4 py-3 dark:bg-red-950/30">
								<div className="flex gap-3">
									<span className="mt-0.5 font-bold text-red-600 text-xs">
										!
									</span>

									<div className="text-[11px] text-red-700 leading-5 dark:text-red-300">
										<p className="font-semibold">
											Non-Default folder structures lengthen the call recording
											URL and may break CRM syncing where URL fields are
											length-limited.
										</p>

										<p>
											Confirm compatibility with Support before enabling a
											folder structure.
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Lock Warning */}
						<div className="px-4 pt-2">
							<div className="max-w-[650px] rounded-sm border-yellow-400 border-l-4 bg-yellow-50 px-4 py-3 dark:bg-yellow-950/30">
								<div className="flex gap-3">
									<span className="mt-0.5 font-bold text-xs text-yellow-700">
										!
									</span>

									<p className="text-[11px] text-yellow-800 leading-5 dark:text-yellow-300">
										You can set your recording folder structure only once. Once
										saved, it is locked for this account and cannot be changed
										again. Please choose carefully.
									</p>
								</div>
							</div>
						</div>

						{/* Folder Options */}
						<div className="px-4 pt-3">
							<div className="max-w-[650px] space-y-2">
								{folderStructures.map((structure) => {
									const active = selectedStructure === structure.id;

									return (
										<button
											className={`w-full rounded-sm border px-3 py-3 text-left transition-colors ${
												active
													? "border-cyan-400 bg-cyan-50 dark:border-cyan-400 dark:bg-cyan-950/40"
													: "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-[#0b1728] dark:hover:border-slate-600 dark:hover:bg-slate-900"
											}`}
											key={structure.id}
											onClick={() => setSelectedStructure(structure.id)}
											type="button"
										>
											<div className="flex items-start gap-3">
												<div
													className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${
														active
															? "border-cyan-500 bg-cyan-500"
															: "border-slate-400 dark:border-slate-600"
													}`}
												>
													{active && (
														<div className="size-1.5 rounded-full bg-white" />
													)}
												</div>

												<div className="min-w-0">
													<div className="flex flex-wrap items-center gap-2">
														<span className="font-semibold text-[11px] text-slate-800 dark:text-slate-100">
															{structure.title}
														</span>

														{structure.id === "default" && (
															<span className="rounded-sm bg-cyan-500 px-1.5 py-0.5 font-semibold text-[8px] text-white uppercase">
																Applied by default
															</span>
														)}
													</div>

													<p className="mt-1 text-[10px] text-slate-500 leading-4 dark:text-slate-400">
														{structure.description}
													</p>
												</div>
											</div>
										</button>
									);
								})}
							</div>
						</div>

						{/* Preview */}
						<div className="px-4 pt-4">
							<div className="max-w-[650px]">
								<p className="mb-2 font-medium text-[9px] text-slate-500 uppercase tracking-wider dark:text-slate-400">
									Preview
								</p>

								<pre className="overflow-x-auto rounded-md bg-slate-100 px-3 py-3 font-mono text-[10px] text-slate-700 leading-4 dark:bg-slate-900 dark:text-slate-300">
									{selected?.preview}
								</pre>
							</div>
						</div>

						{/* Save */}
						<div className="flex items-center gap-3 px-4 py-4">
							<Button
								className="h-8 rounded-sm bg-[#0757ff] px-3 text-white text-xs shadow-sm hover:bg-[#004be0] disabled:cursor-not-allowed disabled:opacity-50"
								disabled={isDefaultSelected}
								type="button"
							>
								Save Default
							</Button>

							<span className="text-[10px] text-slate-500 dark:text-slate-400">
								{isDefaultSelected
									? "Default is already applied. Select another structure to save a change."
									: "Save your selected recording folder structure."}
							</span>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
