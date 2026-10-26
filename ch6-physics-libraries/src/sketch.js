import p5 from "p5";
import Matter from "matter-js";

const sketches = document.getElementById("sketches");

console.log(Matter.Vector.create(1, -1));

const { Engine, Vector, Body, Bodies, Composite, Render } = Matter;

let isExploringMatter = false;
let engine;

new p5((p) => {
  let isPaused = false;

  // An array for all boxes
  let boxes = [];

  // An array for all boundaries
  let boundaries = [];

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

    engine = Engine.create();
    // Add a bunch of fixed boundaries
    boundaries.push(
      new Boundary(p, p.width / 4, p.height - 5, p.width / 2 - 50, 10),
    );
    boundaries.push(
      new Boundary(p, (3 * p.width) / 4, p.height - 50, p.width / 2 - 50, 10),
    );
  };

  p.draw = () => {
    if (isPaused) return;
    p.background("white");

    Engine.update(engine);

    // Boxes fall from the top every so often
    if (p.mouseIsPressed) {
      let b = new Box(p, p.mouseX, p.mouseY);
      boxes.push(b);
    }

    // Iterate over the boxes backwards
    for (let i = boxes.length - 1; i >= 0; i--) {
      boxes[i].show();
      // Remove the Body from the world and the array
      if (boxes[i].checkEdge()) {
        boxes[i].removeBody();
        boxes.splice(i, 1);
      }
    }

    // Display all the boundaries
    for (let i = 0; i < boundaries.length; i++) {
      boundaries[i].show();
    }
  };
}, sketches);

if (isExploringMatter) {
  new p5((p) => {
    let isPaused = true;

    p.setup = () => {
      let sketch = p.createDiv().addClass("sketch");
      let canvas = p.createCanvas(400, 400).parent(sketch);
      p.background("white");

      // let playButton = p
      //   .createButton("Toggle Sketch")
      //   .parent(sketch)
      //   .addClass("control-buttons");
      // playButton.mousePressed(() => {
      //   isPaused = !isPaused;
      // });

      // Make the Engine
      let engine = Engine.create();

      let render = Render.create({
        canvas: canvas.elt, // value: canvas#defaultCanvas1.p5Canvas
        engine,
        options: { width: p.width, height: p.height },
      });
      Render.run(render);

      // Create the box
      let options = {
        // Configs the physics parameters of Body
        friction: 0.001,
        restitution: 0.75, // Elasticity of Body
      };
      let mbox = Bodies.rectangle(100, 100, 50, 50, options);
      let v = Vector.create(2, 0);
      Body.setVelocity(mbox, v);
      Body.setAngularVelocity(mbox, 0.1);
      Composite.add(engine.world, mbox);

      // Create a static body for the ground
      let ground = Bodies.rectangle(p.width / 2, p.height - 10, p.width, 10, {
        isStatic: true, // StaticBody
      });
      Composite.add(engine.world, ground);

      // create runner
      let runner = Matter.Runner.create();
      // run the engine
      Matter.Runner.run(runner, engine);
    };

    p.draw = () => {
      if (isPaused) return;
    };
  }, sketches);
}

class Box {
  constructor(p, x, y) {
    this.p5 = p;
    this.w = 16;
    this.body = Bodies.rectangle(x, y, this.w, this.w);
    Composite.add(engine.world, this.body); // e - engine
  }

  show() {
    let pos = this.body.position;
    let a = this.body.angle;

    let p = this.p5;
    p.rectMode(p.CENTER);
    p.fill(127);
    p.stroke(0);
    p.strokeWeight(2);
    p.push();
    p.translate(pos.x, pos.y);
    p.rotate(a);
    p.square(0, 0, this.w);
    p.pop();
  }

  checkEdge() {
    let p = this.p5;
    return this.body.position.y > p.height + this.w;
  }

  // This function removes a body from the Matter.js world.
  removeBody() {
    Composite.remove(engine.world, this.body);
  }
}

class Boundary {
  constructor(p, x, y, w, h) {
    this.p5 = p;
    //{!4} A boundary is a simple rectangle with x, y, width, and height.
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    //{!1} Lock the body in place by setting isStatic to true!
    let options = { isStatic: true };
    this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
    Composite.add(engine.world, this.body);
  }

  //{!6} Since the boundary can never move, show() can draw it
  // the old-fashioned way, using the original
  // variables. No need to query Matter.js.
  show() {
    let p = this.p5;
    p.rectMode(p.CENTER);
    p.fill(127);
    p.stroke(0);
    p.strokeWeight(2);
    p.rect(this.x, this.y, this.w, this.h);
  }
}
