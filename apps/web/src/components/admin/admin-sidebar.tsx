// biome-ignore-all lint/performance/noJsxPropsBind: Navigation handlers need the selected menu item.

import { useLocation, useNavigate } from "@tanstack/react-router";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@workholo/ui/components/sidebar";

import {
	ChevronRight,
	LayoutDashboard,
	LogOut,
	Phone,
	Settings,
	Users,
	Wrench,
} from "lucide-react";

import { useState } from "react";

const navigation = [
	{
		icon: LayoutDashboard,
		title: "Dashboard",
		url: "/admin",
	},
	{
		icon: Phone,
		title: "Live Calls",
		url: "/admin/livecalls",
	},
];

const userItems = [
	{
		title: "Add User",
		url: "/admin/add-new-user",
	},
	{
		title: "All User(s)",
		url: "/admin/show-users",
	},
	{
		title: "Teams (Agent Groups)",
		url: "/admin/agent-groups",
	},
	{
		title: "Pending User(s)",
		url: "/admin/pending-users",
	},
];

const serviceItems = [
	{
		title: "My Numbers",
		url: "/admin/manage-did-numbers",
	},
	{
		title: "Agents",
		url: "/admin/extensions",
	},
	{
		title: "Departments",
		url: "/admin/departments",
	},
];

const outboundItems = [
	{
		title: "Dialer Campaigns",
		url: "/admin/dialer-campaigns",
	},
	{
		title: "Dialer Inbound Queue",
		url: "/admin/show-inbound-queue",
	},
	{
		title: "Lead Lists",
		url: "/admin/manage-leads",
	},
	{
		title: "Disposition Lists",
		url: "/admin/manage-disposition-list",
	},
	{
		title: "Pause Code Lists",
		url: "/admin/break-lists",
	},
	{
		title: "Account DND Lists",
		url: "/admin/dnd/manage-list",
	},
	{
		title: "Quick Transfer Lists",
		url: "/admin/manage-quick-transfer-list",
	},
	{
		title: "CSAT Survey",
		url: "/admin/manage-csat-survey",
	},
	{
		title: "Dialer Skill Lists",
		url: "/admin/dialer-skill-lists",
	},
	{
		title: "Agent Script",
		url: "/admin/agent-script",
	},
	{
		title: "Holiday Calendar",
		url: "/admin/holiday-calendar",
	},
];

const templateNavigation = [
	{
		title: "Template Management",
		url: "/admin/sms-templates",
	},
	{
		title: "Agent Dispositions",
		url: "/admin/agent-dispositions",
	},
	{
		title: "Survey Campaign",
		url: "/admin/survey-campaigns",
	},
	{
		title: "Scheduled Calls",
		url: "/admin/scheduled-calls",
	},
];

const manageRoleItems = [
	{ title: "Add User Role", url: "/admin/add-role" },
	{ title: "All Roles", url: "/admin/all-roles-and-permissions" },
] as const;

const otherNavigation = [
	{
		icon: Phone,
		title: "Calls",
		url: "/admin/calls",
	},
	{
		icon: LayoutDashboard,
		title: "Call Logs",
		url: "/admin/call-logs",
	},
];

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: This component renders a fixed multi-level navigation hierarchy.
export function AdminSidebar() {
	const navigate = useNavigate();
	const location = useLocation();

	const [usersOpen, setUsersOpen] = useState(false);
	const [servicesOpen, setServicesOpen] = useState(false);
	const [outboundOpen, setOutboundOpen] = useState(false);
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [userManagementOpen, setUserManagementOpen] = useState(false);
	const [manageSettingsOpen, setManageSettingsOpen] = useState(false);
	const [manageRolesOpen, setManageRolesOpen] = useState(false);
	const [manageTeamOpen, setManageTeamOpen] = useState(false);
	const [manageSftpOpen, setManageSftpOpen] = useState(false);
	const [manageAwsOpen, setManageAwsOpen] = useState(false);
	const [businessInformationOpen, setBusinessInformationOpen] = useState(false);

	const currentPath = location.pathname;

	const isActive = (url: string) => {
		if (url === "/admin") {
			return currentPath === "/admin" || currentPath === "/admin/";
		}

		return currentPath === url || currentPath.startsWith(`${url}/`);
	};

	return (
		<Sidebar
			className="border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
			collapsible="offcanvas"
		>
			{/* BRAND */}
			<SidebarHeader className="border-slate-100 border-b bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="h-auto cursor-default p-0 hover:bg-transparent dark:hover:bg-transparent"
							size="lg"
						>
							<div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-[#0757ff] text-white shadow-blue-500/20 shadow-sm dark:bg-blue-600">
								<span className="font-bold text-lg">W</span>
							</div>

							<div className="grid flex-1 text-left leading-tight">
								<span className="truncate font-bold text-[#102b55] text-sm tracking-tight dark:text-white">
									WORKHOLO
								</span>

								<span className="truncate font-medium text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
									Admin Panel
								</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent className="bg-white px-3 py-3 dark:bg-slate-950">
				{/* MANAGEMENT */}
				<SidebarGroup className="p-0">
					<SidebarGroupLabel className="mb-1 px-3 font-bold text-[10px] text-slate-400 uppercase tracking-wider dark:text-slate-500">
						Management
					</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu className="gap-1">
							{/* DASHBOARD + LIVE CALLS */}
							{navigation.map((item) => {
								const Icon = item.icon;
								const active = isActive(item.url);

								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											className={`h-9 rounded-lg px-3 transition-all ${
												active
													? "bg-blue-50 font-semibold text-[#0757ff] hover:bg-blue-50 hover:text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400 dark:hover:bg-blue-950/60 dark:hover:text-blue-400"
													: "text-slate-600 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400"
											}`}
											onClick={() =>
												navigate({
													to: item.url,
												})
											}
											tooltip={item.title}
										>
											<Icon
												className={`size-4 ${
													active
														? "text-[#0757ff] dark:text-blue-400"
														: "text-slate-400 dark:text-slate-500"
												}`}
											/>

											<span className="text-xs">{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}

							{/* USERS */}
							<SidebarMenuItem>
								<SidebarMenuButton
									className="h-9 rounded-lg px-3 text-slate-600 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400"
									onClick={() => setUsersOpen((open) => !open)}
									tooltip="Users"
								>
									<Users className="size-4 text-slate-400 dark:text-slate-500" />

									<span className="text-xs">Users</span>

									<ChevronRight
										className={`ml-auto size-4 text-slate-400 transition-transform dark:text-slate-500 ${
											usersOpen ? "rotate-90" : ""
										}`}
									/>
								</SidebarMenuButton>

								{!!usersOpen && (
									<div className="mt-1 ml-4 border-slate-200 border-l pl-2 dark:border-slate-800">
										{userItems.map((item) => {
											const active = isActive(item.url);

											return (
												<SidebarMenuItem key={item.title}>
													<SidebarMenuButton
														className={`h-8 rounded-md px-3 ${
															active
																? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400"
																: "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
														}`}
														onClick={() =>
															navigate({
																to: item.url,
															})
														}
														size="sm"
														tooltip={item.title}
													>
														<span className="text-[11px]">{item.title}</span>
													</SidebarMenuButton>
												</SidebarMenuItem>
											);
										})}
									</div>
								)}
							</SidebarMenuItem>

							{/* SERVICES */}
							<SidebarMenuItem>
								<SidebarMenuButton
									className="h-9 rounded-lg px-3 text-slate-600 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400"
									onClick={() => setServicesOpen((open) => !open)}
									tooltip="Services"
								>
									<Wrench className="size-4 text-slate-400 dark:text-slate-500" />

									<span className="text-xs">Services</span>

									<ChevronRight
										className={`ml-auto size-4 text-slate-400 transition-transform dark:text-slate-500 ${
											servicesOpen ? "rotate-90" : ""
										}`}
									/>
								</SidebarMenuButton>

								{!!servicesOpen && (
									<div className="mt-1 ml-4 border-slate-200 border-l pl-2 dark:border-slate-800">
										{serviceItems.map((item) => {
											const active = isActive(item.url);

											return (
												<SidebarMenuItem key={item.title}>
													<SidebarMenuButton
														className={`h-8 rounded-md px-3 ${
															active
																? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400"
																: "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
														}`}
														onClick={() =>
															navigate({
																to: item.url,
															})
														}
														size="sm"
														tooltip={item.title}
													>
														<span className="text-[11px]">{item.title}</span>
													</SidebarMenuButton>
												</SidebarMenuItem>
											);
										})}

										{/* OUTBOUND SERVICES */}
										<SidebarMenuItem className="mt-1">
											<SidebarMenuButton
												className="h-8 rounded-md px-3 text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
												onClick={() => setOutboundOpen((open) => !open)}
												size="sm"
												tooltip="Outbound Services"
											>
												<span className="text-[11px]">Outbound Services</span>

												<ChevronRight
													className={`ml-auto size-3.5 text-slate-400 transition-transform dark:text-slate-500 ${
														outboundOpen ? "rotate-90" : ""
													}`}
												/>
											</SidebarMenuButton>

											{!!outboundOpen && (
												<div className="mt-1 ml-3 border-slate-200 border-l pl-2 dark:border-slate-800">
													{outboundItems.map((item) => {
														const active = isActive(item.url);

														return (
															<SidebarMenuItem key={item.title}>
																<SidebarMenuButton
																	className={`h-7 rounded-md px-2 ${
																		active
																			? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400"
																			: "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
																	}`}
																	onClick={() =>
																		navigate({
																			to: item.url,
																		})
																	}
																	size="sm"
																	tooltip={item.title}
																>
																	<span className="text-[10px]">
																		{item.title}
																	</span>
																</SidebarMenuButton>
															</SidebarMenuItem>
														);
													})}
												</div>
											)}
										</SidebarMenuItem>

										{/* TEMPLATE MANAGEMENT */}
										{templateNavigation.map((item) => {
											const active = isActive(item.url);

											return (
												<SidebarMenuItem className="mt-1" key={item.title}>
													<SidebarMenuButton
														className={`h-8 rounded-md px-3 ${
															active
																? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400"
																: "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
														}`}
														onClick={() =>
															navigate({
																to: item.url,
															})
														}
														size="sm"
														tooltip={item.title}
													>
														<span className="text-[11px]">{item.title}</span>
													</SidebarMenuButton>
												</SidebarMenuItem>
											);
										})}
									</div>
								)}
							</SidebarMenuItem>

							{/* SETTINGS */}
							<SidebarMenuItem className="mt-1">
								<SidebarMenuButton
									className="h-9 rounded-lg px-3 text-slate-600 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400"
									onClick={() => setSettingsOpen((open) => !open)}
									tooltip="Settings"
								>
									<Settings className="size-4 text-slate-400 dark:text-slate-500" />
									<span className="text-xs">Settings</span>
									<ChevronRight
										className={`ml-auto size-4 text-slate-400 transition-transform dark:text-slate-500 ${
											settingsOpen ? "rotate-90" : ""
										}`}
									/>
								</SidebarMenuButton>

								{!!settingsOpen && (
									<div className="mt-1 ml-4 border-slate-200 border-l pl-2 dark:border-slate-800">
										{/* USER MANAGEMENT */}
										<SidebarMenuItem>
											<SidebarMenuButton
												className="h-8 rounded-md px-3 text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
												onClick={() => setUserManagementOpen((open) => !open)}
												size="sm"
												tooltip="User Management"
											>
												<span className="text-[11px]">User Management</span>
												<ChevronRight
													className={`ml-auto size-3.5 text-slate-400 transition-transform dark:text-slate-500 ${
														userManagementOpen ? "rotate-90" : ""
													}`}
												/>
											</SidebarMenuButton>

											{!!userManagementOpen && (
												<div className="mt-1 ml-3 border-slate-200 border-l pl-2 dark:border-slate-800">
													{/* MANAGE ROLES */}
													<SidebarMenuItem>
														<SidebarMenuButton
															className="h-8 rounded-md px-2 text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
															onClick={() =>
																setManageRolesOpen((open) => !open)
															}
															size="sm"
															tooltip="Manage Roles"
														>
															<span className="text-[11px]">Manage Roles</span>
															<ChevronRight
																className={`ml-auto size-3.5 text-slate-400 transition-transform dark:text-slate-500 ${
																	manageRolesOpen ? "rotate-90" : ""
																}`}
															/>
														</SidebarMenuButton>

														{!!manageRolesOpen && (
															<div className="mt-1 ml-3 border-slate-200 border-l pl-2 dark:border-slate-800">
																{manageRoleItems.map((item) => {
																	const active = isActive(item.url);
																	return (
																		<SidebarMenuItem key={item.title}>
																			<SidebarMenuButton
																				className={`h-7 rounded-md px-2 ${
																					active
																						? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400"
																						: "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
																				}`}
																				onClick={() =>
																					navigate({ to: item.url })
																				}
																				size="sm"
																				tooltip={item.title}
																			>
																				<span className="text-[10px]">
																					{item.title}
																				</span>
																			</SidebarMenuButton>
																		</SidebarMenuItem>
																	);
																})}
															</div>
														)}
													</SidebarMenuItem>

													{/* MANAGE TEAM */}
													<SidebarMenuItem className="mt-1">
														<SidebarMenuButton
															className="h-8 rounded-md px-2 text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
															onClick={() => setManageTeamOpen((open) => !open)}
															size="sm"
															tooltip="Manage Team"
														>
															<span className="text-[11px]">Manage Team</span>
															<ChevronRight
																className={`ml-auto size-3.5 text-slate-400 transition-transform dark:text-slate-500 ${manageTeamOpen ? "rotate-90" : ""}`}
															/>
														</SidebarMenuButton>
														{!!manageTeamOpen && (
															<div className="mt-1 ml-3 border-slate-200 border-l pl-2 dark:border-slate-800">
																<SidebarMenuItem>
																	<SidebarMenuButton
																		className={`h-7 rounded-md px-2 ${isActive("/admin/show-member") ? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400" : "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"}`}
																		onClick={() =>
																			navigate({ to: "/admin/show-member" })
																		}
																		size="sm"
																		tooltip="All Members"
																	>
																		<span className="text-[10px]">
																			All Members
																		</span>
																	</SidebarMenuButton>
																</SidebarMenuItem>
															</div>
														)}
													</SidebarMenuItem>
												</div>
											)}
										</SidebarMenuItem>

										{/* MANAGE SETTINGS */}
										<SidebarMenuItem className="mt-1">
											<SidebarMenuButton
												className="h-8 rounded-md px-3 text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
												onClick={() => setManageSettingsOpen((open) => !open)}
												size="sm"
												tooltip="Manage Settings"
											>
												<span className="text-[11px]">Manage Settings</span>
												<ChevronRight
													className={`ml-auto size-3.5 text-slate-400 transition-transform dark:text-slate-500 ${manageSettingsOpen ? "rotate-90" : ""}`}
												/>
											</SidebarMenuButton>

											{!!manageSettingsOpen && (
												<div className="mt-1 ml-3 border-slate-200 border-l pl-2 dark:border-slate-800">
													{/* MANAGE SFTP */}
													<SidebarMenuItem>
														<SidebarMenuButton
															className="h-8 rounded-md px-2 text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
															onClick={() => setManageSftpOpen((open) => !open)}
															size="sm"
															tooltip="Manage SFTP"
														>
															<span className="text-[11px]">Manage SFTP</span>
															<ChevronRight
																className={`ml-auto size-3.5 text-slate-400 transition-transform dark:text-slate-500 ${manageSftpOpen ? "rotate-90" : ""}`}
															/>
														</SidebarMenuButton>
														{!!manageSftpOpen && (
															<div className="mt-1 ml-3 border-slate-200 border-l pl-2 dark:border-slate-800">
																{[
																	["Add SFTP", "/admin/add-sftp"],
																	["All SFTP", "/admin/sftp"],
																].map(([title, url]) => (
																	<SidebarMenuItem key={title}>
																		<SidebarMenuButton
																			className={`h-7 rounded-md px-2 ${isActive(url) ? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400" : "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"}`}
																			onClick={() => navigate({ to: url })}
																			size="sm"
																			tooltip={title}
																		>
																			<span className="text-[10px]">
																				{title}
																			</span>
																		</SidebarMenuButton>
																	</SidebarMenuItem>
																))}
															</div>
														)}
													</SidebarMenuItem>
													{/* MANAGE AWS */}
													<SidebarMenuItem className="mt-1">
														<SidebarMenuButton
															className="h-8 rounded-md px-2 text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
															onClick={() => setManageAwsOpen((open) => !open)}
															size="sm"
															tooltip="Manage AWS"
														>
															<span className="text-[11px]">Manage AWS</span>
															<ChevronRight
																className={`ml-auto size-3.5 text-slate-400 transition-transform dark:text-slate-500 ${
																	manageAwsOpen ? "rotate-90" : ""
																}`}
															/>
														</SidebarMenuButton>

														{!!manageAwsOpen && (
															<div className="mt-1 ml-3 border-slate-200 border-l pl-2 dark:border-slate-800">
																<SidebarMenuItem>
																	<SidebarMenuButton
																		className={`h-7 rounded-md px-2 ${
																			isActive("/admin/remote-storage")
																				? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400"
																				: "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
																		}`}
																		onClick={() =>
																			navigate({ to: "/admin/remote-storage" })
																		}
																		size="sm"
																		tooltip="Manage Remote Storage"
																	>
																		<span className="text-[10px]">
																			Manage Remote Storage
																		</span>
																	</SidebarMenuButton>
																</SidebarMenuItem>
															</div>
														)}
													</SidebarMenuItem>

													{/* RECORDING FOLDER STRUCTURE */}
													<SidebarMenuItem className="mt-1">
														<SidebarMenuButton
															className={`h-8 rounded-md px-3 ${
																isActive("/admin/recording-folder-structure")
																	? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400"
																	: "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
															}`}
															onClick={() =>
																navigate({
																	to: "/admin/recording-folder-structure",
																})
															}
															size="sm"
															tooltip="Recording Folder Structure"
														>
															<span className="text-[11px]">
																Recording Folder Structure
															</span>
														</SidebarMenuButton>
													</SidebarMenuItem>

													{/* SIMPLE SETTINGS ITEMS */}
													<SidebarMenuItem className="mt-1">
														<SidebarMenuButton
															className={`h-8 rounded-md px-3 ${isActive("/admin/ip-pool-whitelisting") ? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400" : "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"}`}
															onClick={() =>
																navigate({ to: "/admin/ip-pool-whitelisting" })
															}
															size="sm"
															tooltip="IP Pool Whitelisting"
														>
															<span className="text-[11px]">
																IP Pool Whitelisting
															</span>
														</SidebarMenuButton>
													</SidebarMenuItem>

													{/* BUSINESS INFORMATION */}
													<SidebarMenuItem className="mt-1">
														<SidebarMenuButton
															className="h-8 rounded-md px-3 text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"
															onClick={() =>
																setBusinessInformationOpen((open) => !open)
															}
															size="sm"
															tooltip="Business Information"
														>
															<span className="text-[11px]">
																Business Information
															</span>
															<ChevronRight
																className={`ml-auto size-3.5 text-slate-400 transition-transform dark:text-slate-500 ${businessInformationOpen ? "rotate-90" : ""}`}
															/>
														</SidebarMenuButton>
														{!!businessInformationOpen && (
															<div className="mt-1 ml-3 border-slate-200 border-l pl-2 dark:border-slate-800">
																{[
																	["Profile", "/admin/profile"],
																	[
																		"Notification Management",
																		"/admin/notification-management",
																	],
																].map(([title, url]) => (
																	<SidebarMenuItem key={title}>
																		<SidebarMenuButton
																			className={`h-7 rounded-md px-2 ${isActive(url) ? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400" : "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"}`}
																			onClick={() => navigate({ to: url })}
																			size="sm"
																			tooltip={title}
																		>
																			<span className="text-[10px]">
																				{title}
																			</span>
																		</SidebarMenuButton>
																	</SidebarMenuItem>
																))}
															</div>
														)}
													</SidebarMenuItem>

													{[
														["Reset Password", "/admin/reset-password"],
														[
															"CDP List Management",
															"/admin/cdp-list-management",
														],
														["Sign Out", "/admin/sign-out"],
													].map(([title, url]) => (
														<SidebarMenuItem className="mt-1" key={title}>
															<SidebarMenuButton
																className={`h-8 rounded-md px-3 ${isActive(url) ? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400" : "text-slate-500 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-blue-400"}`}
																onClick={() => navigate({ to: url })}
																size="sm"
																tooltip={title}
															>
																<span className="text-[11px]">{title}</span>
															</SidebarMenuButton>
														</SidebarMenuItem>
													))}
												</div>
											)}
										</SidebarMenuItem>
									</div>
								)}
							</SidebarMenuItem>

							{/* CALLS + CALL LOGS */}
							{otherNavigation.map((item) => {
								const Icon = item.icon;
								const active = isActive(item.url);

								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											className={`h-9 rounded-lg px-3 ${
												active
													? "bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950/60 dark:text-blue-400"
													: "text-slate-600 hover:bg-slate-50 hover:text-[#0757ff] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400"
											}`}
											onClick={() =>
												navigate({
													to: item.url,
												})
											}
											tooltip={item.title}
										>
											<Icon
												className={`size-4 ${
													active
														? "text-[#0757ff] dark:text-blue-400"
														: "text-slate-400 dark:text-slate-500"
												}`}
											/>

											<span className="text-xs">{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			{/* FOOTER */}
			<SidebarFooter className="border-slate-100 border-t bg-white px-3 py-3 dark:border-slate-800 dark:bg-slate-950">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="h-9 rounded-lg px-3 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:text-slate-400 dark:hover:bg-red-950/40 dark:hover:text-red-400"
							tooltip="Logout"
						>
							<LogOut className="size-4" />

							<span className="text-xs">Logout</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
