class LittleCreature {
	name = "Little Creature";
	socket;
	pos;
	url;
	constructor({
		x = 0,
		y = 0,
		host = "ws://cyberdeck.local:3000/ws/",
		channel = "little-creature",
	}) {
		this.url = `${host}${channel}`;
		const socket = new WebSocket(this.url);
		socket.addEventListener("open", this.openHandler);
		// socket.addEventListener("message", this.messageHandler);
		socket.addEventListener("close", this.closeHandler);
		socket.addEventListener("error", this.errorHandler);
		this.socket = socket;
		this.pos = createVector(
			map(x, 0, 1023, 0, width),
			map(y, 0, 1023, 0, height)
		);
	}

	openHandler = (_event) => {
		console.info(`WebSocket is open now on ${this.url} for ${this.name}`);
	};
	send = (message) => {
		this.socket.send(message);
	};
	prepareValues(event) {
		try {
			const json = JSON.parse(event.data, function (k, v) {
				return typeof v === "object" || isNaN(v) ? v : parseFloat(v);
			});
			return json;
		} catch (error) {
			console.error(error);
		}
	}
	messageHandler(event) {
		try {
			console.log("Message from server: ", event.data);
			const { x, y } = this.prepareValues(event);
			if (x !== undefined && y !== undefined) {
				this.pos.x = map(x, 0, 1023, 0, width);
				this.pos.y = map(y, 0, 1023, 0, height);
			}
		} catch (error) {
			console.error(error);
		}
	}
	closeHandler = (event) => {
		console.info("WebSocket is closed now.");
	};
	errorHandler = (event) => {
		console.error("WebSocket error: ", event);
	};

	display() {
		push();
		translate(this.pos.x, this.pos.y, this.pos.z);
		ellipse(0, 0, 10, 10);
		pop();
	}
}

class LittleSuperCreature extends LittleCreature {
	name = "Little Super Creature";
	s = 0;

	constructor(options) {
		super(options);

		this.socket.onopen = () => {
			this.socket.onmessage = this.messageHandler;
		};
	}
	messageHandler = (event) => {
		try {
			console.log("Message from server in extended: ", event.data);
			const { measurements } = this.prepareValues(event);
			const x = measurements[0];
			const y = measurements[1];
			const s = measurements[2];
			console.log(measurements);
			console.log(measurements[0], measurements[1]);
			if (x !== undefined && y !== undefined) {
				this.pos.x = map(x, 0, 1023, 0, width);
				this.pos.y = map(y, 0, 1023, 0, height);
			}
			if (s !== undefined) {
				this.s = s;
			}
		} catch (error) {
			console.error(error);
		}
	};
	display() {
		push();
		rectMode(CENTER);
		translate(this.pos.x, this.pos.y, this.pos.z);
		if (this.s === 0) {
			fill("red");

			rect(0, 0, 10, 10);
		} else {
			fill("white");
			ellipse(0, 0, 40, 40);
		}
		pop();
	}
}
let superCritter;

function setup() {
	createCanvas(innerWidth - 18, 100);
	superCritter = new LittleSuperCreature({
		w: width,
		h: height,
		channel: "little-creature",
	});
	background(0);
	if (window.location.pathname.split("/")[1] === "board") {
		noCanvas();
		noLoop();
	}
}

function draw() {
	background(0);
	superCritter.display();
}
