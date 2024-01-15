/// <reference path="./node_modules/@types/p5/lib/addons/p5.sound.d.ts" />
/// <reference path="./node_modules/@types/p5/global.d.ts" />
/// <reference path="./node_modules/@types/p5/literals.d.ts" />
/// <reference path="./node_modules/@types/p5/constants.d.ts" />
/// <reference path="./node_modules/@types/p5/index.d.ts" />
// Keep these comments alive.
// They will help you while writing code.

//@ts-ignore
let particles = [];

const particleTypes = [
	KatjaParticle,
	DonoParticle,
	isabella,
	MireaParticle,
	annes_particle,
	mel,
	PhillysParticle,
	leleleParticle,
	MiraParticle,
	hannahsoophie,
	bleonaParticle,
];
function setup() {
	createCanvas(windowWidth, windowHeight);
	particles.push(
		new KatjaParticle(createVector(random(width), random(height)), color(3)),
	);

	particles.push(new Particle(createVector(random(width), random(height))));
	particles.push(new MegaParticle(createVector(random(width), random(height))));

	particles.push(
		new bleonaParticle(createVector(random(width), random(height))),
	);

	particles.push(new DonoParticle(createVector(random(width), random(height))));

	particles.push(
		new isabella(
			createVector(random(width), random(height)),
			5,
			10,
			10,
			random(255),
			random(255),
			random(255),
		),
	);
	particles.push(
		new MireaParticle(createVector(random(width), random(height))),
	);

	particles.push(
		new annes_particle(createVector(random(width), random(height))),
	);
	particles.push(new mel(createVector(random(width), random(height))));
	particles.push(
		new PhillysParticle(createVector(random(width), random(height))),
	);
	particles.push(
		new leleleParticle(createVector(random(width), random(height))),
	);
	particles.push(
		new MiraParticle(
			createVector(random(100, 200), random(100, 300)),
			random(255),
			30,
			45,
		),
	);
	particles.push(
		new hannahsoophie(createVector(random(width), random(height))),
	);
}

function draw() {
	background(255, 10);
	for (let i = 0; i < particles.length; i++) {
		// update particle
		//particles[i].move();
		// display particle
		particles[i].display();
		//particles[i].update();
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
	const p = particleTypes[Math.floor(random(particleTypes.length))];
	if (p instanceof MiraParticle) {
		particles.push(new p(createVector(mouseX, mouseY), random(255), 30, 45));
	} else if (p instanceof isabella) {
		particles.push(
			new p(
				createVector(random(width), random(height)),
				5,
				10,
				10,
				random(255),
				random(255),
				random(255),
			),
		);
	} else {
		particles.push(new p(createVector(mouseX, mouseY)));
	}
}
