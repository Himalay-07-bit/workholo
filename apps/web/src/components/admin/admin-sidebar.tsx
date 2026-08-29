// biome-ignore-all lint/performance/noJsxPropsBind: Navigation handlers need the selected menu item.

import { useNavigate } from "@tanstack/react-router";
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
	BarChart3,
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
		title: "Time Groups",
		url: "/admin/time-groups",
	},
	{
		title: "Time Conditions",
		url: "/admin/time-conditions",
	},
	{
		title: "IVR",
		url: "/admin/ivr",
	},
	{
		title: "Auto-Attendant",
		url: "/admin/auto-attendant",
	},
	{
		title: "Agents",
		url: "/admin/extensions",
	},
	{
		title: "Departments",
		url: "/admin/departments",
	},
	{
		title: "System Recordings",
		url: "/admin/system-recordings",
	},
	{
		title: "Voicemail",
		url: "/admin/voicemail",
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
		url: "/admin/pause-code-lists",
	},
	{
		title: "Account DND Lists",
		url: "/admin/dnd/manage-list",
	},
	{
		title: "Quick Transfer Lists",
		url: "/admin/quick-transfer-lists",
	},
	{
		title: "CSAT Survey",
		url: "/admin/csat-survey",
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

const otherNavigation = [
	{
		icon: Phone,
		title: "Calls",
		url: "/admin/calls",
	},
	{
		icon: BarChart3,
		title: "Call Logs",
		url: "/admin/call-logs",
	},
];

export function AdminSidebar() {
	const navigate = useNavigate();

	const [usersOpen, setUsersOpen] = useState(true);
	const [servicesOpen, setServicesOpen] = useState(true);
	const [outboundOpen, setOutboundOpen] = useState(true);

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg">
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
								<span className="font-bold">W</span>
							</div>

							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">WORKHOLO</span>

								<span className="truncate text-muted-foreground text-xs">
									Admin Panel
								</span>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Management</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{/* Dashboard + Live Calls */}
							{navigation.map((item) => {
								const Icon = item.icon;

								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											onClick={() => navigate({ to: item.url })}
											tooltip={item.title}
										>
											<Icon />
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}

							{/* Users */}
							<SidebarMenuItem>
								<SidebarMenuButton
									onClick={() => setUsersOpen((open) => !open)}
									tooltip="Users"
								>
									<Users />
									<span>Users</span>

									<ChevronRight
										className={`ml-auto transition-transform ${
											usersOpen ? "rotate-90" : ""
										}`}
									/>
								</SidebarMenuButton>

								{usersOpen ? (
									<div className="ml-4 border-l pl-3">
										{userItems.map((item) => (
											<SidebarMenuItem key={item.title}>
												<SidebarMenuButton
													onClick={() => navigate({ to: item.url })}
													size="sm"
													tooltip={item.title}
												>
													<span>{item.title}</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}
									</div>
								) : null}
							</SidebarMenuItem>

							{/* Services */}
							<SidebarMenuItem>
								<SidebarMenuButton
									onClick={() => setServicesOpen((open) => !open)}
									tooltip="Services"
								>
									<Wrench />
									<span>Services</span>

									<ChevronRight
										className={`ml-auto transition-transform ${
											servicesOpen ? "rotate-90" : ""
										}`}
									/>
								</SidebarMenuButton>

								{servicesOpen ? (
									<div className="ml-4 border-l pl-3">
										{serviceItems.map((item) => (
											<SidebarMenuItem key={item.title}>
												<SidebarMenuButton
													onClick={() => navigate({ to: item.url })}
													size="sm"
													tooltip={item.title}
												>
													<span>{item.title}</span>
												</SidebarMenuButton>
											</SidebarMenuItem>
										))}

										{/* Outbound Services */}
										<SidebarMenuItem>
											<SidebarMenuButton
												onClick={() => setOutboundOpen((open) => !open)}
												size="sm"
												tooltip="Outbound Services"
											>
												<span>Outbound Services</span>

												<ChevronRight
													className={`ml-auto transition-transform ${
														outboundOpen ? "rotate-90" : ""
													}`}
												/>
											</SidebarMenuButton>

											{outboundOpen ? (
												<div className="mt-1 ml-4 rounded-md bg-muted/50 px-2 py-1">
													{outboundItems.map((item) => (
														<SidebarMenuItem key={item.title}>
															<SidebarMenuButton
																onClick={() => navigate({ to: item.url })}
																size="sm"
																tooltip={item.title}
															>
																<span>{item.title}</span>
															</SidebarMenuButton>
														</SidebarMenuItem>
													))}
												</div>
											) : null}
										</SidebarMenuItem>
									</div>
								) : null}
							</SidebarMenuItem>

							{/* Calls + Call Logs */}
							{otherNavigation.map((item) => {
								const Icon = item.icon;

								return (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton
											onClick={() => navigate({ to: item.url })}
											tooltip={item.title}
										>
											<Icon />
											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{/* System */}
				<SidebarGroup>
					<SidebarGroupLabel>System</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									onClick={() => navigate({ to: "/admin/settings" })}
									tooltip="Settings"
								>
									<Settings />
									<span>Settings</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton tooltip="Logout">
							<LogOut />
							<span>Logout</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
