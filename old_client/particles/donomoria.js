class DonoParticle extends Particle {

	constructor(pos) {
	  super(pos);
	  this.color = color(random(255), random(255), random(255));
	}
  
	setColor() {
	  this.color = color(random(255), random(255), random(255));
	}
  
	display() {
	  fill(this.color);
	  noStroke();
	  rect(this.pos.x, this.pos.y, 50, 50);
	  const distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
	
	  if (distance < 200) {
		const angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
		const newX = this.pos.x + cos(angle) * 10;
		const newY = this.pos.y + sin(angle) * 10;
		this.pos.x = newX;
		this.pos.y = newY;
		this.setColor();
	  }
	}
  }