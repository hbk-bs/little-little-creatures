class mokatrinosParticle {
    x;
    y;
    lifetime; 
    col;
    shape; 

    constructor(x, y, col, shape) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.shape=shape;
        this.lifetime = 100;
    }
    display() {
      
        if (this.lifetime > 10) {
            push();
            fill(this.col);
         strokeWeight(10)
         if (this.shape == "rect") rect(this.x, this.y, 15,55);
         if (this.shape == "rect") rect(this.x, this.y, 15,15);

          
           

         if (this.shape == "circle") circle(this.x,this.y, 60);
         if (this.shape == "circle") circle(this.x,this.y, 10);
        



        

         

         push();
         strokeWeight(15);
         if(this.shape == "line") line(this.x, this.y, this.x + 10, this.y+40);
         if(this.shape == "line") line(this.x, this.y, this.x + 40, this.y+10);
         if(this.shape == "line") line(this.x, this.y, this.x + 30, this.y+30);

        


         pop();

         if(this.shape=="ellipse") ellipse(this.x, this.y, 60,30);
         if(this.shape=="ellipse") ellipse(this.x, this.y, 30,60);
         

            pop();
        }
    }
    move() {
		// interact with other particles
		// dont change position on random
		// have a rule
		// - e.g. move in circles
		this.x = this.x + random(-1, 1);
		this.y = this.y + random(-1, 1);
		// constrain its position to the canvas ☑️
		this.x = constrain(this.x, 0, width);
		this.y = constrain(this.y, 0, height);
	}
} 

