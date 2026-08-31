// biome-ignore-all lint/performance/noJsxPropsBind: Form controls use local UI actions.

import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import { Label } from "@workholo/ui/components/label";
import { ArrowLeft, Ban } from "lucide-react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/block-calls")({
	component: BlockCallsPage,
});

function BlockCallsPage() {
	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-slate-950">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* PAGE HEADER */}
					<div className="mb-4 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
						<div>
							<div className="flex items-center gap-2">
								<div className="flex size-9 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400">
									<Ban className="size-4" />
								</div>

								<div>
									<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-white">
										Block a Number
									</h1>

									<p className="text-slate-500 text-xs dark:text-slate-400">
										Prevent calls from a specific number.
									</p>
								</div>
							</div>
						</div>

						<div className="flex flex-wrap gap-2">
							<Link
								className={buttonVariants({
									variant: "outline",
								})}
								to="/admin/blocked-numbers"
							>
								<Ban className="mr-2 size-4" />
								All Blocked Numbers
							</Link>

							<Link
								className={buttonVariants({
									variant: "outline",
								})}
								to="/admin/manage-did-numbers"
							>
								<ArrowLeft className="mr-2 size-4" />
								Back
							</Link>
						</div>
					</div>

					{/* FORM CARD */}
					<Card className="rounded-2xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
						<CardHeader className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<CardTitle className="font-semibold text-[#102b55] text-sm dark:text-white">
								Block Number
							</CardTitle>

							<p className="text-slate-400 text-xs dark:text-slate-500">
								Enter the number you want to block and select where the block
								should apply.
							</p>
						</CardHeader>

						<CardContent className="p-5">
							<div className="grid gap-5 md:grid-cols-2">
								{/* SOURCE NUMBER */}
								<div className="space-y-2">
									<Label
										className="font-medium text-[#263b5b] text-xs dark:text-slate-300"
										htmlFor="source-number"
									>
										Source Number *
									</Label>

									<Input
										className="h-10 rounded-lg border-slate-200 bg-white text-slate-700 text-xs placeholder:text-slate-400 focus:border-[#0757ff] focus:ring-[#0757ff]/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500"
										id="source-number"
										placeholder="Enter source number"
									/>
								</div>

								{/* BLOCK AGAINST */}
								<div className="space-y-2">
									<Label
										className="font-medium text-[#263b5b] text-xs dark:text-slate-300"
										htmlFor="blocked-against"
									>
										Block Against *
									</Label>

									<select
										className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-700 text-xs outline-none transition-colors focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
										defaultValue="account"
										id="blocked-against"
									>
										<option value="account">Account</option>
										<option value="did">DID</option>
										<option value="caller-id">Caller ID</option>
									</select>
								</div>
							</div>

							{/* ACTIONS */}
							<div className="mt-7 flex flex-wrap gap-2 border-slate-100 border-t pt-5 dark:border-slate-800">
								<Button
									className="h-9 rounded-lg bg-[#0757ff] px-5 text-xs shadow-blue-500/20 shadow-sm hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									type="button"
								>
									<Ban className="mr-1.5 size-3.5" />
									Save
								</Button>

								<Link
									className={buttonVariants({
										variant: "outline",
										className:
											"h-9 rounded-lg border-slate-200 px-5 text-slate-600 text-xs hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/40 dark:hover:text-blue-400",
									})}
									to="/admin/manage-did-numbers"
								>
									Cancel
								</Link>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
