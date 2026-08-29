import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/csat-survey")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/admin/csat-survey"!</div>;
}
