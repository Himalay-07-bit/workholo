import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/call-logs")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/call-logs"!</div>;
}
