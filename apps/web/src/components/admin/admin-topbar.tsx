// biome-ignore-all lint/performance/noJsxPropsBind: The theme toggle is a local UI action.

import { useNavigate } from "@tanstack/react-router";
import { Avatar, AvatarFallback } from "@workholo/ui/components/avatar";
import { Button } from "@workholo/ui/components/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@workholo/ui/components/dropdown-menu";
import { Separator } from "@workholo/ui/components/separator";
import { SidebarTrigger } from "@workholo/ui/components/sidebar";
import {
	Bell,
	LogOut,
	Mail,
	Moon,
	Phone,
	Search,
	Settings,
	Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

import { authClient } from "@/lib/auth-client";

export function AdminTopbar() {
	const navigate = useNavigate();
	const { theme, setTheme } = useTheme();
	const { data: session } = authClient.useSession();
	const userName = session?.user.name?.trim() || "Admin";
	const userEmail = session?.user.email || "Signed-in administrator";
	const userPhone = "No phone number";
	const userInitial = userName.charAt(0).toUpperCase();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	const signOut = async () => {
		await authClient.signOut();
		navigate({ to: "/auth" });
	};

	return (
		<header className="sticky top-0 flex h-16 shrink-0 items-center gap-3 border-slate-200 border-b bg-white px-4 dark:border-slate-800 dark:bg-slate-950">
			<SidebarTrigger className="text-slate-600 hover:bg-slate-100 hover:text-[#0757ff] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400" />

			<Separator
				className="h-16 bg-slate-200 dark:bg-slate-800"
				orientation="vertical"
			/>

			<div className="flex flex-1 items-center">
				<div>
					<h1 className="font-semibold text-[#102b55] text-lg dark:text-white">
						Admin Dashboard
					</h1>
				</div>
			</div>

			{/* Theme Toggle */}
			<Button
				className="text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:text-slate-300 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
				onClick={toggleTheme}
				size="icon"
				title="Toggle theme"
				variant="ghost"
			>
				{theme === "dark" ? (
					<Sun className="size-4" />
				) : (
					<Moon className="size-4" />
				)}
			</Button>

			{/* Search */}
			<Button
				className="text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400"
				size="icon"
				title="Search"
				variant="ghost"
			>
				<Search className="size-4" />
			</Button>

			{/* Notifications */}
			<Button
				className="text-slate-500 hover:bg-blue-50 hover:text-[#0757ff] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400"
				size="icon"
				title="Notifications"
				variant="ghost"
			>
				<Bell className="size-4" />
			</Button>

			<DropdownMenu>
				<DropdownMenuTrigger aria-label="Open user menu">
					<Avatar className="size-8 cursor-pointer border border-slate-200 dark:border-slate-700">
						<AvatarFallback className="bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950 dark:text-blue-400">
							{userInitial}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-72 p-0">
					<div className="flex items-center gap-3 border-slate-200 border-b px-4 py-4 dark:border-slate-700">
						<Avatar className="size-16 shrink-0">
							<AvatarFallback className="bg-[#0757ff] font-medium text-2xl text-white">
								{userInitial}
							</AvatarFallback>
						</Avatar>

						<div className="min-w-0">
							<p className="truncate font-medium text-foreground text-lg">
								{userName}
							</p>
							<p className="mt-0.5 truncate text-muted-foreground text-sm">
								{userEmail}
							</p>
							<p className="mt-1 font-medium text-[#0757ff] text-sm">ADMIN</p>
						</div>
					</div>

					<div className="space-y-1 px-2 py-3">
						<div className="flex items-center gap-3 px-2 py-2 text-slate-600 text-sm dark:text-slate-300">
							<Phone className="size-5 text-slate-400 dark:text-slate-500" />
							<span>{userPhone}</span>
						</div>

						<div className="flex items-center gap-3 px-2 py-2 text-slate-600 text-sm dark:text-slate-300">
							<Mail className="size-5 text-slate-400 dark:text-slate-500" />
							<span className="truncate">{userEmail}</span>
						</div>

						<DropdownMenuItem
							onClick={() => navigate({ to: "/admin/profile" })}
						>
							<Settings className="size-5" />
							Profile
						</DropdownMenuItem>

						<DropdownMenuItem disabled>
							<Settings className="size-5" />
							Change Password
						</DropdownMenuItem>
					</div>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						className="m-2"
						onClick={signOut}
						variant="destructive"
					>
						<LogOut className="size-5" />
						Sign out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}
