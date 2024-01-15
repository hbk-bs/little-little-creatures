class PhillysParticle extends Particle {
	constructor(pos) {
		super(pos);
	}

	display() {
		push();
		noStroke();
		colorMode(HSL);
		const c = color(156, 100, 50, 1);
		fill(c);
		// rect(15, 20, 35, 60);
		// Sets 'lightValue' to 50.
		const lightValue = lightness(c);
		fill(lightValue);
		// rect(50, 20, 35, 60);
		// fill();
		ellipse(this.pos.x, this.pos.y, 20, 20);
		pop();
	}
}
