/// <reference path="./lib/p5.sound.d.ts" />
///<reference path="./lib/global.d.ts" />
///<reference path="./lib/literals.d.ts" />
/// <reference path="./lib/constants.d.ts" />
/// <reference path="./lib/index.d.ts" />
// Keep these comments alive.
// They will help you while writing code.

//@ts-check
let particles = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
particles.push(new mokatrinosParticle(random(width), random(height), random(255), "circle"))
particles.push(new mokatrinosParticle(random(width), random(height), random(255), "circle"))

particles.push(new mokatrinosParticle(random(width), random(height), random(255), "rect"))
particles.push(new mokatrinosParticle(random(width), random(height), random(255), "rect"))

particles.push(new mokatrinosParticle(random(width), random(height), random(255), "line"))
particles.push(new mokatrinosParticle(random(width), random(height), random(255), "line"))
particles.push(new mokatrinosParticle(random(width), random(height), random(255), "line"))


particles.push(new mokatrinosParticle(random(width), random(height), random(255), "ellipse"))
particles.push(new mokatrinosParticle(random(width), random(height), random(255), "ellipse"))

console.log(particles)
}

function draw() {
  background(242, 191, 223);
  particles.forEach((particle) => {
    particle.display();
    particle.move();
  });

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

