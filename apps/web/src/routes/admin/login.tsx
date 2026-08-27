// biome-ignore-all lint/performance/noJsxPropsBind: Authentication controls use local component state.
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@workholo/ui/components/button";
import { Input } from "@workholo/ui/components/input";
import { Label } from "@workholo/ui/components/label";
import { Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/login")({
	component: AdminLoginPage,
});

function AdminLoginPage() {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);

	const [loginId, setLoginId] = useState("");
	const [password, setPassword] = useState("");

	function handleLogin() {
		// Authentication will be connected later.
		// For now, this only demonstrates the navigation flow.
		if (loginId && password) {
			navigate({ to: "/admin" });
		}
	}

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			{/* Left panel */}
			<div className="relative hidden overflow-hidden bg-primary lg:flex">
				<div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />

				<div className="relative z-10 flex w-full flex-col justify-between p-10 text-primary-foreground">
					{/* Branding */}
					<div>
						<div className="flex items-center gap-3">
							<div className="flex size-10 items-center justify-center rounded-xl bg-background text-primary">
								<span className="font-bold text-lg">W</span>
							</div>

							<div>
								<div className="font-bold text-lg tracking-tight">WORKHOLO</div>

								<div className="text-xs opacity-70">Calling Platform</div>
							</div>
						</div>
					</div>

					{/* Main content */}
					<div className="max-w-lg">
						<div className="mb-8 flex justify-center">
							<div className="relative flex h-72 w-72 items-center justify-center rounded-full border border-white/10 bg-white/5">
								<div className="absolute size-52 rounded-full border border-white/10" />

								<div className="flex size-32 items-center justify-center rounded-3xl bg-background/10 backdrop-blur-sm">
									<svg
										className="size-20"
										fill="none"
										stroke="currentColor"
										strokeWidth="1.2"
										viewBox="0 0 24 24"
									>
										<title>Calling platform illustration</title>
										<path
											d="M22 16.92v3a2 2 0 0 1-2.18 2
                      19.79 19.79 0 0 1-8.63-3.07
                      19.5 19.5 0 0 1-6-6
                      19.79 19.79 0 0 1-3.07-8.67
                      A2 2 0 0 1 4.11 2h3
                      a2 2 0 0 1 2 1.72
                      12.84 12.84 0 0 0 .7 2.81
                      2 2 0 0 1-.45 2.11L8.09 9.91
                      a16 16 0 0 0 6 6l1.27-1.27
                      a2 2 0 0 1 2.11-.45
                      12.84 12.84 0 0 0 2.81.7
                      A2 2 0 0 1 22 16.92z"
										/>
									</svg>
								</div>
							</div>
						</div>

						<h1 className="font-bold text-3xl tracking-tight">
							Manage your calling operations.
						</h1>

						<p className="mt-3 text-base text-primary-foreground/70">
							Monitor calls, manage users, and control your calling platform
							from one place.
						</p>
					</div>

					{/* Footer */}
					<div className="text-primary-foreground/60 text-sm">
						© 2026 WORKHOLO. All rights reserved.
					</div>
				</div>
			</div>

			{/* Right panel */}
			<div className="flex items-center justify-center bg-background px-6 py-12">
				<div className="w-full max-w-md space-y-8">
					{/* Heading */}
					<div className="space-y-2 text-center">
						<div className="mb-6 flex justify-center lg:hidden">
							<div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
								<span className="font-bold text-xl">W</span>
							</div>
						</div>

						<h2 className="font-bold text-3xl tracking-tight">Welcome Back</h2>

						<p className="text-muted-foreground">
							Enter your login ID and password to access the admin panel.
						</p>
					</div>

					{/* Form */}
					<div className="space-y-5">
						{/* Login ID */}
						<div className="space-y-2">
							<Label htmlFor="login-id">Login ID</Label>

							<div className="relative">
								<UserRound className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />

								<Input
									className="h-14 pl-11 text-base"
									id="login-id"
									onChange={(event) => setLoginId(event.target.value)}
									placeholder="Enter your login ID"
									value={loginId}
								/>
							</div>
						</div>

						{/* Password */}
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>

							<div className="relative">
								<LockKeyhole className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted-foreground" />

								<Input
									className="h-14 pr-11 pl-11 text-base"
									id="password"
									onChange={(event) => setPassword(event.target.value)}
									placeholder="Enter your password"
									type={showPassword ? "text" : "password"}
									value={password}
								/>

								<button
									aria-label={showPassword ? "Hide password" : "Show password"}
									className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
									onClick={() => setShowPassword((visible) => !visible)}
									type="button"
								>
									{showPassword ? (
										<EyeOff className="size-5" />
									) : (
										<Eye className="size-5" />
									)}
								</button>
							</div>
						</div>

						{/* Remember / Forgot */}
						<div className="flex items-center justify-between">
							<label className="flex cursor-pointer items-center gap-2 text-sm">
								<input className="size-4 rounded border" type="checkbox" />

								<span>Remember me</span>
							</label>

							<button
								className="font-medium text-primary text-sm hover:underline"
								type="button"
							>
								Forgot password?
							</button>
						</div>

						{/* Login */}
						<Button
							className="h-14 w-full font-semibold text-base"
							onClick={handleLogin}
							type="button"
						>
							Login
						</Button>
					</div>

					<p className="text-center text-muted-foreground text-xs">
						Admin access only
					</p>
				</div>
			</div>
		</div>
	);
}
