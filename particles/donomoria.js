class DonoParticle extends Particle{
  constructor(pos) {
    super(pos);
  }
  }
let particles = [];
const numSquares = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numSquares; i++) {
    particles.push(new Square(random(width), random(height)));
  }
}

function draw() {
  background(255);

  const mouseX = pmouseX;
  const mouseY = pmouseY;

  particles.forEach((square) => {
    const distance = dist(mouseX, mouseY, square.x, square.y);

    if (distance < 200) {
      const angle = atan2(mouseY - square.y, mouseX - square.x);
      const newX = square.x + cos(angle) * 10;
      const newY = square.y + sin(angle) * 10;
      square.setPosition(newX, newY);
      square.setColor();
    }

    square.display();
  });
}

class Square {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = color(random(255), random(255), random(255));
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setColor() {
    this.color = color(random(255), random(255), random(255));
  }

  display() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, 50, 50);
  }
}