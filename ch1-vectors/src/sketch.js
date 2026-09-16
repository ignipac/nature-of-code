import p5 from 'p5'

// for each sketch pass a different p5 obj for the sketch to modify, for color, canvas
// this each p5 is it's own img/resource

const sketches = document.getElementById('sketches')

// gravitational attraction attempt
new p5((p) => {
  let isPaused = true;
  let mover;

  const labels = {}
  let labelDiv;
  let label1;

  function createButtons(div) {
    const buttons = p.createDiv().parent(div)

    const playButton = p.createButton("Play")
    buttons.child(playButton)
    playButton.mousePressed(() => {
      isPaused = false
    })

    const pauseButton = p.createButton("Pause")
    buttons.child(pauseButton)
    pauseButton.mousePressed(() => {
      isPaused = true
    })
  }
  p.setup = () => {
    let sketch = p.createDiv()
    sketch.addClass('sketch')
    // parent the p5 canvas to div with class attribute 'sketch'
    p.createCanvas(400, 400).parent(sketch) // 1:1 aspect ratio
    createButtons(sketch)
    p.background('midnightblue')
    mover = new Mover(p)
    mover.show(p)

    labelDiv = p.createDiv().parent(sketch)
    sketch.addClass(labels)
    p.createP("gravitational effect: ").parent(labelDiv).id('label1')
    label1 = document.getElementById('label1')
  }

  p.draw = () => {
    if (isPaused) return;

    p.background('midnightblue')

    // Draw logic here...
    let mousePos = p.createVector(p.mouseX, p.mouseY)
    let mouseDist = p5.Vector.sub(mousePos, mover.pos).mag()
    let mouseDir = p5.Vector.sub(mousePos, mover.pos).normalize()

    // can add maxDistance for it to have no effect after a range
    // let maxDistance = 400
    // let effectRange = mouseDist / maxDistance
    let gravitationEffect = (1 / mouseDist) // scale down the effect


    if (mouseDist <= maxDistance) {
      mover.maxAccel = 50
      mover.accel = mouseDir.mult(mover.maxAccel * gravitationEffect)
    }

    label1.innerHTML = `gravitational effect: ${gravitationEffect.toFixed()}`

    mover.update(p)
    mover.checkEdges(p)
    mover.show(p)

  }

}, sketches)

// review noise generation, learn about noise scaling to make the transition more smooth
new p5((p) => {
  let hasBeenStarted = false;

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
      p.noiseSeed(p.random(0, 10000))
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
  let tm = 5000;
  let noiseScale = 0.02

  function UI() {
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
    UI()

    center = p.createVector(p.width / 2, p.height / 2)

    // Objects
    // Limit to using p5 only when show and the rest being data owned by obj
    mover = {
      pos: p.createVector(center.x, center.y),
      dir: p.createVector(0, 0),
      maxSpeed: 5,
      vel: p.createVector(0, 0),
      accel: p.createVector(0, 0),
      size: 50,

      update: function () {
        this.vel.add(this.accel)
        this.vel.limit(this.maxSpeed)
        this.pos.add(this.vel)
      },
      show: function () {
        p.push()
        p.fill('mintcream')
        p.noStroke()
        p.circle(this.pos.x, this.pos.y, this.size)
        p.pop()
      },

      checkEdges: function () {
        if (this.pos.x - this.size/2 > p.width) {
          this.pos.x = 0;
        } else if (this.pos.x + this.size/2 < 0) {
          this.pos.x = p.width;
        }

        if (this.pos.y - this.size > p.height) {
          this.pos.y = 0;
        } else if (this.pos.y + this.size < 0) {
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

    randomX = p.noise(tx * noiseScale) * p.random(-1, 1)
    randomY = p.noise(ty * noiseScale) * p.random(-1, 1)
    mover.accel = p.createVector(randomX, randomY)
    mover.accel.mult(p.noise(tm * noiseScale))
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

  function UI() {
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
    UI()

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

// Prototypes (Classes)
class Mover {
  pos;
  dir;
  vel;
  maxSpeed;
  accel;
  maxAccel;
  size;

  constructor(p) {
    this.init(p)
  }

  // pass in p5 sketch in each method
  init(p) {
    this.pos = p.createVector(p.width/2, p.height/2)
    this.vel = p.createVector(0, 0)
    this.accel = p.createVector(0, 0)
    this.maxSpeed = 5; // pixels per frame
    this.maxAccel = 0.2; // pixels per frame ^ 2, add 0.1 to the current speed up to the max Speed
    this.size = 50;
  }


  update(p) {
    this.vel.add(this.accel).limit(this.maxSpeed)
    this.pos.add(this.vel)

    // stop acceleration when at max speed, how to decelerate when approaching mouse?
    if (this.vel.mag() >= this.maxSpeed) {
      this.accel = p.createVector(0, 0)
    }
  }


  show(p) {
    p.push()
    p.fill('mintcream')
    p.noStroke()
    p.circle(this.pos.x, this.pos.y, this.size)
    p.pop()
  }


  checkEdges(p) {
    if (this.pos.x - this.size/2 > p.width) {
      this.pos.x = 0;
    } else if (this.pos.x + this.size/2 < 0) {
      this.pos.x = p.width;
    }

    if (this.pos.y - this.size > p.height) {
      this.pos.y = 0;
    } else if (this.pos.y + this.size < 0) {
      this.pos.y = p.height;
    }
  }
}


class Canvas{
  // start on play button
  // input delay
  // check for paused state
  isInitiated = false;
  isPaused = true;
  #isInteractive = false;
  // after x amount of frames, be able to interact, can use Frame per second, need the frame count of device
  interactTimeout = 60;
  timePassed = 0;

  constructor(p) {
    this.init(p)
  }


  init(p) { // resetting objects?
    let sketch = p.createDiv()
    sketch.addClass('sketch')
    // parent the p5 canvas to div with class attribute 'sketch'
    p.createCanvas(400, 400).parent(sketch) // 1:1 aspect ratio
    this.createButtons(p, sketch)
  }


  createButtons(p, sketch) {
    const controls = p.createDiv().parent(sketch)

    const playButton = p.createButton("Play")
    controls.child(playButton)
    playButton.mousePressed(this.onPlayButtonPressed)

    const pauseButton = p.createButton("Pause")
    pauseButton.mousePressed(this.onPauseButtonPressed)
    controls.child(pauseButton)
  }


  onPlayButtonPressed() {
    this.isPaused = false
    this.isInitiated = true
  }

  onPauseButtonPressed() {
    this.isPaused = true
  }

  canInteract() {
    if (this.#isInteractive) {
      return true;
    } else {
      this.timePassed += 1 // add 1 every draw frame
      if (this.timePassed > this.interactTimeout) {
        this.#isInteractive = true
        return this.#isInteractive
      }
    }
  }
}

// Helper Functions
