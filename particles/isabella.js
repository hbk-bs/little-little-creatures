//@ts-check
class isabella extends Particle {

    constructor(pos, x, y, r1, r2, npoints, colr, colg, colb) {
        super(pos);
        this.x = x;
        this.y = y;
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
createStar(){
    noStroke();
    fill(this.colr, this.colg, this.colb);
    beginShape();

    for (let j = 0; j < TWO_PI; j+= this.angle) {
        this.sx = this.x + cos(j) * this.r2;
        this.sy = this.y + sin(j) * this.r2;
        vertex(this.sx, this.sy);
        this.sx = this.x + cos(j + this.halfAngle) * this.r1;
        this.sy = this.y + sin(j + this.halfAngle) * this.r1;
        vertex(this.sx, this.sy)
    }
    endShape(CLOSE);
}
moveStar() {
    this.y += pow(this.r1, 0.9);
    let index = stars.indexOf(this);
    stars.splice(index, 1);
}
}




