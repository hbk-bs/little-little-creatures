class DonoParticle extends Particle{
    constructor(pos) {
        super(pos);
      }
}  display() {
    fill(this.color);
    noStroke();
    rect(this.x, this.y, 50, 50);
  }
}
