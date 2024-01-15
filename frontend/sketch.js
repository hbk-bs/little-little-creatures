/// <reference path="./node_modules/@types/p5/lib/addons/p5.sound.d.ts" />
/// <reference path="./node_modules/@types/p5/global.d.ts" />
/// <reference path="./node_modules/@types/p5/literals.d.ts" />
/// <reference path="./node_modules/@types/p5/constants.d.ts" />
/// <reference path="./node_modules/@types/p5/index.d.ts" />
// Keep these comments alive.
// They will help you while writing code.

let superCritter;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  superCritter = new LittleSuperCreature({
    w: width,
    h: height,
    channel: 'little-creature',
    host: 'ws://localhost:3000/ws',
  });
  background(0);
  if (window.location.pathname.split('/')[1] === 'board') {
    noCanvas();
    noLoop();
  }
}

function draw() {
  background(0);
  superCritter.display();
}
