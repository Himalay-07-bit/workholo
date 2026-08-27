import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/calls")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/calls"!</div>;
}
