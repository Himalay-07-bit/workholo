"use client";

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/reset-password")({
	component: ResetPasswordPage,
});

function ResetPasswordPage() {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [showCurrent, setShowCurrent] = useState(false);
	const [showNew, setShowNew] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setError("");
		setSuccess("");

		if (!currentPassword) {
			setError("Please enter your current password.");
			return;
		}

		if (!newPassword) {
			setError("Please enter your new password.");
			return;
		}

		if (newPassword.length < 8) {
			setError("New password must contain at least 8 characters.");
			return;
		}

		if (!confirmPassword) {
			setError("Please confirm your new password.");
			return;
		}

		if (newPassword !== confirmPassword) {
			setError("New password and confirmation password do not match.");
			return;
		}

		setSuccess("Password details are valid.");

		// Connect the password update API here later.
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1500px]">
					{/* Page Header */}
					<div className="mb-5">
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-lg bg-[#0757ff] text-white shadow-sm">
								<LockKeyhole className="size-5" />
							</div>

							<div>
								<h1 className="font-semibold text-[#102b55] text-lg dark:text-white">
									Reset Password
								</h1>

								<p className="mt-0.5 text-slate-500 text-xs dark:text-slate-400">
									Update your account password securely.
								</p>
							</div>
						</div>
					</div>

					{/* Main Card */}
					<section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* Card Header */}
						<div className="border-slate-100 border-b px-5 py-4 dark:border-slate-800">
							<h2 className="font-medium text-[#263b5b] text-sm dark:text-slate-100">
								Change Password
							</h2>

							<p className="mt-1 text-slate-500 text-xs dark:text-slate-400">
								Enter your current password and choose a new password for your
								account.
							</p>
						</div>

						{/* Form */}
						<form className="p-5 md:p-7 lg:p-8" onSubmit={handleSubmit}>
							<div className="max-w-[1200px]">
								{/* Current Password */}
								<div className="max-w-[580px]">
									<PasswordField
										id="current-password"
										label="Current Password"
										onChange={setCurrentPassword}
										onToggle={() => setShowCurrent((value) => !value)}
										showPassword={showCurrent}
										value={currentPassword}
									/>
								</div>

								{/* New Password + Confirm */}
								<div className="mt-8 grid gap-6 md:grid-cols-2">
									<PasswordField
										id="new-password"
										label="New Password"
										onChange={setNewPassword}
										onToggle={() => setShowNew((value) => !value)}
										showPassword={showNew}
										value={newPassword}
									/>

									<PasswordField
										id="confirm-password"
										label="Confirm New Password"
										onChange={setConfirmPassword}
										onToggle={() => setShowConfirm((value) => !value)}
										showPassword={showConfirm}
										value={confirmPassword}
									/>
								</div>

								{/* Password Hint */}
								<div className="mt-5 rounded-lg border border-blue-100 bg-blue-50/70 px-4 py-3 dark:border-blue-900/40 dark:bg-blue-950/20">
									<p className="font-medium text-blue-700 text-xs dark:text-blue-300">
										Password requirements
									</p>

									<p className="mt-1 text-[11px] text-blue-600/80 dark:text-blue-400">
										Use at least 8 characters. Your new password must match the
										confirmation password.
									</p>
								</div>

								{/* Error */}
								{error ? (
									<div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600 text-xs dark:border-red-900/50 dark:bg-red-950/20 dark:text-red-400">
										{error}
									</div>
								) : null}

								{/* Success */}
								{success ? (
									<div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-600 text-xs dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-400">
										{success}
									</div>
								) : null}

								{/* Actions */}
								<div className="mt-7 flex items-center gap-3">
									<Button
										className="h-9 rounded-md bg-[#0757ff] px-5 text-white text-xs shadow-sm hover:bg-[#004be0]"
										type="submit"
									>
										Update Password
									</Button>

									<Button
										className="h-9 rounded-md px-5 text-xs"
										onClick={() => {
											setCurrentPassword("");
											setNewPassword("");
											setConfirmPassword("");
											setError("");
											setSuccess("");
										}}
										type="button"
										variant="outline"
									>
										Clear
									</Button>
								</div>
							</div>
						</form>
					</section>
				</div>
			</main>
		</div>
	);
}

/* ========================================================= */
/* PASSWORD FIELD                                             */
/* ========================================================= */

function PasswordField({
	id,
	label,
	value,
	onChange,
	showPassword,
	onToggle,
}: {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	showPassword: boolean;
	onToggle: () => void;
}) {
	return (
		<div>
			<label
				className="mb-2 block font-medium text-slate-600 text-xs dark:text-slate-300"
				htmlFor={id}
			>
				{label}
			</label>

			<div className="relative">
				<LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />

				<Input
					autoComplete={
						id === "current-password" ? "current-password" : "new-password"
					}
					className="h-10 rounded-md border-slate-200 bg-slate-50/50 pr-10 pl-10 text-xs shadow-none transition focus:border-[#0757ff] focus:ring-2 focus:ring-[#0757ff]/10 dark:border-slate-700 dark:bg-slate-900/50"
					id={id}
					onChange={(event) => onChange(event.target.value)}
					type={showPassword ? "text" : "password"}
					value={value}
				/>

				<button
					aria-label={showPassword ? `Hide ${label}` : `Show ${label}`}
					className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center text-slate-400 transition hover:text-slate-600 dark:hover:text-slate-200"
					onClick={onToggle}
					type="button"
				>
					{showPassword ? (
						<EyeOff className="size-4" />
					) : (
						<Eye className="size-4" />
					)}
				</button>
			</div>
		</div>
	);
}
