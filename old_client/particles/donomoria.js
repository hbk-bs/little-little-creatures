class DonoParticle extends Particle {
	color;
	constructor(pos) {
		super(pos);
		this.color = random(255);
	}
	display() {
		fill(this.color);
		noStroke();
		rect(this.pos.x, this.pos.y, 50, 50);
	}
}
