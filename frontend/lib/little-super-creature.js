class LittleSuperCreature extends LittleCreature {
  name = 'Little Super Creature';
  s = 0;

  constructor(options) {
    super(options);

    this.socket.onopen = () => {
      this.socket.onmessage = this.messageHandler;
    };
  }

  messageHandler = (event) => {
    try {
      console.log('Message from server in extended: ', event.data);
      const { measurements } = this.prepareValues(event);
      const x = measurements[0];
      const y = measurements[1];
      const s = measurements[2];
      console.log(measurements);
      console.log(measurements[0], measurements[1]);
      if (x !== undefined && y !== undefined) {
        this.pos.x = map(x, 0, 1023, 0, width);
        this.pos.y = map(y, 0, 1023, 0, height);
      }
      if (s !== undefined) {
        this.s = s;
      }
    } catch (error) {
      console.error(error);
    }
  };
  display() {
    push();
    rectMode(CENTER);
    translate(this.pos.x, this.pos.y, this.pos.z);
    if (this.s === 0) {
      fill('red');

      rect(0, 0, 10, 10);
    } else {
      fill('white');
      ellipse(0, 0, 40, 40);
    }
    pop();
  }
}
