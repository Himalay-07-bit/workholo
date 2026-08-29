import { createORPCClient } from "@orpc/client";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AppRouterClient } from "@workholo/api/routers/index";
import { Toaster } from "@workholo/ui/components/sonner";
import { TooltipProvider } from "@workholo/ui/components/tooltip";
import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import type { orpcClient, queryUtils } from "@/utils/orpc";
import { link } from "@/utils/orpc";

import "../index.css";

export interface RouterAppContext {
	orpcClient: typeof orpcClient;
	queryClient: QueryClient;
	queryUtils: typeof queryUtils;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootComponent,
	head: () => ({
		links: [
			{
				href: "/favicon.ico",
				rel: "icon",
			},
		],
		meta: [
			{
				title: "workholo",
			},
			{
				content: "workholo is a web application",
				name: "description",
			},
		],
	}),
});

function RootComponent() {
	const [client] = useState<AppRouterClient>(() => createORPCClient(link));
	const [_orpcUtils] = useState(() => createTanstackQueryUtils(client));

	return (
		<>
			<HeadContent />
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				disableTransitionOnChange
				storageKey="vite-ui-theme"
			>
				<TooltipProvider>
					<div className="h-svh">
						<Outlet />
					</div>
				</TooltipProvider>
				<Toaster richColors />
			</ThemeProvider>
			<TanStackRouterDevtools position="bottom-left" />
			<ReactQueryDevtools buttonPosition="bottom-right" position="bottom" />
		</>
	);
}
