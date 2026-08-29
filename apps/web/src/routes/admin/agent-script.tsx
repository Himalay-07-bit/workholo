import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/agent-script")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/agent-script"!</div>;
}
