"use client";

import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/notification-management")({
	component: NotificationManagementPage,
});

type NotificationSettings = {
	sms: boolean;
	email: boolean;
	call: boolean;
	whatsapp: boolean;
};

type NotificationCategory = {
	id: string;
	name: string;
};

const categories: NotificationCategory[] = [
	{
		id: "products",
		name: "Products and Subscriptions",
	},
	{
		id: "renewals",
		name: "Renewals",
	},
	{
		id: "payments",
		name: "Payments and Charges",
	},
	{
		id: "due",
		name: "Due Charges",
	},
	{
		id: "monthly",
		name: "Monthly Account Summaries",
	},
	{
		id: "threshold",
		name: "Threshold",
	},
];

const defaultSettings: Record<string, NotificationSettings> = {
	products: {
		sms: true,
		email: true,
		call: false,
		whatsapp: false,
	},
	renewals: {
		sms: true,
		email: true,
		call: false,
		whatsapp: false,
	},
	payments: {
		sms: true,
		email: true,
		call: false,
		whatsapp: false,
	},
	due: {
		sms: true,
		email: true,
		call: false,
		whatsapp: false,
	},
	monthly: {
		sms: true,
		email: true,
		call: false,
		whatsapp: false,
	},
	threshold: {
		sms: true,
		email: true,
		call: false,
		whatsapp: false,
	},
};

function NotificationSwitch({
	checked,
	disabled = false,
	onChange,
	label,
}: {
	checked: boolean;
	disabled?: boolean;
	onChange?: () => void;
	label: string;
}) {
	let backgroundClass = "bg-slate-400";
	if (disabled) {
		backgroundClass = "cursor-not-allowed bg-slate-400";
	} else if (checked) {
		backgroundClass = "bg-[#79c8c4]";
	}

	return (
		<button
			aria-label={label}
			aria-pressed={checked}
			className={`relative h-[16px] w-[30px] rounded-full transition-colors ${backgroundClass}`}
			disabled={disabled}
			onClick={onChange}
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

function NotificationManagementPage() {
	const [settings, setSettings] = useState(defaultSettings);

	const updateSetting = (
		categoryId: string,
		field: keyof NotificationSettings
	) => {
		setSettings((current) => ({
			...current,
			[categoryId]: {
				...current[categoryId],
				[field]: !current[categoryId][field],
			},
		}));
	};

	const enableAll = () => {
		setSettings((current) => {
			const updated = { ...current };

			for (const category of categories) {
				updated[category.id] = {
					sms: true,
					email: true,
					call: true,
					whatsapp: false,
				};
			}

			return updated;
		});
	};

	const handleCancel = () => {
		setSettings(defaultSettings);
	};

	const handleSubmit = () => {
		console.log("Notification settings:", settings);
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1600px]">
					<section className="overflow-hidden border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* Header */}
						<div className="flex items-center justify-between border-slate-200 border-b px-4 py-3 dark:border-slate-800">
							<h1 className="font-medium text-[#102b55] text-sm dark:text-white">
								Notification Management
							</h1>

							<Button
								className="h-8 rounded-sm border border-slate-300 bg-white px-3 text-slate-700 text-xs shadow-none hover:bg-slate-50 dark:border-slate-700 dark:bg-[#0b1728] dark:text-slate-200"
								onClick={enableAll}
								type="button"
							>
								Enable All
							</Button>
						</div>

						{/* Notification table */}
						<div className="p-4">
							<div className="overflow-x-auto">
								<table className="w-full min-w-[900px] border-collapse text-xs">
									<thead>
										<tr className="bg-slate-100 dark:bg-slate-900">
											<th className="border border-slate-200 px-2 py-3 text-left font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
												Notification Category
											</th>

											<th className="w-[190px] border border-slate-200 px-2 py-3 text-center font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
												SMS
											</th>

											<th className="w-[190px] border border-slate-200 px-2 py-3 text-center font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
												Email
											</th>

											<th className="w-[190px] border border-slate-200 px-2 py-3 text-center font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
												Call
											</th>

											<th className="w-[190px] border border-slate-200 px-2 py-3 text-center font-medium text-slate-600 dark:border-slate-800 dark:text-slate-300">
												<div className="flex items-center justify-center gap-1">
													WhatsApp
													<span className="rounded-sm bg-slate-500 px-1.5 py-0.5 text-[9px] text-white">
														Coming Soon
													</span>
												</div>
											</th>
										</tr>
									</thead>

									<tbody>
										{categories.map((category, index) => {
											const row = settings[category.id];

											return (
												<tr
													className={
														index % 2 === 0
															? "bg-slate-50/70 dark:bg-slate-900/30"
															: "bg-white dark:bg-[#0b1728]"
													}
													key={category.id}
												>
													<td className="border border-slate-200 px-2 py-3 font-semibold text-slate-800 dark:border-slate-800 dark:text-slate-200">
														{category.name}
													</td>

													<td className="border border-slate-200 px-2 py-3 text-center dark:border-slate-800">
														<div className="flex justify-center">
															<NotificationSwitch
																checked={row.sms}
																label={`${category.name} SMS`}
																onChange={() =>
																	updateSetting(category.id, "sms")
																}
															/>
														</div>
													</td>

													<td className="border border-slate-200 px-2 py-3 text-center dark:border-slate-800">
														<div className="flex justify-center">
															<NotificationSwitch
																checked={row.email}
																label={`${category.name} Email`}
																onChange={() =>
																	updateSetting(category.id, "email")
																}
															/>
														</div>
													</td>

													<td className="border border-slate-200 px-2 py-3 text-center dark:border-slate-800">
														<div className="flex justify-center">
															<NotificationSwitch
																checked={row.call}
																label={`${category.name} Call`}
																onChange={() =>
																	updateSetting(category.id, "call")
																}
															/>
														</div>
													</td>

													<td className="border border-slate-200 px-2 py-3 text-center dark:border-slate-800">
														<div className="flex justify-center">
															<NotificationSwitch
																checked={false}
																disabled
																label={`${category.name} WhatsApp`}
															/>
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>

							{/* Bottom buttons */}
							<div className="flex justify-end gap-1 border-slate-200 border-t pt-2 dark:border-slate-800">
								<Button
									className="h-7 rounded-none bg-[#0db1c4] px-3 text-white text-xs hover:bg-[#079dad]"
									onClick={handleCancel}
									type="button"
								>
									Cancel
								</Button>

								<Button
									className="h-7 rounded-none bg-[#0db1c4] px-3 text-white text-xs hover:bg-[#079dad]"
									onClick={handleSubmit}
									type="button"
								>
									Submit
								</Button>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
