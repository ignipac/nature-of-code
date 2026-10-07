import p5 from "p5";

const sketches = document.getElementById("sketches");
//
// let vehicle;
//
// function setup() {
//   createCanvas(640, 240);
//   vehicle = new Vehicle(width / 2, height / 2);
// }
//
// function draw() {
//   background(255);
//
//   let mouse = createVector(mouseX, mouseY);
//
//   // Draw an ellipse at the mouse position
//   fill(127);
//   stroke(0);
//   strokeWeight(2);
//   circle(mouse.x, mouse.y, 48);
//
//   // Call the appropriate steering behaviors for our agents
//   vehicle.seek(mouse);
//   vehicle.update();
//   vehicle.show();
// }

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

class Vehicle {
  constructor(p, x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.r = 6;
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

    // Scale to maximum speed
    desired.setMag(this.maxspeed);

    // Steering = Desired minus velocity
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force

    this.applyForce(steer);
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
    p.endShape(CLOSE);
    p.pop();
  }
}
