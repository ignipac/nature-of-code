import p5 from "p5";

const sketches = document.getElementById("sketches");

new p5((p) => {
  let isPaused = true;
  // Using this variable to decide whether to draw all the stuff
  let debug = true;

  // Flowfield object
  let flowfield;

  // An ArrayList of vehicles
  let vehicles = [];

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

    // p.createP(
    //   "Hit space bar to toggle debugging lines.<br>Click the mouse to generate a new flow field.",
    // );

    // Make a new flow field with "resolution" of 16
    flowfield = new FlowField(p, 20);
    // Make a whole bunch of vehicles with random maxspeed and maxforce values
    for (let i = 0; i < 120; i++) {
      let vehicle = new Vehicle(p, p.random(p.width), p.random(p.height));
      vehicle.maxspeed = p.random(2, 5);
      vehicle.maxforce = p.random(0.1, 0.5);
      vehicles.push(vehicle);
    }
  };

  p.draw = () => {
    if (isPaused) return;
  };
}, sketches);

// Wander Example
new p5((p) => {
  let isPaused = true;
  let vehicle;
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

    vehicle = new Vehicle(p, p.width / 2, p.height / 2);
  };

  p.draw = () => {
    if (isPaused) return;

    p.background("white");

    // Call the appropriate steering behaviors for our agents
    vehicle.maxspeed = 2;
    vehicle.maxforce = 0.05;
    vehicle.wander();
    vehicle.update();
    vehicle.show();
  };
}, sketches);

// Evade
new p5((p) => {
  let isPaused = true;
  let vehicle;
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

    vehicle = new Vehicle(p, p.width / 2, p.height / 2);
  };

  p.draw = () => {
    if (isPaused) return;

    p.background("white");

    let mouse = p.createVector(p.mouseX, p.mouseY);

    // Draw an ellipse at the mouse position
    p.fill(127);
    p.stroke(0);
    p.strokeWeight(2);
    p.circle(mouse.x, mouse.y, 48);

    // Call the appropriate steering behaviors for our agents
    vehicle.evade(mouse);
    vehicle.update();
    vehicle.show();
  };
}, sketches);

// Chase
new p5((p) => {
  let isPaused = true;
  let vehicle;
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

    vehicle = new Vehicle(p, p.width / 2, p.height / 2);
  };

  p.draw = () => {
    if (isPaused) return;

    p.background("white");

    let mouse = p.createVector(p.mouseX, p.mouseY);

    // Draw an ellipse at the mouse position
    p.fill(127);
    p.stroke(0);
    p.strokeWeight(2);
    p.circle(mouse.x, mouse.y, 48);

    // Call the appropriate steering behaviors for our agents
    vehicle.seek(mouse);
    vehicle.update();
    vehicle.show();
  };
}, sketches);

class Vehicle {
  constructor(p, x, y) {
    this.position = p.createVector(x, y);
    this.velocity = p.createVector(0, 0);
    this.acceleration = p.createVector(0, 0);
    this.r = 6;
    this.wandertheta = 0.0;
    this.maxspeed = 8;
    this.maxforce = 0.2;
    this.p5 = p;
  }

  // Method to update location
  update() {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    // Reset accelerationelertion to 0 each cycle
    this.acceleration.mult(0);
  }

  applyForce(force) {
    // We could add mass here if we want A = F / M
    this.acceleration.add(force);
  }

  // A method that calculates a steering force towards a target
  // STEER = DESIRED MINUS VELOCITY
  seek(target) {
    let desired = p5.Vector.sub(target, this.position); // A vector pointing from the location to the target

    let d = desired.mag();
    let p = this.p5;
    // Scale to maximum speed
    if (d < 100) {
      let m = p.map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    // Steering = Desired minus velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    this.applyForce(steer);
  }

  evade(target) {
    let desired = p5.Vector.sub(target, this.position).mult(-1);
    desired.setMag(this.maxspeed);

    // check if distance between target & vehicle is above threshold
    // let d = desired.mag();
    // let p = this.p5;
    // // Scale to maximum speed
    // let threshold = 200;
    // if (d < threshold) {
    //   let m = p.map(d, 0, threshold, this.maxspeed, 0);
    //   desired.setMag(m);
    // } else {
    //   desired.setMag(0);
    // }

    // Steering = Desired minus velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    this.applyForce(steer);
    this.wrapAround();
  }

  wander() {
    let debug = true;

    let p = this.p5;
    let wanderR = 25;
    let wanderD = 80;
    let change = 0.3;
    this.wandertheta += p.random(-change, change);

    let circlePos = this.velocity.copy();
    circlePos.normalize();
    circlePos.mult(wanderD);
    circlePos.add(this.position);

    let h = this.velocity.heading();

    let circleOffSet = p.createVector(
      wanderR * p.cos(this.wandertheta + h),
      wanderR * p.sin(this.wandertheta + h),
    );
    let target = p5.Vector.add(circlePos, circleOffSet);
    this.seek(target);

    if (debug) this.drawWanderStuff(this.position, circlePos, target, wanderR);
    this.wrapAround();
  }

  show() {
    //{!1} Vehicle is a triangle pointing in the direction of velocity
    let angle = this.velocity.heading();
    let p = this.p5;
    p.fill(127);
    p.stroke(0);
    p.push();
    p.translate(this.position.x, this.position.y);
    p.rotate(angle);
    p.beginShape();
    p.vertex(this.r * 2, 0);
    p.vertex(-this.r * 2, -this.r);
    p.vertex(-this.r * 2, this.r);
    p.endShape(p.CLOSE);
    p.pop();
  }

  // Wrap around borders of canvas
  wrapAround() {
    let p = this.p5;
    if (this.position.x > p.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = p.width;
    }
    if (this.position.y > p.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = p.height;
    }
  }

  // A method just to draw the circle associated with wandering
  drawWanderStuff(location, circlePos, target, rad) {
    let p = this.p5;
    p.stroke(0);
    p.noFill();
    p.strokeWeight(1);
    p.circle(circlePos.x, circlePos.y, rad * 2);
    p.circle(target.x, target.y, 4);
    p.line(location.x, location.y, circlePos.x, circlePos.y);
    p.line(circlePos.x, circlePos.y, target.x, target.y);
  }
}

// A vector for each grid
class FlowField {
  constructor(p, r) {
    this.p5 = p;
    this.resolution = r;
    //{!2} Determine the number of columns and rows.
    this.cols = p.width / this.resolution;
    this.rows = p.height / this.resolution;
    //{!4} A flow field is a two-dimensional array of vectors. The example includes as separate function to create that array
    this.field = new Array(this.cols);
    for (let i = 0; i < this.cols; i++) {
      this.field[i] = new Array(this.rows);
    }
    this.init();
  }

  // The init() function fills the 2D array with vectors
  init() {
    // Reseed noise for a new flow field each time
    let p = this.p5;
    p.noiseSeed(p.random(10000));
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        //{.code-wide} In this example, use Perlin noise to create the vectors.
        let angle = p.map(p.noise(xoff, yoff), 0, 1, 0, p.TWO_PI);
        this.field[i][j] = p5.Vector.fromAngle(angle);
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  // Draw every vector
  show() {
    let p = this.p5;
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        let w = p.width / this.cols;
        let h = p.height / this.rows;
        let v = this.field[i][j].copy();
        v.setMag(w * 0.5);
        let x = i * w + w / 2;
        let y = j * h + h / 2;
        p.strokeWeight(1);
        p.line(x, y, x + v.x, y + v.y);
      }
    }
  }

  //{.code-wide} A function to return a p5.Vector based on a position
  lookup(position) {
    let column = constrain(
      floor(position.x / this.resolution),
      0,
      this.cols - 1,
    );
    let row = constrain(floor(position.y / this.resolution), 0, this.rows - 1);
    return this.field[column][row].copy();
  }
}
