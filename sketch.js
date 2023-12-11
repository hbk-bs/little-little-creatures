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
  particles.push(new PhillysParticle(10,10,10));
}

function draw() {
  background(255);
  particles.forEach((particle) => {
    particle.display();
  background(0);
  for (let i = 0; i < particle.lenght; i++){
    particles[i].update();
    particles[i].show();
  }

  });
}


let value = 0;
function draw() {
  fill(random(255));
  ellipse(winMouseX,winMouseY,50,50);
  blendMode(ADD);
  }
function mouseDragged() {
  value = value + 5;
  if (value > 255) {
    value = 20;
  }
}


