class mel extends Particle {
    constructor(pos) {
      super(pos);
    }
    
  display() {

    push();
    let c = color('hsb(160, 100%, 50%)');
    noStroke();
    c = color('hsba(160, 100%, 50%, 0.5)');
    fill(c);
    // Draw a star shape relative to the current position (this.pos)
    beginShape();
    vertex(this.pos.x, this.pos.y - 20);
    vertex(this.pos.x + 5, this.pos.y - 5);
    vertex(this.pos.x + 20, this.pos.y);
    vertex(this.pos.x + 5, this.pos.y + 5);
    vertex(this.pos.x, this.pos.y + 20);
    vertex(this.pos.x - 5, this.pos.y + 5);
    vertex(this.pos.x - 20, this.pos.y);
    vertex(this.pos.x - 5, this.pos.y - 5);
    endShape(CLOSE);
    pop();
  }
}