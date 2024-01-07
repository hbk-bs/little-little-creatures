 
class DonoParticle extends Particle {
  constructor(pos) {
    super(pos)
    this.x = pos.x;
    this.y = pos.y;
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

  update(mouseX, mouseY) {
    const distance = dist(mouseX, mouseY, this.x, this.y);

    if (distance < 200) {
      const angle = atan2(mouseY - this.y, mouseX - this.x);
      const newX = this.x + cos(angle) * 10;
      const newY = this.y + sin(angle) * 10;
      this.setPosition(newX, newY);
      this.setColor();
    }

    this.display();
  }
}

let particles = [];
const numParticles = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new DonoParticle(createVector(random(width), random(height))));
  }
}

function draw() {
  background(255);

  const mouseX = pmouseX;
  const mouseY = pmouseY;

  particles.forEach((particle) => {
    particle.update(mouseX, mouseY);
  });
}
