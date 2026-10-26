import p5 from "p5";
import Matter from "matter-js";

const sketches = document.getElementById("sketches");

console.log(Matter.Vector.create(1, -1));

const { Engine, Vector, Body, Bodies, Composite, Render } = Matter;

new p5((p) => {
  let isPaused = true;

  p.setup = () => {
    let sketch = p.createDiv().addClass("sketch");
    let canvas = p.createCanvas(400, 400).parent(sketch);
    p.background("white");

    let playButton = p
      .createButton("Toggle Sketch")
      .parent(sketch)
      .addClass("control-buttons");
    playButton.mousePressed(() => {
      isPaused = !isPaused;
    });

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
});
