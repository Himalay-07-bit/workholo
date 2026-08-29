import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import {
	Activity,
	ArrowDownLeft,
	ArrowUpRight,
	Phone,
	PhoneCall,
	PhoneMissed,
	Users,
} from "lucide-react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/")({
	component: AdminDashboard,
});

const stats = [
	{
		title: "Active Calls",
		value: "11",
		description: "Currently in progress",
		icon: PhoneCall,
		type: "active",
	},
	{
		title: "Total Calls",
		value: "1,248",
		description: "Calls today",
		icon: Phone,
		type: "total",
	},
	{
		title: "Answered Calls",
		value: "982",
		description: "78.7% answer rate",
		icon: ArrowUpRight,
		type: "answered",
	},
	{
		title: "Missed Calls",
		value: "266",
		description: "21.3% of total calls",
		icon: PhoneMissed,
		type: "missed",
	},
];

function AdminDashboard() {
	const navigate = useNavigate();

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-slate-950">
			<AdminTopbar />

			<main className="flex-1 p-5 lg:p-7">
				<div className="mx-auto max-w-7xl space-y-6">
					{/* PAGE HEADING */}
					<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
						<div>
							<div className="mb-2 flex items-center gap-2">
								<span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />

								<span className="font-semibold text-[#0757ff] text-[10px] uppercase tracking-[0.12em] dark:text-blue-400">
									Admin Control Center
								</span>
							</div>

							<h1 className="font-bold text-2xl text-[#102b55] tracking-tight lg:text-3xl dark:text-white">
								Dashboard Overview
							</h1>

							<p className="mt-1 text-slate-500 text-sm dark:text-slate-400">
								Monitor your calling operations and agents.
							</p>
						</div>

						<div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
							<div className="flex size-8 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950 dark:text-blue-400">
								<Activity className="size-4" />
							</div>

							<div>
								<p className="font-semibold text-[#102b55] text-xs dark:text-white">
									System Status
								</p>

								<div className="flex items-center gap-1.5">
									<span className="size-1.5 rounded-full bg-emerald-400" />

									<span className="text-[10px] text-slate-400 dark:text-slate-500">
										All systems operational
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* STATISTICS */}
					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
						{stats.map((stat) => {
							const Icon = stat.icon;

							let iconStyle =
								"bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400";

							if (stat.type === "active") {
								iconStyle =
									"bg-blue-50 text-[#0757ff] dark:bg-blue-950 dark:text-blue-400";
							} else if (stat.type === "answered") {
								iconStyle =
									"bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400";
							} else if (stat.type === "missed") {
								iconStyle =
									"bg-red-50 text-red-500 dark:bg-red-950/50 dark:text-red-400";
							}

							return (
								<Card
									className="rounded-xl border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
									key={stat.title}
								>
									<CardContent className="p-5">
										<div className="flex items-start justify-between">
											<div>
												<p className="font-medium text-slate-500 text-xs dark:text-slate-400">
													{stat.title}
												</p>

												<p className="mt-2 font-bold text-3xl text-[#102b55] tracking-tight dark:text-white">
													{stat.value}
												</p>
											</div>

											<div
												className={`flex size-10 items-center justify-center rounded-xl ${iconStyle}`}
											>
												<Icon className="size-5" />
											</div>
										</div>

										<div className="mt-3 flex items-center gap-1.5">
											{stat.type === "active" ? (
												<span className="size-1.5 rounded-full bg-emerald-400" />
											) : null}

											<p className="text-[10px] text-slate-400 dark:text-slate-500">
												{stat.description}
											</p>
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>

					{/* MAIN DASHBOARD */}
					<div className="grid gap-5 lg:grid-cols-3">
						{/* CALL ACTIVITY */}
						<Card className="rounded-xl border-slate-200 bg-white shadow-sm lg:col-span-2 dark:border-slate-800 dark:bg-slate-900">
							<CardHeader className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
								<div className="flex items-center justify-between">
									<div>
										<CardTitle className="font-semibold text-[#102b55] text-sm dark:text-white">
											Call Activity
										</CardTitle>

										<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
											Today's calling performance
										</p>
									</div>

									<div className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
										<Activity className="size-3.5" />

										<span className="font-medium text-[10px]">Live</span>
									</div>
								</div>
							</CardHeader>

							<CardContent className="p-5">
								<div className="relative flex h-64 items-center justify-center overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-[#f8fbff] to-[#eef5ff] dark:border-slate-800 dark:from-slate-950 dark:to-slate-900">
									{/* Decorative graph lines */}
									<div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,#dbeafe_1px,transparent_1px),linear-gradient(to_bottom,#dbeafe_1px,transparent_1px)] [background-size:45px_45px] dark:opacity-20 dark:[background-image:linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)]" />

									<div className="relative text-center">
										<div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-blue-50 text-[#0757ff] shadow-sm dark:bg-blue-950 dark:text-blue-400">
											<Activity className="size-6" />
										</div>

										<p className="font-semibold text-[#102b55] text-sm dark:text-white">
											Call activity chart
										</p>

										<p className="mt-1 max-w-xs text-[10px] text-slate-400 leading-5 dark:text-slate-500">
											We'll connect this to real call data later.
										</p>
									</div>
								</div>

								{/* MINI METRICS */}
								<div className="mt-4 grid grid-cols-3 gap-3">
									<div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/70">
										<p className="text-[9px] text-slate-400 dark:text-slate-500">
											Peak Hour
										</p>

										<p className="mt-1 font-semibold text-[#102b55] text-xs dark:text-white">
											11:00 AM
										</p>
									</div>

									<div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/70">
										<p className="text-[9px] text-slate-400 dark:text-slate-500">
											Avg. Duration
										</p>

										<p className="mt-1 font-semibold text-[#102b55] text-xs dark:text-white">
											04:32 min
										</p>
									</div>

									<div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/70">
										<p className="text-[9px] text-slate-400 dark:text-slate-500">
											Answer Rate
										</p>

										<p className="mt-1 font-semibold text-emerald-600 text-xs dark:text-emerald-400">
											78.7%
										</p>
									</div>
								</div>
							</CardContent>
						</Card>

						{/* QUICK ACCESS */}
						<Card className="rounded-xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
							<CardHeader className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
								<CardTitle className="font-semibold text-[#102b55] text-sm dark:text-white">
									Quick Access
								</CardTitle>

								<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
									Common admin actions
								</p>
							</CardHeader>

							<CardContent className="space-y-2.5 p-5">
								<Button
									className="h-11 w-full justify-start gap-3 rounded-lg bg-[#0757ff] text-xs shadow-blue-500/15 shadow-md hover:bg-[#004be0] dark:bg-blue-600 dark:hover:bg-blue-500"
									onClick={() =>
										navigate({
											to: "/admin/show-users",
										})
									}
								>
									<div className="flex size-7 items-center justify-center rounded-md bg-white/15">
										<Users className="size-4" />
									</div>
									Manage Agents
								</Button>

								<Button
									className="h-11 w-full justify-start gap-3 rounded-lg border-slate-200 text-slate-600 text-xs hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									onClick={() =>
										navigate({
											to: "/admin/livecalls",
										})
									}
									variant="outline"
								>
									<div className="flex size-7 items-center justify-center rounded-md bg-blue-50 text-[#0757ff] dark:bg-blue-950 dark:text-blue-400">
										<Phone className="size-4" />
									</div>
									View Live Calls
								</Button>

								<Button
									className="h-11 w-full justify-start gap-3 rounded-lg border-slate-200 text-slate-600 text-xs hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
									onClick={() =>
										navigate({
											to: "/admin/call-logs",
										})
									}
									variant="outline"
								>
									<div className="flex size-7 items-center justify-center rounded-md bg-blue-50 text-[#0757ff] dark:bg-blue-950 dark:text-blue-400">
										<ArrowDownLeft className="size-4" />
									</div>
									Call Logs
								</Button>

								<div className="mt-4 rounded-lg border border-blue-100 bg-blue-50/60 p-3 dark:border-blue-900/50 dark:bg-blue-950/30">
									<p className="font-semibold text-[#102b55] text-[10px] dark:text-blue-300">
										Need to manage users?
									</p>

									<p className="mt-1 text-[9px] text-slate-500 leading-4 dark:text-slate-400">
										Add, edit and manage calling agents from the Users section.
									</p>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* LIVE CALLS */}
					<Card className="rounded-xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
						<CardHeader className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<div className="flex items-center justify-between">
								<div>
									<CardTitle className="font-semibold text-[#102b55] text-sm dark:text-white">
										Live Calls
									</CardTitle>

									<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
										Real-time call monitoring
									</p>
								</div>

								<div className="flex items-center gap-1.5">
									<span className="size-2 animate-pulse rounded-full bg-emerald-400" />

									<span className="font-medium text-[10px] text-emerald-600 dark:text-emerald-400">
										11 Active
									</span>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-5">
							<div className="flex min-h-28 items-center justify-center rounded-xl border border-blue-100 border-dashed bg-[#f8fbff] dark:border-slate-700 dark:bg-slate-950">
								<div className="text-center">
									<div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-xl bg-blue-50 text-[#0757ff] dark:bg-blue-950 dark:text-blue-400">
										<PhoneCall className="size-5" />
									</div>

									<p className="font-semibold text-[#102b55] text-xs dark:text-white">
										Live calls will appear here
									</p>

									<p className="mt-1 text-[10px] text-slate-400 dark:text-slate-500">
										Real-time call monitoring will be connected later.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* FOOTER */}
					<div className="flex items-center justify-center gap-2 pb-2 text-[9px] text-slate-400 dark:text-slate-600">
						<ShieldIcon />

						<span>WORKHOLO Calling CRM • Secure admin workspace</span>
					</div>
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
