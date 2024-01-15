//@ts-check
class isabella extends Particle {
	constructor(pos, r1, r2, npoints, colr, colg, colb) {
		super(pos);

		this.r1 = r1;
		this.r2 = r2;
		this.npoints = npoints;
		this.colr = colr;
		this.colg = colg;
		this.colb = colb;

		this.sx = 0;
		this.sy = 0;
		this.angle = TWO_PI / npoints;
		this.halfAngle = TWO_PI / npoints / 2;
	}
	display() {
		noStroke();
		fill(this.colr, this.colg, this.colb);
		beginShape();

		for (let j = 0; j < TWO_PI; j += this.angle) {
			this.sx = this.pos.x + cos(j) * this.r2;
			this.sy = this.pos.y + sin(j) * this.r2;
			vertex(this.sx, this.sy);
			this.sx = this.pos.x + cos(j + this.halfAngle) * this.r1;
			this.sy = this.pos.y + sin(j + this.halfAngle) * this.r1;
			vertex(this.sx, this.sy);
		}
		endShape(CLOSE);
		this.pos.x = this.pos.x + random(-1, 1);
		this.pos.y = this.pos.y + random(-1, 1);
		this.pos.x = constrain(this.pos.x, 0, width);
		this.pos.y = constrain(this.pos.y, 0, height);
	}
}
