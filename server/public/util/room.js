/// <reference path="../../node_modules/@types/p5/lib/addons/p5.sound.d.ts" />
/// <reference path="../../node_modules/@types/p5/global.d.ts" />
/// <reference path="../../node_modules/@types/p5/literals.d.ts" />
/// <reference path="../../node_modules/@types/p5/constants.d.ts" />
/// <reference path="../../node_modules/@types/p5/index.d.ts" />

// Keep these comments alive.
// They will help you while writing code.

const DEBUG = true;
let serverUrl = "";
let scheme = "ws";
const { location: loc } = document;

if (loc.protocol === "https:") {
	scheme += "s";
}
serverUrl = `${scheme}://${loc.hostname}:${loc.port}`;

const ws = new WebSocket(`${serverUrl}/ws/little-creatures`);

const ButtonTypes = {
	start: 0,
	win: 1,
	lose: 2,
	creak: 3,
	snorring: 4,
	empty: 5,
};

/**
 * @type {Element[]}
 */
const buttons = [];

function setup() {
	// createCanvas(500, 500);
	noCanvas();
	const buttonsInX = 7;
	const buttonsInY = 9;
	let w = 50;
	let h = 50;
	let x = 0;
	for (let i = 0; i < buttonsInX; i++) {
		let y = 0;
		for (let j = 0; j < buttonsInY; j++) {
			// const b = new Button(x, y, w, h, ButtonTypes.empty);
			const name = `${i * buttonsInX + j}`;
			const b = createButton(`Button ${name}`);
			b.attribute("id", name);
			b.attribute("data-type", `${ButtonTypes.empty}`);
			// b.position(x, y);
			b.size(w, h);
			b.addClass(`${ButtonTypes.empty}`);
			b.parent("sketch");
			// @ts-ignore
			buttons.push(b);
			y = y + h;
		}
		x = x + w;
	}

	buttons[9].attribute("data-type", `${ButtonTypes.start}`);
	buttons[15].attribute("data-type", `${ButtonTypes.win}`);
	buttons[16].attribute("data-type", `${ButtonTypes.lose}`);
	buttons[17].attribute("data-type", `${ButtonTypes.creak}`);
	buttons[10].attribute("data-type", `${ButtonTypes.creak}`);

	buttons[18].attribute("data-type", `${ButtonTypes.snorring}`);

	// // @ts-ignore
	const down = (e) => {
		if (e.target) {
			console.log(e.target.attributes["data-type"].value);
			sendData(e.target.attributes["data-type"].value, "down");
		}
	};

	if (DEBUG) {
		const legendBuilder = (col, name) =>
			`<span style="display: inline-block;color: ${col};width=10px;height=10px; border-radius:50%">■</span> lightgray is ${name}<br>`;
		let html = "";
		html += legendBuilder("lightgray", "empty");
		html += legendBuilder("lime", "win");
		html += legendBuilder("yellow", "creak");
		html += legendBuilder("orange", "snorring");
		html += legendBuilder("red", "lose");
		html += legendBuilder("green", "start");
		buttons.forEach((button) => {
			//@ts-ignore
			console.log(button.innerHTML);
			if (button.attribute("data-type") === `${ButtonTypes.empty}`) {
				button.style("background-color", "lightgray");
			}
			if (button.attribute("data-type") === `${ButtonTypes.win}`) {
				button.style("background-color", "lime");
			}
			if (button.attribute("data-type") === `${ButtonTypes.creak}`) {
				button.style("background-color", "yellow");
			}
			if (button.attribute("data-type") === `${ButtonTypes.snorring}`) {
				button.style("background-color", "orange");
			}
			if (button.attribute("data-type") === `${ButtonTypes.lose}`) {
				button.style("background-color", "red");
			}
			if (button.attribute("data-type") === `${ButtonTypes.start}`) {
				button.style("background-color", "green");
			}
		});

		const legend = createElement("div");
		legend.html(html);
		// legend.parent("body");
		// legend.html(`hello world`);
	}
	// // @ts-ignore
	const up = (e) => {
		// sendData(e.target.id, "up");
	};
	buttons.forEach((button) => {
		//@ts-ignore
		button.mousePressed(down);
		//@ts-ignore
		button.mouseReleased(up);
	});
}
/**
 * @param {string} id
 * @param {"up"|"down"} state
 */
function dataTemplate(id, state) {
	const calculatedMeasurements = [0, 0, 0, 0, 0].map((_e, i) => {
		if (i === parseInt(id)) {
			return state === "down" ? 1 : 0;
		} else {
			return 0;
		}
	});
	const template = {
		channel: "little-creatures",
		measurements: calculatedMeasurements,
	};
	return template;
}

/**
 * @param {string} id
 * @param {"up"|"down"} state
 */
function sendData(id, state) {
	const data = dataTemplate(id, state);
	console.log(data);
	ws.send(JSON.stringify(data));
}

function draw() {
	// background(128);
}
