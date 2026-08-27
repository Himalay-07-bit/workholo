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
