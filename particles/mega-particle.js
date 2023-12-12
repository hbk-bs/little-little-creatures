class MegaParticle extends Particle {
  /**
   * @param {import("p5").Vector} pos
   */
  constructor(pos) {
    super(pos);
  }
  display() {
    push();
    noStroke();
    fill(0);
    ellipse(this.pos.x, this.pos.y, 20, 20);
    pop();
  }
}
