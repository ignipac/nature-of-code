import p5 from "p5";

const sketches = document.getElementById("sketches");

new p5((p) => {
  let isPaused = true;
  p.setup = () => {
    let sketch = p.createDiv().addClass("sketch");
    p.createCanvas(400, 400).parent(sketch);

    let playButton = p
      .createButton("Toggle Sketch")
      .parent(sketch)
      .addClass("control-buttons");
    playButton.mousePressed(() => {
      isPaused = !isPaused;
    });

    p.background("white");
  };

  p.draw = () => {
    if (isPaused) return;
  };
});

new p5((p) => {
  let isPaused = true;
  let emitter;

  p.setup = () => {
    let sketch = p.createDiv().addClass("sketch");
    p.createCanvas(400, 400).parent(sketch);

    // pause/play sketch
    let playButton = p
      .createButton("Toggle Sketch")
      .parent(sketch)
      .addClass("control-buttons");
    playButton.mousePressed(() => {
      isPaused = !isPaused;
    });

    p.background("white");

    emitter = new Emitter(p, p.width / 2, p.height / 2);
  };

  p.draw = () => {
    if (isPaused) return;
    p.background(255);

    let mousePos = p.createVector(p.mouseX, p.mouseY);
    emitter.position = mousePos;
    emitter.addParticle();
    emitter.run();
  };
}, sketches);

// multiple emitter rendering a particle each draw call
new p5((p) => {
  let isPaused = true;

  let emitters = [];

  p.setup = () => {
    let sketch = p.createDiv().addClass("sketch");
    p.createCanvas(400, 400).parent(sketch);

    p.background("white");

    // pause/play sketch
    let playButton = p
      .createButton("Toggle Sketch")
      .parent(sketch)
      .addClass("control-buttons");
    playButton.mousePressed(() => {
      isPaused = !isPaused;
    });

    for (let i = 0; i < 5; i++) {
      emitters.push(new Emitter(p, 20 + i * 80, 40));
    }
  };

  p.draw = () => {
    if (isPaused) return;
    p.background(255);

    emitters.forEach((emitter) => {
      emitter.addParticle();
      emitter.run();
    });
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
    let gravity = this.p5.createVector(0, 0.05);
    this.applyForce(gravity); // I have to store the forces acting on obj within it
    this.update();
    this.show();
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
    // p.rotate(p.PI / 4); // ? translate with to rotate on obj
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

class Emitter {
  p5; // p5 sketch used

  constructor(p, x, y) {
    this.p5 = p;
    this.position = this.p5.createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    let newParticle = new Particle(this.p5, this.position.x, this.position.y);
    newParticle.velocity = this.p5.createVector(
      this.p5.random(-1, 1),
      this.p5.random(-1, 0),
    );
    this.particles.push(newParticle);
  }

  run() {
    this.particles = this.particles.filter(
      (particle) => !particle.canDestroy(),
    );
    this.particles.forEach((particle) => {
      particle.run();
    });
  }
}

class EmitterSystem {}
