// biome-ignore-all lint/performance/noJsxPropsBind: Dashboard controls use local navigation and UI state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import {
	ArrowDownLeft,
	CalendarDays,
	ChevronDown,
	CreditCard,
	PhoneCall,
	WalletCards,
} from "lucide-react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/")({
	component: AdminDashboard,
});

const faqs = [
	{
		question:
			"Will my customer be automatically connected to the same agent he spoke with earlier?",
	},
	{
		question:
			"Does Acefone provide SMS or Email notifications for when an agent misses a call?",
	},
	{
		question: "Does Acefone provide auto-charge facility?",
	},
];

function AdminDashboard() {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-slate-950">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<div className="grid gap-4 xl:grid-cols-2">
					{/* Live Data */}
					<Card>
						<CardHeader className="border-b px-5 py-3">
							<div className="flex items-center gap-2">
								<span className="h-5 w-1 rounded-full bg-primary" />
								<CardTitle className="font-medium text-base">
									Live Data
								</CardTitle>
							</div>
						</CardHeader>

						<CardContent className="p-5">
							<div className="grid grid-cols-3 divide-x">
								<div className="flex flex-col items-center gap-2 px-3 text-center">
									<PhoneCall className="size-7 text-orange-500" />

									<span className="font-semibold text-2xl">8</span>

									<span className="text-muted-foreground text-sm">
										Active Calls
									</span>
								</div>

								<div className="flex flex-col items-center gap-2 px-3 text-center">
									<ArrowDownLeft className="size-7 text-red-500" />

									<span className="flex items-center gap-1 font-semibold text-2xl">
										42
										<span className="text-orange-500 text-sm">↻</span>
									</span>

									<span className="text-muted-foreground text-sm">
										Total Missed Calls
									</span>
								</div>

								<div className="flex flex-col items-center gap-2 px-3 text-center">
									<PhoneCall className="size-7 text-green-600" />

									<span className="flex items-center gap-1 font-semibold text-2xl">
										0<span className="text-orange-500 text-sm">↻</span>
									</span>

									<span className="text-muted-foreground text-sm">
										Total Answered Calls
									</span>
								</div>
							</div>

							<div className="mt-5 border-t pt-3 text-xs">
								<span className="font-medium text-blue-600">Note:</span>{" "}
								<span className="text-muted-foreground">
									The call count displaying here represents only incoming calls
								</span>
							</div>
						</CardContent>
					</Card>

					{/* Quick Access */}
					<Card>
						<CardHeader className="flex flex-row items-center justify-between border-b px-5 py-3">
							<div className="flex items-center gap-2">
								<span className="h-5 w-1 rounded-full bg-primary" />

								<CardTitle className="font-medium text-base">
									Quick Access
								</CardTitle>
							</div>

							<Button size="sm" variant="outline">
								Customize
							</Button>
						</CardHeader>

						<CardContent className="p-5">
							<div className="grid grid-cols-2 gap-4">
								<Button
									className="h-32 flex-col gap-3"
									onClick={() =>
										navigate({
											to: "/admin/manage-did-numbers",
										})
									}
									variant="ghost"
								>
									<span className="font-bold text-3xl text-blue-600">⠿</span>

									<span className="font-normal text-sm">My Numbers</span>
								</Button>

								<Button className="h-32 flex-col gap-3" variant="ghost">
									<CreditCard className="size-8 text-blue-600" />

									<span className="font-normal text-sm">
										Manage Contact Groups
									</span>
								</Button>
							</div>
						</CardContent>
					</Card>

					{/* Billing Summary */}
					<Card>
						<CardHeader className="border-b px-5 py-3">
							<div className="flex items-center gap-2">
								<span className="h-5 w-1 rounded-full bg-primary" />

								<CardTitle className="font-medium text-base">
									Billing Summary
								</CardTitle>
							</div>
						</CardHeader>

						<CardContent className="p-5">
							<div className="grid grid-cols-3 divide-x">
								<div className="flex flex-col items-center gap-2 px-3 text-center">
									<WalletCards className="size-7 text-blue-600" />

									<span className="font-semibold text-xl">INR 0</span>

									<span className="text-muted-foreground text-sm">
										Available Balance
									</span>

									<button className="text-blue-600 text-xl" type="button">
										+
									</button>
								</div>

								<div className="flex flex-col items-center gap-2 px-3 text-center">
									<CreditCard className="size-7 text-blue-600" />

									<span className="font-semibold text-xl">INR34897</span>

									<button
										className="text-blue-600 text-sm hover:underline"
										type="button"
									>
										Due Charge
									</button>
								</div>

								<div className="flex flex-col items-center gap-2 px-3 text-center">
									<CalendarDays className="size-7 text-blue-600" />

									<span className="font-semibold text-xl">24-Sep-2026</span>

									<span className="text-muted-foreground text-sm">
										Next Billing Date
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* FAQs */}
					<Card>
						<CardHeader className="border-b px-5 py-3">
							<div className="flex items-center gap-2">
								<span className="h-5 w-1 rounded-full bg-primary" />

								<CardTitle className="font-medium text-base">FAQs</CardTitle>
							</div>
						</CardHeader>

						<CardContent className="p-0">
							<div className="divide-y">
								{faqs.map((faq) => (
									<button
										className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/30"
										key={faq.question}
										type="button"
									>
										<div className="flex items-start gap-3">
											<span className="mt-1 text-blue-500">•</span>

											<span className="text-sm">{faq.question}</span>
										</div>

										<ChevronDown className="size-4 shrink-0 text-muted-foreground" />
									</button>
								))}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Footer spacing */}
				<div className="mt-4">
					<Card>
						<CardContent className="flex h-14 items-center justify-center p-3">
							<span className="text-muted-foreground text-sm">Follow Us:</span>

							<span className="ml-2 inline-flex size-8 items-center justify-center rounded-full border font-semibold text-sm">
								in
							</span>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}

/* SMALL SECURITY ICON */

function ShieldIcon() {
	return (
		<svg
			className="size-3.5 text-emerald-500"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			viewBox="0 0 24 24"
		>
			<title>Secure</title>

			<path
				d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>

			<path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}
