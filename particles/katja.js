//@ts-check

class KatjaParticle extends Particle {
    constructor(pos) {
      super(pos);
    }

    display() {
        push();
        strokeWeight(4);
        stroke(random(100),random(0),random(255));
        line(this.pos.x, this.pos.y, 200, 200);
        fill(random(255),random(0),random(255));
        circle(this.pos.x, this.pos.y, 50, 50);
        this.pos.x = this.pos.x + random(-20, 20);
        this.pos.y = this.pos.y + random(-20, 20);
        this.pos.x = constrain(this.pos.x, 0, width);
        this.pos.y = constrain(this.pos.y, 0, height);
        pop();
      
      } 
      }

