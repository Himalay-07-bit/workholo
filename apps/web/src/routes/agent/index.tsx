import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/agent/")({
	component: AgentDashboard,
});

function AgentDashboard() {
	return (
		<div className="flex min-h-svh items-center justify-center bg-[#eef3f9]">
			<h1 className="font-semibold text-3xl text-slate-900">Agent Dashboard</h1>
		</div>
	);
}
