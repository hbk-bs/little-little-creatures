class LittleCreature {
  name = 'Little Creature';
  socket;
  pos;
  url;
  constructor({
    x = 0,
    y = 0,
    /* THE HOST NEEDS TO BE CHANGED TO MATCH YOUR ENV */
    host = 'ws://cyberdeck.local:3000/ws/',
    channel = 'little-creature',
  }) {
    this.url = `${host}${channel}`;
    const socket = new WebSocket(this.url);
    socket.addEventListener('open', this.openHandler);
    // socket.addEventListener("message", this.messageHandler);
    socket.addEventListener('close', this.closeHandler);
    socket.addEventListener('error', this.errorHandler);
    this.socket = socket;
    this.pos = createVector(
      map(x, 0, 1023, 0, width),
      map(y, 0, 1023, 0, height),
    );
  }

  openHandler = (_event) => {
    console.info(`WebSocket is open now on ${this.url} for ${this.name}`);
  };
  send = (message) => {
    this.socket.send(message);
  };
  prepareValues(event) {
    try {
      const json = JSON.parse(event.data, function (k, v) {
        return typeof v === 'object' || isNaN(v) ? v : parseFloat(v);
      });
      return json;
    } catch (error) {
      console.error(error);
    }
  }
  messageHandler(event) {
    try {
      console.log('Message from server: ', event.data);
      const { x, y } = this.prepareValues(event);
      if (x !== undefined && y !== undefined) {
        this.pos.x = map(x, 0, 1023, 0, width);
        this.pos.y = map(y, 0, 1023, 0, height);
      }
    } catch (error) {
      console.error(error);
    }
  }
  closeHandler = (event) => {
    console.info('WebSocket is closed now.');
  };
  errorHandler = (event) => {
    console.error('WebSocket error: ', event);
  };

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    ellipse(0, 0, 10, 10);
    pop();
  }
}
