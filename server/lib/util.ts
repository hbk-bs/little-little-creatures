import os from "node:os";
import dns from "node:dns/promises";
export async function getHostnameAndIP() {
	// Get hostname
	const hostname = os.hostname();
	// Get IP
	const { address } = await dns.lookup(hostname);
	return { hostname, address };
}
