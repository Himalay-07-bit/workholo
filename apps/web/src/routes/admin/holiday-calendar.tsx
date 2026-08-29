import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/holiday-calendar")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/holiday-calendar"!</div>;
}
