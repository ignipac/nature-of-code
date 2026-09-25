import p5 from "p5";

const sketches = document.getElementById("sketches");

// A sketch to explore the practise of modelling forces in a simutlation
new p5((p) => {
  let isPaused = true;
  let moverA;

  function createButtons(div) {
    const buttons = p.createDiv().parent(div);
    buttons.addClass("control-buttons");

    const playButton = p.createButton("Play");
    buttons.child(playButton);
    playButton.mousePressed(() => {
      isPaused = false;
    });

    const pauseButton = p.createButton("Pause");
    buttons.child(pauseButton);
    pauseButton.mousePressed(() => {
      isPaused = true;
    });
  }

  p.setup = () => {
    let sketch = p.createDiv();
    sketch.addClass("sketch");

    // canvas with 1:1 aspect ratio, contained in sketch div
    p.createCanvas(400, 400).parent(sketch);
    createButtons(sketch);

    moverA = new Mover(p);

    p.background("white");
  };
  p.draw = () => {
    if (isPaused) return;
    p.background("white");
  };
}, sketches);

new p5((p) => {
  let isPaused = true;
  let moverA;
  let moverB;

  function createButtons(div) {
    const buttons = p.createDiv().parent(div);
    buttons.addClass("control-buttons");

    const playButton = p.createButton("Play");
    buttons.child(playButton);
    playButton.mousePressed(() => {
      isPaused = false;
    });

    const pauseButton = p.createButton("Pause");
    buttons.child(pauseButton);
    pauseButton.mousePressed(() => {
      isPaused = true;
    });
  }

  p.setup = () => {
    let sketch = p.createDiv();
    sketch.addClass("sketch");

    // canvas with 1:1 aspect ratio, contained in sketch div
    p.createCanvas(400, 400).parent(sketch);
    createButtons(sketch);

    moverA = new Mover(p, 100, 100, 10);
    moverB = new Mover(p, 300, 50, 2);

    p.background("white");
    moverA.show(p);
    moverB.show(p);
  };
  p.draw = () => {
    if (isPaused) return;
    p.background("white");

    let gravity = p.createVector(0, 0.1);
    let gA = p5.Vector.mult(gravity, moverA.mass);
    let gB = p5.Vector.mult(gravity, moverB.mass);
    moverA.applyForce(gA);
    moverB.applyForce(gB);

    if (p.mouseIsPressed) {
      if (p.mouseButton.left) {
        let wind = p.createVector(0.1, 0);
        moverA.applyForce(wind);
        moverB.applyForce(wind);
      }
    }

    moverA.bounce(p);
    moverA.update();
    moverA.show(p);

    moverB.bounce(p);
    moverB.update();
    moverB.show(p);
  };
}, sketches);

// applying random force values for wind and gravity to a bouncing ball
new p5((p) => {
  let isPaused = true;
  let mover;

  function createButtons(div) {
    const buttons = p.createDiv().parent(div);
    buttons.addClass("control-buttons");

    const playButton = p.createButton("Play");
    buttons.child(playButton);
    playButton.mousePressed(() => {
      isPaused = false;
    });

    const pauseButton = p.createButton("Pause");
    buttons.child(pauseButton);
    pauseButton.mousePressed(() => {
      isPaused = true;
    });
  }

  p.setup = () => {
    let sketch = p.createDiv();
    sketch.addClass("sketch");

    // canvas with 1:1 aspect ratio, contained in sketch div
    p.createCanvas(400, 400).parent(sketch);
    p.background("white");

    mover = new Mover(p);
    mover.size = 50;
    mover.show(p);

    createButtons(sketch);
  };

  p.draw = () => {
    if (isPaused) return;

    p.background("white");

    let gravity = p.createVector(0, 0.1);
    mover.applyForce(gravity);
    mover.update();
    mover.show(p);
    mover.bounce(p);

    if (p.mouseIsPressed) {
      if (p.mouseButton.left) {
        let wind = p.createVector(0.1, 0);
        mover.applyForce(wind);
      }
    }
  };
}, sketches);

class Mover {
  constructor(p, x = p.width / 2, y = p.height / 2, mass = 1) {
    this.pos = p.createVector(x, y);
    this.mass = mass;
    this.init(p);
  }

  init(p) {
    this.vel = p.createVector(0, 0);
    this.accel = p.createVector(0, 0);
    this.maxSpeed = 10; // pixels per frame
    this.maxAccel = 1.0; // pixels per frame ^ 2, add 0.1 to the current speed up to the max Speed
    this.size = 16 * this.mass;
    this.fill = 0;
  }

  update() {
    this.vel.add(this.accel); // stop acceleration when at max speed, how to decelerate when approaching mouse?
    this.pos.add(this.vel);
    this.accel.mult(0); // after adding to velocity
  }

  show(p) {
    p.push();
    p.fill(this.fill);
    p.noStroke();
    p.circle(this.pos.x, this.pos.y, this.size); // size of onj
    p.pop();
  }

  applyForce(force) {
    // let f = p5.Vector.div(force, this.mass)
    let f = force.copy();
    f.div(this.mass);
    this.accel.add(f);
  }

  wrapAround(p) {
    if (this.pos.x - this.size / 2 > p.width) {
      this.pos.x = 0;
    } else if (this.pos.x + this.size / 2 < 0) {
      this.pos.x = p.width;
    }
    if (this.pos.y - this.size > p.height) {
      this.pos.y = 0;
    } else if (this.pos.y + this.size < 0) {
      this.pos.y = p.height;
    }
  }

  bounce(p) {
    if (
      this.pos.x > p.width - this.size / 2 ||
      this.pos.x < 0 + this.size / 2
    ) {
      this.vel.x *= -1;
    }
    if (
      this.pos.y > p.height - this.size / 2 ||
      this.pos.y < 0 + this.size / 2
    ) {
      this.vel.y *= -1;
    }
  }
}

// Helpers
