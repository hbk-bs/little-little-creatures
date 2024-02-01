/// <reference path="../../node_modules/@types/p5/lib/addons/p5.sound.d.ts" />
/// <reference path="../../node_modules/@types/p5/global.d.ts" />
/// <reference path="../../node_modules/@types/p5/literals.d.ts" />
/// <reference path="../../node_modules/@types/p5/constants.d.ts" />
/// <reference path="../../node_modules/@types/p5/index.d.ts" />

// Keep these comments alive.
// They will help you while writing code.

const DEBUG = false;

const ButtonTypes = {
	start: 0,
	win: 1,
	lose: 2,
	creak: 3,
	snorring: 4,
	empty: 5,
};

/**
 * @type {Element[][]}
 */
let ws;
function setup() {
	let serverUrl = "";
	let scheme = "ws";
	const { location: loc } = document;

	if (loc.protocol === "https:") {
		scheme += "s";
	}
	serverUrl = `${scheme}://${loc.hostname}:${loc.port}`;

	ws = new WebSocket(`${serverUrl}/ws/little-creatures`);
	// createCanvas(500, 500);
	noCanvas();
	const buttonsInX = 7;
	const buttonsInY = 9;
	let w = 50;
	let h = 50;
	/**
	 * @type {HTMLButtonElement [][]}
	 */
	const buttons = [];

	for (let i = 0; i < buttonsInY; i++) {
		buttons[i] = [];

		for (let j = 0; j < buttonsInX; j++) {
			const btnId = `btn-${i}-${j}`;
			const button = document.createElement("button");
			button.id = btnId;
			button.style.width = `${w}px`;
			button.style.height = `${h}px`;
			button.disabled = true;

			const b = createElement("button", btnId);
			b.id(btnId); // Assign unique ID using button's 2D grid location.

			b.size(w, h);
			b.parent("sketch");
			b.attribute("disabled", "true");

			// @ts-ignore
			buttons[i][j] = button;
		}
	}

	buttons[0][0].setAttribute("data-type", `${ButtonTypes.start}`);
	buttons[0][0].innerText = "Start";
	buttons[0][0].disabled = false;
	buttons[8][6].setAttribute("data-type", `${ButtonTypes.win}`);
	buttons[8][6].innerText = "Win";

	modifyRandomElements(buttons, 5, (element) => {
		element.setAttribute("data-type", `${ButtonTypes.lose}`);
	});
	console.log(buttons);
	return;
	modifyRandomElements(buttons, 5, (element) => {
		element.setAttribute("data-type", `${ButtonTypes.creak}`);
	});

	// buttons[18].attribute("data-type", `${ButtonTypes.snorring}`);

	// // @ts-ignore
	const down = (e) => {
		if (e.target) {
			console.log(e.target.attributes["data-type"].value);
			sendData(e.target.attributes["data-type"].value, "down");
		}
	};

	// if (DEBUG) {
	// 	const legendBuilder = (col, name) =>
	// 		`<span style="display: inline-block;color: ${col};width=10px;height=10px; border-radius:50%">■</span> lightgray is ${name}<br>`;
	// 	let html = "";
	// 	html += legendBuilder("lightgray", "empty");
	// 	html += legendBuilder("lime", "win");
	// 	html += legendBuilder("yellow", "creak");
	// 	html += legendBuilder("orange", "snorring");
	// 	html += legendBuilder("red", "lose");
	// 	html += legendBuilder("green", "start");
	// 	buttons.forEach((button) => {
	// 		//@ts-ignore
	// 		console.log(button.innerHTML);
	// 		if (button.attribute("data-type") === `${ButtonTypes.empty}`) {
	// 			button.style("background-color", "lightgray");
	// 		}
	// 		if (button.attribute("data-type") === `${ButtonTypes.win}`) {
	// 			button.style("background-color", "lime");
	// 		}
	// 		if (button.attribute("data-type") === `${ButtonTypes.creak}`) {
	// 			button.style("background-color", "yellow");
	// 		}
	// 		if (button.attribute("data-type") === `${ButtonTypes.snorring}`) {
	// 			button.style("background-color", "orange");
	// 		}
	// 		if (button.attribute("data-type") === `${ButtonTypes.lose}`) {
	// 			button.style("background-color", "red");
	// 		}
	// 		if (button.attribute("data-type") === `${ButtonTypes.start}`) {
	// 			button.style("background-color", "green");
	// 		}
	// 	});

	// 	const legend = createElement("div");
	// 	legend.html(html);
	// 	// legend.parent("body");
	// 	// legend.html(`hello world`);
	// }
	// // @ts-ignore
	// const up = (e) => {
	// 	// sendData(e.target.id, "up");
	// };

	buttons.forEach((row, i) => {
		console.log(row);
		row.forEach((button, j) => {
			button.mousePressed((e) => {
				down(e);
				button.removeAttribute("disabled");
				enableAdjacentButtons(buttons, i, j);
			});
		});
		//@ts-ignore
		// button.mousePressed(down);
		//@ts-ignore
		// button.mouseReleased(up);
	});
}

function draw() {
	// background(128);
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

function enableAdjacentButtons(buttons, i, j) {
	// // Enable left button if exists
	// if (i > 0) buttons[i - 1][j].removeAttribute("disabled");
	// // Enable right button if exists
	// if (i < buttons.length - 1) buttons[i + 1][j].removeAttribute("disabled");
	// // Enable upper button if exists
	// if (j > 0) buttons[i][j - 1].removeAttribute("disabled");
	// // Enable lower button if exists
	// if (j < buttons[i].length - 1) buttons[i][j + 1].removeAttribute("disabled");
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

/**
 * @param {Array<Array<HTMLElement>>} array2D
 */
function flattenWithIndicesExcludeDataType(array2D) {
	return array2D.reduce((acc, row, rowIndex) => {
		row.forEach((element, colIndex) => {
			if (!element.hasAttribute("data-type")) {
				acc.push({ rowIndex, colIndex, node: element });
			}
		});
		return acc;
	}, []);
}

// Helper function to shuffle an array
/**
 * @param {Array<any>} array
 */
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

// Main function to modify n random elements in a 2D array
/**
 * @param {Array<Array<HTMLElement>>} array2D
 * @param {number} n
 * @param {Function} modifierFunction
 */
function modifyRandomElements(array2D, n, modifierFunction) {
	const flatArray = flattenWithIndicesExcludeDataType(array2D);
	if (n > flatArray.length) {
		throw new Error(
			`Cannot modify ${n} elements. Only ${flatArray.length} eligible elements are available.`,
		);
	}
	const shuffledArray = shuffleArray(flatArray);
	const elementsToModify = shuffledArray.slice(0, n);

	elementsToModify.forEach(({ rowIndex, colIndex }) => {
		array2D[rowIndex][colIndex] = modifierFunction(array2D[rowIndex][colIndex]);
	});
}
