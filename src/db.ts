import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon>;

export async function getClient() {
	if (!process.env.DATABASE_URL) {
		return undefined;
	}
	if (!client) {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		client = await neon(process.env.DATABASE_URL!);
	}
	return client;
}
