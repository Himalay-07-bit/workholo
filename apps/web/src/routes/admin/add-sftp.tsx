// biome-ignore-all lint/performance/noJsxPropsBind: Form controls use local component state.

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CircleHelp } from "lucide-react";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/add-sftp")({
	component: AddSftpConfigurationPage,
});

function AddSftpConfigurationPage() {
	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [serviceType, setServiceType] = useState("Reports");
	const [host, setHost] = useState("");
	const [port, setPort] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [privateKey, setPrivateKey] = useState<File | null>(null);
	const [passphrase, setPassphrase] = useState("");
	const [targetFolderPath, setTargetFolderPath] = useState("");

	const save = () => {
		// UI-only for now. Backend/API integration can be added later.
		console.log({
			name,
			serviceType,
			host,
			port,
			username,
			password,
			privateKey: privateKey?.name ?? "",
			passphrase,
			targetFolderPath,
		});
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1600px]">
					<section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						<div className="border-slate-200 border-b px-5 py-4 text-slate-700 text-sm dark:border-slate-800 dark:text-slate-200">
							Add SFTP Configuration
						</div>

						<div className="p-6 md:p-9">
							<div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
								<FormField
									help
									label="Name"
									onChange={setName}
									required
									value={name}
								/>

								<div>
									<div className="mb-2 flex items-center gap-2 text-slate-500 text-sm dark:text-slate-400">
										<span>Select Service Type</span>
										<CircleHelp className="h-4 w-4 text-cyan-500" />
									</div>

									<select
										className="h-10 w-full border-0 border-slate-300 border-b bg-transparent px-0 text-slate-700 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-transparent dark:text-slate-200"
										onChange={(event) => setServiceType(event.target.value)}
										value={serviceType}
									>
										<option value="Reports">Reports</option>
										<option value="CDR">CDR</option>
										<option value="Call Recording">Call Recording</option>
									</select>
								</div>

								<FormField
									help
									label="Host"
									onChange={setHost}
									required
									value={host}
								/>

								<FormField
									help
									label="Port"
									onChange={setPort}
									required
									type="number"
									value={port}
								/>

								<FormField
									help
									label="Username"
									onChange={setUsername}
									required
									value={username}
								/>

								<FormField
									help
									label="Password"
									onChange={setPassword}
									type="password"
									value={password}
								/>

								<div>
									<div className="mb-2 flex items-center gap-2 text-slate-500 text-sm dark:text-slate-400">
										<span>Private Key</span>
										<CircleHelp className="h-4 w-4 text-cyan-500" />
									</div>

									<div className="flex h-10 items-center border-slate-300 border-b dark:border-slate-700">
										<input
											className="w-full text-slate-600 text-xs file:mr-2 file:rounded-sm file:border file:border-slate-300 file:bg-slate-100 file:px-2 file:py-1 file:text-slate-700 file:text-xs dark:text-slate-300 dark:file:border-slate-700 dark:file:bg-slate-800 dark:file:text-slate-200"
											onChange={(event) =>
												setPrivateKey(event.target.files?.[0] ?? null)
											}
											type="file"
										/>
									</div>
								</div>

								<FormField
									label="Key Passphrase"
									onChange={setPassphrase}
									placeholder="Passphrase"
									value={passphrase}
								/>

								<FormField
									help
									label="Target Folder Path"
									onChange={setTargetFolderPath}
									required
									value={targetFolderPath}
								/>
							</div>

							<div className="mt-10 flex items-center gap-2">
								<button
									className="rounded-sm bg-[#0757ff] px-4 py-2 font-medium text-white text-xs hover:bg-[#004be0]"
									onClick={save}
									type="button"
								>
									SAVE
								</button>

								<button
									className="rounded-sm border border-slate-300 bg-white px-4 py-2 text-slate-700 text-xs hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
									onClick={() => navigate({ to: "/admin/sftp" })}
									type="button"
								>
									Cancel
								</button>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}

function FormField({
	label,
	required,
	help,
	value,
	onChange,
	type = "text",
	placeholder,
}: {
	label: string;
	required?: boolean;
	help?: boolean;
	value: string;
	onChange: (value: string) => void;
	type?: string;
	placeholder?: string;
}) {
	return (
		<div>
			<div className="mb-2 flex items-center gap-2 text-slate-500 text-sm dark:text-slate-400">
				<span>
					{label}
					{required ? <span className="text-red-500">*</span> : null}
				</span>
				{help ? <CircleHelp className="h-4 w-4 text-cyan-500" /> : null}
			</div>

			<input
				className="h-10 w-full border-0 border-slate-300 border-b bg-transparent px-0 text-slate-700 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500 dark:border-slate-700 dark:text-slate-200"
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				type={type}
				value={value}
			/>
		</div>
	);
}
