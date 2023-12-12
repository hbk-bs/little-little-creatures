// @ts-check
class leleleParticle extends Particle {

  /**
   * @param {import("p5").Vector} pos
   */
  constructor(pos) {
    super(pos);
    this.angle1 = 0;
    this.angle2 = PI; // Startwinkel für die zweite Ellipse, PI bedeutet halber Kreis (180 Grad)
    this.speed = 0.0005; // Konstante Drehgeschwindigkeit pro Millisekunde
    this.scalar = 100;
    this.distance = 100; // Abstand zwischen den Kreisen
    this.lastTime = millis(); // Zeit des letzten Frames
    this.colorA = color(random(255), random(255), random(255));
    this.colorB = color(random(255), random(255), random(255));
    this.transitionDuration = 30000; // Dauer für den Farbübergang in Millisekunden (30 Sekunden)
    this.transitionStart = millis(); // Startzeit des Übergangs
    this.gradientRadius = 30; // Radius für den radialen Verlauf
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);

    let currentTime = millis();
    let deltaTime = currentTime - this.lastTime; // Zeitdifferenz zwischen den Frames in Millisekunden
    this.lastTime = currentTime; // Aktualisiere die Zeit des letzten Frames

    this.angle1 += this.speed * deltaTime; // Ändere den Winkel basierend auf der Zeitdifferenz
    this.angle2 -= this.speed * deltaTime; // Ändere den Winkel basierend auf der Zeitdifferenz

    const offsetX = sin(this.angle1) * this.scalar;
    const offsetY = cos(this.angle1) * this.scalar;

    let x2 = cos(this.angle2) * this.distance;
    let y2 = sin(this.angle2) * this.distance;


    let transitionRatio =
      (currentTime - this.transitionStart) / this.transitionDuration;
    let lerpedColorA = lerpColor(
      this.colorA,
      this.colorB,
      min(transitionRatio, 1),
    ); // Farbe für den ersten Kreis
    let lerpedColorB = lerpColor(
      this.colorB,
      this.colorA,
      min(transitionRatio, 1),
    ); // Farbe für den zweiten Kreis

    // Erste Ellipse mit radialen Verlauf
    noStroke();
    for (let i = 0; i < this.gradientRadius; i++) {
      let lerpedColor = lerpColor(
        lerpedColorA,
        color(
          lerpedColorA.levels[0],
          lerpedColorA.levels[1],
          lerpedColorA.levels[2],
          0,
        ),
        i / this.gradientRadius,
      );
      fill(lerpedColor);
      ellipse(offsetX, offsetY, 20 + i * 2, 20 + i * 2);
    }

    // Zweite Ellipse mit radialen Verlauf
    for (let i = 0; i < this.gradientRadius; i++) {
      let lerpedColor = lerpColor(
        lerpedColorB,
        color(
          lerpedColorB.levels[0],
          lerpedColorB.levels[1],
          lerpedColorB.levels[2],
          0,
        ),
        i / this.gradientRadius,
      );
      fill(lerpedColor);
      ellipse(x2, y2, 20 + i * 2, 20 + i * 2);
    }

    // Verbindungslinie zwischen den Ellipsen bleibt schwarz
    noStroke();
    line(0, 0, x2, y2);

    // Wenn die Übergangszeit abgelaufen ist, aktualisiere die Farben und starte den Übergang erneut
    if (currentTime - this.transitionStart >= this.transitionDuration) {
      this.colorA = this.colorB;
      this.colorB = color(random(255), random(255), random(255));
      this.transitionStart = currentTime;
    }
    pop();

    // Erste Ellipse mit radialen Verlauf
    noStroke();
    for (let i = 0; i < this.gradientRadius; i++) {
      let lerpedColor = lerpColor(
        lerpedColorA,
        color(
          lerpedColorA.levels[0],
          lerpedColorA.levels[1],
          lerpedColorA.levels[2],
          0,
        ),
        i / this.gradientRadius,
      );
      fill(lerpedColor);
      ellipse(this.pos.x, this.pos.y, 20 + i * 2, 20 + i * 2);
    }

    // Zweite Ellipse mit radialen Verlauf
    for (let i = 0; i < this.gradientRadius; i++) {
      let lerpedColor = lerpColor(
        lerpedColorB,
        color(
          lerpedColorB.levels[0],
          lerpedColorB.levels[1],
          lerpedColorB.levels[2],
          0,
        ),
        i / this.gradientRadius,
      );
      fill(lerpedColor);
      ellipse(x2, y2, 20 + i * 2, 20 + i * 2);
    }

    // Verbindungslinie zwischen den Ellipsen bleibt schwarz
    noStroke();
    line(this.pos.x, this.pos.y, x2, y2);

    // Wenn die Übergangszeit abgelaufen ist, aktualisiere die Farben und starte den Übergang erneut
    if (currentTime - this.transitionStart >= this.transitionDuration) {
      this.colorA = this.colorB;
      this.colorB = color(random(255), random(255), random(255));
      this.transitionStart = currentTime;
    }



  }
}

//thanks to ChatGPT
