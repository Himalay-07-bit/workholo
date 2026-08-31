"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/add-new-ip-pool")({
	component: AddNewIpPoolPage,
});

function AddNewIpPoolPage() {
	const navigate = useNavigate();

	const [type, setType] = useState<"single" | "multiple">("single");

	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [assignedTo, setAssignedTo] = useState("");
	const [teamMembers, setTeamMembers] = useState("");
	const [ips, setIps] = useState("");

	const handleSave = () => {
		// UI-only for now.
		// API/database integration can be added later.
		console.log({
			name,
			description,
			type,
			assignedTo,
			teamMembers,
			ips,
		});
	};

	return (
		<div className="flex min-h-svh flex-col bg-[#eef3f9] dark:bg-[#07111f]">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1600px]">
					<section className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#0b1728]">
						{/* Header */}
						<div className="border-slate-200 border-b px-4 py-3 dark:border-slate-800">
							<h1 className="font-medium text-[#102b55] text-sm dark:text-white">
								Edit IP Pool
							</h1>
						</div>

						{/* Form */}
						<div className="grid grid-cols-1 gap-x-8 gap-y-7 px-8 py-14 md:grid-cols-2 md:px-24 lg:px-28">
							{/* Name */}
							<div>
								<label
									className="mb-1 block text-slate-500 text-xs dark:text-slate-400"
									htmlFor="ip-pool-name"
								>
									Name*
								</label>

								<Input
									className="h-9 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 text-xs shadow-none focus:border-blue-500 focus:ring-0 dark:border-slate-700"
									id="ip-pool-name"
									onChange={(event) => setName(event.target.value)}
									value={name}
								/>
							</div>

							{/* Description */}
							<div>
								<label
									className="mb-1 block text-slate-500 text-xs dark:text-slate-400"
									htmlFor="ip-pool-description"
								>
									Description*
								</label>

								<Input
									className="h-9 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 text-xs shadow-none focus:border-blue-500 focus:ring-0 dark:border-slate-700"
									id="ip-pool-description"
									onChange={(event) => setDescription(event.target.value)}
									value={description}
								/>
							</div>

							{/* Type */}
							<div>
								<span className="mb-2 block text-slate-500 text-xs dark:text-slate-400">
									Type*
								</span>

								<div className="flex h-9 items-center gap-6 border-slate-300 border-b dark:border-slate-700">
									<label className="flex cursor-pointer items-center gap-2 text-slate-700 text-xs dark:text-slate-300">
										<input
											checked={type === "single"}
											className="h-4 w-4 accent-[#28a7a0]"
											name="ip-pool-type"
											onChange={() => setType("single")}
											type="radio"
											value="single"
										/>
										SINGLE IP
									</label>

									<label className="flex cursor-pointer items-center gap-2 text-slate-700 text-xs dark:text-slate-300">
										<input
											checked={type === "multiple"}
											className="h-4 w-4 accent-[#28a7a0]"
											name="ip-pool-type"
											onChange={() => setType("multiple")}
											type="radio"
											value="multiple"
										/>
										MULTIPLE IP
									</label>
								</div>
							</div>

							{/* Assigned To */}
							<div>
								<label
									className="mb-1 block text-slate-500 text-xs dark:text-slate-400"
									htmlFor="assigned-to"
								>
									Assigned To*
								</label>

								<select
									className="h-9 w-full border-0 border-slate-300 border-b bg-transparent px-0 text-slate-700 text-xs outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-transparent dark:text-slate-300"
									id="assigned-to"
									onChange={(event) => setAssignedTo(event.target.value)}
									value={assignedTo}
								>
									<option value="">Team Member/User</option>
									<option value="team-member">Team Member</option>
									<option value="user">User</option>
								</select>
							</div>

							{/* Team Members */}
							<div>
								<label
									className="mb-1 block text-slate-500 text-xs dark:text-slate-400"
									htmlFor="team-members"
								>
									Team Members
								</label>

								<select
									className="h-9 w-full border-0 border-slate-300 border-b bg-transparent px-0 text-slate-500 text-xs outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-transparent"
									id="team-members"
									onChange={(event) => setTeamMembers(event.target.value)}
									value={teamMembers}
								>
									<option value="">Select Some Options</option>
									<option value="all">All Team Members</option>
								</select>
							</div>

							{/* IPs */}
							<div>
								<label
									className="mb-1 block text-slate-500 text-xs dark:text-slate-400"
									htmlFor="ips"
								>
									Enter IPs Comma(,) separated. For Example: 192.168.23.22,
									192.168.22.45*
								</label>

								<Input
									className="h-9 rounded-none border-0 border-slate-300 border-b bg-transparent px-0 text-xs shadow-none focus:border-blue-500 focus:ring-0 dark:border-slate-700"
									id="ips"
									onChange={(event) => setIps(event.target.value)}
									placeholder=""
									value={ips}
								/>
							</div>
						</div>

						{/* Buttons */}
						<div className="flex gap-2 px-8 pb-10 md:px-24 lg:px-28">
							<Button
								className="h-8 rounded-sm bg-[#0757ff] px-4 text-white text-xs hover:bg-[#004be0]"
								onClick={handleSave}
								type="button"
							>
								Save
							</Button>

							<Button
								className="h-8 rounded-sm px-4 text-xs"
								onClick={() =>
									navigate({
										to: "/admin/ip-pool-whitelisting",
									})
								}
								type="button"
								variant="outline"
							>
								Cancel
							</Button>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
