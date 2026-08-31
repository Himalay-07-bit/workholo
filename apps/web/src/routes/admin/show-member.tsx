// biome-ignore-all lint/performance/noJsxPropsBind: Table controls use local component state.
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/show-member")({
	component: ShowMemberPage,
});

type TeamMember = {
	id: number;
	name: string;
	email: string;
	loginId: string;
	role: string;
	status: "Enabled" | "Disabled";
};

const teamMembers: TeamMember[] = [
	{
		id: 1,
		name: "RAKESH KUMAR SHARMA",
		email: "deplopeerd@gmail.com",
		loginId: "CN33921",
		role: "AceX Contact Center Studio Ultra Webrtc",
		status: "Enabled",
	},
	{
		id: 2,
		name: "CRLA Zainab",
		email: "hr@hireorbit.agency",
		loginId: "zainab10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 3,
		name: "CRLA Tasneem",
		email: "hr@hireorbit.agency",
		loginId: "tasneem10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 4,
		name: "CRLA Madiha",
		email: "hr@hireorbit.agency",
		loginId: "madiha10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 5,
		name: "CRLM Shifa",
		email: "hr@hireorbit.agency",
		loginId: "shifa10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 6,
		name: "CRLD Aayushi",
		email: "hr@hireorbit.agency",
		loginId: "aayushi10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 7,
		name: "CRLA Dhriti",
		email: "hr@hireorbit.agency",
		loginId: "dhriti10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 8,
		name: "CRLA Vazira",
		email: "hr@hireorbit.agency",
		loginId: "vazira10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 9,
		name: "CRLB M Ayushi",
		email: "hr@hireorbit.agency",
		loginId: "ayushi10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 10,
		name: "CRLD Sanjib",
		email: "hr@hireorbit.agency",
		loginId: "sanjib10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 11,
		name: "CRLA Neha",
		email: "hr@hireorbit.agency",
		loginId: "neha10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 12,
		name: "CRLB Priya",
		email: "hr@hireorbit.agency",
		loginId: "priya10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 13,
		name: "CRLD Rahul",
		email: "hr@hireorbit.agency",
		loginId: "rahul10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 14,
		name: "CRLA Komal",
		email: "hr@hireorbit.agency",
		loginId: "komal10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 15,
		name: "CRLB Pooja",
		email: "hr@hireorbit.agency",
		loginId: "pooja10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 16,
		name: "CRLD Amit",
		email: "hr@hireorbit.agency",
		loginId: "amit10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 17,
		name: "CRLA Nisha",
		email: "hr@hireorbit.agency",
		loginId: "nisha10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 18,
		name: "CRLB Mohit",
		email: "hr@hireorbit.agency",
		loginId: "mohit10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 19,
		name: "CRLD Simran",
		email: "hr@hireorbit.agency",
		loginId: "simran10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 20,
		name: "CRLA Anjali",
		email: "hr@hireorbit.agency",
		loginId: "anjali10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 21,
		name: "CRLB Arjun",
		email: "hr@hireorbit.agency",
		loginId: "arjun10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 22,
		name: "CRLD Ritu",
		email: "hr@hireorbit.agency",
		loginId: "ritu10",
		role: "Dialer Role",
		status: "Enabled",
	},
	{
		id: 23,
		name: "CRLA Karan",
		email: "hr@hireorbit.agency",
		loginId: "karan10",
		role: "Dialer Role",
		status: "Enabled",
	},
];

function ShowMemberPage() {
	const navigate = useNavigate();
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const filteredMembers = useMemo(() => {
		const value = search.trim().toLowerCase();

		if (!value) {
			return teamMembers;
		}

		return teamMembers.filter((member) =>
			`${member.name} ${member.email} ${member.loginId} ${member.role} ${member.status}`
				.toLowerCase()
				.includes(value)
		);
	}, [search]);

	const totalPages = Math.max(1, Math.ceil(filteredMembers.length / pageSize));
	const safePage = Math.min(currentPage, totalPages);
	const startIndex = (safePage - 1) * pageSize;
	const visibleMembers = filteredMembers.slice(
		startIndex,
		startIndex + pageSize
	);

	const firstEntry = filteredMembers.length === 0 ? 0 : startIndex + 1;
	const lastEntry = Math.min(startIndex + pageSize, filteredMembers.length);

	const goToPage = (page: number) => {
		setCurrentPage(Math.max(1, Math.min(page, totalPages)));
	};

	return (
		<div className="flex min-h-screen flex-col bg-[#0b1220] text-slate-100">
			<AdminTopbar />

			<main className="flex-1 p-4 md:p-6">
				<div className="mx-auto max-w-[1600px] overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1728] shadow-sm">
					{/* Header */}
					<div className="flex flex-col gap-3 border-slate-800 border-b px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
						<h1 className="font-medium text-base text-slate-100">
							Team Members
						</h1>

						<div className="flex flex-wrap items-center gap-2">
							<Button
								className="h-9 border-slate-700 bg-[#111d31] px-3 text-slate-300 text-xs hover:bg-slate-800"
								size="sm"
								variant="outline"
							>
								Regenerate Password for All Members
							</Button>

							<Button
								className="h-9 border-slate-700 bg-[#111d31] px-3 text-slate-300 text-xs hover:bg-slate-800"
								onClick={() => navigate({ to: "/admin/member-groups" })}
								size="sm"
								variant="outline"
							>
								Team Member Groups
							</Button>

							<select
								aria-label="More Actions"
								className="h-9 rounded-md border border-slate-700 bg-[#111d31] px-3 text-slate-300 text-xs outline-none focus:border-blue-500"
								defaultValue=""
							>
								<option disabled value="">
									More Actions
								</option>
								<option value="export">Export Members</option>
								<option value="regenerate">Regenerate Passwords</option>
							</select>
						</div>
					</div>

					{/* Table controls */}
					<div className="flex flex-col gap-4 border-slate-800 border-b px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
						<label className="flex items-center gap-2 text-slate-400 text-xs">
							Show
							<select
								aria-label="Entries per page"
								className="h-9 rounded-md border border-slate-700 bg-[#111d31] px-3 text-slate-200 outline-none focus:border-blue-500"
								onChange={(event) => {
									setPageSize(Number(event.target.value));
									setCurrentPage(1);
								}}
								value={pageSize}
							>
								<option value={10}>10</option>
								<option value={25}>25</option>
								<option value={50}>50</option>
							</select>
							entries
						</label>

						<div className="flex items-center gap-2">
							<label className="sr-only" htmlFor="team-member-search">
								Search
							</label>
							<div className="relative w-full sm:w-64">
								<Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500" />
								<Input
									className="h-9 border-slate-700 bg-[#111d31] pl-9 text-slate-200 text-xs placeholder:text-slate-500"
									id="team-member-search"
									onChange={(event) => {
										setSearch(event.target.value);
										setCurrentPage(1);
									}}
									placeholder="Search"
									value={search}
								/>
							</div>
						</div>
					</div>

					{/* Table */}
					<div className="overflow-x-auto">
						<table className="w-full min-w-[1050px] text-left text-xs">
							<thead className="border-slate-800 border-b bg-[#0b1525] text-slate-400">
								<tr>
									<th className="px-4 py-3 font-medium">S.No.</th>
									<th className="px-4 py-3 font-medium">Name</th>
									<th className="px-4 py-3 font-medium">Email</th>
									<th className="px-4 py-3 font-medium">Login ID</th>
									<th className="px-4 py-3 font-medium">Role</th>
									<th className="px-4 py-3 font-medium">Status</th>
									<th className="px-4 py-3 font-medium">Action</th>
								</tr>
							</thead>

							<tbody className="divide-y divide-slate-800">
								{visibleMembers.map((member) => (
									<tr
										className="transition-colors hover:bg-slate-900/70"
										key={member.id}
									>
										<td className="px-4 py-4 text-slate-300">{member.id}.</td>
										<td className="px-4 py-4 font-medium text-slate-200">
											{member.name}
											{member.id === 1 && (
												<span className="ml-2 rounded bg-slate-700 px-1.5 py-0.5 text-[10px] text-slate-200">
													Owner
												</span>
											)}
										</td>
										<td className="px-4 py-4 text-slate-400">{member.email}</td>
										<td className="px-4 py-4 text-slate-400">
											{member.loginId}
										</td>
										<td className="px-4 py-4 text-slate-400">{member.role}</td>
										<td className="px-4 py-4">
											<span className="inline-flex items-center gap-1.5 text-slate-300">
												<span className="size-2 rounded-full bg-emerald-400" />
												{member.status}
											</span>
										</td>
										<td className="px-4 py-4">
											<select
												aria-label={`Actions for ${member.name}`}
												className="h-8 min-w-32 rounded-md border border-slate-700 bg-[#111d31] px-2 text-slate-300 text-xs outline-none focus:border-blue-500"
												defaultValue=""
											>
												<option disabled value="">
													Select an Action
												</option>
												<option value="view">View</option>
												<option value="edit">Edit</option>
												<option value="delete">Delete</option>
											</select>
										</td>
									</tr>
								))}

								{visibleMembers.length === 0 && (
									<tr>
										<td
											className="px-4 py-12 text-center text-slate-500"
											colSpan={7}
										>
											No team members found.
										</td>
									</tr>
								)}
							</tbody>
						</table>
					</div>

					{/* Footer / pagination */}
					<div className="flex flex-col gap-4 border-slate-800 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
						<span className="text-slate-500 text-xs">
							Showing {firstEntry} to {lastEntry} of {filteredMembers.length}{" "}
							entries
						</span>

						<div className="flex items-center gap-1">
							<Button
								aria-label="Previous page"
								className="h-8 border-slate-700 bg-[#111d31] px-2 text-slate-400 text-xs hover:bg-slate-800"
								disabled={safePage === 1}
								onClick={() => goToPage(safePage - 1)}
								size="sm"
								variant="outline"
							>
								<ChevronLeft className="size-3.5" />
								Previous
							</Button>

							{Array.from({ length: totalPages }, (_, index) => index + 1)
								.slice(0, 5)
								.map((page) => (
									<Button
										className={
											page === safePage
												? "h-8 min-w-8 border-blue-600 bg-blue-600 px-2 text-white text-xs hover:bg-blue-600"
												: "h-8 min-w-8 border-slate-700 bg-[#111d31] px-2 text-slate-400 text-xs hover:bg-slate-800"
										}
										key={page}
										onClick={() => goToPage(page)}
										size="sm"
										variant="outline"
									>
										{page}
									</Button>
								))}

							<Button
								aria-label="Next page"
								className="h-8 border-slate-700 bg-[#111d31] px-2 text-slate-400 text-xs hover:bg-slate-800"
								disabled={safePage === totalPages}
								onClick={() => goToPage(safePage + 1)}
								size="sm"
								variant="outline"
							>
								Next
								<ChevronRight className="size-3.5" />
							</Button>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
