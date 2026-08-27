// biome-ignore-all lint/performance/noJsxPropsBind: Copy controls need the row's call identifier.
import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@workholo/ui/components/badge";
import { Button } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { ArrowUpRight, Copy, MoreHorizontal, Radio } from "lucide-react";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const Route = createFileRoute("/admin/livecalls")({
	component: LiveCallsPage,
});

const liveCalls = [
	{
		id: "CALL-1001",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860196)",
		number: "+917965004859",
		destination: "7096644642",
		duration: "00:07:27",
		state: "Answered",
	},
	{
		id: "CALL-1002",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860204)",
		number: "+917965369371",
		destination: "9845097613",
		duration: "00:07:23",
		state: "Answered",
	},
	{
		id: "CALL-1003",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860195)",
		number: "+917965004859",
		destination: "9940508247",
		duration: "00:05:07",
		state: "Answered",
	},
	{
		id: "CALL-1004",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860201)",
		number: "+917965004859",
		destination: "9977220778",
		duration: "00:04:38",
		state: "Answered",
	},
	{
		id: "CALL-1005",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860176)",
		number: "+917965369372",
		destination: "9769951082",
		duration: "00:01:57",
		state: "Answered",
	},
	{
		id: "CALL-1006",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860164)",
		number: "+918064370287",
		destination: "7980914376",
		duration: "00:01:00",
		state: "Answered",
	},
	{
		id: "CALL-1007",
		direction: "Outgoing",
		source: "Dialer (Extension-0602155860167)",
		number: "+918064370287",
		destination: "9998631485",
		duration: "00:00:28",
		state: "Answered",
	},
];

function LiveCallsPage() {
	return (
		<div className="flex min-h-svh flex-col">
			<AdminTopbar />

			<main className="flex-1 space-y-4 bg-muted/30 p-4 md:p-6">
				<Card>
					<CardHeader className="border-b">
						<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
							<CardTitle className="text-xl">
								Live Calls - {liveCalls.length}
							</CardTitle>

							<div className="flex gap-2">
								<Button variant="outline">Feature Codes</Button>

								<Button variant="outline">
									More
									<MoreHorizontal className="ml-1 size-4" />
								</Button>
							</div>
						</div>
					</CardHeader>

					<CardContent className="p-0">
						<div className="overflow-x-auto">
							<table className="w-full min-w-[1100px] text-sm">
								<thead>
									<tr className="border-b bg-muted/50">
										<th className="px-4 py-3 text-left font-medium">
											Call Direction
										</th>
										<th className="px-4 py-3 text-left font-medium">Source</th>
										<th className="px-4 py-3 text-left font-medium">Number</th>
										<th className="px-4 py-3 text-left font-medium">
											Destination
										</th>
										<th className="px-4 py-3 text-left font-medium">
											Duration
										</th>
										<th className="px-4 py-3 text-left font-medium">State</th>
										<th className="px-4 py-3 text-left font-medium">Action</th>
									</tr>
								</thead>

								<tbody>
									{liveCalls.map((call) => (
										<tr
											className="border-b last:border-0 hover:bg-muted/30"
											key={call.id}
										>
											<td className="px-4 py-4">
												<div className="flex items-center gap-2">
													<ArrowUpRight className="size-5 text-green-600" />
													<span>{call.direction}</span>
												</div>
											</td>

											<td className="max-w-[280px] px-4 py-4">
												<div className="flex items-center gap-2">
													<Radio className="size-4 text-muted-foreground" />
													<span>{call.source}</span>
												</div>
											</td>

											<td className="px-4 py-4 font-medium">{call.number}</td>

											<td className="px-4 py-4">{call.destination}</td>

											<td className="px-4 py-4 font-mono">{call.duration}</td>

											<td className="px-4 py-4">
												<Badge variant="secondary">{call.state}</Badge>
											</td>

											<td className="px-4 py-4">
												<div className="flex min-w-[150px] flex-col gap-1">
													<button
														className="w-fit text-left text-sm hover:underline"
														type="button"
													>
														Hangup
													</button>

													<button
														className="w-fit text-left text-sm hover:underline"
														type="button"
													>
														Listen / Whisper
													</button>

													<Button
														className="w-fit"
														onClick={() =>
															navigator.clipboard.writeText(call.id)
														}
														size="sm"
														variant="secondary"
													>
														<Copy className="mr-1 size-3" />
														Copy Call-Id
													</Button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
