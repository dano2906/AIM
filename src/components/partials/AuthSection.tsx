import { authClient } from "@/lib/auth-client";

export default function AuthSection() {
	const handleSignIn = async (provider: "github" | "google") => {
		await authClient.signIn.social({
			provider,
			callbackURL: "/",
		});
	};

	return (
		<div className="flex gap-4">
			<button type="button" onClick={() => handleSignIn("github")}>
				Sign in with GitHub
			</button>
			<button type="button" onClick={() => handleSignIn("google")}>
				Sign in with Google
			</button>
		</div>
	);
}
