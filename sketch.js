/// <reference path="./node_modules/@types/p5/lib/addons/p5.sound.d.ts" />
/// <reference path="./node_modules/@types/p5/global.d.ts" />
/// <reference path="./node_modules/@types/p5/literals.d.ts" />
/// <reference path="./node_modules/@types/p5/constants.d.ts" />
/// <reference path="./node_modules/@types/p5/index.d.ts" />
// Keep these comments alive.
// They will help you while writing code.
//@ts-ignore
let particles = [];
function setup() {
  createCanvas(windowWidth, windowHeight);

  particles.push(new Particle(createVector(random(width), random(height))));
  particles.push(new MegaParticle(createVector(random(width), random(height))));
  particles.push(
    new isabella(
      createVector(random(width), random(height)),
      5,
      10,
      10,
      random(255),
      random(255),
      random(255)
    )
  );
  particles.push(
    new MireaParticle(createVector(random(width), random(height)))
  );

  particles.push(
    new annes_particle(createVector(random(width), random(height)))
  );
  particles.push(new Particle(createVector(random(width), random(height))));

  particles.push(
    new PhillysParticle(createVector(random(width), random(height)))
  );

  particles.push(new MegaParticle(createVector(random(width), random(height))));
  particles.push(
    new leleleParticle(createVector(random(width), random(height)))
  );
  particles.push(
    new MiraParticle(
      createVector(random(100, 200), random(100, 300)),
      random(255),
      30,
      45
    )
  );
}

function draw() {
  background(255);
  frameRate(10);
  // @ts-ignore
  particles.forEach((particle) => {
    particle.display();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

let value = 0;
