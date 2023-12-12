class MiraParticle extends Particle {
  lifetime; // control the life of the particle
  col; // color
  size;
  sizeLimit;

  constructor(pos, col, size, sizeLimit) {
    super(pos);

    this.col = col ? color(col) : random(255);
    this.size = size;
    this.sizeLimit = sizeLimit;
    this.lifetime = 100;
  }
  display() {
    // make it a circle
    // make it draw text
    if (this.lifetime > 0) {
      push();
      fill(this.col);
      // make it a rectangle
      rect(this.pos.x, this.pos.y, 50, 10);
      circle(this.pos.x, this.pos.y, this.size);

      pop();
    }
    this.update();
    this.move();
  }
  update() {
    // this.lifetime = this.lifetime -1;
    this.lifetime--;
    if (this.lifetime <= 0) {
      this.lifetime = 0;
    }
  }

  move() {
    // interact with other particles
    // dont change position on random
    // have a rule
    // - e.g. move in circles
    this.pos.x = this.pos.x + random(-1, 1);
    this.pos.y = this.pos.y + random(-1, 1);
    // constrain its position to the canvas ☑️
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
    this.size = this.size + 1;
    this.size = constrain(this.size, 10, this.sizeLimit);
  }
  // funtion grow over time
  // function change your shape
  // function interact with the mouse
  // - grow on click
  // - change color on hover
}
