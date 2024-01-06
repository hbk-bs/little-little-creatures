class arne {
  pos;
  col;
  lifetime;

  constructor(pos, col, lifetime) {
    this.pos = pos;
    this.col = col;
    this.lifetime = lifetime;
  }

  display() {
    if (this.lifetime > 0) {
      push();
      noStroke();
      fill(this.col);
      /**
       * text takes other argments. See the documentation
       * https://p5js.org/reference/#/p5/text
       * text(str, x, y, [maxWidth], [maxHeight])
       *
       */
      text(
        "Hello world",
        this.pos.x,
        this.pos.y
        // random(width),
        // random(height)
      );

      pop();
      this.update();
    }
  }
  update() {
    this.lifetime--;
    if (this.lifetime <= 0) {
      this.lifetime = 0;
    }
  }
}
