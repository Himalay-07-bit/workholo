import { createFileRoute } from "@tanstack/react-router";
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
	},
	{
		title: "Total Calls",
		value: "1,248",
		description: "Calls today",
		icon: Phone,
	},
	{
		title: "Answered Calls",
		value: "982",
		description: "78.7% answer rate",
		icon: ArrowUpRight,
	},
	{
		title: "Missed Calls",
		value: "266",
		description: "21.3% of total calls",
		icon: PhoneMissed,
	},
];

function AdminDashboard() {
	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 space-y-6 bg-muted/30 p-6">
				{/* Page heading */}
				<div>
					<h2 className="font-semibold text-2xl tracking-tight">Overview</h2>

					<p className="text-muted-foreground">
						Monitor your calling operations and agents.
					</p>
				</div>

				{/* Statistics */}
				<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
					{stats.map((stat) => {
						const Icon = stat.icon;

						return (
							<Card key={stat.title}>
								<CardHeader className="flex flex-row items-center justify-between pb-2">
									<CardTitle className="font-medium text-sm">
										{stat.title}
									</CardTitle>

									<Icon className="size-5 text-muted-foreground" />
								</CardHeader>

								<CardContent>
									<div className="font-bold text-2xl">{stat.value}</div>

									<p className="mt-1 text-muted-foreground text-xs">
										{stat.description}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				{/* Main dashboard sections */}
				<div className="grid gap-6 lg:grid-cols-3">
					{/* Call activity */}
					<Card className="lg:col-span-2">
						<CardHeader>
							<CardTitle>Call Activity</CardTitle>
						</CardHeader>

						<CardContent>
							<div className="flex h-72 items-center justify-center rounded-lg border border-dashed">
								<div className="text-center">
									<Activity className="mx-auto mb-3 size-10 text-muted-foreground" />

									<p className="font-medium">Call activity chart</p>

									<p className="text-muted-foreground text-sm">
										We'll connect this to real call data later.
									</p>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Quick actions */}
					<Card>
						<CardHeader>
							<CardTitle>Quick Access</CardTitle>
						</CardHeader>

						<CardContent className="space-y-3">
							<Button className="w-full justify-start gap-3">
								<Users className="size-4" />
								Manage Agents
							</Button>

							<Button className="w-full justify-start gap-3" variant="outline">
								<Phone className="size-4" />
								View Live Calls
							</Button>

							<Button className="w-full justify-start gap-3" variant="outline">
								<ArrowDownLeft className="size-4" />
								Call Logs
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Live calls */}
				<Card>
					<CardHeader>
						<CardTitle>Live Calls</CardTitle>
					</CardHeader>

					<CardContent>
						<div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
							<div className="text-center">
								<Phone className="mx-auto mb-2 size-8 text-muted-foreground" />

								<p className="font-medium">Live calls will appear here</p>

								<p className="text-muted-foreground text-sm">
									Real-time call monitoring will be connected later.
								</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
