// biome-ignore-all lint/performance/noJsxPropsBind: UI event handlers require access to component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/add-disposition")({
	component: AddDispositionPage,
});

function AddDispositionPage() {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [code, setCode] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// UI only for now.
	};

	const handleCancel = () => {
		navigate({
			to: "/admin/agent-dispositions",
		});
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-slate-950">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
						{/* Header */}
						<div className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-white">
								Add Disposition
							</h1>

							<p className="mt-0.5 text-slate-400 text-xs dark:text-slate-500">
								Create a new agent disposition.
							</p>
						</div>

						{/* Form */}
						<form className="p-5 md:p-6" onSubmit={handleSubmit}>
							<div className="grid gap-5 md:grid-cols-2">
								{/* Name */}
								<div className="space-y-2">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="disposition-name"
									>
										Name
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-xs shadow-none placeholder:text-slate-400 focus-visible:border-[#0757ff] focus-visible:ring-4 focus-visible:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500"
										id="disposition-name"
										onChange={(event) => setName(event.target.value)}
										placeholder="Enter disposition name"
										value={name}
									/>
								</div>

								{/* Code */}
								<div className="space-y-2">
									<label
										className="font-medium text-slate-500 text-xs dark:text-slate-400"
										htmlFor="disposition-code"
									>
										Code
									</label>

									<Input
										className="h-9 rounded-lg border-slate-200 bg-white px-3 text-slate-700 text-xs shadow-none placeholder:text-slate-400 focus-visible:border-[#0757ff] focus-visible:ring-4 focus-visible:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500"
										id="disposition-code"
										onChange={(event) => setCode(event.target.value)}
										placeholder="Enter disposition code"
										value={code}
									/>
								</div>
							</div>

							{/* Buttons */}
							<div className="mt-6 flex flex-wrap justify-end gap-2">
								<Button
									className="h-9 rounded-lg border-slate-200 px-4 text-slate-600 text-xs dark:border-slate-700 dark:text-slate-300"
									onClick={handleCancel}
									type="button"
									variant="outline"
								>
									Cancel
								</Button>

								<Button
									className="h-9 rounded-lg bg-[#0757ff] px-5 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									type="submit"
								>
									Save
								</Button>
							</div>
						</form>
					</section>
				</div>
			</main>
		</div>
	);
}
