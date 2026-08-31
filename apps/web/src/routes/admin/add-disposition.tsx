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
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background">
					{/* Header */}
					<div className="border-b px-4 py-3">
						<h1 className="font-medium text-lg">Add Disposition</h1>
					</div>

					{/* Form */}
					<form className="p-5" onSubmit={handleSubmit}>
						<div className="space-y-5">
							{/* Name */}
							<div className="space-y-1.5">
								<label
									className="text-slate-500 text-xs dark:text-slate-400"
									htmlFor="disposition-name"
								>
									Name
								</label>

								<Input
									className="h-9 rounded-none border-0 border-slate-200 border-b bg-transparent px-0 text-sm shadow-none focus-visible:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
									id="disposition-name"
									onChange={(event) => setName(event.target.value)}
									value={name}
								/>
							</div>

							{/* Code */}
							<div className="space-y-1.5">
								<label
									className="text-slate-500 text-xs dark:text-slate-400"
									htmlFor="disposition-code"
								>
									Code
								</label>

								<Input
									className="h-9 rounded-none border-0 border-slate-200 border-b bg-transparent px-0 text-sm shadow-none focus-visible:border-[#0757ff] focus-visible:ring-0 dark:border-slate-700"
									id="disposition-code"
									onChange={(event) => setCode(event.target.value)}
									value={code}
								/>
							</div>
						</div>

						{/* Buttons */}
						<div className="mt-5 flex gap-2">
							<Button type="submit">Save</Button>

							<Button onClick={handleCancel} type="button" variant="outline">
								Cancel
							</Button>
						</div>
					</form>
				</section>
			</main>
		</div>
	);
}
