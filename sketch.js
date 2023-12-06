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
  createCanvas(windowWidth, windowHeight);
  particles.push(new Particle(createVector(random(width), random(height))));
  particles.push(new MegaParticle(createVector(random(width), random(height))));
}

function draw() {
  background(255);
  particles.forEach((particle) => {
    particle.display();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
