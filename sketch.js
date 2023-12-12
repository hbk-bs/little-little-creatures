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
  particles.push(new bleonaParticle(createVector(random(width), random(height))));
}

function draw() {
  background(255);
  particles.forEach((bleonaParticle) => {
    bleonaParticle.display();
    if (bleonaParticle.update) {
      bleonaParticle.update();
  
    }
 
  });
  
  

}
function mouseClicked() {
  const randomColor = color(random(255), random(100), 255);
  particles.push(new bleonaParticle(width / 2, height / 2, randomColor));
}

	

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

