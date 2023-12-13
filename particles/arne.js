class arne {
    pos;
    col ;
    lifetime;

    constructor(pos, col , lifetime) {
      this.pos = pos;	
      this.col = col;
      this.lifetime = 100;
    }
  
    display() {
     
      if (this.lifetime > 0) {
        push();
        noStroke();
        fill(this.col); 
        text(this.pos.x, this.pos.y, random(width), random(height));

        pop();
      }
    }
    update() {
        this.lifetime--;
        if (this.lifetime <= 0) {
            this.lifetime = 0;
        }
    }
}

  
 