class Particle {
  /**
   * @type {import("p5").Vector}
   */

  pos;

  /**
   * @param {import("p5").Vector} pos
   */
  constructor(pos) {
    this.pos = pos;
  }

  display() {
    push();
    noStroke();
    fill(0);
    ellipse(this.pos.x, this.pos.y, 10, 10);
    pop();
  }
}
