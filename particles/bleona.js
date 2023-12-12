class bleonaParticle extends Particle {
    constructor(pos,x,y,col) {
       super(pos);
       this.x= 400;
       this.y=400;
       this.col=col;
       this.size=1;
       this.maxSize=50
       this.growthRate=1;
       this.frameCount = 0;
   this.restartThreshold =100; 
    
      }
display (){
    console.log("Displaying BleonaParticle");
        if (this.growthRate > 0) {
          push();
          noStroke;
          fill(255, 255, 0, 8); // Blue color
          ellipse(this.x, this.y, this.size, 40);
          pop();
        }
      
}

update(){
    console.log("Updating BleonaParticle");
this.size+=this.growthRate;
if (this.frameCount < 1) {  
    this.size += this.growthRate;
    this.frameCount++;
  }
  if (this.frameCount < this.restartThreshold) {
    this.size += this.growthRate;
  } else {
    // Der innere Kreis beginnt neu
    this.size = 1;
    this.frameCount = 0;
  }

  this.frameCount++;
}

}





