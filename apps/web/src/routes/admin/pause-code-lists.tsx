import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/pause-code-lists")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/pause-code-lists"!</div>;
}
