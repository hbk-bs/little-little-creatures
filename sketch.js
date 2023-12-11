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
  particles.push(new MiraParticle(70,100,random (255),30,100));

  particles.push(new MiraParticle(100,300,50,30,70));

  particles.push(new MiraParticle(random (100,200), random (100,300) ,random (255),30,45));

  particles.push(new MiraParticle(random (200,600), random (100,300) ,50,30,60));

  particles.push(new MiraParticle(random (150,300), random (100,300) ,random (255),30,30));

  particles.push(new MiraParticle(random (100,300), random (100,300) ,300,30,30));

  particles.push(new MiraParticle(random (100,800), random (100,300) ,50,30,60));

  particles.push(new MiraParticle(random (100,500), random (100,300) ,random (255),30,30));

  particles.push(new MiraParticle(random (100,600), random (100,300) ,random (255),30,30));

  particles.push(new MiraParticle(random (100,400), random (100,300) ,random (255),30,30));

  particles.push(new MiraParticle(random (100,700), random (100,300) ,random (255),30,30));

  particles.push(new MiraParticle(random (100,400), random (100,300) ,random (255),30,30));

  particles.push(new MiraParticle(random (300,400), random (100,300) ,random (255),30,30));

}


function draw() {
  background(255);
  frameRate(10)
  particles.forEach((particle) => {
    particle.display();

    
particle.move();



  })
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
