//@ts-nocheck
let Fullscreen = false;

//AUDIO
let soundSnoring;
let soundAufwachen;
let soundKnarren;
let soundSchnarchen;
//let soundGewonnen;

//VIDEO
//schlafendes Monster
let videoFish;
//sich bewegendes Monster
let videoDog;
//Wütendes Monster (Verloren)
let videoCow;
//Sandwich (Gewonnen)
let videoWater;

let currentVideo;

function preload(){
  //AUDIO
  soundSnoring=loadSound(`assets/snoring.mp3`);
  soundAufwachen =loadSound(`assets/monster-roar.mp3`);
  soundKnarren=loadSound(`assets/wood-creak-single.mp3`);
  soundSchnarchen=loadSound(`assets/lautes_schnarchen.mp3`);
  //soundGewonnen=loadSound(`assets/gewonnen.mp3`);
  //VIDEO
  videoFish=createVideo('assets/fish.mp4');
  videoDog=createVideo('assets/dog.mp4');
  videoCow=createVideo('assets/Cow.mp4');
  videoWater=createVideo('assets/sandwich.mp4');
 
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  currentVideo = videoFish;
  videoFish.hide();
  videoDog.hide();
  videoCow.hide();
  videoWater.hide();
}


function draw(){
  background(250);
   image(currentVideo,0,0,width, height);
  
}


//schlafendes Monster
function Start(){
  //AUDIO
  soundSnoring.play();
  //VIDEO
  currentVideo = videoFish;
  currentVideo.volume(0);
  currentVideo.loop();
}

function Knarren(){
  //AUDIO
  soundSnoring.stop();
  soundKnarren.play();
  soundKnarren.onended(Start);
}

//sich bewegendes Monster
function Schnarchen(){
  //AUDIO
  playSubsetOfSound(5,7);
  soundSchnarchen.onended(Start);
  //VIDEO
  currentVideo = videoDog;
  currentVideo.volume(0);
  currentVideo.play();
  currentVideo.onended(Start);
}

//Ausschnitt soundSchnarchen
function playSubsetOfSound(start, duration){
  soundSnoring.stop();
  soundSchnarchen.play(0,1,1,start,start+duration);
}

//Wütendes Monster (Verloren)
function Aufwachen(){
  //AUDIO
  soundSnoring.stop();
  soundAufwachen.play();
  //VIDEO
  currentVideo = videoCow;
  currentVideo.volume(0);
  currentVideo.play();
}

//Sandwich (Gewonnen)
function gewonnen(){
  //AUDIO
  soundSnoring.stop();
  //soundGewonnen.play();
  //VIDEO
  currentVideo = videoWater;
  currentVideo.volume(0);
  currentVideo.play();
}

function keyPressed() {
    if (key === 'F' || key === 'f') {
      fullscreen(!Fullscreen);
      Fullscreen = !Fullscreen;
   }
  
  }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}