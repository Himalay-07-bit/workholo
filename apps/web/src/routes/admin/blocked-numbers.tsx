import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import { ArrowLeft, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/blocked-numbers")({
	component: BlockedNumbersPage,
});

const blockedNumbers = [
	{
		callerId: "+916290966136",
		blockedAgainst: "DID",
		numbers: "+91806214610, +917965267794, +918062366936",
	},
	{
		callerId: "+916379177223",
		blockedAgainst: "DID",
		numbers: "+91806214610, +917965267835, +917965267836",
	},
	{
		callerId: "+917042943323",
		blockedAgainst: "Account",
		numbers: "—",
	},
];

function BlockedNumbersPage() {
	return (
		<div className="flex min-h-svh flex-col">
			<header className="flex h-16 items-center justify-between border-b bg-background px-6">
				<div>
					<h1 className="font-semibold text-lg">List of all Blocked Numbers</h1>

					<p className="text-muted-foreground text-xs">
						Manage numbers that are blocked from calling.
					</p>
				</div>

				<Link className={buttonVariants()} to="/admin/block-calls">
					<Plus className="mr-2 size-4" />
					Block a Number
				</Link>
			</header>

			<main className="flex-1 bg-muted/30 p-6">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>Blocked Numbers</CardTitle>

							<Link
								className={buttonVariants({ variant: "outline" })}
								to="/admin/manage-did-numbers"
							>
								<ArrowLeft className="mr-2 size-4" />
								Back to My Numbers
							</Link>
						</div>
					</CardHeader>

					<CardContent>
						<div className="mb-6 flex justify-end">
							<Input
								className="max-w-sm"
								placeholder="Search blocked numbers..."
							/>
						</div>

						<div className="overflow-x-auto rounded-md border">
							<table className="w-full text-sm">
								<thead className="bg-muted/50">
									<tr className="border-b">
										<th className="px-4 py-3 text-left font-medium">
											Caller ID
										</th>

										<th className="px-4 py-3 text-left font-medium">
											Blocked Against
										</th>

										<th className="px-4 py-3 text-left font-medium">Number</th>

										<th className="px-4 py-3 text-left font-medium">Actions</th>
									</tr>
								</thead>

								<tbody>
									{blockedNumbers.map((item) => (
										<tr className="border-b last:border-0" key={item.callerId}>
											<td className="px-4 py-4">{item.callerId}</td>

											<td className="px-4 py-4">{item.blockedAgainst}</td>

											<td className="max-w-md px-4 py-4">
												<span className="break-all">{item.numbers}</span>
											</td>

											<td className="px-4 py-4">
												<Button size="sm" variant="outline">
													Select an Action
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>

						<div className="mt-4 flex items-center justify-between text-muted-foreground text-sm">
							<span>Showing 1 to {blockedNumbers.length} entries</span>

							<div className="flex gap-2">
								<Button disabled size="sm" variant="outline">
									Previous
								</Button>

								<Button size="sm" variant="outline">
									1
								</Button>

								<Button disabled size="sm" variant="outline">
									Next
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
