class annes_particle extends Particle {
  constructor(pos) {
    super(pos);
  }
  randomColor = color(random(100), random(200), random(200));
  randomColor2 = color(random(200), random(200), random(100));
  randomColor3 = color(random(200), random(100), random(200));
  randomColor4 = color(random(100), random(200), random(100));

  display() {
    push();
    noStroke();
    fill(this.randomColor);
    rect(this.pos.x, this.pos.y, 30, 30);
    fill(this.randomColor2);
    rect(this.pos.x, this.pos.y, 30, 15);
    translate(this.pos.x, this.pos.y);
    fill(this.randomColor3);
    rect(15, 15, 15, 15);
    fill(this.randomColor4);
    rect(0, 0, 15, 15);
    pop();
  }
}
