import { getKeyByValue, mutateRandomElements } from "./room-util.js";
const attributeName = "data-type";

const ButtonTypes = {
	start: 0,
	win: 1,
	lose: 2,
	creak: 3,
	snorring: 4,
	empty: 5,
};

let serverUrl = "";
let scheme = "ws";
const { location: loc } = document;

if (loc.protocol === "https:") {
	scheme += "s";
}
serverUrl = `${scheme}://${loc.hostname}:${loc.port}`;

const ws = new WebSocket(`${serverUrl}/ws/little-creatures`);

const buttonsInX = 7;
const buttonsInY = 9;
let w = 50;
let h = 50;

/**
 * @type {HTMLButtonElement[][]}
 */
const buttons = [];
const sketch = document.getElementById("sketch");
if (!sketch) {
	throw new Error("sketch is null");
}
for (let i = 0; i < buttonsInY; i++) {
	buttons[i] = [];

	for (let j = 0; j < buttonsInX; j++) {
		const btnId = `btn-${i}-${j}`;
		const button = document.createElement("button");
		button.id = btnId;
		button.style.width = `${w}px`;
		button.style.height = `${h}px`;
		button.disabled = true;
		sketch.appendChild(button);

		// const b = createElement("button", btnId);
		// b.id(btnId); // Assign unique ID using button's 2D grid location.

		// b.size(w, h);
		// b.parent("sketch");
		// b.attribute("disabled", "true");

		// @ts-ignore
		buttons[i][j] = button;
	}
}

buttons[0][0].setAttribute(attributeName, `${ButtonTypes.start}`);
buttons[0][0].innerText = "Start";
buttons[0][0].disabled = false;
buttons[8][6].setAttribute(attributeName, `${ButtonTypes.win}`);
buttons[8][6].innerText = "Win";

mutateRandomElements({
	array2d: buttons,
	numberOfElements: 5,
	modifierFunction: (buttonElement) => {
		buttonElement.setAttribute(attributeName, `${ButtonTypes.creak}`);
	},
	attributeToCheck: attributeName,
});

mutateRandomElements({
	array2d: buttons,
	numberOfElements: 7,
	modifierFunction: (buttonElement) => {
		buttonElement.setAttribute(attributeName, `${ButtonTypes.snorring}`);
	},
	attributeToCheck: attributeName,
});

const down = (e) => {
	if (e.target) {
		if (e.target.hasAttribute(attributeName)) {
			console.log(
				getKeyByValue(
					ButtonTypes,
					parseInt(e.target.attributes[attributeName].value)
				)
			);

			sendData(e.target.attributes[attributeName].value, "down");
		} else {
			console.log("no attribute");
		}
	}
};

buttons.forEach((row, i) => {
	row.forEach((button, j) => {
		button.addEventListener("mousedown", (e) => {
			down(e);
			button.removeAttribute("disabled");
			enableAdjacentButtons(buttons, i, j);
		});
	});
});

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
 * @param { HTMLButtonElement[][]} buttons
 * @param {number} i
 * @param {number} j
 */
function enableAdjacentButtons(buttons, i, j) {
	//    // Enable button above if exists
	if (i > 0) buttons[i - 1][j].removeAttribute("disabled");
	// Enable button below if exists
	if (i < buttons.length - 1) buttons[i + 1][j].removeAttribute("disabled");
	// Enable the button on the left if exists
	if (j > 0) buttons[i][j - 1].removeAttribute("disabled");
	// Enable the button on the right if exists
	if (j < buttons[i].length - 1) buttons[i][j + 1].removeAttribute("disabled");
	// Enable the button on the top-left if exists
	if (i > 0 && j > 0) buttons[i - 1][j - 1].removeAttribute("disabled");
	// Enable the button on the top-right if exists
	if (i > 0 && j < buttons[i].length - 1)
		buttons[i - 1][j + 1].removeAttribute("disabled");
	// Enable the button on the bottom-left if exists
	if (i < buttons.length - 1 && j > 0)
		buttons[i + 1][j - 1].removeAttribute("disabled");
	// Enable the button on the bottom-right if exists
	if (i < buttons.length - 1 && j < buttons[i].length - 1)
		buttons[i + 1][j + 1].removeAttribute("disabled");
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
