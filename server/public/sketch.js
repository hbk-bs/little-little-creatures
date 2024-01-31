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

function preload() {
    //AUDIO
    soundSnoring = loadSound('assets/snoring.mp3');
    soundAufwachen = loadSound('assets/monster_roar.mp3');
    soundKnarren = loadSound('assets/knarren.mp3');
    soundSchnarchen = loadSound('assets/lautes_schnarchen.mp3');
    //soundGewonnen=loadSound(`assets/gewonnen.mp3`);
    //VIDEO
    videoFish = createVideo('assets/fish.mp4');
    videoDog = createVideo('assets/dog.mp4');
    videoCow = createVideo('assets/cow.mp4');
    videoWater = createVideo('assets/sandwich.mp4');

}

let serverUrl = "";
let scheme = "ws";
const { location: loc } = document;

if (loc.protocol === "https:") {
    scheme += "s";
}
serverUrl = `${scheme}://${loc.hostname}:${loc.port}`;

const ws = new WebSocket(`${serverUrl}/ws/little-creatures`);
ws.onmessage = function (event) {
    try {
        const data = JSON.parse(event.data);
        const { measurements } = data;
        console.log(measurements);
        // 0 = start
        // 1 = knarren
        // 2 = schnarchen
        // 3 = aufwachen
        // 4 = gewonnen

        if (measurements[0] === 1) {
            aufwachen();
        }
        if (measurements[1] === 1) {
            start();
        }
        if (measurements[2] === 1) {
            knarren();
        }
        if (measurements[3] === 1) {
            schnarchen();
        }
        if (measurements[4] === 1) {
            gewonnen();
        }

    } catch (error) {
        console.error("Error in websocket message handler", error);
    }
};

function setup() {
    const canvas = createCanvas(1920, 1080);
    canvas.parent("sketch");
    currentVideo = videoFish;
    videoFish.hide();
    videoDog.hide();
    videoCow.hide();
    videoWater.hide();
}


function draw() {
    background(250);
    image(currentVideo, 0, 0, width, height);

}


//schlafendes Monster
function start() {
    //AUDIO
    soundSnoring.play();
    //VIDEO
    currentVideo = videoFish;
    currentVideo.volume(0);
    currentVideo.loop();
}

function knarren() {
    //AUDIO
    soundSnoring.stop();
    soundKnarren.play();
    soundKnarren.onended(start);
}

//sich bewegendes Monster
function schnarchen() {
    //AUDIO
    playSubsetOfSound(5, 7);
    soundSchnarchen.onended(start);
    //VIDEO
    currentVideo = videoDog;
    currentVideo.volume(0.0);
    currentVideo.play();
    currentVideo.onended(start);
}

//Ausschnitt soundSchnarchen
function playSubsetOfSound(start, duration) {
    soundSnoring.stop();
    soundSchnarchen.play(0, 1, 1, start, start + duration);
}

//Wütendes Monster (Verloren)
function aufwachen() {
    //AUDIO
    soundSnoring.stop();
    soundAufwachen.play();
    //VIDEO
    currentVideo = videoCow;
    currentVideo.volume(0);
    currentVideo.play();
}

//Sandwich (Gewonnen)
function gewonnen() {
    //AUDIO
    soundSnoring.stop();
    //soundGewonnen.play();
    //VIDEO
    currentVideo = videoWater;
    currentVideo.play();
}

function keyPressed() {
    if (key === 'F' || key === 'f') {
        fullscreen(!Fullscreen);
        Fullscreen = !Fullscreen;
    }

}
