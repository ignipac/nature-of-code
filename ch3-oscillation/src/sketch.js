import p5 from "p5";

const sketches = document.getElementById("sketches");

// launch a cannon ball
new p5((p) => {
  let isPaused = false;
  let cannonBalls = [];

  let center;
  // Issue with moving out of sketch, functionality inside event mousepressed is not captured, maybe as its a p5 method
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

    center = p.createVector(p.width / 2, p.height / 2);

    p.background("white");

    // cannon
    p.push();
    p.fill(50);
    p.rect(0, (7 * p.width) / 8, p.width / 4, p.height);
    p.fill(100);
    p.noStroke();
    p.circle(p.width / 4, (7 * p.height) / 8, 50);
    p.pop();
  };
  p.draw = () => {
    if (isPaused) return;
    p.background("white");

    // cannon
    p.push();
    p.fill(50);
    p.rect(0, (7 * p.width) / 8, p.width / 4, p.height);
    p.fill(100);
    p.noStroke();
    p.circle(p.width / 4, (7 * p.height) / 8, 50);
    p.pop();

    let gravity = p.createVector(0, 0.01);
    let airResis = p.createVector(-0.001, 0);

    if (cannonBalls.length > 0) {
      for (const ball of cannonBalls) {
        ball.render(p);
        ball.update(p);
        ball.applyForce(airResis);
        ball.applyForce(gravity);

        // interesting how this removes all the balls
        if (ball.pos.y >= p.height) {
          console.log(ball.pos.y);
          let i = cannonBalls.indexOf(ball);
          cannonBalls.pop(cannonBalls[i]);
        }
      }
    }
  };

  p.mouseClicked = () => {
    let ball = new body2D(p);

    let launchPoint = p.createVector(p.width / 4, (7 * p.height) / 8);
    ball.pos = launchPoint;

    let lauchForce = p.createVector(1, -1);
    ball.applyForce(lauchForce);

    // how to add rotation to the ball when launched and then make it go the op dir when in air?

    cannonBalls.push(ball);
  };
}, sketches);

// rotating a baton
new p5((p) => {
  let isPaused = true;

  let angle = 0;
  let radius = 50;
  let center;

  // Issue with moving out of sketch, functionality inside event mousepressed is not captured, maybe as its a p5 method
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

    center = p.createVector(p.width / 2, p.height / 2);

    p.background("white");

    p.translate(center.x, center.y);

    p.push();
    p.rotate(angle);
    p.fill(100);
    p.strokeWeight(5);
    p.line(-radius, -radius, radius, radius);
    p.circle(radius, radius, radius);
    p.circle(-radius, -radius, radius);
    p.pop();
  };
  p.draw = () => {
    if (isPaused) return;
    p.background("white");

    p.translate(center.x, center.y);

    p.push();
    p.rotate(angle);
    p.fill(100);
    p.strokeWeight(5);
    p.line(-radius, -radius, radius, radius);
    p.circle(radius, radius, radius);
    p.circle(-radius, -radius, radius);
    p.pop();

    angle += 0.01;
  };
}, sketches);

// Objs

class body2D {
  pos;
  vel;
  accel;
  // rotation
  rot;
  rotVel;
  rotAccel;

  //
  size;

  constructor(p) {
    this.accel = p.createVector(0, 0);
    this.vel = p.createVector(0, 0);
    this.rot = 0;
    this.rotVel = 0;
    this.rotAccel = 0;
    this.size = 30;
  }

  render(p) {
    p.push();
    p.rotate(this.rot, [1, 0, 0]);
    p.fill(130);
    p.circle(this.pos.x, this.pos.y, this.size);
    p.line(this.pos.x, this.pos.y, this.pos.x + this.size / 2, this.pos.y);
    p.pop();
  }

  update(p) {
    this.vel.add(this.accel);
    this.pos.add(this.vel);
    this.accel.mult(0);

    console.log(this.rot, this.rotVel, this.rotAccel);
    this.rot += this.rotVel;
    this.rotVel += this.rotAccel;
    this.rotAccel = p.constrain(this.rotVel, -0.1, 0.1);
  }

  applyForce(force) {
    let f = force.copy();
    this.accel.add(f);
  }
}
