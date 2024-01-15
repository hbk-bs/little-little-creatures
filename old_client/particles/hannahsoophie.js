//@ts-check
//particle system
//const c = color(255, 204, 0);
//const c1 = color(250, 250, 10);
class hannahsoophie extends Particle {
	x;
	y;
	lifetime; //lebenszeit
	// col;
	rotation = 0;
	//lifetime
	//color
	constructor(pos) {
		super(pos);

		//farbe hinzufügen
		// this.col = col;
		this.lifetime = 100;
		this.rotation = 0;
		this.rotationSpeed = random(0.04, 0.06);
	}
	display() {
		//make it a circle
		//make it draw text

		if (this.lifetime > 0) {
			push();
			strokeWeight(1);
			stroke(0);
			//angleMode(DEGREES);
			translate(this.pos.x / 2, this.pos.y / 2);

			//farbe
			//fill(c);
			//rotate(this.rotation%360);

			for (let i = 0; i < 360; i += 45) {
				fill("pink");
				rotate(radians(i) + this.rotation);
				circle(30, 0, random(10, 30));
			}

			//circle(0, 0, 15);
			//fill (c1)
			//fill  ('pink' )

			//circle(0 + random (10, 30) , 0 + random ( 10, 20) , 10);
			//circle(0 - random (10, 30) , 0 - random (10, 20) , 10);
			//circle(0 + random (10, 30) , 0 - random (10,20) , 10);
			//circle(0 - random (10,30) , 0 + random (10, 20) , 10);
			//fill(50)
			//circle(0 + random (5, 20) , 0 + random ( 5, 10) , 10);
			//circle(0 - random (5, 20) , 0 - random (5, 10) , 10);
			//circle(0 + random (5, 20) , 0 - random (5,10) , 10);
			//circle(0 - random (5,20) , 0 + random (5, 10) , 10);

			fill("beige");
			//circle (0,0, random (20, 50))

			//for (let i= 0; i<360; i+=45){
			fill(50);
			// rotate(radians(i));
			circle(0, 0, random(20, 50));
			// }

			for (let i = 0; i < 360; i += 45) {
				fill("50");
				rotate(radians(i) + this.rotation);
				circle(50, 0, random(5, 20));
			}

			for (let i = 0; i < 360; i += 45) {
				fill("pink");
				rotate(radians(i) + this.rotation);
				circle(70, 0, random(2, 15));
			}
			//noStroke()
			//circle(0 + random (30, 100) , 0 + random ( 30, 100) ,random(20,50));
			//circle(0 - random (30, 100) , 0 - random (30, 100) , random(20,50));
			//circle(0 + random (30, 100) , 0 - random (30,100) , random(20,50));
			//circle(0 - random (30,100) , 0 + random (30, 100) , random(20,50));
			//fill ('pink')

			//circle (0, 0, random (2, 15))

			pop();
		}
		this.update();
		this.move();
	}
	update() {
		this.lifetime--;
		// this lifetime ist gleich this lifetime -1
		if (this.lifetime <= 0) {
			this.lifetime = 0;
		}
		if (
			mouseX > this.pos.x - 10 &&
			mouseX > this.pos.x + 10 &&
			mouseY > this.pos.y - 10 &&
			mouseY < this.pos.y + 10
		) {
			this.lifetime++;
		}
		this.rotation += this.rotationSpeed;
	}
	move() {
		//interact with other particles

		//dont change position on random have a rule
		this.pos.x = this.pos.x + random(0, 10);
		this.pos.y = this.pos.y + random(0, 10);
		//constrain its position to the canvas
		this.pos.x = constrain(this.pos.x, 0, width);
		this.pos.y = constrain(this.pos.y, 0, height);
	}
	//function grow over time
	//function change your shape
	//function interact with the mouse (grow on click, change color)
}

// let myParticle;
// const particles2 = [];

// function setup() {
// 	createCanvas(500, 500)
// 	background(255);
// 	// create a particle
// }
// function draw() {
// 	background(255, 10);
// 	for (let i = 0; i < particles.length; i++) {
// 		// update particle
// 		particles[i].move();
// 		// display particle
// 		particles[i].display();
// 		particles[i].update();
// 	}
// }

// function mouseDragged() {
// 	const x = random(width);
// 	const y = random(height);
// 	const randomColor = color(random(255), random(100), 255)
// 		;

// 	myParticle = new hannahsoophie(x, y, randomColor);
// 	particles.push(myParticle);
// }
