import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Building2, Mail, ShieldCheck, UserRound } from "lucide-react";

import { AdminTopbar } from "@/components/admin/admin-topbar";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/admin/profile")({
	component: ProfilePage,
});

function ProfilePage() {
	const { data: session } = authClient.useSession();
	const userName = session?.user.name?.trim() || "Admin";
	const userEmail = session?.user.email || "Not available";
	const userInitial = userName.charAt(0).toUpperCase();

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4">
				<div className="mx-auto">
					<div className="mb-5 flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-xl bg-[#0757ff] text-white shadow-blue-500/20 shadow-md dark:bg-blue-600">
							<UserRound className="size-4" />
						</div>

						<div>
							<h1 className="font-bold text-[#102b55] text-lg dark:text-slate-100">
								User Profile Details
							</h1>
							<p className="text-slate-500 text-xs dark:text-slate-400">
								Your account and organization information.
							</p>
						</div>
					</div>

					<div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
						<Card className="border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
							<CardHeader className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
								<div className="flex items-center gap-3">
									<div className="flex size-12 items-center justify-center rounded-full bg-[#0757ff] font-medium text-lg text-white">
										{userInitial}
									</div>
									<div className="min-w-0">
										<CardTitle className="truncate text-[#102b55] text-sm dark:text-slate-100">
											{userName}
										</CardTitle>
										<p className="mt-0.5 truncate text-slate-500 text-xs dark:text-slate-400">
											{userEmail}
										</p>
									</div>
								</div>
							</CardHeader>

							<CardContent className="p-0">
								<ProfileRow label="Name" value={userName} />
								<ProfileRow label="Email" value={userEmail} />
								<ProfileRow label="Login ID" value={userEmail} />
								<ProfileRow label="Phone number" value="Not available" />
								<ProfileRow label="Alternate number" value="Not available" />
								<ProfileRow label="Recording access" value="Not available" />
								<ProfileRow label="Secondary email" value="Not available" />
								<ProfileRow label="Billing address" value="Not available" />
							</CardContent>
						</Card>

						<div className="space-y-4">
							<ProfileCard icon={Building2} title="Business Details">
								<ProfileRow label="Business name" value="Not available" />
								<ProfileRow label="Business website" value="Not available" />
							</ProfileCard>

							<ProfileCard icon={ShieldCheck} title="Verification Details">
								<ProfileRow label="GST number" value="Not available" />
								<ProfileRow label="PAN number" value="Not available" />
								<ProfileRow label="KYC form status" value="Not available" />
							</ProfileCard>
						</div>
					</div>

					<div className="mt-5 flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
						<Mail className="size-4 text-[#0757ff]" />
						<span>Contact support to update profile information.</span>
					</div>
				</div>
			</main>
		</div>
	);
}

function ProfileCard({
	children,
	icon: Icon,
	title,
}: {
	children: React.ReactNode;
	icon: typeof Building2;
	title: string;
}) {
	return (
		<Card className="border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
			<CardHeader className="flex flex-row items-center gap-2 border-slate-100 border-b px-5 py-3 dark:border-slate-800">
				<Icon className="size-4 text-[#0757ff]" />
				<CardTitle className="text-[#263b5b] text-sm dark:text-slate-200">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className="p-0">{children}</CardContent>
		</Card>
	);
}

function ProfileRow({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex min-h-12 items-center justify-between gap-6 border-slate-100 border-b px-5 py-3 last:border-b-0 dark:border-slate-800">
			<span className="shrink-0 text-slate-500 text-xs dark:text-slate-400">
				{label}
			</span>
			<span className="break-all text-right text-[#263b5b] text-xs dark:text-slate-200">
				{value}
			</span>
		</div>
	);
}
