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
	Settings,
	User,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/add-new-user")({
	component: AddUserPage,
});

const steps = [
	{
		id: 1,
		title: "General Details",
		icon: User,
	},
	{
		id: 2,
		title: "User Settings",
		icon: Settings,
	},
	{
		id: 3,
		title: "Web Login",
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
		return "bg-primary text-primary-foreground";
	}

	if (completed) {
		return "bg-primary/10 text-primary";
	}

	return "bg-muted/50 text-muted-foreground hover:bg-muted";
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
		<div className="flex min-h-svh flex-col">
			{/* Header */}
			<div className="border-b bg-background px-6 py-4">
				<div className="flex items-center justify-between gap-4">
					<div>
						<h1 className="font-semibold text-xl">Add User</h1>

						<p className="text-muted-foreground text-sm">
							Create and configure a new platform user.
						</p>
					</div>

					<Button
						onClick={() =>
							navigate({
								to: "/admin/users",
							})
						}
						type="button"
						variant="outline"
					>
						<ArrowLeft className="mr-2 size-4" />
						Back to Users
					</Button>
				</div>
			</div>

			<main className="flex-1 bg-muted/30 p-6">
				<Card className="mx-auto max-w-5xl">
					<CardHeader>
						<CardTitle>Add User</CardTitle>
					</CardHeader>

					<CardContent>
						{/* Steps */}
						<div className="mb-8 grid grid-cols-3 overflow-hidden rounded-lg border">
							{steps.map((item) => {
								const Icon = item.icon;

								const active = step === item.id;
								const completed = step > item.id;

								return (
									<button
										className={[
											"flex items-center justify-center gap-2 px-4 py-4 font-medium text-sm transition",
											getStepClassName(active, completed),
										].join(" ")}
										key={item.id}
										onClick={() => setStep(item.id)}
										type="button"
									>
										{completed ? (
											<Check className="size-4" />
										) : (
											<Icon className="size-4" />
										)}

										{item.title}
									</button>
								);
							})}
						</div>

						{/* STEP 1 */}
						{step === 1 && (
							<GeneralDetails form={form} updateField={updateField} />
						)}

						{/* STEP 2 */}
						{step === 2 && (
							<UserSettings form={form} updateField={updateField} />
						)}

						{/* STEP 3 */}
						{step === 3 && <WebLogin form={form} updateField={updateField} />}

						{/* Success */}
						{created ? (
							<div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
								<div className="flex items-center gap-2 font-medium text-green-700">
									<Check className="size-4" />
									User created successfully.
								</div>

								<p className="mt-1 text-green-700/80 text-sm">
									Backend integration will be connected later.
								</p>
							</div>
						) : null}

						{/* Navigation */}
						<div className="mt-8 flex justify-between border-t pt-6">
							<Button onClick={clearForm} type="button" variant="ghost">
								Clear
							</Button>

							<div className="flex gap-2">
								{step > 1 && (
									<Button
										onClick={previousStep}
										type="button"
										variant="outline"
									>
										<ArrowLeft className="mr-2 size-4" />
										Previous
									</Button>
								)}

								{step < 3 ? (
									<Button onClick={nextStep} type="button">
										Next
										<ArrowRight className="ml-2 size-4" />
									</Button>
								) : (
									<Button onClick={createUser} type="button">
										<Check className="mr-2 size-4" />
										Create User
									</Button>
								)}
							</div>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}

/* =====================================================
   STEP 1
===================================================== */

function GeneralDetails({
	form,
	updateField,
}: {
	form: FormData;
	updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}) {
	return (
		<div className="grid gap-6 md:grid-cols-2">
			<div className="space-y-2">
				<Label htmlFor="name">
					Name <span className="text-destructive">*</span>
				</Label>

				<Input
					id="name"
					onChange={(event) => updateField("name", event.target.value)}
					placeholder="Enter user's name"
					value={form.name}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="phone">
					Phone Number <span className="text-destructive">*</span>
				</Label>

				<div className="flex gap-2">
					<Input className="w-20" readOnly value="+91" />

					<Input
						id="phone"
						onChange={(event) => updateField("phone", event.target.value)}
						placeholder="Enter phone number"
						value={form.phone}
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="designation">Designation</Label>

				<Input
					id="designation"
					onChange={(event) => updateField("designation", event.target.value)}
					placeholder="Enter designation"
					value={form.designation}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="email">
					Email Address <span className="text-destructive">*</span>
				</Label>

				<Input
					id="email"
					onChange={(event) => updateField("email", event.target.value)}
					placeholder="Enter email address"
					type="email"
					value={form.email}
				/>
			</div>
		</div>
	);
}

/* =====================================================
   STEP 2
===================================================== */

function UserSettings({
	form,
	updateField,
}: {
	form: FormData;
	updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}) {
	return (
		<div className="grid gap-8 md:grid-cols-2">
			<div className="space-y-2">
				<Label htmlFor="team">Assign user to team</Label>

				<select
					className="h-9 w-full rounded-md border bg-background px-3 text-sm"
					id="team"
					onChange={(event) => updateField("team", event.target.value)}
					value={form.team}
				>
					<option value="">Select team</option>
					<option value="sales">Sales</option>
					<option value="support">Support</option>
					<option value="operations">Operations</option>
					<option value="hr">HR</option>
				</select>
			</div>

			<div className="space-y-2">
				<Label htmlFor="call-forward">Call Forward Number</Label>

				<Input
					id="call-forward"
					onChange={(event) =>
						updateField("callForwardNumber", event.target.value)
					}
					placeholder="+91XXXXXXXXXX"
					value={form.callForwardNumber}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="caller-ids">Allowed Caller IDs</Label>

				<Input
					id="caller-ids"
					onChange={(event) => updateField("callerIds", event.target.value)}
					placeholder="Select caller IDs"
					value={form.callerIds}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="department">Assign user to department</Label>

				<select
					className="h-9 w-full rounded-md border bg-background px-3 text-sm"
					id="department"
					onChange={(event) => updateField("department", event.target.value)}
					value={form.department}
				>
					<option value="">Select department</option>
					<option value="sales">Sales</option>
					<option value="support">Support</option>
					<option value="operations">Operations</option>
					<option value="hr">HR</option>
				</select>
			</div>

			<ToggleCard
				checked={form.callingAgent}
				description="Allow this user to make calls."
				onChange={(value) => updateField("callingAgent", value)}
				title="Calling Agent"
			/>

			<ToggleCard
				checked={form.createExtension}
				description="Automatically create an extension."
				onChange={(value) => updateField("createExtension", value)}
				title="Create Agent Extension"
			/>
		</div>
	);
}

/* =====================================================
   STEP 3
===================================================== */

function WebLogin({
	form,
	updateField,
}: {
	form: FormData;
	updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
}) {
	return (
		<div className="grid gap-8 md:grid-cols-2">
			<div className="space-y-2">
				<Label htmlFor="role">User Role</Label>

				<select
					className="h-9 w-full rounded-md border bg-background px-3 text-sm"
					id="role"
					onChange={(event) => updateField("role", event.target.value)}
					value={form.role}
				>
					<option value="Agent">Agent</option>
					<option value="Supervisor">Supervisor</option>
					<option value="Admin">Admin</option>
				</select>
			</div>

			<div className="space-y-2">
				<Label htmlFor="login-id">
					Login ID <span className="text-destructive">*</span>
				</Label>

				<Input
					id="login-id"
					onChange={(event) => updateField("loginId", event.target.value)}
					placeholder="Enter login ID"
					value={form.loginId}
				/>
			</div>

			<ToggleCard
				checked={form.autoGeneratePassword}
				description="Generate a secure password automatically."
				onChange={(value) => updateField("autoGeneratePassword", value)}
				title="Auto Generate Password"
			/>

			<ToggleCard
				checked={form.twoFactor}
				description="Require two-factor authentication."
				onChange={(value) => updateField("twoFactor", value)}
				title="Two Factor Authentication"
			/>

			<ToggleCard
				checked={form.loginBasedCalling}
				description="Allow calls based on web login."
				onChange={(value) => updateField("loginBasedCalling", value)}
				title="Login Based Calling"
			/>

			<ToggleCard
				checked={form.blockWebLogin}
				description="Prevent this user from logging into the web application."
				onChange={(value) => updateField("blockWebLogin", value)}
				title="Block Web Login"
			/>

			<ToggleCard
				checked={form.agentDispositions}
				description="Enable call disposition management."
				onChange={(value) => updateField("agentDispositions", value)}
				title="Agent Dispositions"
			/>
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
}: {
	title: string;
	description: string;
	checked: boolean;
	onChange: (value: boolean) => void;
}) {
	return (
		<div className="flex items-center justify-between rounded-lg border p-4">
			<div className="pr-4">
				<p className="font-medium">{title}</p>

				<p className="text-muted-foreground text-sm">{description}</p>
			</div>

			<Switch checked={checked} onCheckedChange={onChange} />
		</div>
	);
}
