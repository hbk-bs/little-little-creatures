/// <reference path="./node_modules/@types/p5/lib/addons/p5.sound.d.ts" />
/// <reference path="./node_modules/@types/p5/global.d.ts" />
/// <reference path="./node_modules/@types/p5/literals.d.ts" />
/// <reference path="./node_modules/@types/p5/constants.d.ts" />
/// <reference path="./node_modules/@types/p5/index.d.ts" />
// Keep these comments alive.
// They will help you while writing code.

// Keep these comments alive.
// They will help you while writing code.

/**
 * @type {(leleleParticle|Particle|MegaParticle)[]}
 */
let particles = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  //particles.push(new Particle(createVector(random(width), random(height))));
  //particles.push(new MegaParticle(createVector(random(width), random(height))));
  particles.push(
    new leleleParticle(createVector(random(width), random(height))),
  );
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
