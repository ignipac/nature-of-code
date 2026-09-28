import p5 from "p5";

const sketches = document.getElementById("sketches");

new p5((p) => {
  let particle;
  p.setup = () => {
    let sketch = p.createDiv().addClass("sketch");
    p.createCanvas(400, 400).parent(sketch);

    p.background("white");
    particle = new Particle(p, p.width / 2, 10);
  };

  p.draw = () => {
    p.background(255);
    // Operating the single Particle
    particle.run();

    // Applying a gravity force
    let gravity = p.createVector(0, 0.1);
    particle.applyForce(gravity);

    // Checking the particle's state and making a new particle
    if (particle.canDestroy()) {
      particle = new Particle(p, p.width / 2, 20);
      console.log("Particle dead!");
    }
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
    this.rotation = 0;
    this.angularVelocity = 0;
    this.lifespan = 255;
  }

  run() {
    this.update();
    this.show();
    // this.applyForce(force)// issue with this is I have to store the forces acting on obj within it
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2.0;
    this.acceleration.mult(0);
  }

  show() {
    let p = this.p5;
    p.push();
    p.stroke(0, this.lifespan);
    p.fill(175, this.lifespan);
    p.rotate(p.PI / 4); // ? translate with to rotate on obj
    p.square(this.position.x, this.position.y, 16);
    // p.circle(this.position.x, this.position.y, 8);
    p.pop();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  canDestroy() {
    return this.lifespan < 0.0;
  }
}
