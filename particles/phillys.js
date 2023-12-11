class PhillysParticle extends Particle {
    constructor(pos) {
      super(pos);
    }
    
    display() {
      display() 
        push();
        noStroke();
        fill(0);
        ellipse(this.pos.x, this.pos.y, 10, 10);
        pop();
      }
    }
  