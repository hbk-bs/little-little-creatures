class MireaParticle extends Particle {
  a = 100;
  endPositions = [];
  numberOfLines = 10;
  col;
  colII;
  constructor(pos) {
    super(pos);
    this.endPositions = this.calcEndPositions();
    this.col = color(random(255), random(255), random(255));
    this.colII = color(0);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    strokeWeight(1);
    stroke(0);
    if (frameCount % 100 === 0) {
      console.log('change');
      this.endPositions = this.calcEndPositions();
    }

    for (let i = 0; i < this.numberOfLines; i++) {
      line(0, 0, this.endPositions[i].x, this.endPositions[i].y);
      fill(this.col);
      //rect(this.endPositions[i].x, this.endPositions[i].y, 20,20)
      circle(this.endPositions[i].x, this.endPositions[i].y, 20);
      fill(this.colII);
      circle(this.endPositions[i].x, this.endPositions[i].y, 8)
    }
  
    pop();
  }

  move() {
    this.pos.x = this.pos.x + random(-1, 1);
    this.pos.y = this.pos.y + random(-1, 1);
    this.pos.x = constrain(this.pos.x, 0, windowWidth);
    this.pos.y = constrain(this.pos.y, 0, windowHeight);
  }


  calcEndPositions() { 
    const temporaryEndPositions = [];
    for (let i = 0; i < this.numberOfLines; i++) {
      temporaryEndPositions.push(
        createVector(random(-this.a, this.a), random(-this.a, this.a)),
      );
    }
    return temporaryEndPositions;
  }
}
