import p5 from "p5";

const sketches = document.getElementById("sketches");

new p5((p) => {
  p.setup = () => {
    let sketch = p.createDiv().addClass("sketch");
    p.createCanvas(400, 400).parent(sketch);

    p.background("white");
  };

  p.draw = () => {
    // your code here
  };
}, sketches);

class Particle {
  p5;

  // A Particle object is just another name for a mover. It has position, velocity, and acceleration.
  constructor(p, x, y) {
    this.p5 = p; // p5 instance
    this.position = this.p5.createVector(x, y);
    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = this.p5.createVector(0, 0);
    this.lifespan = 255;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }

  show() {
    this.p5.stroke(0, this.lifespan);
    this.p5.fill(175, this.lifespan);
    this.p5.circle(this.position.x, this.position.y, 8);
  }

  canDestroy() {
    return this.lifespan < 0.0;
  }
}
