// biome-ignore-all lint/performance/noJsxPropsBind: The theme toggle is a local UI action.

import { Avatar, AvatarFallback } from "@workholo/ui/components/avatar";
import { Button } from "@workholo/ui/components/button";
import { Separator } from "@workholo/ui/components/separator";
import { SidebarTrigger } from "@workholo/ui/components/sidebar";
import { Bell, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function AdminTopbar() {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<header className="flex h-16 shrink-0 items-center gap-3 border-slate-200 border-b bg-white px-4 dark:border-slate-800 dark:bg-slate-950">
			<SidebarTrigger className="text-slate-600 hover:bg-slate-100 hover:text-[#0757ff] dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-blue-400" />

			<Separator
				className="h-6 bg-slate-200 dark:bg-slate-800"
				orientation="vertical"
			/>

			<div className="flex flex-1 items-center">
				<div>
					<h1 className="font-semibold text-[#102b55] text-lg dark:text-white">
						Admin Dashboard
					</h1>

					<p className="text-slate-400 text-xs dark:text-slate-500">
						Manage your calling platform
					</p>
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

			{/* Avatar */}
			<Avatar className="size-8 border border-slate-200 dark:border-slate-700">
				<AvatarFallback className="bg-blue-50 font-semibold text-[#0757ff] dark:bg-blue-950 dark:text-blue-400">
					A
				</AvatarFallback>
			</Avatar>
		</header>
	);
}
