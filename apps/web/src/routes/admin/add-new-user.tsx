// biome-ignore-all lint/performance/noJsxPropsBind: Form controls need field-specific local handlers.
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import { Label } from "@workholo/ui/components/label";
import { Switch } from "@workholo/ui/components/switch";
import {
	ArrowLeft,
	ArrowRight,
	Check,
	LogIn,
	Mail,
	Phone,
	Settings,
	ShieldCheck,
	User,
	UserPlus,
	Users,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/add-new-user")({
	component: AddUserPage,
});

const steps = [
	{
		id: 1,
		title: "General Details",
		description: "Basic information",
		icon: User,
	},
	{
		id: 2,
		title: "User Settings",
		description: "Calling & team setup",
		icon: Settings,
	},
	{
		id: 3,
		title: "Web Login",
		description: "Access & security",
		icon: LogIn,
	},
];

type FormData = {
	name: string;
	phone: string;
	designation: string;
	email: string;

	team: string;
	callForwardNumber: string;
	callerIds: string;
	department: string;
	callingAgent: boolean;
	createExtension: boolean;

	role: string;
	loginId: string;
	autoGeneratePassword: boolean;
	twoFactor: boolean;
	loginBasedCalling: boolean;
	blockWebLogin: boolean;
	agentDispositions: boolean;
};

const initialForm: FormData = {
	name: "",
	phone: "",
	designation: "",
	email: "",

	team: "",
	callForwardNumber: "",
	callerIds: "",
	department: "",
	callingAgent: true,
	createExtension: false,

	role: "Agent",
	loginId: "",
	autoGeneratePassword: true,
	twoFactor: false,
	loginBasedCalling: false,
	blockWebLogin: false,
	agentDispositions: false,
};

function getStepClassName(active: boolean, completed: boolean) {
	if (active) {
		return "border-[#0757ff] bg-[#0757ff] text-white shadow-md shadow-blue-500/20 dark:border-blue-500 dark:bg-blue-600 dark:shadow-blue-900/30";
	}

	if (completed) {
		return "border-blue-100 bg-blue-50 text-[#0757ff] dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-400";
	}

	return "border-slate-200 bg-slate-50 text-slate-400 hover:border-blue-100 hover:bg-blue-50/50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-500 dark:hover:border-blue-900 dark:hover:bg-blue-950/40 dark:hover:text-blue-400";
}

function AddUserPage() {
	const navigate = useNavigate();

	const [step, setStep] = useState(1);
	const [form, setForm] = useState<FormData>(initialForm);
	const [created, setCreated] = useState(false);

	function updateField<K extends keyof FormData>(field: K, value: FormData[K]) {
		setForm((current) => ({
			...current,
			[field]: value,
		}));
	}

	function nextStep() {
		setStep((value) => Math.min(value + 1, 3));
	}

	function previousStep() {
		setStep((value) => Math.max(value - 1, 1));
	}

	function clearForm() {
		setForm(initialForm);
		setStep(1);
		setCreated(false);
	}

	function createUser() {
		setCreated(true);
	}

	return (
		<div className="min-h-svh bg-[#eef3f9] dark:bg-[#07111f]">
			{/* =====================================================
			    PAGE HEADER
			===================================================== */}
			<header className="border-slate-200 border-b bg-white dark:border-slate-800 dark:bg-[#0b1728]">
				<div className="flex items-center justify-between gap-4 px-5 py-4 lg:px-7">
					<div className="flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-xl bg-[#0757ff] text-white shadow-blue-500/20 shadow-md dark:bg-blue-600 dark:shadow-blue-900/30">
							<UserPlus className="size-4" />
						</div>

						<div>
							<div className="flex items-center gap-2">
								<h1 className="font-bold text-[#102b55] text-lg tracking-tight dark:text-slate-100">
									Add New User
								</h1>

								<span className="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-[#0757ff] text-[9px] dark:bg-blue-950/60 dark:text-blue-400">
									ADMIN
								</span>
							</div>

							<p className="text-slate-500 text-xs dark:text-slate-400">
								Create and configure a new platform user.
							</p>
						</div>
					</div>

					<Button
						className="h-9 rounded-lg border-slate-200 text-slate-600 text-xs hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
						onClick={() =>
							navigate({
								to: "/admin/users",
							})
						}
						type="button"
						variant="outline"
					>
						<ArrowLeft className="mr-1.5 size-3.5" />
						Back to Users
					</Button>
				</div>
			</header>

			{/* =====================================================
			    MAIN
			===================================================== */}
			<main className="p-4 lg:p-6">
				<div className="mx-auto max-w-6xl">
					{/* =================================================
					    MAIN CARD
					================================================= */}
					<Card className="overflow-hidden rounded-2xl border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* =================================================
						    CARD HEADER
						================================================= */}
						<CardHeader className="border-slate-100 border-b bg-slate-50/60 px-5 py-4 dark:border-slate-800 dark:bg-slate-900/50">
							<div className="flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-lg bg-blue-50 text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400">
									{step === 1 && <User className="size-4" />}

									{step === 2 && <Settings className="size-4" />}

									{step === 3 && <ShieldCheck className="size-4" />}
								</div>

								<div>
									<CardTitle className="font-semibold text-[#102b55] text-sm dark:text-slate-100">
										{steps[step - 1]?.title}
									</CardTitle>

									<p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
										{steps[step - 1]?.description}
									</p>
								</div>
							</div>
						</CardHeader>

						<CardContent className="p-5 lg:p-6">
							{/* =================================================
							    STEPS
							================================================= */}
							<div className="mb-6 flex items-center">
								{steps.map((item, index) => {
									const Icon = item.icon;
									const active = step === item.id;
									const completed = step > item.id;

									return (
										<div className="flex flex-1 items-center" key={item.id}>
											<button
												className="group flex items-center gap-2.5 text-left"
												onClick={() => setStep(item.id)}
												type="button"
											>
												<div
													className={[
														"flex size-9 shrink-0 items-center justify-center rounded-lg border font-semibold transition-all",
														getStepClassName(active, completed),
													].join(" ")}
												>
													{completed ? (
														<Check className="size-4" />
													) : (
														<Icon className="size-4" />
													)}
												</div>

												<div className="hidden sm:block">
													<p
														className={[
															"font-semibold text-[10px]",
															active
																? "text-[#102b55] dark:text-slate-100"
																: "text-slate-500 dark:text-slate-400",
														].join(" ")}
													>
														{item.title}
													</p>

													<p className="mt-0.5 text-[9px] text-slate-400 dark:text-slate-500">
														{item.description}
													</p>
												</div>
											</button>

											{index < steps.length - 1 && (
												<div className="mx-3 h-px flex-1 bg-slate-200 dark:bg-slate-700" />
											)}
										</div>
									);
								})}
							</div>

							{/* Progress */}
							<div className="mb-6 h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
								<div
									className="h-full rounded-full bg-[#0757ff] transition-all duration-300 dark:bg-blue-500"
									style={{
										width: `${((step - 1) / 2) * 100}%`,
									}}
								/>
							</div>

							{/* =================================================
							    STEP 1
							================================================= */}
							{step === 1 && (
								<GeneralDetails form={form} updateField={updateField} />
							)}

							{/* =================================================
							    STEP 2
							================================================= */}
							{step === 2 && (
								<UserSettings form={form} updateField={updateField} />
							)}

							{/* =================================================
							    STEP 3
							================================================= */}
							{step === 3 && <WebLogin form={form} updateField={updateField} />}

							{/* =================================================
							    SUCCESS
							================================================= */}
							{created ? (
								<div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-900/60 dark:bg-emerald-950/30">
									<div className="flex items-center gap-2.5">
										<div className="flex size-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
											<Check className="size-4" />
										</div>

										<div>
											<p className="font-semibold text-emerald-700 text-xs dark:text-emerald-400">
												User created successfully.
											</p>

											<p className="mt-0.5 text-[10px] text-emerald-700/70 dark:text-emerald-400/70">
												Backend integration will be connected later.
											</p>
										</div>
									</div>
								</div>
							) : null}

							{/* =================================================
							    NAVIGATION
							================================================= */}
							<div className="mt-6 flex items-center justify-between border-slate-100 border-t pt-5 dark:border-slate-800">
								<Button
									className="h-9 px-3 text-slate-500 text-xs hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
									onClick={clearForm}
									type="button"
									variant="ghost"
								>
									Clear
								</Button>

								<div className="flex gap-2">
									{step > 1 && (
										<Button
											className="h-9 rounded-lg border-slate-200 text-slate-600 text-xs hover:border-blue-200 hover:bg-blue-50 hover:text-[#0757ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
											onClick={previousStep}
											type="button"
											variant="outline"
										>
											<ArrowLeft className="mr-1.5 size-3.5" />
											Previous
										</Button>
									)}

									{step < 3 ? (
										<Button
											className="h-9 rounded-lg bg-[#0757ff] px-5 text-xs shadow-blue-500/20 shadow-md hover:bg-[#004be0] dark:bg-blue-600 dark:shadow-blue-900/30 dark:hover:bg-blue-500"
											onClick={nextStep}
											type="button"
										>
											Next
											<ArrowRight className="ml-1.5 size-3.5" />
										</Button>
									) : (
										<Button
											className="h-9 rounded-lg bg-[#0757ff] px-5 text-xs shadow-blue-500/20 shadow-md hover:bg-[#004be0] dark:bg-blue-600 dark:shadow-blue-900/30 dark:hover:bg-blue-500"
											onClick={createUser}
											type="button"
										>
											<Check className="mr-1.5 size-3.5" />
											Create User
										</Button>
									)}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* =================================================
					    SECURITY FOOTER
					================================================= */}
					<div className="mt-3 flex items-center justify-center gap-1.5 text-[9px] text-slate-400 dark:text-slate-500">
						<ShieldCheck className="size-3 text-emerald-500" />
						User information is securely managed
					</div>
				</div>
			</main>
		</div>
	);
}

/* =====================================================
   STEP 1 — GENERAL DETAILS
===================================================== */

function GeneralDetails({
	form,
	updateField,
}: {
	form: FormData;
	updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}) {
	return (
		<div className="grid gap-5 md:grid-cols-2">
			<FormField
				icon={<User className="size-3.5" />}
				id="name"
				label="Name"
				required
			>
				<Input
					className="crm-input h-10 rounded-lg pl-10 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/10 dark:placeholder:text-slate-500"
					id="name"
					onChange={(event) => updateField("name", event.target.value)}
					placeholder="Enter user's name"
					value={form.name}
				/>
			</FormField>

			<FormField
				icon={<Phone className="size-3.5" />}
				id="phone"
				label="Phone Number"
				required
			>
				<div className="flex gap-2">
					<Input
						className="h-10 w-16 rounded-lg border-slate-200 bg-slate-50 px-2 text-center text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
						readOnly
						value="+91"
					/>

					<Input
						className="crm-input h-10 rounded-lg text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/10 dark:placeholder:text-slate-500"
						id="phone"
						onChange={(event) => updateField("phone", event.target.value)}
						placeholder="Enter phone number"
						value={form.phone}
					/>
				</div>
			</FormField>

			<FormField
				icon={<Users className="size-3.5" />}
				id="designation"
				label="Designation"
			>
				<Input
					className="crm-input h-10 rounded-lg pl-10 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/10 dark:placeholder:text-slate-500"
					id="designation"
					onChange={(event) => updateField("designation", event.target.value)}
					placeholder="Enter designation"
					value={form.designation}
				/>
			</FormField>

			<FormField
				icon={<Mail className="size-3.5" />}
				id="email"
				label="Email Address"
				required
			>
				<Input
					className="crm-input h-10 rounded-lg pl-10 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/10 dark:placeholder:text-slate-500"
					id="email"
					onChange={(event) => updateField("email", event.target.value)}
					placeholder="Enter email address"
					type="email"
					value={form.email}
				/>
			</FormField>
		</div>
	);
}

/* =====================================================
   STEP 2 — USER SETTINGS
===================================================== */

function UserSettings({
	form,
	updateField,
}: {
	form: FormData;
	updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}) {
	return (
		<div className="space-y-5">
			<div className="grid gap-5 md:grid-cols-2">
				<SelectField
					id="team"
					label="Assign User to Team"
					onChange={(value) => updateField("team", value)}
					options={[
						["", "Select team"],
						["sales", "Sales"],
						["support", "Support"],
						["operations", "Operations"],
						["hr", "HR"],
					]}
					value={form.team}
				/>

				<FormField
					icon={<Phone className="size-3.5" />}
					id="call-forward"
					label="Call Forward Number"
				>
					<Input
						className="crm-input h-10 rounded-lg pl-10 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/10 dark:placeholder:text-slate-500"
						id="call-forward"
						onChange={(event) =>
							updateField("callForwardNumber", event.target.value)
						}
						placeholder="+91XXXXXXXXXX"
						value={form.callForwardNumber}
					/>
				</FormField>

				<FormField
					icon={<Phone className="size-3.5" />}
					id="caller-ids"
					label="Allowed Caller IDs"
				>
					<Input
						className="crm-input h-10 rounded-lg pl-10 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/10 dark:placeholder:text-slate-500"
						id="caller-ids"
						onChange={(event) => updateField("callerIds", event.target.value)}
						placeholder="Select caller IDs"
						value={form.callerIds}
					/>
				</FormField>

				<SelectField
					id="department"
					label="Assign User to Department"
					onChange={(value) => updateField("department", value)}
					options={[
						["", "Select department"],
						["sales", "Sales"],
						["support", "Support"],
						["operations", "Operations"],
						["hr", "HR"],
					]}
					value={form.department}
				/>
			</div>

			<div className="border-slate-100 border-t pt-5 dark:border-slate-800">
				<div className="mb-3">
					<h3 className="font-semibold text-[#102b55] text-xs dark:text-slate-100">
						Calling Configuration
					</h3>

					<p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
						Configure calling capabilities for this user.
					</p>
				</div>

				<div className="grid gap-3 md:grid-cols-2">
					<ToggleCard
						checked={form.callingAgent}
						description="Allow this user to make and receive calls."
						icon={<Phone className="size-3.5" />}
						onChange={(value) => updateField("callingAgent", value)}
						title="Calling Agent"
					/>

					<ToggleCard
						checked={form.createExtension}
						description="Automatically create a calling extension."
						icon={<Phone className="size-3.5" />}
						onChange={(value) => updateField("createExtension", value)}
						title="Create Agent Extension"
					/>
				</div>
			</div>
		</div>
	);
}

/* =====================================================
   STEP 3 — WEB LOGIN
===================================================== */

function WebLogin({
	form,
	updateField,
}: {
	form: FormData;
	updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}) {
	return (
		<div className="space-y-5">
			<div className="grid gap-5 md:grid-cols-2">
				<SelectField
					id="role"
					label="User Role"
					onChange={(value) => updateField("role", value)}
					options={[
						["Agent", "Agent"],
						["Supervisor", "Supervisor"],
						["Admin", "Admin"],
					]}
					value={form.role}
				/>

				<FormField
					icon={<LogIn className="size-3.5" />}
					id="login-id"
					label="Login ID"
					required
				>
					<Input
						className="crm-input h-10 rounded-lg pl-10 text-xs dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-blue-500 dark:focus:ring-blue-500/10 dark:placeholder:text-slate-500"
						id="login-id"
						onChange={(event) => updateField("loginId", event.target.value)}
						placeholder="Enter login ID"
						value={form.loginId}
					/>
				</FormField>
			</div>

			<div className="border-slate-100 border-t pt-5 dark:border-slate-800">
				<div className="mb-3">
					<h3 className="font-semibold text-[#102b55] text-xs dark:text-slate-100">
						Access & Security
					</h3>

					<p className="mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
						Configure how this user accesses the platform.
					</p>
				</div>

				<div className="grid gap-3 md:grid-cols-2">
					<ToggleCard
						checked={form.autoGeneratePassword}
						description="Generate a secure password automatically."
						icon={<ShieldCheck className="size-3.5" />}
						onChange={(value) => updateField("autoGeneratePassword", value)}
						title="Auto Generate Password"
					/>

					<ToggleCard
						checked={form.twoFactor}
						description="Require two-factor authentication."
						icon={<ShieldCheck className="size-3.5" />}
						onChange={(value) => updateField("twoFactor", value)}
						title="Two Factor Authentication"
					/>

					<ToggleCard
						checked={form.loginBasedCalling}
						description="Allow calls based on web login."
						icon={<Phone className="size-3.5" />}
						onChange={(value) => updateField("loginBasedCalling", value)}
						title="Login Based Calling"
					/>

					<ToggleCard
						checked={form.blockWebLogin}
						description="Prevent this user from logging into the web app."
						icon={<ShieldCheck className="size-3.5" />}
						onChange={(value) => updateField("blockWebLogin", value)}
						title="Block Web Login"
					/>

					<ToggleCard
						checked={form.agentDispositions}
						description="Enable call disposition management."
						icon={<Settings className="size-3.5" />}
						onChange={(value) => updateField("agentDispositions", value)}
						title="Agent Dispositions"
					/>
				</div>
			</div>
		</div>
	);
}

/* =====================================================
   REUSABLE FORM FIELD
===================================================== */

function FormField({
	id,
	label,
	required,
	icon,
	children,
}: {
	id: string;
	label: string;
	required?: boolean;
	icon?: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-1.5">
			<Label
				className="font-semibold text-[#263b5b] text-[10px] dark:text-slate-300"
				htmlFor={id}
			>
				{label}

				{required ? <span className="ml-1 text-red-500">*</span> : null}
			</Label>

			<div className="relative">
				{icon ? (
					<div className="pointer-events-none absolute top-1/2 left-3 z-10 -translate-y-1/2 text-slate-400 dark:text-slate-500">
						{icon}
					</div>
				) : null}

				{children}
			</div>
		</div>
	);
}

/* =====================================================
   SELECT
===================================================== */

function SelectField({
	id,
	label,
	value,
	onChange,
	options,
}: {
	id: string;
	label: string;
	value: string;
	onChange: (value: string) => void;
	options: [string, string][];
}) {
	return (
		<div className="space-y-1.5">
			<Label
				className="font-semibold text-[#263b5b] text-[10px] dark:text-slate-300"
				htmlFor={id}
			>
				{label}
			</Label>

			<select
				className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-slate-700 text-xs outline-none transition-all focus:border-[#0757ff] focus:ring-4 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-blue-500 dark:focus:ring-blue-500/10"
				id={id}
				onChange={(event) => onChange(event.target.value)}
				value={value}
			>
				{options.map(([optionValue, optionLabel]) => (
					<option
						className="bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-200"
						key={optionValue}
						value={optionValue}
					>
						{optionLabel}
					</option>
				))}
			</select>
		</div>
	);
}

/* =====================================================
   REUSABLE TOGGLE
===================================================== */

function ToggleCard({
	title,
	description,
	checked,
	onChange,
	icon,
}: {
	title: string;
	description: string;
	checked: boolean;
	onChange: (value: boolean) => void;
	icon?: React.ReactNode;
}) {
	return (
		<div
			className={[
				"flex items-center justify-between rounded-xl border p-3 transition-all",
				checked
					? "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/30"
					: "border-slate-200 bg-white hover:border-blue-100 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-blue-900 dark:hover:bg-slate-800",
			].join(" ")}
		>
			<div className="flex min-w-0 items-center gap-2.5 pr-3">
				<div
					className={[
						"flex size-8 shrink-0 items-center justify-center rounded-lg",
						checked
							? "bg-[#0757ff] text-white dark:bg-blue-600"
							: "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500",
					].join(" ")}
				>
					{icon}
				</div>

				<div className="min-w-0">
					<p className="font-semibold text-[#263b5b] text-[10px] dark:text-slate-200">
						{title}
					</p>

					<p className="mt-0.5 text-[9px] text-slate-500 leading-3.5 dark:text-slate-400">
						{description}
					</p>
				</div>
			</div>

			<Switch
				checked={checked}
				className="data-[state=checked]:bg-[#0757ff] dark:data-[state=checked]:bg-blue-600"
				onCheckedChange={onChange}
			/>
		</div>
	);
}
