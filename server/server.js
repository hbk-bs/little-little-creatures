//@ts-check
import Fastify from "fastify";

import { S } from "fluent-json-schema";
import fastifyStatic from "@fastify/static";
import { resolve } from "path";

import WebSocket, { WebSocketServer } from "ws";

const bodyJsonSchema = S.object()
	.prop("channel", S.string().required())
	.additionalProperties(true);

const NODE_ENV = process.env.NODE_ENV ?? "none";
const LOG_LEVEL = process.env.LOG_LEVEL ?? "info";
const envToLogger = {
	development: {
		level: LOG_LEVEL,
		transport: {
			target: "pino-pretty",
			options: {
				translateTime: "HH:MM:ss Z",
				ignore: "pid,hostname",
			},
		},
	},
	production: true,
	test: false,
};
// Initialize Fastify
const fastify = Fastify({
	logger: envToLogger[NODE_ENV] ?? true,
	disableRequestLogging:
		NODE_ENV === "development" || NODE_ENV === "test" ? false : true,
});
const channels = {};

// Register the plugin
fastify.register(fastifyStatic, {
	root: resolve(process.cwd(), "./public"), // path to your directory
	prefix: "/", // optional: default '/'
});

fastify.get("/", async (request, reply) => {
	return reply.sendFile("index.html");
});
fastify.get("/board/", async (request, reply) => {
	return reply.sendFile("index.html");
});
// Define POST route for Arduino boards
fastify.post(
	"/arduino",
	{
		schema: {
			body: bodyJsonSchema,
		},
	},
	async (request, reply) => {
		// Parse incoming data

		const { channel, ...data } = request.body;
		if (!channel) {
			return reply.status(400).send({ error: "Missing channel or data" });
		}

		fastify.log.info(
			`Received message from channel ${channel} with data ${data}`
		);

		// Check if channel exists
		if (!channels[channel]) {
			return reply
				.status(400)
				.send({ error: `Channel "${channel}" does not exist` });
		}

		// Broadcast message to all connections in the channel
		channels[channel].forEach((conn) => {
			if (conn.readyState === WebSocket.OPEN) {
				conn.send(JSON.stringify({ ...data, channel }));
			}
		});
		reply.status(201).send({ status: "ok" });
	}
);

// Create a WebSocket server and attach it to the Fastify server

// Start the server
const start = async () => {
	try {
		await fastify.listen({ port: 3000, host: "0.0.0.0" });
		const wss = new WebSocketServer({ server: fastify.server });

		wss.on("connection", (ws, req) => {
			console.log("Client connected");
			if (!req.url) {
				ws.close(1008, "Invalid URL");
				return;
			}
			if (req.url.split("/")[1] !== "ws") {
				ws.close(1008, "Invalid URL");
				return;
			}

			const channel = req.url.split("/")[2]; // Assuming URL is /ws/:channel

			// Initialize channel array if it doesn't exist
			if (!channels[channel]) {
				channels[channel] = [];
			}

			// Add connection to channel
			channels[channel].push(ws);

			console.log(`Client connected to channel ${channel}`);

			ws.on("message", (message) => {
				console.log(`Client message on channel ${channel}: ${message}`);
			});
			ws.on("error", (err) => {
				console.error(err);
				throw err;
			});
			ws.on("close", () => {
				console.log(`Client disconnected from channel ${channel}`);

				// Remove connection from channel
				channels[channel] = channels[channel].filter((conn) => conn !== ws);
			});
		});

		console.log("Server running at http://localhost:3000/");
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

start();
