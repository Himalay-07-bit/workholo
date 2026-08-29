import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/dialer-skill-lists")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/dialer-skill-lists"!</div>;
}
