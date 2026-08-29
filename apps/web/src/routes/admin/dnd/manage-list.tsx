import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/dnd/manage-list")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/dnd/manage-list"!</div>;
}
