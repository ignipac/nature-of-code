import p5 from 'p5'

// for each sketch pass a different p5 obj for the sketch to modify, for color, canvas
// this each p5 is it's own img/resource

const sketches = document.getElementById('sketches')


new p5((p) => {
  let hasBeenStarted = true;

  let t = 0;
  let x = 0;
  let y = 0;

  p.setup = () => {
    let sketchCell = p.createDiv()
    sketchCell.addClass('sketch')
    p.createCanvas(400, 400).parent(sketchCell)

    const controls = p.createDiv().parent(sketchCell)
    const playButton = p.createButton('Play')
    const resetButton = p.createButton('Reset')

    controls.child(playButton)
    controls.child(resetButton)

    playButton.mousePressed(() => {
      hasBeenStarted = true
    })

    resetButton.mousePressed(() => {
      let randomSeed = p.random(0, 10000)
      p.noiseSeed(randomSeed)
      p.background('gainsboro')
      t = 0
    })

    p.background('gainsboro')

    p.describe('A hilly terrain drawn in gray against a black sky.');
  }

  p.draw = () => {
    if (!hasBeenStarted) return;

    // Set the noise level and scale.
    let noiseLevel = p.height;
    let noiseScale = 0.02; // scales down the noise values to be closer together for smoother transition

    // Scale the input coordinate.
    let nt = noiseScale * t;

    // Compute the noise value.
    y = noiseLevel * p.noise(nt);

    if (y < p.width) {
      t += 1
    }

    // Draw the line.
    p.line(t, 0, t, y);
}


}, sketches)


// explore the idea of acceleration with perlin noise...and wrapping around canvas
new p5((p) => {
  let hasBeenStarted = false;
  let isPaused = false
  let isReadyForInputs = false
  let maxDelay = 500;
  let delay = 0

  let center;
  let mover;
  let tx = 0; //time passed
  let ty = 10000; //time passed
  let randomX = 0;
  let randomY = 0;

  function userInterface() {
    let sketchCell = p.createDiv()
    sketchCell.addClass('sketch')
    p.createCanvas(400, 400).parent(sketchCell) // 1:1 aspect ratio

    p.rectMode(p.CENTER)
    p.angleMode(p.DEGREES)

    const controls = p.createDiv().parent(sketchCell)
    const playButton = p.createButton("Play")
    const pauseButton = p.createButton("Pause")

    controls.child(playButton)
    controls.child(pauseButton)

    playButton.mousePressed(() => {
      hasBeenStarted = true
      isPaused = false
    })

    pauseButton.mousePressed(() => {
      isPaused = !isPaused
    })
  }

  p.setup = () => {
    userInterface()

    center = p.createVector(p.width / 2, p.height / 2)

    // Objects
    // Limit to using p5 only when show and the rest being data owned by obj
    mover = {
      pos: p.createVector(center.x, center.y),
      dir: p.createVector(0, 0),
      maxSpeed: 5,
      vel: p.createVector(0, 0),
      accel: p.createVector(0, 0),
      accelRate: 0.1,

      update: function () {
        this.vel.add(this.accel)
        this.vel.limit(this.maxSpeed)
        this.pos.add(this.vel)
      },
      show: function () {
        p.push()
        p.fill('mintcream')
        p.noStroke()
        p.circle(this.pos.x, this.pos.y, 50)
        p.pop()
      },

      checkEdges: function () {
        if (this.pos.x > p.width) {
          this.pos.x = 0;
        } else if (this.pos.x < 0) {
          this.pos.x = p.width;
        }

        if (this.pos.y > p.height) {
          this.pos.y = 0;
        } else if (this.pos.y < 0) {
          this.pos.y = p.height;
        }
      }
    }
    // setup logic...
  }

  p.draw = () => {
    if (isPaused) return;
    delay += p.deltaTime

    p.background('midnightblue')

    // Draw logic here...
    // let mousePos = p.createVector(p.mouseX, p.mouseY)

    randomX = p.noise(tx)
    randomY = p.noise(ty)
    let newThrust = p.createVector(randomX, randomY).mult(mover.accel)
    mover.accel = p5.Vector.random2D()
    mover.accel.mult(p.random(randomX))
    tx += 0.01
    ty += 0.01
    mover.update()
    mover.checkEdges()
    mover.show()


    if (!hasBeenStarted) {
      isPaused = true
      delay = 0
    } else {
      if (delay > maxDelay) {
        isReadyForInputs = true
      }
    }
  }

  p.mouseClicked = () => {
    if (!isReadyForInputs) return
    // initial input recieved
  }

}, sketches)


// bouncing ball with choosing the start launch direction and speed
new p5((p) => { // p - processing in-built functions
  let hasBeenStarted = false
  let isPaused = false
  let isReadyForInputs = false
  let maxDelay = 500;
  let delay = 0
  // Objects
  let ball;

  function userInterface() {
    let sketchCell = p.createDiv()
    sketchCell.addClass('sketch')
    p.createCanvas(400, 400).parent(sketchCell) // 1:1 aspect ratio

    p.rectMode(p.CENTER)
    p.angleMode(p.DEGREES)

    const controls = p.createDiv().parent(sketchCell)
    const playButton = p.createButton("Play")
    const pauseButton = p.createButton("Pause")
    const resetButton = p.createButton("Reset")

    controls.child(playButton)
    controls.child(pauseButton)
    controls.child(resetButton)

    playButton.mousePressed(() => {
      hasBeenStarted = true
      isPaused = false
    })

    pauseButton.mousePressed(() => {
      isPaused = !isPaused
    })

    // to reset you need an init function or reset each variable to start of sketch before interacting with it
    resetButton.mousePressed(() => {
      ball.hasBeenLaunched = false
      ball.hasSetStartVel = false
      ball.pos = p.createVector(p.width / 2, p.height / 2)
      ball.dir = p.createVector(0, 0)
      delay = 0
      isReadyForInputs = false
    })
  }

  p.setup = () => {
    userInterface()

    ball = {
      hasBeenLaunched: false,
      hasSetStartVel: false,
      pos: p.createVector(p.width / 2, p.height / 2),
      dir: p.createVector(0, 0),
      speed: 5,
      size: 50,

      lauching: function () {
        let mouse = p.createVector(p.mouseX, p.mouseY)
        let center = p.createVector(p.width / 2, p.height / 2);
        mouse.sub(center)

        // one-time logic execution
        if (this.hasBeenLaunched) {
          if (!this.hasSetStartVel) {
            // this.speed = mouse.mag() / center.mag(); // mouse magnitude, the speed at which the ball is thrown
            // console.log(this.speed)
            this.dir = mouse.normalize()
            this.hasSetStartVel = true
          }
        } else {
          // display
          p.push()
          // p.fill(0);
          // p.rect(0, 0, m * 2, 10);
          p.translate(p.width / 2, p.height / 2);
          p.strokeWeight(5)
          p.line(0, 0, mouse.x, mouse.y);
          p.pop();
        }
      },

      display: function () {
        // push and pop contains fill, stroke... data to specific shape, model etc.
        p.push();
        p.fill('black')
        p.circle(this.pos.x, this.pos.y, this.size)
        p.pop();
      },

      bounce: function () {
        if (this.dir.mag() == 0) return;

        let vel = p.createVector(this.dir.x * this.speed, this.dir.y * this.speed)
        this.pos.add(vel)

        if (this.pos.x > p.width - this.size/2 || this.pos.x < 0 + this.size/2) {
          this.dir.x *= -1
        }
        if (this.pos.y > p.height - this.size/2 || this.pos.y < 0 + this.size/2) {
          this.dir.y *= -1
        }
      }
    }

    // setup continued...
  }

  p.mouseClicked = () => {
    if (!isReadyForInputs) return
    ball.hasBeenLaunched = true
  }

  p.draw = () => {
    if (isPaused) return;

    // delays first render for a duration of (i think) in ms
    delay += p.deltaTime
    // if (delay < maxDelay) return;

    p.background(255) // clear previous draw, keep at top of draw call

    ball.lauching()
    ball.display()
    ball.bounce()

    if (p.mouseIsPressed) {
      if (p.mouseButton.left) {
        // continous inputs detection...
      }
    }

    if (!hasBeenStarted) {
      isPaused = true
      delay = 0
    } else {
      if (delay > maxDelay) {
        isReadyForInputs = true
      }
    }
  };
}, sketches)



// sketch exploring vector subtraction
new p5((p) => {
  let hasBeenStarted = false;
  let isPaused = false

  p.setup = () => {
    let sketchCell = p.createDiv()
    sketchCell.addClass('sketch')

    p.createCanvas(400, 400).parent(sketchCell)

    const controls = p.createDiv().parent(sketchCell)
    const playButton = p.createButton("Play")
    const pauseButton = p.createButton("Pause")

    controls.child(playButton)
    controls.child(pauseButton)

    playButton.mousePressed(() => {
      hasBeenStarted = true
      isPaused = false
    })

    pauseButton.mousePressed(() => {
      isPaused = !isPaused
    })
  }

  p.draw = () => {
    if (isPaused) return;

    p.background(255) //white
    let mouse = p.createVector(p.mouseX, p.mouseY);
    let center = p.createVector(p.width / 2, p.height / 2)

    // display changes
    p.stroke(0) // black
    p.strokeWeight(4)
    p.line(0, 0, center.x, center.y)
    p.line(0, 0, mouse.x, mouse.y);

    mouse.sub(center)
    p.translate(center.x, center.y) // get local points from center of canvas
    p.line(0, 0, mouse.x, mouse.y)

    if (!hasBeenStarted) {
      isPaused = true
    }
  }

}, sketches)


// bouncing ball sketch to group related by using vectors
new p5((p) => { // p - processing in-built functions

  let hasBeenStarted = false
  let isPaused = false
  // Objects
  let ball;

  p.setup = () => {
    let sketchCell = p.createDiv()
    sketchCell.addClass('sketch')

    p.createCanvas(400, 400).parent(sketchCell) // 1:1 aspect ratio

    p.rectMode(p.CENTER)
    p.angleMode(p.DEGREES)

    const controls = p.createDiv().parent(sketchCell)
    const playButton = p.createButton("Play")
    const pauseButton = p.createButton("Pause")

    controls.child(playButton)
    controls.child(pauseButton)

    playButton.mousePressed(() => {
      hasBeenStarted = true
      isPaused = false
    })

    pauseButton.mousePressed(() => {
      isPaused = !isPaused
    })

    ball = {
      pos: p.createVector(p.width / 2, p.height / 2),
      dir: p5.Vector.random2D(),
      launch_angle: p.random(0, 360),
      speed: 5,
      size: 50,

      init: function () {
        // this.dir.rotate(this.launch_angle)
      },

      display: function () {
        // p.translate(this.posX, this.posY)
        p.circle(this.pos.x, this.pos.y, this.size)
        p.fill('white')
        p.stroke('white')
        p.strokeWeight(2)
      },
      bounce: function () {
        let vel = p.createVector(this.dir.x * this.speed, this.dir.y * this.speed)
        this.pos.add(vel)
        if (this.pos.x > p.width - this.size/2 || this.pos.x < 0 + this.size/2) {
          this.dir.x *= -1
        }
        if (this.pos.y > p.height - this.size/2 || this.pos.y < 0 + this.size/2) {
          this.dir.y *= -1
        }
      }
    }

    ball.init()
    // setup...

  }

  p.draw = () => {
    if (isPaused) return;

    p.background('black') // clear previous draw
    ball.display()
    ball.bounce()

    if (!hasBeenStarted) {
      isPaused = true
    }
  };
}, sketches)



// Helpers
