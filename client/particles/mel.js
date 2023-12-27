class mel extends Particle {
	constructor(pos) {
		super(pos);
	}

	display() {
		push();
		let c = color("hsb(160, 100%, 50%)");
		noStroke();
		c = color("hsba(160, 100%, 50%, 0.5)");
		fill(c);
		// Draw a star shape
		beginShape();
		vertex(this.pos.x, this.pos.y - 50);
		vertex(this.pos.x + 10, this.pos.y - 10);
		vertex(this.pos.x + 50, this.pos.y);
		vertex(this.pos.x + 10, this.pos.y + 10);
		vertex(this.pos.x, this.pos.y + 50);
		vertex(this.pos.x - 10, this.pos.y + 10);
		vertex(this.pos.x - 50, this.pos.y);
		vertex(this.pos.x - 10, this.pos.y - 10);
		endShape(CLOSE);
		pop();
	}
}
