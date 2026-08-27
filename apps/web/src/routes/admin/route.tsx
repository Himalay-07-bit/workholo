import {
	createFileRoute,
	Outlet,
	useRouterState,
} from "@tanstack/react-router";

import { SidebarProvider } from "@workholo/ui/components/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export const Route = createFileRoute("/admin")({
	component: AdminLayout,
});

function AdminLayout() {
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});

	// Login page should not use the admin layout.
	if (pathname === "/admin/login") {
		return <Outlet />;
	}

	return (
		<SidebarProvider>
			<div className="flex min-h-svh w-full">
				<AdminSidebar />

				<main className="flex min-w-0 flex-1 flex-col">
					<Outlet />
				</main>
			</div>
		</SidebarProvider>
	);
}
