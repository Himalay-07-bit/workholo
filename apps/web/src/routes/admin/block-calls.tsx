import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, buttonVariants } from "@workholo/ui/components/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@workholo/ui/components/card";
import { Input } from "@workholo/ui/components/input";
import { Label } from "@workholo/ui/components/label";
import { ArrowLeft, Ban } from "lucide-react";

export const Route = createFileRoute("/admin/block-calls")({
	component: BlockCallsPage,
});

function BlockCallsPage() {
	return (
		<div className="flex min-h-svh flex-col">
			<header className="flex h-16 items-center border-b bg-background px-6">
				<div>
					<h1 className="font-semibold text-lg">Block a Number</h1>
					<p className="text-muted-foreground text-xs">
						Prevent calls from a specific number.
					</p>
				</div>
			</header>

			<main className="flex-1 bg-muted/30 p-6">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between">
						<CardTitle>Block a Number</CardTitle>

						<div className="flex gap-2">
							<Link
								className={buttonVariants({ variant: "outline" })}
								to="/admin/blocked-numbers"
							>
								<Ban className="mr-2 size-4" />
								All Blocked Numbers
							</Link>

							<Link
								className={buttonVariants({ variant: "outline" })}
								to="/admin/manage-did-numbers"
							>
								<ArrowLeft className="mr-2 size-4" />
								Back
							</Link>
						</div>
					</CardHeader>

					<CardContent>
						<div className="grid gap-6 md:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="source-number">Source Number *</Label>

								<Input id="source-number" placeholder="Enter source number" />
							</div>

							<div className="space-y-2">
								<Label htmlFor="blocked-against">Block Against *</Label>

								<select
									className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
									defaultValue="account"
									id="blocked-against"
								>
									<option value="account">Account</option>
									<option value="did">DID</option>
									<option value="caller-id">Caller ID</option>
								</select>
							</div>
						</div>

						<div className="mt-8 flex gap-2">
							<Button>Save</Button>

							<Link
								className={buttonVariants({ variant: "outline" })}
								to="/admin/manage-did-numbers"
							>
								Cancel
							</Link>
						</div>
					</CardContent>
				</Card>
			</main>
		</div>
	);
}
