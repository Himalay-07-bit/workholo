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
		<header className="flex h-16 shrink-0 items-center gap-3 border-b bg-background px-4">
			<SidebarTrigger />

			<Separator className="h-6" orientation="vertical" />

			<div className="flex flex-1 items-center">
				<div>
					<h1 className="font-semibold text-lg">Admin Dashboard</h1>

					<p className="text-muted-foreground text-xs">
						Manage your calling platform
					</p>
				</div>
			</div>

			<Button
				onClick={toggleTheme}
				size="icon"
				title="Toggle theme"
				variant="ghost"
			>
				{theme === "dark" ? <Sun /> : <Moon />}
			</Button>

			<Button size="icon" variant="ghost">
				<Search />
			</Button>

			<Button size="icon" variant="ghost">
				<Bell />
			</Button>

			<Avatar className="size-8">
				<AvatarFallback>A</AvatarFallback>
			</Avatar>
		</header>
	);
}
