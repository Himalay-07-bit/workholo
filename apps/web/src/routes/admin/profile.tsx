"use client";

import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Building2, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/admin/profile")({
	component: ProfilePage,
});

function ProfilePage() {
	const { data: session } = authClient.useSession();

	const userName = session?.user.name?.trim() || "Admin";
	const userEmail = session?.user.email || "Not available";

	const [multipleLogin, setMultipleLogin] = useState(true);
	const [azureSso, setAzureSso] = useState(false);

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="p-4 md:p-6">
				<div className="mx-auto max-w-[1600px]">
					{/* Page */}
					<Card className="overflow-hidden rounded-md border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* Header */}
						<CardHeader className="border-slate-200 border-b px-4 py-3 dark:border-slate-800">
							<CardTitle className="font-medium text-[#102b55] text-sm dark:text-white">
								User Profile Details
							</CardTitle>
						</CardHeader>

						<CardContent className="p-5">
							<div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
								{/* ============================= */}
								{/* LEFT - USER INFORMATION */}
								{/* ============================= */}

								<div className="overflow-hidden border border-slate-200 dark:border-slate-800">
									{/* Section title */}
									<div className="border-slate-200 border-b bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-900/70">
										<span className="font-medium text-slate-700 text-xs dark:text-slate-200">
											User Information
										</span>
									</div>

									{/* User */}
									<ProfileRow label="Name" value={userName} />

									<ProfileRow label="Email" value={userEmail} />

									<ProfileRow label="Login Id" value={userEmail} />

									<ProfileRow label="Number" value="Not available" />

									<ProfileRow label="Alternate Number" value="—" />

									<ProfileRow label="Recording Access" value="Approved" />

									<ProfileRow label="Secondary Email" value="—" />

									<ProfileRow
										label="Billing Address"
										multiline
										value="Not available"
									/>

									<ProfileRow label="Business Name" value="Not available" />

									<ProfileRow label="Business Website" value="—" />

									{/* Manage Multiple Login */}
									<div className="grid min-h-[55px] grid-cols-[180px_1fr] border-slate-200 border-b dark:border-slate-800">
										<div className="flex items-center px-3 text-slate-600 text-xs dark:text-slate-300">
											Manage Multiple
											<br />
											Login
										</div>

										<div className="flex items-center justify-end px-3">
											<Toggle
												checked={multipleLogin}
												label="Manage Multiple Login"
												onClick={() => setMultipleLogin((value) => !value)}
											/>
										</div>
									</div>

									{/* Azure SSO */}
									<div className="grid min-h-[55px] grid-cols-[180px_1fr]">
										<div className="flex items-center px-3 text-slate-600 text-xs dark:text-slate-300">
											Link Azure SSO
										</div>

										<div className="flex items-center justify-end px-3">
											<Toggle
												checked={azureSso}
												label="Link Azure SSO"
												onClick={() => setAzureSso((value) => !value)}
											/>
										</div>
									</div>
								</div>

								{/* ============================= */}
								{/* RIGHT SIDE */}
								{/* ============================= */}

								<div className="space-y-4">
									{/* Business Information */}
									<ProfileCard icon={Building2} title="Business Details">
										<ProfileRow label="Business name" value="Not available" />

										<ProfileRow label="Business website" value="—" />
									</ProfileCard>

									{/* GST / PAN / KYC */}
									<ProfileCard icon={ShieldCheck} title="Verification Details">
										<ProfileRow label="GST Number" value="Not available" />

										<ProfileRow label="PAN Number" value="—" />

										<div className="flex min-h-12 items-center justify-between gap-6 px-5 py-3">
											<span className="shrink-0 text-slate-500 text-xs dark:text-slate-400">
												KYC Form Status
											</span>

											<span className="rounded-full bg-green-600 px-3 py-0.5 text-[10px] text-white">
												Verified
											</span>
										</div>
									</ProfileCard>
								</div>
							</div>

							{/* ============================= */}
							{/* SUPPORT MESSAGE */}
							{/* ============================= */}

							<div className="mt-7 flex items-center gap-2 text-slate-500 text-xs dark:text-slate-400">
								<Mail className="size-4 text-[#0757ff]" />

								<span>
									In order to change Profile Information Contact: 0800-084-3663
								</span>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}

/* ========================================================= */
/* PROFILE CARD */
/* ========================================================= */

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
		<Card className="overflow-hidden rounded-none border-slate-200 bg-white shadow-none dark:border-slate-800 dark:bg-[#0b1728]">
			<CardHeader className="flex flex-row items-center gap-2 border-slate-200 border-b bg-slate-50 px-3 py-3 dark:border-slate-800 dark:bg-slate-900/70">
				<Icon className="size-4 text-[#0757ff]" />

				<CardTitle className="font-medium text-[#263b5b] text-xs dark:text-slate-200">
					{title}
				</CardTitle>
			</CardHeader>

			<CardContent className="p-0">{children}</CardContent>
		</Card>
	);
}

/* ========================================================= */
/* PROFILE ROW */
/* ========================================================= */

function ProfileRow({
	label,
	value,
	multiline = false,
}: {
	label: string;
	value: string;
	multiline?: boolean;
}) {
	return (
		<div
			className={`grid min-h-[40px] grid-cols-[180px_1fr] border-slate-200 border-b dark:border-slate-800 ${
				multiline ? "min-h-[65px]" : ""
			}`}
		>
			<div className="flex items-center px-3 text-slate-600 text-xs dark:text-slate-300">
				{label}
			</div>

			<div
				className={`flex items-center justify-end px-3 text-right text-slate-700 text-xs dark:text-slate-200 ${
					multiline ? "py-3" : ""
				}`}
			>
				<span className="break-words">{value}</span>
			</div>
		</div>
	);
}

/* ========================================================= */
/* TOGGLE */
/* ========================================================= */

function Toggle({
	checked,
	onClick,
	label,
}: {
	checked: boolean;
	onClick: () => void;
	label: string;
}) {
	return (
		<button
			aria-label={label}
			aria-pressed={checked}
			className={`relative h-[16px] w-[30px] rounded-full transition-colors ${
				checked ? "bg-[#75c7c3]" : "bg-slate-400"
			}`}
			onClick={onClick}
			type="button"
		>
			<span
				className={`absolute top-[2px] h-3 w-3 rounded-full bg-white shadow-sm transition-transform ${
					checked ? "left-[16px]" : "left-[2px]"
				}`}
			/>
		</button>
	);
}
