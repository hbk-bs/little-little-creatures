class MiraParticle {
    x; 
    y;
    lifetime; // control the life of the particle
    col; // color
    size; 
    sizeLimit;

    constructor(x, y, col,size,sizeLimit) {
        this.x = x;
        this.y = y;
        this.col = col;
        this.size= size; 
        this.sizeLimit= sizeLimit;
        this.lifetime = 100;
    }
    display() {
        // make it a circle
        // make it draw text
        if (this.lifetime > 0) {
            push();
            fill(this.col);
            // make it a rectangle
            rect(this.x, this.y, 50, 10);
          circle(this.x,this.y, this.size);

    
            pop();
        }
    }
    update() {
        // this.lifetime = this.lifetime -1;
        this.lifetime--;
        if (this.lifetime <= 0) {
            this.lifetime = 0;
          
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
        this.size= this.size+1;
        this.size=constrain(this.size,10,this.sizeLimit)

    }
    // funtion grow over time
    // function change your shape
    // function interact with the mouse
    // - grow on click
    // - change color on hover
}  