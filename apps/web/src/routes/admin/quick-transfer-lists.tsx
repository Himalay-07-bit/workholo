import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/quick-transfer-lists")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/quick-transfer-lists"!</div>;
}
