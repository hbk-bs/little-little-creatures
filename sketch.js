/// <reference path="./lib/p5.sound.d.ts" />
/// <reference path="./lib/global.d.ts" />
/// <reference path="./lib/literals.d.ts" />
/// <reference path="./lib/constants.d.ts" />
/// <reference path="./lib/index.d.ts" />
// Keep these comments alive.
// They will help you while writing code.

//@ts-check
const particles = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
}



function draw() {
 
  background(255, 10);
	for (let i = 0; i < particles.length; i++) {
		// update particle
		particles[i].move();
		// display particle
		particles[i].display();
		particles[i].update();
	}
}

function mousePressed() {
	const x = random(width);
	const y = random(height);
	const randomColor = color(random(255), random(100), 255)
	particles.push(new hannahsoophie(x, y, randomColor));

}

function mouseDragged() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
