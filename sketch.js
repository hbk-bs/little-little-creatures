/// <reference path="./lib/p5.sound.d.ts" />
/// <reference path="./lib/global.d.ts" />
/// <reference path="./lib/literals.d.ts" />
/// <reference path="./lib/constants.d.ts" />
/// <reference path="./lib/index.d.ts" />
// Keep these comments alive.
// They will help you while writing code.

//@ts-check
let particles = [];
function setup() {
  createCanvas(400, 400);
  particles.push(new KatjaParticle(createVector(random(width), random(height),color(3))));
}

function draw() {
  background(0);  
  particles.forEach((particle) => {
    particle.display();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
