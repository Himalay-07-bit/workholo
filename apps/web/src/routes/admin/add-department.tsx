import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { Switch } from "@workholo/ui/components/switch";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/add-department")({
	component: AddDepartmentPage,
});

function AddDepartmentPage() {
	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 bg-muted/30 p-4 md:p-6">
				<section className="overflow-hidden rounded-md border bg-background shadow-sm">
					{/* Header */}
					<div className="border-b px-5 py-3">
						<h1 className="font-medium text-lg">Add Department</h1>
					</div>

					<div className="p-5">
						<h2 className="mb-6 font-semibold text-base">General Details</h2>

						{/* Main fields */}
						<div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
							{/* Name */}
							<Field label="Name*" placeholder="Enter department name" />

							{/* Description */}
							<Field label="Description*" placeholder="Enter description" />

							{/* Ring Strategy */}
							<SelectField
								label="Ring Strategy"
								options={["Simultaneously", "Sequentially"]}
								value="Simultaneously"
							/>

							{/* Music On Hold */}
							<SelectField
								label="Music On Hold"
								options={["Select any Option", "Default Music"]}
								value="Select any Option"
							/>

							{/* Missed Call SMS */}
							<SelectField
								label="Missed Call SMS"
								options={["Select any Option", "Enabled", "Disabled"]}
								value="Select any Option"
							/>

							{/* Sticky Agent */}
							<SelectField
								label="Sticky Agent"
								options={["No", "Yes"]}
								value="No"
							/>

							{/* Use it as Queue */}
							<SelectField
								label="Use it as Queue"
								options={["Yes", "No"]}
								value="Yes"
							/>

							{/* Transfer Code */}
							<Field label="Transfer Code" placeholder="" />

							{/* Failover Music */}
							<SelectField
								label="Failover Music"
								options={["Select any Option", "Default Music"]}
								value="Select any Option"
							/>

							{/* Queue Timeout */}
							<Field label="Queue Timeout (seconds)" placeholder="90" />

							{/* Simultaneous Call Patching */}
							<div className="space-y-2">
								<label
									className="font-medium text-muted-foreground text-sm"
									htmlFor="patching-cap"
								>
									Simultaneous Call Patching Caps Limit
								</label>

								<Input disabled id="patching-cap" />

								<p className="text-muted-foreground text-xs">
									<strong>Note:</strong> Maximum Allocated Caps Calls Limit: 5.
								</p>
							</div>
						</div>

						{/* Queue Settings */}
						<div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
							<SwitchField label="Queue Limit" />

							<SwitchField label="Queue Welcome Announcement" />

							<SwitchField label="Queue Announce Holdtime" />

							<SwitchField label="Queue Position Announcement" />

							<SwitchField label="Queue Periodic Announcement" />
						</div>

						{/* Actions */}
						<div className="mt-8 flex gap-2 border-t pt-5">
							<Button>Save</Button>

							<Link
								className={buttonVariants({ variant: "outline" })}
								to="/admin/departments"
							>
								Cancel
							</Link>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
	const inputId = `department-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;

	return (
		<div className="space-y-2">
			<label
				className="font-medium text-muted-foreground text-sm"
				htmlFor={inputId}
			>
				{label}
			</label>

			<Input id={inputId} placeholder={placeholder} />
		</div>
	);
}

function SelectField({
	label,
	value,
	options,
}: {
	label: string;
	value: string;
	options: string[];
}) {
	const inputId = `department-${label.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;

	return (
		<div className="space-y-2">
			<label
				className="font-medium text-muted-foreground text-sm"
				htmlFor={inputId}
			>
				{label}
			</label>

			<select
				className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
				defaultValue={value}
				id={inputId}
			>
				{options.map((option) => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}

function SwitchField({ label }: { label: string }) {
	return (
		<div className="flex items-center justify-between gap-4">
			<span className="font-medium text-muted-foreground text-sm">{label}</span>

			<Switch />
		</div>
	);
}
