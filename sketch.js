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

}

function draw() {
  background(255,10);
  particles.forEach((particle) => {
    particle.display();
    //particle.move();
    particle.move();
  });

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function mousePressed() {
  particles.push(
    new MireaParticle(createVector(random(width), random(height))));
  
}